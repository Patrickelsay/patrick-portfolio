import { useEffect, useRef, useState } from 'react'
import type { MediaRef } from '../../content/types'
import { mediaOrNull, posterSrc, videoSrc, isUpload } from '../../lib/media'

interface Props {
  /** pipeline video id or an admin-uploaded { url, w, h, video: true } */
  id: MediaRef
  /** muted loop that plays while in view (reels, ambient clips) */
  ambient?: boolean
  className?: string
  /** accessible label for the video region */
  label?: string
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Poster-first video. Ambient mode autoplays muted while on screen and
 * pauses off screen; standard mode shows controls. Remote-tier videos
 * render nothing when Supabase isn't configured.
 */
export function VideoPlayer({ id, ambient, className, label }: Props) {
  const upload = isUpload(id) ? id : null
  const entry = upload ?? (typeof id === 'string' ? mediaOrNull(id) : null)
  const src = upload ? upload.url : entry && typeof id === 'string' ? videoSrc(id) : null
  const poster = !upload && typeof id === 'string' ? posterSrc(id) : undefined
  const ref = useRef<HTMLVideoElement>(null)
  const [engaged, setEngaged] = useState(false)

  useEffect(() => {
    if (!ambient || !ref.current || prefersReducedMotion()) return
    const el = ref.current
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ambient])

  if (!src || !entry) return null

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      width={entry.w}
      height={entry.h}
      preload="none"
      muted={ambient && !engaged}
      loop={ambient && !engaged}
      playsInline
      controls={!ambient || engaged}
      aria-label={label}
      onClick={() => {
        if (ambient && !engaged) {
          setEngaged(true)
          if (ref.current) {
            ref.current.muted = false
            ref.current.loop = false
            ref.current.currentTime = 0
            ref.current.play().catch(() => {})
          }
        }
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
