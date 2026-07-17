/**
 * Transcodes curated videos to web-ready H.264 + poster frames.
 * - Local tier → public/media/<id>.mp4 (ships with the site)
 * - Remote tier → supabase-upload/<id>.mp4 (Patrick uploads to the
 *   `portfolio-media` bucket); posters still ship with the site.
 * - Long side capped (default 1280), crf 25, faststart.
 * - Merges entries into src/content/media-index.json.
 *
 * Idempotent: skips ids whose outputs already exist.
 */
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from 'ffmpeg-static'
import sharp from 'sharp'
import { videos } from './manifest.ts'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const ASSETS = join(ROOT, 'portfolio-assets')
const OUT = join(ROOT, 'public', 'media')
const REMOTE_OUT = join(ROOT, 'supabase-upload')
const INDEX_PATH = join(ROOT, 'src', 'content', 'media-index.json')

if (!ffmpegPath) throw new Error('ffmpeg-static binary not found')

const index: Record<string, unknown> = existsSync(INDEX_PATH)
  ? JSON.parse(readFileSync(INDEX_PATH, 'utf8'))
  : {}

function probe(src: string): { w: number; h: number; duration: number; rotated: boolean } {
  const res = spawnSync(ffmpegPath!, ['-i', src], { encoding: 'utf8' })
  const err = res.stderr
  const dim = err.match(/Video:.*? (\d{2,5})x(\d{2,5})/)
  const dur = err.match(/Duration: (\d+):(\d+):([\d.]+)/)
  const rot = /rotation of -?90|displaymatrix.*-?90/i.test(err)
  if (!dim || !dur) throw new Error(`probe failed for ${src}`)
  return {
    w: Number(dim[1]),
    h: Number(dim[2]),
    duration: Number(dur[1]) * 3600 + Number(dur[2]) * 60 + Number(dur[3]),
    rotated: rot,
  }
}

let built = 0
let skipped = 0
const failures: string[] = []

for (const entry of videos) {
  const src = join(ASSETS, entry.src)
  if (!existsSync(src)) {
    failures.push(`MISSING: ${entry.id} ← ${entry.src}`)
    continue
  }
  // reels render in ~350px wall cells — 960 long side is plenty and halves the payload
  const cap = entry.cap ?? (entry.id.startsWith('reels/') ? 960 : 1280)
  const outDir = entry.remote ? REMOTE_OUT : OUT
  const outFile = join(outDir, `${entry.id}.mp4`)
  const posterFile = join(OUT, `${entry.id}-poster.jpg`)
  mkdirSync(dirname(outFile), { recursive: true })
  mkdirSync(dirname(posterFile), { recursive: true })

  if (existsSync(outFile) && existsSync(posterFile) && index[entry.id]) {
    skipped++
    continue
  }

  try {
    const info = probe(src)
    // ffmpeg auto-applies rotation metadata; swap probe dims when rotated
    const sw = info.rotated ? info.h : info.w
    const sh = info.rotated ? info.w : info.h
    const scale = `scale=w='if(gte(iw,ih),trunc(min(${cap},iw)/2)*2,-2)':h='if(gte(iw,ih),-2,trunc(min(${cap},ih)/2)*2)'`

    execFileSync(
      ffmpegPath,
      ['-y', '-i', src, '-vf', scale, '-c:v', 'libx264', '-crf', '25', '-preset', 'medium',
       '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '128k', outFile],
      { stdio: 'ignore' },
    )

    const posterAt = entry.posterAt ?? Math.min(1, info.duration / 2)
    const rawPoster = `${posterFile}.raw.png`
    execFileSync(
      ffmpegPath,
      ['-y', '-ss', String(posterAt), '-i', outFile, '-frames:v', '1', rawPoster],
      { stdio: 'ignore' },
    )
    await sharp(rawPoster)
      .resize({ width: 960, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(posterFile)
    execFileSync('rm', [rawPoster])

    const outScale = Math.min(1, cap / Math.max(sw, sh))
    index[entry.id] = {
      video: true,
      w: Math.round(sw * outScale / 2) * 2,
      h: Math.round(sh * outScale / 2) * 2,
      duration: Math.round(info.duration * 10) / 10,
      ...(entry.remote ? { remote: true } : {}),
    }
    built++
    console.log(`✓ ${entry.id} (${Math.round(info.duration)}s)`)
  } catch (err) {
    failures.push(`ERROR: ${entry.id} — ${(err as Error).message}`)
  }
}

writeFileSync(INDEX_PATH, JSON.stringify(index, null, 1))

console.log(`videos: ${built} built, ${skipped} skipped`)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
}
