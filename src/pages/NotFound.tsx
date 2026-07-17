import { Link } from 'react-router-dom'
import { Seo } from '../components/shell/Seo'

export default function NotFound() {
  return (
    <section className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      <Seo title="Not found" description="This page tipped off the bridge." />
      <h1 style={{ fontSize: 'var(--text-display)' }}>404</h1>
      <p className="prose" style={{ marginTop: 'var(--space-s)', color: 'var(--muted)', fontSize: 'var(--text-lg)' }}>
        This page tipped off the bridge. Gravity takes the win.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-s)', marginTop: 'var(--space-l)' }}>
        <Link className="btn-fill" to="/work">
          See the work
        </Link>
        <Link className="btn-ghost" to="/">
          Home
        </Link>
      </div>
    </section>
  )
}
