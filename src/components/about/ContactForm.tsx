import { useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { site } from '../../content/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Posts to Supabase `contact_messages` when configured; otherwise the
 * submit becomes a prefilled mailto so the form never dead-ends.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const { pathname } = useLocation()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || !email || !message) return

    if (!supabase) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Portfolio contact from ${name}`,
      )}&body=${body}`
      return
    }

    setStatus('sending')
    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message, source_page: pathname })
    if (error) {
      setStatus('error')
    } else {
      setStatus('sent')
      form.reset()
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-sent" role="status">
        <p className="contact-sent-title">Got it — talk soon.</p>
        <p className="prose">
          Your message landed. I read everything myself; expect a reply within a couple of days.
        </p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-row">
        <label className="contact-field">
          <span className="meta">Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className="contact-field">
          <span className="meta">Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <label className="contact-field">
        <span className="meta">What are we making?</span>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={4000}
          placeholder="A project, a collab, a question — anything goes."
        />
      </label>
      {status === 'error' && (
        <p className="contact-error" role="alert">
          That didn’t send. Try again, or email me directly at{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      <button className="btn-fill" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send it'}
      </button>
    </form>
  )
}
