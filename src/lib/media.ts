import rawIndex from '../content/media-index.json'

interface MediaEntry {
  w: number
  h: number
  widths?: number[]
  og?: boolean
  video?: boolean
  duration?: number
  remote?: boolean
}

export const mediaIndex = rawIndex as Record<string, MediaEntry>

export function media(id: string): MediaEntry {
  const entry = mediaIndex[id]
  if (!entry) throw new Error(`unknown media id: ${id}`)
  return entry
}

/** tolerant lookup — components skip rendering instead of crashing the page */
export function mediaOrNull(id: string): MediaEntry | null {
  const entry = mediaIndex[id]
  if (!entry && import.meta.env.DEV) console.warn(`unknown media id: ${id}`)
  return entry ?? null
}

export function isVideo(id: string): boolean {
  return !!mediaIndex[id]?.video
}

export function imageSrc(id: string, width?: number): string {
  const entry = media(id)
  const widths = entry.widths ?? []
  const w = width && widths.includes(width) ? width : widths[widths.length - 1]
  return `/media/${id}-${w}.webp`
}

export function imageSrcSet(id: string): string {
  const entry = media(id)
  return (entry.widths ?? []).map((w) => `/media/${id}-${w}.webp ${w}w`).join(', ')
}

export function ogImage(id: string): string | null {
  return media(id).og ? `/media/${id}-og.jpg` : null
}

export function posterSrc(id: string): string {
  return `/media/${id}-poster.jpg`
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined

/** Returns the playable URL, or null for remote videos when Supabase isn't configured. */
export function videoSrc(id: string): string | null {
  const entry = media(id)
  if (!entry.video) return null
  if (entry.remote) {
    if (!SUPABASE_URL) return null
    return `${SUPABASE_URL}/storage/v1/object/public/portfolio-media/${id.replace(/^remote\//, '')}.mp4`
  }
  return `/media/${id}.mp4`
}
