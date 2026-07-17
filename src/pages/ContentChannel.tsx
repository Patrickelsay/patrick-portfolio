import { useState } from 'react'
import { Seo } from '../components/shell/Seo'
import { Reveal } from '../components/shell/Reveal'
import { VideoPlayer } from '../components/media/VideoPlayer'
import { reels, contentStats, clientRoster, remoteShowcase } from '../content/content-channel'
import { videoSrc } from '../lib/media'
import '../styles/content.css'

const lanes = [
  { key: 'all', label: 'All reels' },
  { key: 'client', label: 'Client work' },
  { key: 'personal', label: 'Personal brand' },
  { key: 'podcast', label: 'Podcast clips' },
] as const

export default function ContentChannel() {
  const [lane, setLane] = useState<(typeof lanes)[number]['key']>('all')
  const visible = lane === 'all' ? reels : reels.filter((r) => r.lane === lane)
  const showcase = remoteShowcase.filter((v) => videoSrc(v.id))

  return (
    <div data-room="dark" className="channel">
      <Seo
        title="Content"
        description="Short-form content and marketing — reels, client results, and the personal brand engine."
      />

      <header className="channel-head container">
        <h1>
          The content
          <br />
          engine
        </h1>
        <p className="channel-lede prose">
          Content starts with emotion — then execution, delivery, and authenticity. Four years of
          agency work, 30 videos a month at peak, and a personal brand documenting how AI and
          automation multiply all of it.
        </p>
        <dl className="channel-stats">
          {contentStats.map((s) => (
            <div key={s.label}>
              <dd>{s.value}</dd>
              <dt className="meta">{s.label}</dt>
            </div>
          ))}
        </dl>
      </header>

      <section className="reels container" aria-label="Reels wall">
        <div className="reels-filters" role="group" aria-label="Filter reels">
          {lanes.map((l) => (
            <button
              key={l.key}
              className="work-filter"
              aria-pressed={lane === l.key}
              onClick={() => setLane(l.key)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <p className="meta reels-hint">Reels play silently as you scroll — tap one for sound.</p>
        <div className="reels-wall">
          {visible.map((reel, i) => (
            <Reveal key={reel.id} delay={(i % 4) * 0.04} className="reel">
              <VideoPlayer id={reel.id} ambient label={reel.title} className="reel-video" />
              <div className="reel-caption">
                <span className="reel-title">{reel.title}</span>
                <span className="meta">
                  {reel.client ? `${reel.client} · ` : ''}
                  {reel.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="roster container" aria-labelledby="roster-heading">
        <Reveal>
          <h2 id="roster-heading">Brands I’ve grown</h2>
          <p className="prose roster-note">
            Organic short-form strategies across ten industries — filmed, edited, planned, and
            tracked through to leads.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="roster-list">
            {clientRoster.map((c) => (
              <li key={c.name}>
                <span className="roster-name">{c.name}</span>
                <span className="meta">{c.industry}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {showcase.length > 0 && (
        <section className="showcase container" aria-labelledby="showcase-heading">
          <Reveal>
            <h2 id="showcase-heading">The long cuts</h2>
          </Reveal>
          <div className="showcase-grid">
            {showcase.map((v) => (
              <Reveal key={v.id} className="showcase-item">
                <VideoPlayer id={v.id} label={v.title} />
                <p className="meta">{v.title}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
