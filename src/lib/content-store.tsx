/**
 * Content store: bundled static content renders instantly and is the
 * fallback; when Supabase is configured (and seeded), the CMS rows replace
 * it after a single fetch on mount. Admin edits therefore go live without a
 * rebuild, and the site keeps working with no backend at all.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Project } from '../content/types'
import { projects as staticProjects } from '../content/projects'
import { site as staticSite } from '../content/site'
import { getExpanded as staticGetExpanded } from '../content/getexpanded'
import {
  reels as staticReels,
  contentStats as staticContentStats,
  clientRoster as staticRoster,
  remoteShowcase as staticRemoteShowcase,
  instagramPortfolio as staticInstagram,
  type Reel,
} from '../content/content-channel'
import { supabase } from './supabase'

export interface SiteCopy {
  hero: { roles: string[]; statement: string }
  aboutTeaser: string
  cta: { heading: string; sub: string; action: string }
}

export interface ContentChannelData {
  stats: { value: string; label: string }[]
  roster: { name: string; industry: string }[]
  reels: Reel[]
  remoteShowcase: { id: string; title: string }[]
  instagramPortfolio: string
}

export interface LiveStats {
  discordMembers: number | null
  fetchedAt: string | null
}

export interface ContentState {
  projects: Project[]
  site: SiteCopy
  getexpanded: typeof staticGetExpanded
  contentChannel: ContentChannelData
  liveStats: LiveStats | null
  /** true once CMS rows have replaced the bundled fallback */
  fromCms: boolean
}

const defaults: ContentState = {
  projects: staticProjects,
  site: { hero: staticSite.hero, aboutTeaser: staticSite.aboutTeaser, cta: staticSite.cta },
  getexpanded: staticGetExpanded,
  contentChannel: {
    stats: staticContentStats,
    roster: staticRoster,
    reels: staticReels,
    remoteShowcase: staticRemoteShowcase,
    instagramPortfolio: staticInstagram,
  },
  liveStats: null,
  fromCms: false,
}

const Ctx = createContext<ContentState>(defaults)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>(defaults)

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    Promise.all([
      supabase
        .from('projects')
        .select('slug, payload, featured, published, sort_order')
        .order('sort_order'),
      supabase.from('site_content').select('key, data'),
    ])
      .then(([projRes, contentRes]) => {
        if (cancelled || projRes.error || contentRes.error) return
        const rows = projRes.data ?? []
        if (!rows.length) return // not seeded yet: keep bundled content

        // RLS hides unpublished rows from anon, but an admin session shares
        // this browser client, so filter again here.
        const projects = rows
          .filter((r) => r.published !== false)
          .map((r) => ({ ...(r.payload as Project), slug: r.slug, featured: !!r.featured }))

        const byKey = Object.fromEntries((contentRes.data ?? []).map((r) => [r.key, r.data]))
        setState({
          projects,
          site: { ...defaults.site, ...(byKey.site ?? {}) },
          getexpanded: { ...defaults.getexpanded, ...(byKey.getexpanded ?? {}) },
          contentChannel: { ...defaults.contentChannel, ...(byKey.content_channel ?? {}) },
          liveStats: (byKey.live_stats as LiveStats) ?? null,
          fromCms: true,
        })
      })
      .catch(() => {
        /* network failure: bundled content stands */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}

export const useContent = () => useContext(Ctx)
export const useProjects = () => useContent().projects

export function useProject(slug: string | undefined): Project | undefined {
  const projects = useProjects()
  return slug ? projects.find((p) => p.slug === slug) : undefined
}

export function useNextProject(slug: string): Project {
  const projects = useProjects()
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}

/** GetExpanded stats with the live Discord count spliced over the manual value. */
export function useVentureStats(): { value: string; label: string }[] {
  const { getexpanded, liveStats } = useContent()
  if (!liveStats?.discordMembers) return getexpanded.stats
  return getexpanded.stats.map((s) =>
    /discord/i.test(s.label) ? { ...s, value: String(liveStats.discordMembers) } : s,
  )
}
