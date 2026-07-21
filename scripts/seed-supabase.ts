/**
 * One-time (idempotent) seed: pushes the bundled static content into the CMS
 * tables. Run after the 20260720_cms.sql migration.
 *
 *   SUPABASE_URL=https://<ref>.supabase.co \
 *   SUPABASE_SERVICE_ROLE=<service-role-key> \
 *   npx tsx scripts/seed-supabase.ts [--force]
 *
 * Default mode inserts only missing rows (admin edits are never clobbered).
 * --force overwrites payload/data from the bundled content while PRESERVING
 * the admin knobs (published, featured, sort_order) on existing projects.
 */
import { createClient } from '@supabase/supabase-js'
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

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE env vars.')
  process.exit(1)
}
const force = process.argv.includes('--force')
const db = createClient(url, key, { auth: { persistSession: false } })

/* ---- projects ----------------------------------------------------------- */
const { data: existing, error: exErr } = await db.from('projects').select('slug')
if (exErr) throw exErr
const have = new Set((existing ?? []).map((r) => r.slug))

let inserted = 0
let updated = 0
for (let i = 0; i < projects.length; i++) {
  const p = projects[i]
  const { featured, ...payload } = p
  if (!have.has(p.slug)) {
    const { error } = await db.from('projects').insert({
      slug: p.slug,
      payload,
      domain: p.domain,
      tier: p.tier,
      published: true,
      featured: !!featured,
      sort_order: (i + 1) * 10,
    })
    if (error) throw new Error(`insert ${p.slug}: ${error.message}`)
    inserted++
  } else if (force) {
    const { error } = await db
      .from('projects')
      .update({ payload, domain: p.domain, tier: p.tier })
      .eq('slug', p.slug)
    if (error) throw new Error(`update ${p.slug}: ${error.message}`)
    updated++
  }
}

/* ---- site_content ------------------------------------------------------- */
const rows: { key: string; data: unknown }[] = [
  { key: 'site', data: { hero: site.hero, aboutTeaser: site.aboutTeaser, cta: site.cta } },
  { key: 'getexpanded', data: getExpanded },
  {
    key: 'content_channel',
    data: { stats: contentStats, roster: clientRoster, reels, remoteShowcase, instagramPortfolio },
  },
  { key: 'live_stats', data: { discordMembers: null, fetchedAt: null } },
]

const { data: haveKeysRows, error: keyErr } = await db.from('site_content').select('key')
if (keyErr) throw keyErr
const haveKeys = new Set((haveKeysRows ?? []).map((r) => r.key))

let contentWrites = 0
for (const row of rows) {
  if (!haveKeys.has(row.key)) {
    const { error } = await db.from('site_content').insert(row)
    if (error) throw new Error(`insert ${row.key}: ${error.message}`)
    contentWrites++
  } else if (force && row.key !== 'live_stats') {
    const { error } = await db.from('site_content').update({ data: row.data }).eq('key', row.key)
    if (error) throw new Error(`update ${row.key}: ${error.message}`)
    contentWrites++
  }
}

console.log(
  `projects: ${inserted} inserted, ${updated} force-updated, ${projects.length - inserted - updated} untouched`,
)
console.log(`site_content: ${contentWrites} rows written`)
