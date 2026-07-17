import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../../content/site'

/** Nav links roll up on hover — the duplicate-label slide from the reference site. */
function RollLabel({ text }: { text: string }) {
  return (
    <span className="roll" aria-hidden="true">
      <span className="roll-track">
        <span>{text}</span>
        <span>{text}</span>
      </span>
    </span>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
    <header className="site-header" data-room={open ? 'dark' : undefined}>
      <div className="site-header-bar container">
        <Link to="/" className="wordmark" aria-label="Patrick El-Sayegh — home">
          PE<span className="wordmark-dot">.</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {site.nav.map((item) => (
            <NavLink key={item.to} to={item.to} className="site-nav-link">
              <span className="visually-hidden">{item.label}</span>
              <RollLabel text={item.label} />
            </NavLink>
          ))}
          <a className="site-nav-cta" href={`mailto:${site.email}`}>
            {site.cta.action}
          </a>
        </nav>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

    </header>

    {/* outside the header: its backdrop-filter would otherwise become this
        fixed panel's containing block and clamp it to the 64px bar */}
    <div id="mobile-menu" className="mobile-menu" data-open={open} data-room="dark">
      <nav aria-label="Mobile">
        {site.nav.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="mobile-menu-link"
            style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
          >
            {item.label}
          </NavLink>
        ))}
        <a
          className="mobile-menu-link mobile-menu-mail"
          href={`mailto:${site.email}`}
          style={{ transitionDelay: open ? `${80 + site.nav.length * 50}ms` : '0ms' }}
        >
          {site.email}
        </a>
      </nav>
    </div>
    </>
  )
}
