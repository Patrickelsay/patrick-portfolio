import { useEffect, useState } from 'react'
import { getSiteContent, saveSiteContent } from '../../lib/admin-api'
import type { SiteCopy, ContentChannelData, LiveStats } from '../../lib/content-store'
import { site as staticSite } from '../../content/site'
import { getExpanded as staticGE } from '../../content/getexpanded'
import {
  reels as staticReels,
  contentStats as staticStats,
  clientRoster as staticRoster,
  remoteShowcase as staticRemote,
  instagramPortfolio as staticIG,
} from '../../content/content-channel'
import { Field, TextInput, TextArea, ParagraphsArea, RowsEditor } from './fields'

type GE = typeof staticGE

function SaveButton({ onSave }: { onSave: () => Promise<void> }) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [err, setErr] = useState<string | null>(null)
  return (
    <div className="admin-savebar">
      <button
        className="btn-fill"
        disabled={state === 'saving'}
        onClick={async () => {
          setState('saving')
          setErr(null)
          try {
            await onSave()
            setState('saved')
          } catch (e) {
            setErr(String((e as Error).message ?? e))
            setState('error')
          }
        }}
      >
        {state === 'saving' ? 'Saving…' : state === 'saved' ? 'Saved ✓' : 'Save'}
      </button>
      {err && <span className="contact-error meta">{err}</span>}
    </div>
  )
}

export function SiteDataEditor() {
  const [siteCopy, setSiteCopy] = useState<SiteCopy | null>(null)
  const [ge, setGE] = useState<GE | null>(null)
  const [channel, setChannel] = useState<ContentChannelData | null>(null)
  const [live, setLive] = useState<LiveStats | null>(null)

  useEffect(() => {
    getSiteContent<SiteCopy>('site').then((d) =>
      setSiteCopy(d ?? { hero: staticSite.hero, aboutTeaser: staticSite.aboutTeaser, cta: staticSite.cta }),
    )
    getSiteContent<GE>('getexpanded').then((d) => setGE(d ?? staticGE))
    getSiteContent<ContentChannelData>('content_channel').then((d) =>
      setChannel(
        d ?? {
          stats: staticStats,
          roster: staticRoster,
          reels: staticReels,
          remoteShowcase: staticRemote,
          instagramPortfolio: staticIG,
        },
      ),
    )
    getSiteContent<LiveStats>('live_stats').then(setLive)
  }, [])

  if (!siteCopy || !ge || !channel) {
    return (
      <div className="container admin-page">
        <p className="meta">Loading…</p>
      </div>
    )
  }

  return (
    <div className="container admin-page">
      <div className="admin-head">
        <h1>Site data</h1>
      </div>
      <p className="meta admin-hint">
        Each card saves separately. Changes are live on the next page load; no rebuild needed.
      </p>

      <section className="admin-card">
        <h2>Home & footer copy</h2>
        <Field label="Hero roles (comma separated)">
          <TextInput
            value={siteCopy.hero.roles.join(', ')}
            onChange={(v) =>
              setSiteCopy({
                ...siteCopy,
                hero: { ...siteCopy.hero, roles: v.split(',').map((r) => r.trim()).filter(Boolean) },
              })
            }
          />
        </Field>
        <Field label="Hero statement">
          <TextArea
            value={siteCopy.hero.statement}
            onChange={(v) => setSiteCopy({ ...siteCopy, hero: { ...siteCopy.hero, statement: v } })}
            rows={3}
          />
        </Field>
        <Field label="About teaser (home page)">
          <TextArea value={siteCopy.aboutTeaser} onChange={(v) => setSiteCopy({ ...siteCopy, aboutTeaser: v })} rows={3} />
        </Field>
        <div className="admin-grid-2">
          <Field label="Footer CTA heading">
            <TextInput value={siteCopy.cta.heading} onChange={(v) => setSiteCopy({ ...siteCopy, cta: { ...siteCopy.cta, heading: v } })} />
          </Field>
          <Field label="Footer CTA button label">
            <TextInput value={siteCopy.cta.action} onChange={(v) => setSiteCopy({ ...siteCopy, cta: { ...siteCopy.cta, action: v } })} />
          </Field>
        </div>
        <Field label="Footer CTA subline">
          <TextInput value={siteCopy.cta.sub} onChange={(v) => setSiteCopy({ ...siteCopy, cta: { ...siteCopy.cta, sub: v } })} />
        </Field>
        <SaveButton onSave={() => saveSiteContent('site', siteCopy)} />
      </section>

      <section className="admin-card">
        <h2>GetExpanded</h2>
        {live?.fetchedAt && (
          <p className="meta">
            Discord auto-count: {live.discordMembers} members (updated {new Date(live.fetchedAt).toLocaleString()}).
            It overrides the manual Discord stat below wherever it renders.
          </p>
        )}
        <div className="admin-grid-2">
          <Field label="Live site URL">
            <TextInput value={ge.url} onChange={(v) => setGE({ ...ge, url: v })} />
          </Field>
          <Field label="Status line">
            <TextInput value={ge.status} onChange={(v) => setGE({ ...ge, status: v })} />
          </Field>
        </div>
        <Field label="Tagline">
          <TextInput value={ge.tagline} onChange={(v) => setGE({ ...ge, tagline: v })} />
        </Field>
        <Field label="Role line">
          <TextInput value={ge.role} onChange={(v) => setGE({ ...ge, role: v })} />
        </Field>
        <Field label="What it is (paragraphs, blank line between)">
          <ParagraphsArea value={ge.what} onChange={(v) => setGE({ ...ge, what: v })} />
        </Field>
        <Field label="Live cadence line">
          <TextInput value={ge.liveCadence} onChange={(v) => setGE({ ...ge, liveCadence: v })} />
        </Field>
        <h3 className="admin-sub">Traction numbers</h3>
        <RowsEditor
          rows={ge.stats}
          onChange={(stats) => setGE({ ...ge, stats })}
          fields={[
            { key: 'value', label: 'Value (e.g. 441K)' },
            { key: 'label', label: 'Label', wide: true },
          ]}
          addLabel="Add stat"
          makeEmpty={() => ({ value: '', label: '' })}
        />
        <SaveButton onSave={() => saveSiteContent('getexpanded', ge)} />
      </section>

      <section className="admin-card">
        <h2>Content page</h2>
        <Field label="Instagram portfolio URL">
          <TextInput
            value={channel.instagramPortfolio}
            onChange={(v) => setChannel({ ...channel, instagramPortfolio: v })}
          />
        </Field>
        <h3 className="admin-sub">Stats row</h3>
        <RowsEditor
          rows={channel.stats}
          onChange={(stats) => setChannel({ ...channel, stats })}
          fields={[
            { key: 'value', label: 'Value' },
            { key: 'label', label: 'Label', wide: true },
          ]}
          addLabel="Add stat"
          makeEmpty={() => ({ value: '', label: '' })}
        />
        <h3 className="admin-sub">Client roster</h3>
        <RowsEditor
          rows={channel.roster}
          onChange={(roster) => setChannel({ ...channel, roster })}
          fields={[
            { key: 'name', label: 'Client', wide: true },
            { key: 'industry', label: 'Industry' },
          ]}
          addLabel="Add client"
          makeEmpty={() => ({ name: '', industry: '' })}
        />
        <h3 className="admin-sub">Reels wall</h3>
        <p className="meta">
          The id is a transcoded video id (e.g. reels/auto-toyota). Lane must be one of: personal,
          client, podcast.
        </p>
        <RowsEditor
          rows={channel.reels as unknown as Record<string, string>[]}
          onChange={(reels) =>
            setChannel({ ...channel, reels: reels as unknown as ContentChannelData['reels'] })
          }
          fields={[
            { key: 'id', label: 'Video id' },
            { key: 'title', label: 'Title', wide: true },
            { key: 'client', label: 'Client' },
            { key: 'lane', label: 'Lane' },
            { key: 'tag', label: 'Tag' },
          ]}
          addLabel="Add reel"
          makeEmpty={() => ({ id: '', title: '', client: '', lane: 'client', tag: '' })}
        />
        <SaveButton onSave={() => saveSiteContent('content_channel', channel)} />
      </section>
    </div>
  )
}
