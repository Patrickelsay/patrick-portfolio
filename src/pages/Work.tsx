import { Link, useSearchParams } from 'react-router-dom'
import { Seo } from '../components/shell/Seo'
import { Reveal } from '../components/shell/Reveal'
import { ProjectCard } from '../components/work/ProjectCard'
import { useProjects } from '../lib/content-store'
import { domains, domainIntros } from '../content/site'
import '../styles/work.css'

export default function Work() {
  const [params, setParams] = useSearchParams()
  const projects = useProjects()
  const active = params.get('d') ?? 'all'
  const filtered = active === 'all' ? projects : projects.filter((p) => p.domain === active)
  const intro = domainIntros[active]

  return (
    <>
      <Seo title="Work" description="Product design, UX/UI, and creative work: case studies and galleries." />
      <section className="work-head container">
        <h1>Work</h1>
        <p className="work-lede prose">
          Case studies across product design, UX/UI, and creative, plus the{' '}
          <Link to="/content">content engine</Link> and the{' '}
          <Link to="/ventures">venture I’m building now</Link>.
        </p>
        <div className="work-filters" role="group" aria-label="Filter by domain">
          {domains.map((d) => (
            <button
              key={d.key}
              className="work-filter"
              aria-pressed={active === d.key}
              onClick={() => setParams(d.key === 'all' ? {} : { d: d.key }, { replace: true })}
            >
              {d.label}
            </button>
          ))}
        </div>
        {intro && <p className="work-intro prose">{intro}</p>}
      </section>

      <section className="work-grid-wrap container" aria-live="polite">
        <div className="work-grid">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.05} className={`work-cell work-cell-${i % 6}`}>
              <ProjectCard project={p} large={i % 6 === 0} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
