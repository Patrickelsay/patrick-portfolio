/**
 * Visual verification: full-page screenshots of every route at three widths.
 * Usage: tsx scripts/shoot.ts <baseURL> <outDir> [route ...]
 * Uses the installed Google Chrome (channel: 'chrome') — no browser download.
 */
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

const [base, outDir, ...routeArgs] = process.argv.slice(2)
if (!base || !outDir) {
  console.error('usage: tsx scripts/shoot.ts <baseURL> <outDir> [route ...]')
  process.exit(1)
}

const routes = routeArgs.length
  ? routeArgs
  : ['/', '/work', '/work/wobbly-bridge', '/work/water-activity-footwear', '/content', '/ventures', '/about', '/nope-404']

const widths = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'desktop', width: 1440, height: 900 },
]

mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const errors: string[] = []

for (const vp of widths) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce', // stop Lenis/entrances from fighting fullPage capture
  })
  const page = await ctx.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${vp.name}] console: ${msg.text().slice(0, 200)}`)
  })
  page.on('pageerror', (err) => errors.push(`[${vp.name}] pageerror: ${String(err).slice(0, 200)}`))

  for (const route of routes) {
    const slug = route === '/' ? 'home' : route.replace(/\W+/g, '-').replace(/^-|-$/g, '')
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    // step-scroll so every lazy image enters the viewport, then wait for decode
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.7
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 180))
      }
      window.scrollTo(0, document.body.scrollHeight)
      const deadline = Date.now() + 8000
      while (Date.now() < deadline) {
        const imgs = Array.from(document.images)
        if (imgs.every((i) => i.complete)) break
        await new Promise((r) => setTimeout(r, 200))
      }
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 300))
    })
    await page.screenshot({ path: join(outDir, `${slug}-${vp.name}.png`), fullPage: true })
    console.log(`✓ ${slug}-${vp.name}`)
  }
  await ctx.close()
}

await browser.close()
if (errors.length) {
  console.error('\nCONSOLE/PAGE ERRORS:\n' + [...new Set(errors)].join('\n'))
  process.exitCode = 1
} else {
  console.log('\nno console errors')
}
