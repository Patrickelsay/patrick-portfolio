/** Small shared form controls for the admin editors. */
import { useId, useRef, useState, type ReactNode } from 'react'
import type { MediaRef } from '../../content/types'
import { mediaIndex, isUpload, isVideo, posterSrc, imageSrc } from '../../lib/media'
import { uploadMedia } from '../../lib/admin-api'

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="contact-field admin-field">
      <span className="meta">{label}</span>
      {children}
    </label>
  )
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
}

export function TextArea({
  value,
  onChange,
  rows = 4,
}: {
  value: string
  onChange: (v: string) => void
  rows?: number
}) {
  return <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
}

/** paragraphs <-> textarea separated by blank lines */
export function ParagraphsArea({
  value,
  onChange,
}: {
  value: string[]
  onChange: (v: string[]) => void
}) {
  return (
    <textarea
      rows={Math.max(4, value.length * 3)}
      value={value.join('\n\n')}
      onChange={(e) =>
        onChange(
          e.target.value
            .split(/\n{2,}/)
            .map((p) => p.trim())
            .filter(Boolean),
        )
      }
    />
  )
}

/** generic editor for arrays of small objects (stats, roster, meta rows…) */
export function RowsEditor<T extends Record<string, string>>({
  rows,
  onChange,
  fields,
  addLabel = 'Add row',
  makeEmpty,
}: {
  rows: T[]
  onChange: (rows: T[]) => void
  fields: { key: keyof T & string; label: string; wide?: boolean }[]
  addLabel?: string
  makeEmpty: () => T
}) {
  return (
    <div className="admin-rows">
      {rows.map((row, i) => (
        <div key={i} className="admin-rows-row">
          {fields.map((f) => (
            <input
              key={f.key}
              className={f.wide ? 'admin-rows-wide' : undefined}
              value={row[f.key] ?? ''}
              placeholder={f.label}
              aria-label={f.label}
              onChange={(e) => {
                const next = rows.slice()
                next[i] = { ...row, [f.key]: e.target.value }
                onChange(next)
              }}
            />
          ))}
          <span className="admin-rows-tools">
            <button
              aria-label="Move up"
              disabled={i === 0}
              onClick={() => {
                const next = rows.slice()
                ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
                onChange(next)
              }}
            >
              ↑
            </button>
            <button
              aria-label="Move down"
              disabled={i === rows.length - 1}
              onClick={() => {
                const next = rows.slice()
                ;[next[i + 1], next[i]] = [next[i], next[i + 1]]
                onChange(next)
              }}
            >
              ↓
            </button>
            <button
              className="admin-danger"
              aria-label="Remove"
              onClick={() => onChange(rows.filter((_, j) => j !== i))}
            >
              ✕
            </button>
          </span>
        </div>
      ))}
      <button className="btn-ghost admin-add" onClick={() => onChange([...rows, makeEmpty()])}>
        {addLabel}
      </button>
    </div>
  )
}

export function mediaThumb(ref: MediaRef | undefined | ''): string | null {
  if (!ref) return null
  if (isUpload(ref)) return ref.video ? null : ref.url
  if (!mediaIndex[ref]) return null
  return isVideo(ref) ? posterSrc(ref) : imageSrc(ref, 480)
}

/**
 * Media picker: type a pipeline asset id (with autocompletion over
 * media-index) or upload a new file to Supabase storage.
 */
export function MediaInput({
  value,
  onChange,
  allowEmpty,
}: {
  value: MediaRef | undefined | ''
  onChange: (v: MediaRef | undefined) => void
  allowEmpty?: boolean
}) {
  const listId = useId()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const thumb = mediaThumb(value)

  return (
    <div className="admin-media">
      <span className="admin-media-thumb">
        {thumb ? (
          <img src={thumb} alt="" />
        ) : (
          <span className="meta">{isUpload(value || '') ? 'video' : 'none'}</span>
        )}
      </span>
      <div className="admin-media-controls">
        {isUpload(value || '') ? (
          <span className="meta admin-media-url">{(value as { url: string }).url.split('/').pop()}</span>
        ) : (
          <input
            list={listId}
            value={(value as string) ?? ''}
            placeholder="asset id, e.g. wobbly/render-hero"
            onChange={(e) => onChange(e.target.value || (allowEmpty ? undefined : ''))}
          />
        )}
        <datalist id={listId}>
          {Object.keys(mediaIndex).map((id) => (
            <option key={id} value={id} />
          ))}
        </datalist>
        <span className="admin-media-buttons">
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          >
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
          {isUpload(value || '') && (
            <button type="button" onClick={() => onChange(allowEmpty ? undefined : '')}>
              Clear
            </button>
          )}
        </span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/mp4"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (!file) return
            setUploading(true)
            setError(null)
            try {
              onChange(await uploadMedia(file))
            } catch (err) {
              setError(String((err as Error).message ?? err))
            } finally {
              setUploading(false)
              e.target.value = ''
            }
          }}
        />
        {error && <span className="contact-error meta">{error}</span>}
      </div>
    </div>
  )
}
