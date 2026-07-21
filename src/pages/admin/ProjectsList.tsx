import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  listAllProjects,
  setProjectKnobs,
  moveProject,
  createProject,
  deleteProject,
  type ProjectRow,
} from '../../lib/admin-api'
import { posterSrc, imageSrc, isUpload, isVideo, mediaIndex } from '../../lib/media'
import type { MediaRef } from '../../content/types'

function thumbSrc(ref: MediaRef | undefined): string | null {
  if (!ref) return null
  if (isUpload(ref)) return ref.video ? null : ref.url
  if (!mediaIndex[ref]) return null
  return isVideo(ref) ? posterSrc(ref) : imageSrc(ref, 480)
}

export function ProjectsList() {
  const [rows, setRows] = useState<ProjectRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const reload = useCallback(() => {
    listAllProjects().then(setRows).catch((e) => setError(String(e.message ?? e)))
  }, [])

  useEffect(reload, [reload])

  async function act(fn: () => Promise<void>) {
    setBusy(true)
    setError(null)
    try {
      await fn()
      reload()
    } catch (e) {
      setError(String((e as Error).message ?? e))
    } finally {
      setBusy(false)
    }
  }

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const slug = String(data.get('slug')).trim()
    const title = String(data.get('title')).trim()
    const domain = String(data.get('domain'))
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setError('Slug must be lowercase letters, numbers, and hyphens only.')
      return
    }
    await act(() => createProject(slug, title, domain))
    setShowNew(false)
  }

  if (!rows) {
    return (
      <div className="container admin-page">
        {error ? <p className="contact-error">{error}</p> : <p className="meta">Loading projects…</p>}
      </div>
    )
  }

  return (
    <div className="container admin-page">
      <div className="admin-head">
        <h1>Projects</h1>
        <button className="btn-fill" onClick={() => setShowNew(!showNew)}>
          {showNew ? 'Cancel' : 'New project'}
        </button>
      </div>
      <p className="meta admin-hint">
        Order here is the public display order. Hidden projects stay editable but never render for
        visitors. Featured projects appear in the home page's Selected Work grid.
      </p>
      {error && <p className="contact-error">{error}</p>}

      {showNew && (
        <form className="admin-new" onSubmit={onCreate}>
          <label className="contact-field">
            <span className="meta">Slug (URL: /work/&lt;slug&gt;)</span>
            <input name="slug" required placeholder="my-new-project" pattern="[a-z0-9-]+" />
          </label>
          <label className="contact-field">
            <span className="meta">Title</span>
            <input name="title" required placeholder="My New Project" />
          </label>
          <label className="contact-field">
            <span className="meta">Domain</span>
            <select name="domain" defaultValue="product">
              <option value="product">Product design</option>
              <option value="ux">UX / UI</option>
              <option value="creative">Creative</option>
              <option value="marketing">Content</option>
              <option value="ventures">Ventures</option>
            </select>
          </label>
          <button className="btn-fill" type="submit" disabled={busy}>
            Create (starts hidden)
          </button>
        </form>
      )}

      <ul className="admin-list">
        {rows.map((row, i) => {
          const thumb = thumbSrc(row.payload.card ?? row.payload.hero)
          return (
            <li key={row.slug} className="admin-row" data-hidden={!row.published}>
              <span className="admin-row-thumb">
                {thumb ? <img src={thumb} alt="" loading="lazy" /> : <span className="meta">no image</span>}
              </span>
              <span className="admin-row-main">
                <Link to={`/admin/project/${row.slug}`} className="admin-row-title">
                  {row.payload.title}
                </Link>
                <span className="meta">
                  {row.domain} · tier {row.tier} · /work/{row.slug}
                  {!row.published && ' · HIDDEN'}
                </span>
              </span>
              <span className="admin-row-actions">
                <button
                  disabled={busy || i === 0}
                  onClick={() => act(() => moveProject(rows, row.slug, -1))}
                  aria-label={`Move ${row.payload.title} up`}
                >
                  ↑
                </button>
                <button
                  disabled={busy || i === rows.length - 1}
                  onClick={() => act(() => moveProject(rows, row.slug, 1))}
                  aria-label={`Move ${row.payload.title} down`}
                >
                  ↓
                </button>
                <button
                  className="admin-toggle"
                  aria-pressed={row.featured}
                  disabled={busy}
                  onClick={() => act(() => setProjectKnobs(row.slug, { featured: !row.featured }))}
                  title="Featured on the home page"
                >
                  ★
                </button>
                <button
                  className="admin-toggle admin-toggle-wide"
                  aria-pressed={row.published}
                  disabled={busy}
                  onClick={() => act(() => setProjectKnobs(row.slug, { published: !row.published }))}
                >
                  {row.published ? 'Visible' : 'Hidden'}
                </button>
                <button
                  className="admin-danger"
                  disabled={busy}
                  onClick={() => {
                    if (confirm(`Delete "${row.payload.title}" permanently? This cannot be undone.`))
                      act(() => deleteProject(row.slug))
                  }}
                >
                  Delete
                </button>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
