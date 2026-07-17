import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Seo } from '../components/shell/Seo'
import { Reveal } from '../components/shell/Reveal'
import { SmartImage } from '../components/media/SmartImage'
import { VideoPlayer } from '../components/media/VideoPlayer'
import { ProjectCard } from '../components/work/ProjectCard'
import { projects } from '../content/projects'
import { site } from '../content/site'
import { getExpanded } from '../content/getexpanded'
import '../styles/home.css'

const EASE = [0.16, 1, 0.3, 1] as const

function HeroLine({ text, delay }: { text: string; delay: number }) {
  const reduced = useReducedMotion()
  if (reduced) return <span className="hero-line">{text}</span>
  return (
    <span className="hero-line-mask">
      <motion.span
        className="hero-line"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export default function Home() {
  const reduced = useReducedMotion()
  const featured = projects.filter((p) => p.featured)

  return (
    <>
      <Seo image="/media/about/portrait-og.jpg" />

      {/* -- hero ---------------------------------------------------------- */}
      <section className="hero container">
        <div className="hero-text">
          <h1 className="hero-name">
            <HeroLine text="Patrick" delay={0.05} />
            <HeroLine text="El-Sayegh" delay={0.16} />
          </h1>
          <motion.div
            className="hero-roles"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            {site.hero.roles.map((role) => (
              <span key={role} className="hero-role">
                {role}
              </span>
            ))}
          </motion.div>
          <motion.p
            className="hero-statement prose"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          >
            {site.hero.statement}
          </motion.p>
        </div>
        <motion.div
          className="hero-portrait"
          initial={reduced ? false : { clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.05, delay: 0.3, ease: EASE }}
        >
          <SmartImage
            id="about/creator"
            alt="Patrick, camera in hand, mid-shoot at the studio table"
            sizes="(max-width: 900px) 90vw, 40vw"
            priority
          />
        </motion.div>
      </section>

      {/* -- selected work -------------------------------------------------- */}
      <section className="selected container" aria-labelledby="selected-heading">
        <Reveal>
          <div className="selected-head">
            <h2 id="selected-heading">Selected work</h2>
            <Link to="/work" className="selected-all">
              Everything →
            </Link>
          </div>
        </Reveal>
        <div className="selected-grid">
          {featured.slice(0, 2).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className={`cell cell-${i}`}>
              <ProjectCard project={p} large={i === 0} />
            </Reveal>
          ))}
          <Reveal delay={0.12} className="cell cell-reel">
            <Link to="/content" className="reel-teaser" aria-label="Watch the content reel wall">
              <VideoPlayer id="reels/viral-film-day" ambient label="" />
              <span className="reel-teaser-label">
                <strong>The content engine</strong>
                <span>105 reels, 10 industries → watch</span>
              </span>
            </Link>
          </Reveal>
          {featured.slice(2).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className={`cell cell-${i + 3}`}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* -- venture spotlight ---------------------------------------------- */}
      <section className="venture" data-room="dark" aria-labelledby="venture-heading">
        <div className="container venture-inner">
          <Reveal className="venture-text">
            <p className="meta venture-live">
              <span className="live-dot" aria-hidden="true" /> Active venture
            </p>
            <h2 id="venture-heading">{getExpanded.name}</h2>
            <p className="prose venture-tagline">{getExpanded.tagline}</p>
            <dl className="venture-stats">
              {getExpanded.stats.map((s) => (
                <div key={s.label}>
                  <dt className="meta">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            <Link to="/ventures" className="btn-ghost">
              Inside the build →
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="venture-media">
            <SmartImage
              id="getexpanded/landing"
              alt="The GetExpanded directory landing page — find airway orthodontists near you"
              sizes="(max-width: 900px) 90vw, 46vw"
            />
          </Reveal>
        </div>
      </section>

      {/* -- about teaser ---------------------------------------------------- */}
      <section className="teaser container">
        <Reveal className="teaser-media">
          <SmartImage
            id="about/portrait"
            alt="Portrait of Patrick El-Sayegh"
            sizes="(max-width: 900px) 60vw, 30vw"
          />
        </Reveal>
        <Reveal delay={0.08} className="teaser-text">
          <h2>The person behind it</h2>
          <p className="prose">{site.aboutTeaser}</p>
          <Link to="/about" className="btn-ghost">
            About me →
          </Link>
        </Reveal>
      </section>
    </>
  )
}
