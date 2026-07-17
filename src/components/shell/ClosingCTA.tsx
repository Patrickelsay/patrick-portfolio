import { Link, useLocation } from 'react-router-dom'
import { site } from '../../content/site'

/**
 * Every page ends here — the dark-room closing statement.
 * Direct landings still get identity and an exit.
 */
export function ClosingCTA() {
  const { pathname } = useLocation()
  const year = new Date().getFullYear()

  return (
    <footer className="closing" data-room="dark">
      <div className="container closing-inner">
        <p className="closing-kicker meta">Currently: scaling GetExpanded · open to collabs</p>
        <h2 className="closing-heading">{site.cta.heading}</h2>
        <p className="closing-sub prose">{site.cta.sub}</p>
        <div className="closing-actions">
          <a className="btn-fill" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {pathname !== '/about' && (
            <Link className="btn-ghost" to="/about">
              More about me
            </Link>
          )}
        </div>
      </div>
      <div className="container closing-base">
        <span className="meta">© {year} Patrick El-Sayegh</span>
        <span className="meta">Ottawa, Canada</span>
        <span className="meta">
          <Link to="/work" className="closing-base-link">
            Work
          </Link>{' '}
          ·{' '}
          <Link to="/content" className="closing-base-link">
            Content
          </Link>{' '}
          ·{' '}
          <Link to="/ventures" className="closing-base-link">
            Ventures
          </Link>
        </span>
      </div>
    </footer>
  )
}
