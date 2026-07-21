/**
 * Admin CRUD helpers. Every call requires an authenticated session
 * (RLS rejects writes otherwise) and a configured Supabase client.
 */
import type { Project, MediaRef } from '../content/types'
import { supabase } from './supabase'

export interface ProjectRow {
  id: string
  slug: string
  payload: Omit<Project, 'featured'>
  domain: string
  tier: number
  published: boolean
  featured: boolean
  sort_order: number
  updated_at: string
}

function db() {
  if (!supabase) throw new Error('Supabase is not configured')
  return supabase
}

export async function listAllProjects(): Promise<ProjectRow[]> {
  const { data, error } = await db()
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data as ProjectRow[]
}

export async function getProject(slug: string): Promise<ProjectRow | null> {
  const { data, error } = await db().from('projects').select('*').eq('slug', slug).maybeSingle()
  if (error) throw error
  return data as ProjectRow | null
}

export async function saveProjectPayload(
  slug: string,
  payload: Omit<Project, 'featured'>,
): Promise<void> {
  const { error } = await db()
    .from('projects')
    .update({ payload, domain: payload.domain, tier: payload.tier })
    .eq('slug', slug)
  if (error) throw error
}

export async function setProjectKnobs(
  slug: string,
  knobs: Partial<Pick<ProjectRow, 'published' | 'featured' | 'sort_order'>>,
): Promise<void> {
  const { error } = await db().from('projects').update(knobs).eq('slug', slug)
  if (error) throw error
}

export async function createProject(slug: string, title: string, domain: string): Promise<void> {
  const payload: Omit<Project, 'featured'> = {
    slug,
    title,
    tagline: 'One line on what this project is.',
    domain: domain as Project['domain'],
    role: '',
    tags: [],
    tier: 2,
    hero: '',
    summary: '',
    blocks: [{ kind: 'text', title: 'The brief', body: ['Tell the story.'] }],
  }
  const { data: rows, error: maxErr } = await db()
    .from('projects')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
  if (maxErr) throw maxErr
  const nextOrder = (rows?.[0]?.sort_order ?? 0) + 10
  const { error } = await db().from('projects').insert({
    slug,
    payload,
    domain,
    tier: 2,
    published: false,
    featured: false,
    sort_order: nextOrder,
  })
  if (error) throw error
}

export async function deleteProject(slug: string): Promise<void> {
  const { error } = await db().from('projects').delete().eq('slug', slug)
  if (error) throw error
}

/** swap sort_order with the neighbor above/below */
export async function moveProject(rows: ProjectRow[], slug: string, dir: -1 | 1): Promise<void> {
  const i = rows.findIndex((r) => r.slug === slug)
  const j = i + dir
  if (i < 0 || j < 0 || j >= rows.length) return
  await setProjectKnobs(rows[i].slug, { sort_order: rows[j].sort_order })
  await setProjectKnobs(rows[j].slug, { sort_order: rows[i].sort_order })
}

/* ---- site_content -------------------------------------------------------- */

export async function getSiteContent<T>(key: string): Promise<T | null> {
  const { data, error } = await db().from('site_content').select('data').eq('key', key).maybeSingle()
  if (error) throw error
  return (data?.data as T) ?? null
}

export async function saveSiteContent(key: string, data: unknown): Promise<void> {
  const { error } = await db().from('site_content').upsert({ key, data })
  if (error) throw error
}

/* ---- uploads ------------------------------------------------------------- */

/** Uploads to the site-media bucket and returns an inline MediaRef. */
export async function uploadMedia(file: File): Promise<MediaRef> {
  const client = db()
  const clean = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-')
  const path = `${Date.now()}-${clean}`
  const { error } = await client.storage.from('site-media').upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) throw error
  const { data } = client.storage.from('site-media').getPublicUrl(path)
  const url = data.publicUrl

  if (file.type.startsWith('video/')) {
    const dims = await videoDims(file)
    return { url, ...dims, video: true }
  }
  const dims = await imageDims(file)
  return { url, ...dims }
}

function imageDims(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ w: img.naturalWidth, h: img.naturalHeight })
      URL.revokeObjectURL(img.src)
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

function videoDims(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const v = document.createElement('video')
    v.preload = 'metadata'
    v.onloadedmetadata = () => {
      resolve({ w: v.videoWidth, h: v.videoHeight })
      URL.revokeObjectURL(v.src)
    }
    v.onerror = reject
    v.src = URL.createObjectURL(file)
  })
}
