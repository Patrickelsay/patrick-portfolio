/**
 * Curation aid: composes a numbered contact sheet from a folder of images.
 * Usage: tsx scripts/contact-sheet.ts <folder> <out.jpg> [--recursive]
 * Skips non-raster files; HEIC converted via sips to a temp jpg first.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'

const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])
const CELL = 320
const COLS = 5

const [folder, out] = process.argv.slice(2)
const recursive = process.argv.includes('--recursive')
if (!folder || !out) {
  console.error('usage: tsx scripts/contact-sheet.ts <folder> <out.jpg> [--recursive]')
  process.exit(1)
}

function collect(dir: string): string[] {
  const files: string[] = []
  for (const name of readdirSync(dir)) {
    if (name === '.DS_Store') continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (recursive) files.push(...collect(p))
      continue
    }
    const ext = extname(name).toLowerCase()
    if (RASTER.has(ext) || ext === '.heic') files.push(p)
  }
  return files.sort()
}

const tmp = mkdtempSync(join(tmpdir(), 'sheet-'))
const files = collect(folder)
if (!files.length) {
  console.error('no raster images found')
  process.exit(1)
}

const cells: { input: Buffer; left: number; top: number }[] = []
const labels: string[] = []

for (let i = 0; i < files.length; i++) {
  let src = files[i]
  if (extname(src).toLowerCase() === '.heic') {
    const conv = join(tmp, `${i}.jpg`)
    execFileSync('sips', ['-s', 'format', 'jpeg', src, '--out', conv], { stdio: 'ignore' })
    src = conv
  }
  const label = `${i}: ${basename(files[i]).slice(0, 38)}`
  labels.push(`${i}  ${files[i]}`)
  const labelSvg = Buffer.from(
    `<svg width="${CELL}" height="26"><rect width="100%" height="100%" fill="black"/><text x="4" y="18" font-family="Helvetica" font-size="13" fill="white">${label
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')}</text></svg>`
  )
  const img = await sharp(src, { failOn: 'none', limitInputPixels: false })
    .rotate() // respect EXIF
    .resize(CELL, CELL - 26, { fit: 'cover' })
    .toBuffer()
  const cell = await sharp({
    create: { width: CELL, height: CELL, channels: 3, background: '#222' },
  })
    .composite([
      { input: img, left: 0, top: 0 },
      { input: labelSvg, left: 0, top: CELL - 26 },
    ])
    .jpeg()
    .toBuffer()
  cells.push({
    input: cell,
    left: (i % COLS) * CELL,
    top: Math.floor(i / COLS) * CELL,
  })
}

const rows = Math.ceil(cells.length / COLS)
await sharp({
  create: { width: COLS * CELL, height: rows * CELL, channels: 3, background: '#111' },
})
  .composite(cells)
  .jpeg({ quality: 82 })
  .toFile(out)

console.log(`sheet: ${out} (${files.length} images)`)
console.log(labels.join('\n'))
