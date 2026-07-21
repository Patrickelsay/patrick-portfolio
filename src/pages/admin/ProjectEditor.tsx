import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Block, Project } from '../../content/types'
import {
  getProject,
  saveProjectPayload,
  setProjectKnobs,
  type ProjectRow,
} from '../../lib/admin-api'
import { Field, TextInput, TextArea, ParagraphsArea, RowsEditor, MediaInput } from './fields'

type Payload = Omit<Project, 'featured'>

const BLOCK_KINDS: { kind: Block['kind']; label: string }[] = [
  { kind: 'text', label: 'Text section' },
  { kind: 'media', label: 'Single image / video' },
  { kind: 'grid', label: 'Image grid' },
  { kind: 'memo', label: 'Memo (italic aside)' },
  { kind: 'list', label: 'Bullet / numbered list' },
  { kind: 'meta', label: 'Label + value strip' },
  { kind: 'sequence', label: 'Wide sequence image' },
  { kind: 'stats', label: 'Big number stats' },
  { kind: 'process', label: 'Process strip (dark)' },
  { kind: 'compare', label: 'Before / after' },
]

function emptyBlock(kind: Block['kind']): Block {
  switch (kind) {
    case 'text':
      return { kind, title: '', body: [''] }
    case 'media':
      return { kind, media: '', caption: '' }
    case 'grid':
      return { kind, cols: 2, items: [{ media: '', caption: '' }] }
    case 'memo':
      return { kind, text: '' }
    case 'list':
      return { kind, items: [''] }
    case 'meta':
      return { kind, items: [{ label: '', value: '' }] }
    case 'sequence':
      return { kind, media: '', caption: '' }
    case 'stats':
      return { kind, items: [{ value: '', label: '' }] }
    case 'process':
      return { kind, title: 'Process', items: [{ media: '', caption: '' }] }
    case 'compare':
      return { kind, before: '', after: '', beforeLabel: 'Before', afterLabel: 'After' }
  }
}

function MediaItemsEditor({
  items,
  onChange,
}: {
  items: { media: Block extends never ? never : Project['hero']; caption?: string }[]
  onChange: (items: { media: Project['hero']; caption?: string }[]) => void
}) {
  return (
    <div className="admin-media-items">
      {items.map((item, i) => (
        <div key={i} className="admin-media-item">
          <MediaInput value={item.media} onChange={(m) => {
            const next = items.slice()
            next[i] = { ...item, media: m ?? '' }
            onChange(next)
          }} />
          <input
            value={item.caption ?? ''}
            placeholder="Caption"
            onChange={(e) => {
              const next = items.slice()
              next[i] = { ...item, caption: e.target.value }
              onChange(next)
            }}
          />
          <span className="admin-rows-tools">
            <button disabled={i === 0} aria-label="Move up" onClick={() => {
              const next = items.slice()
              ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
              onChange(next)
            }}>↑</button>
            <button disabled={i === items.length - 1} aria-label="Move down" onClick={() => {
              const next = items.slice()
              ;[next[i + 1], next[i]] = [next[i], next[i + 1]]
              onChange(next)
            }}>↓</button>
            <button className="admin-danger" aria-label="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</button>
          </span>
        </div>
      ))}
      <button className="btn-ghost admin-add" onClick={() => onChange([...items, { media: '', caption: '' }])}>
        Add image
      </button>
    </div>
  )
}

function BlockEditor({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  switch (block.kind) {
    case 'text':
      return (
        <>
          <Field label="Section title (optional)">
            <TextInput value={block.title ?? ''} onChange={(v) => onChange({ ...block, title: v })} />
          </Field>
          <Field label="Paragraphs (separate with a blank line)">
            <ParagraphsArea value={block.body} onChange={(v) => onChange({ ...block, body: v })} />
          </Field>
        </>
      )
    case 'media':
    case 'sequence':
      return (
        <>
          <Field label={block.kind === 'media' ? 'Image / video' : 'Wide image'}>
            <MediaInput value={block.media} onChange={(m) => onChange({ ...block, media: m ?? '' })} />
          </Field>
          <Field label="Caption">
            <TextInput value={block.caption ?? ''} onChange={(v) => onChange({ ...block, caption: v })} />
          </Field>
          {block.kind === 'media' && (
            <label className="admin-check">
              <input
                type="checkbox"
                checked={!!block.full}
                onChange={(e) => onChange({ ...block, full: e.target.checked })}
              />
              Full width
            </label>
          )}
        </>
      )
    case 'grid':
      return (
        <>
          <Field label="Columns">
            <select
              value={block.cols ?? 2}
              onChange={(e) => onChange({ ...block, cols: Number(e.target.value) as 2 | 3 | 4 })}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </Field>
          <MediaItemsEditor items={block.items} onChange={(items) => onChange({ ...block, items })} />
        </>
      )
    case 'memo':
      return (
        <Field label="Memo text">
          <TextArea value={block.text} onChange={(v) => onChange({ ...block, text: v })} rows={3} />
        </Field>
      )
    case 'list':
      return (
        <>
          <Field label="List title (optional)">
            <TextInput value={block.title ?? ''} onChange={(v) => onChange({ ...block, title: v })} />
          </Field>
          <Field label="Items (one per line)">
            <textarea
              rows={Math.max(3, block.items.length + 1)}
              value={block.items.join('\n')}
              onChange={(e) =>
                onChange({ ...block, items: e.target.value.split('\n').filter((l) => l.trim()) })
              }
            />
          </Field>
          <label className="admin-check">
            <input
              type="checkbox"
              checked={!!block.ordered}
              onChange={(e) => onChange({ ...block, ordered: e.target.checked })}
            />
            Numbered
          </label>
        </>
      )
    case 'meta':
      return (
        <RowsEditor
          rows={block.items as unknown as Record<string, string>[] as { label: string; value: string }[]}
          onChange={(items) => onChange({ ...block, items })}
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'value', label: 'Value', wide: true },
          ]}
          makeEmpty={() => ({ label: '', value: '' })}
        />
      )
    case 'stats':
      return (
        <RowsEditor
          rows={block.items}
          onChange={(items) => onChange({ ...block, items })}
          fields={[
            { key: 'value', label: 'Big value' },
            { key: 'label', label: 'Label', wide: true },
          ]}
          makeEmpty={() => ({ value: '', label: '' })}
        />
      )
    case 'process':
      return (
        <>
          <Field label="Strip title">
            <TextInput value={block.title ?? ''} onChange={(v) => onChange({ ...block, title: v })} />
          </Field>
          <Field label="Intro line (optional)">
            <TextInput value={block.intro ?? ''} onChange={(v) => onChange({ ...block, intro: v })} />
          </Field>
          <MediaItemsEditor items={block.items} onChange={(items) => onChange({ ...block, items })} />
        </>
      )
    case 'compare':
      return (
        <>
          <Field label="Before">
            <MediaInput value={block.before} onChange={(m) => onChange({ ...block, before: m ?? '' })} />
          </Field>
          <Field label="Before label">
            <TextInput value={block.beforeLabel ?? ''} onChange={(v) => onChange({ ...block, beforeLabel: v })} />
          </Field>
          <Field label="After">
            <MediaInput value={block.after} onChange={(m) => onChange({ ...block, after: m ?? '' })} />
          </Field>
          <Field label="After label">
            <TextInput value={block.afterLabel ?? ''} onChange={(v) => onChange({ ...block, afterLabel: v })} />
          </Field>
        </>
      )
    default:
      return null
  }
}

export function ProjectEditor() {
  const { slug } = useParams()
  const [row, setRow] = useState<ProjectRow | null>(null)
  const [payload, setPayload] = useState<Payload | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [addKind, setAddKind] = useState<Block['kind']>('text')

  useEffect(() => {
    if (!slug) return
    getProject(slug)
      .then((r) => {
        setRow(r)
        setPayload(r?.payload ?? null)
      })
      .catch((e) => setError(String(e.message ?? e)))
  }, [slug])

  if (error && !payload) {
    return (
      <div className="container admin-page">
        <p className="contact-error">{error}</p>
      </div>
    )
  }
  if (!row || !payload) {
    return (
      <div className="container admin-page">
        <p className="meta">Loading…</p>
      </div>
    )
  }

  const set = (patch: Partial<Payload>) => {
    setPayload({ ...payload, ...patch })
    setStatus('idle')
  }

  const setBlock = (i: number, b: Block) => {
    const blocks = payload.blocks.slice()
    blocks[i] = b
    set({ blocks })
  }

  const moveBlock = (i: number, dir: -1 | 1) => {
    const blocks = payload.blocks.slice()
    const j = i + dir
    if (j < 0 || j >= blocks.length) return
    ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
    set({ blocks })
  }

  async function save() {
    if (!payload || !slug) return
    setStatus('saving')
    setError(null)
    try {
      await saveProjectPayload(slug, payload)
      setStatus('saved')
    } catch (e) {
      setError(String((e as Error).message ?? e))
      setStatus('error')
    }
  }

  return (
    <div className="container admin-page">
      <div className="admin-head">
        <h1>{payload.title || row.slug}</h1>
        <div className="admin-head-actions">
          <Link className="btn-ghost" to={`/work/${row.slug}`} target="_blank">
            View live ↗
          </Link>
          <button className="btn-fill" onClick={save} disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : 'Save changes'}
          </button>
        </div>
      </div>
      {error && <p className="contact-error">{error}</p>}
      <p className="meta admin-hint">
        <Link to="/admin">← All projects</Link> · visibility and order are managed from the
        projects list.{' '}
        <button
          className="admin-inline-toggle"
          onClick={async () => {
            await setProjectKnobs(row.slug, { published: !row.published })
            setRow({ ...row, published: !row.published })
          }}
        >
          {row.published ? 'Visible (click to hide)' : 'Hidden (click to publish)'}
        </button>
      </p>

      <section className="admin-card">
        <h2>Basics</h2>
        <div className="admin-grid-2">
          <Field label="Title">
            <TextInput value={payload.title} onChange={(v) => set({ title: v })} />
          </Field>
          <Field label="Year (blank to hide)">
            <TextInput value={payload.year ?? ''} onChange={(v) => set({ year: v || undefined })} />
          </Field>
        </div>
        <Field label="Tagline (hero subtitle)">
          <TextInput value={payload.tagline} onChange={(v) => set({ tagline: v })} />
        </Field>
        <Field label="Summary (cards + search preview)">
          <TextArea value={payload.summary} onChange={(v) => set({ summary: v })} rows={2} />
        </Field>
        <div className="admin-grid-2">
          <Field label="Domain">
            <select value={payload.domain} onChange={(e) => set({ domain: e.target.value as Payload['domain'] })}>
              <option value="product">Product design</option>
              <option value="ux">UX / UI</option>
              <option value="creative">Creative</option>
              <option value="marketing">Content</option>
              <option value="ventures">Ventures</option>
            </select>
          </Field>
          <Field label="Tier (1 authored, 2 narrative, 3 gallery)">
            <select value={payload.tier} onChange={(e) => set({ tier: Number(e.target.value) as 1 | 2 | 3 })}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </Field>
        </div>
        <Field label="Role line">
          <TextInput value={payload.role} onChange={(v) => set({ role: v })} />
        </Field>
        <Field label="Context line (optional)">
          <TextInput value={payload.context ?? ''} onChange={(v) => set({ context: v || undefined })} />
        </Field>
        <Field label="Tags (comma separated)">
          <TextInput
            value={payload.tags.join(', ')}
            onChange={(v) => set({ tags: v.split(',').map((t) => t.trim()).filter(Boolean) })}
          />
        </Field>
      </section>

      <section className="admin-card">
        <h2>Imagery</h2>
        <Field label="Hero (case study top)">
          <MediaInput value={payload.hero} onChange={(m) => set({ hero: m ?? '' })} />
        </Field>
        <Field label="Card image (grids; defaults to hero)">
          <MediaInput value={payload.card} onChange={(m) => set({ card: m })} allowEmpty />
        </Field>
        <Field label="Card hover video (optional)">
          <MediaInput value={payload.cardVideo} onChange={(m) => set({ cardVideo: m })} allowEmpty />
        </Field>
      </section>

      <section className="admin-card">
        <h2>Sections</h2>
        {payload.blocks.map((block, i) => (
          <details key={i} className="admin-block" open={payload.blocks.length < 4}>
            <summary>
              <span className="admin-block-kind">{BLOCK_KINDS.find((k) => k.kind === block.kind)?.label}</span>
              <span className="meta admin-block-preview">
                {'title' in block && block.title
                  ? block.title
                  : 'text' in block
                    ? (block as { text: string }).text.slice(0, 48)
                    : ''}
              </span>
              <span className="admin-rows-tools">
                <button disabled={i === 0} aria-label="Move section up" onClick={(e) => { e.preventDefault(); moveBlock(i, -1) }}>↑</button>
                <button disabled={i === payload.blocks.length - 1} aria-label="Move section down" onClick={(e) => { e.preventDefault(); moveBlock(i, 1) }}>↓</button>
                <button
                  className="admin-danger"
                  aria-label="Delete section"
                  onClick={(e) => {
                    e.preventDefault()
                    if (confirm('Delete this section?')) set({ blocks: payload.blocks.filter((_, j) => j !== i) })
                  }}
                >
                  ✕
                </button>
              </span>
            </summary>
            <div className="admin-block-body">
              <BlockEditor block={block} onChange={(b) => setBlock(i, b)} />
            </div>
          </details>
        ))}
        <div className="admin-addblock">
          <select value={addKind} onChange={(e) => setAddKind(e.target.value as Block['kind'])}>
            {BLOCK_KINDS.map((k) => (
              <option key={k.kind} value={k.kind}>
                {k.label}
              </option>
            ))}
          </select>
          <button className="btn-ghost" onClick={() => set({ blocks: [...payload.blocks, emptyBlock(addKind)] })}>
            Add section
          </button>
        </div>
      </section>

      <div className="admin-savebar">
        <button className="btn-fill" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : 'Save changes'}
        </button>
        {status === 'saved' && <span className="meta">Live after the next page load.</span>}
      </div>
    </div>
  )
}
