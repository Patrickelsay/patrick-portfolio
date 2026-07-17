import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/shell/Seo'
import { SmartImage } from '../components/media/SmartImage'
import { BlockRenderer } from '../components/case/BlockRenderer'
import { projectBySlug, nextProject } from '../content/projects'
import { ogImage } from '../lib/media'
import NotFound from './NotFound'
import '../styles/case.css'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = slug ? projectBySlug.get(slug) : undefined
  if (!project) return <NotFound />

  const next = nextProject(project.slug)

  return (
    <article>
      <Seo title={project.title} description={project.summary} image={ogImage(project.hero)} />

      {/* dark-room hero */}
      <header className="case-hero" data-room="dark">
        <div className="container case-hero-inner">
          <div className="case-hero-text">
            <p className="meta case-hero-crumb">
              <Link to="/work">Work</Link> / {project.title}
            </p>
            <h1>{project.title}</h1>
            <p className="case-hero-tagline">{project.tagline}</p>
            <dl className="case-hero-meta">
              <div>
                <dt className="meta">Role</dt>
                <dd>{project.role}</dd>
              </div>
              {project.year && (
                <div>
                  <dt className="meta">Year</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              {project.context && (
                <div>
                  <dt className="meta">Context</dt>
                  <dd>{project.context}</dd>
                </div>
              )}
              <div>
                <dt className="meta">Focus</dt>
                <dd>{project.tags.join(' · ')}</dd>
              </div>
            </dl>
          </div>
          <div className="case-hero-media">
            <SmartImage
              id={project.hero}
              alt={`${project.title} — hero image`}
              sizes="(max-width: 900px) 100vw, 60vw"
              priority
            />
          </div>
        </div>
      </header>

      {/* light reading surface */}
      <div className="case-body container">
        <BlockRenderer blocks={project.blocks} />
      </div>

      <nav className="case-next" data-room="dark" aria-label="Next project">
        <Link to={`/work/${next.slug}`} className="case-next-link container">
          <span className="meta">Next project</span>
          <span className="case-next-title">{next.title}</span>
          <span className="case-next-tagline">{next.tagline}</span>
        </Link>
      </nav>
    </article>
  )
}
