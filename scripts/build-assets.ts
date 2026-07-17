/**
 * Derives web images from portfolio-assets/ per the manifest.
 * - HEIC → jpg via macOS sips; PDFs → png via scripts/pdf-page.swift
 * - EXIF-rotates, emits webp renditions (480/960/1600, +2400 for heroes)
 * - og entries also get a 1200w jpg for social cards
 * - Writes/merges src/content/media-index.json (id → intrinsic dims + widths)
 *
 * Idempotent: skips ids whose outputs already exist (delete public/media/<id>* to rebuild).
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { images, pdfs } from './manifest.ts'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const ASSETS = join(ROOT, 'portfolio-assets')
const OUT = join(ROOT, 'public', 'media')
const INDEX_PATH = join(ROOT, 'src', 'content', 'media-index.json')

const WIDTHS = [480, 960, 1600]
const HERO_WIDTH = 2400

type IndexEntry = {
  w: number
  h: number
  widths: number[]
  og?: boolean
  video?: boolean
  duration?: number
  remote?: boolean
}

const index: Record<string, IndexEntry> = existsSync(INDEX_PATH)
  ? JSON.parse(readFileSync(INDEX_PATH, 'utf8'))
  : {}

/** macOS screenshots use U+202F (narrow no-break space) before AM/PM */
export function resolveSource(path: string): string {
  if (existsSync(path)) return path
  const nnbsp = path.replace(/ (AM|PM)(\.[a-z]+)$/i, ' $1$2')
  return existsSync(nnbsp) ? nnbsp : path
}

const tmp = mkdtempSync(join(tmpdir(), 'assets-'))
let built = 0
let skipped = 0
const failures: string[] = []

async function processImage(id: string, sourcePath: string, hero?: boolean, og?: boolean) {
  const outBase = join(OUT, id)
  mkdirSync(dirname(outBase), { recursive: true })

  const targetWidths = hero ? [...WIDTHS, HERO_WIDTH] : WIDTHS
  const finalOut = `${outBase}-${targetWidths[0]}.webp`
  if (existsSync(finalOut) && index[id]) {
    skipped++
    return
  }

  let src = sourcePath
  if (/\.heic$/i.test(src)) {
    const conv = join(tmp, `${id.replace(/\//g, '_')}.jpg`)
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '95', src, '--out', conv], {
      stdio: 'ignore',
    })
    src = conv
  }

  // some assets are PSD/TIFF renamed to .png — let sips normalize anything sharp can't read
  try {
    await sharp(src, { limitInputPixels: false }).metadata()
  } catch {
    const conv = join(tmp, `${id.replace(/\//g, '_')}-norm.png`)
    execFileSync('sips', ['-s', 'format', 'png', src, '--out', conv], { stdio: 'ignore' })
    src = conv
  }

  const base = sharp(src, { failOn: 'none', limitInputPixels: false }).rotate()
  const meta = await base.metadata()
  // dimensions after EXIF rotation
  const rotated = (meta.orientation ?? 1) >= 5
  const w = rotated ? meta.height! : meta.width!
  const h = rotated ? meta.width! : meta.height!

  const widths = targetWidths.filter((tw) => tw <= w)
  if (!widths.length) widths.push(Math.min(w, targetWidths[0]))

  for (const tw of widths) {
    await base
      .clone()
      .resize({ width: tw, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`${outBase}-${tw}.webp`)
  }
  if (og) {
    await base
      .clone()
      .resize({ width: Math.min(1200, w), withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toFile(`${outBase}-og.jpg`)
  }

  index[id] = { w, h, widths, ...(og ? { og: true } : {}) }
  built++
}

for (const entry of images) {
  const src = resolveSource(join(ASSETS, entry.src))
  if (!existsSync(src)) {
    failures.push(`MISSING: ${entry.id} ← ${entry.src}`)
    continue
  }
  try {
    await processImage(entry.id, src, entry.hero, entry.og)
  } catch (err) {
    failures.push(`ERROR: ${entry.id} — ${(err as Error).message}`)
  }
}

for (const entry of pdfs) {
  const src = join(ASSETS, entry.src)
  if (!existsSync(src)) {
    failures.push(`MISSING: ${entry.id} ← ${entry.src}`)
    continue
  }
  try {
    const outBase = join(OUT, entry.id)
    if (existsSync(`${outBase}-480.webp`) && index[entry.id]) {
      skipped++
      continue
    }
    const rendered = join(tmp, `${entry.id.replace(/\//g, '_')}.png`)
    execFileSync('swift', [join(ROOT, 'scripts', 'pdf-page.swift'), src, String(entry.page), rendered, '2000'], {
      stdio: 'ignore',
    })
    await processImage(entry.id, rendered, entry.hero, false)
  } catch (err) {
    failures.push(`ERROR: ${entry.id} — ${(err as Error).message}`)
  }
}

mkdirSync(dirname(INDEX_PATH), { recursive: true })
writeFileSync(INDEX_PATH, JSON.stringify(index, null, 1))

console.log(`images: ${built} built, ${skipped} skipped`)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
}
