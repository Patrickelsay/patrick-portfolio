import { useState, type FormEvent } from 'react'
import { supabase } from '../../lib/supabase'

export function Login() {
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!supabase) return
    const data = new FormData(e.currentTarget)
    setBusy(true)
    setError(null)
    const { error: err } = await supabase.auth.signInWithPassword({
      email: String(data.get('email')),
      password: String(data.get('password')),
    })
    setBusy(false)
    if (err) setError(err.message)
  }

  return (
    <div className="admin" data-room="dark">
      <div className="container admin-login">
        <h1>
          Admin<span className="wordmark-dot">.</span>
        </h1>
        <p className="meta">Sign in to manage projects, stats, and copy.</p>
        <form onSubmit={onSubmit} className="admin-login-form">
          <label className="contact-field">
            <span className="meta">Email</span>
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label className="contact-field">
            <span className="meta">Password</span>
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error && (
            <p className="contact-error" role="alert">
              {error}
            </p>
          )}
          <button className="btn-fill" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
