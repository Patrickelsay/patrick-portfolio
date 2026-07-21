export type Domain = 'marketing' | 'ux' | 'product' | 'ventures' | 'creative'

/**
 * A media reference is either a pipeline asset id from media-index.json
 * ("wobbly/topdisplay-hero") or an admin-uploaded file described inline.
 */
export type MediaRef = string | { url: string; w: number; h: number; video?: boolean }

/**
 * Case studies render through a block sequence. Media fields hold ids from
 * media-index.json (images and videos share one namespace; the index's
 * `video: true` flag decides which player renders).
 */
export type Block =
  | { kind: 'text'; title?: string; body: string[] }
  | { kind: 'media'; media: MediaRef; caption?: string; full?: boolean }
  | { kind: 'grid'; items: { media: MediaRef; caption?: string }[]; cols?: 2 | 3 | 4 }
  | { kind: 'memo'; text: string }
  | { kind: 'list'; title?: string; items: string[]; ordered?: boolean }
  | { kind: 'meta'; items: { label: string; value: string }[] }
  | { kind: 'sequence'; media: MediaRef; caption?: string }
  | { kind: 'stats'; items: { value: string; label: string }[] }
  | {
      kind: 'process'
      title?: string
      intro?: string
      items: { media: MediaRef; caption?: string }[]
    }
  | { kind: 'compare'; before: MediaRef; after: MediaRef; beforeLabel?: string; afterLabel?: string }

export interface Project {
  slug: string
  title: string
  tagline: string
  /** omitted when the source material doesn't evidence a date */
  year?: string
  domain: Domain
  role: string
  context?: string
  tags: string[]
  /** 1 = authored case study, 2 = drafted narrative, 3 = gallery */
  tier: 1 | 2 | 3
  /** media ref for the case-study hero (dark room) */
  hero: MediaRef
  /** media ref for grid cards; defaults to hero when omitted */
  card?: MediaRef
  /** optional video (id or upload) that plays on card hover */
  cardVideo?: MediaRef
  summary: string
  /** featured on the home page selected-work grid */
  featured?: boolean
  blocks: Block[]
}
