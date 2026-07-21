import { Seo } from '../components/shell/Seo'
import { Reveal } from '../components/shell/Reveal'
import { SmartImage } from '../components/media/SmartImage'
import { VideoPlayer } from '../components/media/VideoPlayer'
import { useContent, useVentureStats } from '../lib/content-store'
import '../styles/ventures.css'

export default function Ventures() {
  const { getexpanded: ge } = useContent()
  const stats = useVentureStats()
  return (
    <div data-room="dark" className="ventures">
      <Seo
        title="Ventures"
        description={`${ge.name}: ${ge.tagline} Co-founded and scaled by Patrick El-Sayegh.`}
        image="/media/getexpanded/landing-og.jpg"
      />

      <header className="ventures-head container">
        <p className="meta venture-live">
          <span className="live-dot" aria-hidden="true" /> {ge.status}
        </p>
        <h1>{ge.name}</h1>
        <p className="ventures-tagline prose">{ge.tagline}</p>
        <div className="ventures-links">
          <a className="btn-fill" href={ge.url} target="_blank" rel="noreferrer">
            Visit the live site ↗
          </a>
          <span className="meta">{ge.role}</span>
        </div>
      </header>

      <Reveal className="ventures-hero container">
        <SmartImage
          id={ge.media.hero}
          alt="GetExpanded: find airway orthodontists and palatal expansion providers near you"
          sizes="(max-width: 900px) 100vw, 80vw"
          priority
        />
      </Reveal>

      <section className="ventures-story container">
        <Reveal className="ventures-what prose">
          <h2>What it is</h2>
          {ge.what.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.08} className="ventures-numbers">
          <h2 className="visually-hidden">Traction</h2>
          <dl>
            {stats.map((s) => (
              <div key={s.label}>
                <dd>{s.value}</dd>
                <dt className="meta">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="meta ventures-numbers-note">Live analytics, July 2026. Real numbers, updated as we grow.</p>
        </Reveal>
      </section>

      <section className="ventures-proof container" aria-label="Inside the build">
        <Reveal className="proof-item proof-wide">
          <VideoPlayer id={ge.media.siteNav} label="Screen recording: navigating the GetExpanded directory" />
          <p className="meta">The directory in motion: search, filter, claim a listing.</p>
        </Reveal>
        <Reveal delay={0.05} className="proof-item">
          <SmartImage id={ge.media.analytics} alt="Google Analytics: 20.8K clicks, 441K impressions over 12 months" sizes="(max-width: 700px) 100vw, 46vw" />
          <p className="meta">Search traffic, trailing 12 months.</p>
        </Reveal>
        <Reveal delay={0.1} className="proof-item">
          <SmartImage id={ge.media.admin} alt="The GetExpanded admin dashboard, 553 total listings" sizes="(max-width: 700px) 100vw, 46vw" />
          <p className="meta">The admin side: listings, claims, submissions.</p>
        </Reveal>
        <Reveal delay={0.05} className="proof-item">
          <SmartImage id={ge.media.discord} alt="The GetExpanded Discord community at 603 members" sizes="(max-width: 700px) 100vw, 46vw" />
          <p className="meta">The community: 603 members and counting.</p>
        </Reveal>
        <Reveal delay={0.1} className="proof-item">
          <SmartImage id={ge.media.collabs[0]} alt="July calendar fully booked with weekly live collabs" sizes="(max-width: 700px) 100vw, 46vw" />
          <p className="meta">{ge.liveCadence}</p>
        </Reveal>
      </section>

      <section className="ventures-clip container">
        <Reveal className="ventures-clip-inner">
          <div className="ventures-clip-video">
            <VideoPlayer id={ge.media.podcastClip} ambient label="Clip: how 3D tech is changing orthodontics" />
          </div>
          <div className="prose">
            <h2>The content flywheel</h2>
            <p>
              Every Friday we go live with a different airway expert, then clip the best moments
              into short-form across platforms. The directory feeds the content; the content feeds
              the directory. That loop is the growth engine, and it’s the same system I build for
              clients.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
