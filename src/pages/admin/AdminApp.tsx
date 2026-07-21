import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'
import { Login } from './Login'
import { ProjectsList } from './ProjectsList'
import { ProjectEditor } from './ProjectEditor'
import { SiteDataEditor } from './SiteDataEditor'
import '../../styles/admin.css'

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.title = 'Admin · Patrick El-Sayegh'
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex, nofollow'
    return () => {
      robots?.remove()
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setReady(true)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!supabase) {
    return (
      <div className="admin" data-room="dark">
        <div className="container admin-notice">
          <h1>Admin</h1>
          <p className="prose">
            Supabase isn't configured. Set <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code>, run the CMS migration and seed, then reload.
            Setup steps live in the README.
          </p>
          <Link className="btn-ghost" to="/">
            Back to the site
          </Link>
        </div>
      </div>
    )
  }

  if (!ready) return <div className="admin" data-room="dark" />

  if (!session) return <Login />

  return (
    <div className="admin" data-room="dark">
      <header className="admin-bar">
        <div className="container admin-bar-inner">
          <span className="admin-title">
            Site admin<span className="wordmark-dot">.</span>
          </span>
          <nav className="admin-nav" aria-label="Admin">
            <Link to="/admin">Projects</Link>
            <Link to="/admin/site">Site data</Link>
            <Link to="/" target="_blank">
              View site ↗
            </Link>
            <button onClick={() => supabase!.auth.signOut()}>Sign out</button>
          </nav>
        </div>
      </header>
      <Routes>
        <Route index element={<ProjectsList />} />
        <Route path="project/:slug" element={<ProjectEditor />} />
        <Route path="site" element={<SiteDataEditor />} />
      </Routes>
    </div>
  )
}
