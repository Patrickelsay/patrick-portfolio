/**
 * Emits idempotent seed SQL (for running through the Supabase MCP / SQL editor)
 * from the bundled static content. Mirrors seed-supabase.ts insert-only logic.
 * Usage: tsx scripts/generate-seed-sql.ts <outDir> [chunkSize]
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { projects } from '../src/content/projects'
import { site } from '../src/content/site'
import { getExpanded } from '../src/content/getexpanded'
import {
  reels,
  contentStats,
  clientRoster,
  remoteShowcase,
  instagramPortfolio,
} from '../src/content/content-channel'

const [outDir, chunkArg] = process.argv.slice(2)
if (!outDir) {
  console.error('usage: tsx scripts/generate-seed-sql.ts <outDir> [projectsPerChunk]')
  process.exit(1)
}
const chunkSize = Number(chunkArg ?? 5)

function jsonb(value: unknown): string {
  const json = JSON.stringify(value)
  if (json.includes('$json$')) throw new Error('dollar-quote collision')
  return `$json$${json}$json$::jsonb`
}

const statements: string[] = []
for (let i = 0; i < projects.length; i++) {
  const { featured, ...payload } = projects[i]
  statements.push(
    `insert into public.projects (slug, payload, domain, tier, published, featured, sort_order)\n` +
      `values ('${payload.slug}', ${jsonb(payload)}, '${payload.domain}', ${payload.tier}, true, ${!!featured}, ${(i + 1) * 10})\n` +
      `on conflict (slug) do nothing;`,
  )
}

const contentRows: [string, unknown][] = [
  ['site', { hero: site.hero, aboutTeaser: site.aboutTeaser, cta: site.cta }],
  ['getexpanded', getExpanded],
  ['content_channel', { stats: contentStats, roster: clientRoster, reels, remoteShowcase, instagramPortfolio }],
  ['live_stats', { discordMembers: null, fetchedAt: null }],
]
const contentSql = contentRows
  .map(
    ([key, data]) =>
      `insert into public.site_content (key, data) values ('${key}', ${jsonb(data)}) on conflict (key) do nothing;`,
  )
  .join('\n')

mkdirSync(outDir, { recursive: true })
let n = 0
for (let i = 0; i < statements.length; i += chunkSize) {
  n++
  writeFileSync(join(outDir, `seed-projects-${n}.sql`), statements.slice(i, i + chunkSize).join('\n'))
}
writeFileSync(join(outDir, 'seed-content.sql'), contentSql)
console.log(`${statements.length} project inserts in ${n} chunks + seed-content.sql → ${outDir}`)
