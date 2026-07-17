import { Link } from 'react-router-dom'
import { useRef } from 'react'
import type { Project } from '../../content/types'
import { SmartImage } from '../media/SmartImage'
import { isVideo, posterSrc, videoSrc } from '../../lib/media'

interface Props {
  project: Project
  large?: boolean
}

const domainLabel: Record<string, string> = {
  product: 'Product design',
  ux: 'UX / UI',
  creative: 'Creative',
  marketing: 'Content',
  ventures: 'Venture',
}

/**
 * Grid card. Media leads; text sits under it in the shell voice.
 * Cards with a cardVideo play it muted on hover/focus.
 */
export function ProjectCard({ project, large }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardMedia = project.card ?? project.hero
  const hoverVideo = project.cardVideo && videoSrc(project.cardVideo)

  const play = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    videoRef.current?.play().catch(() => {})
  }
  const stop = () => {
    videoRef.current?.pause()
    if (videoRef.current) videoRef.current.currentTime = 0
  }

  return (
    <Link
      to={`/work/${project.slug}`}
      className={`project-card${large ? ' project-card-large' : ''}`}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <span className="project-card-media">
        {isVideo(cardMedia) ? (
          <img src={posterSrc(cardMedia)} alt="" loading="lazy" />
        ) : (
          <SmartImage
            id={cardMedia}
            alt=""
            sizes={large ? '(max-width: 900px) 100vw, 66vw' : '(max-width: 700px) 100vw, 33vw'}
          />
        )}
        {hoverVideo && (
          <video
            ref={videoRef}
            className="project-card-video"
            src={hoverVideo}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
        )}
      </span>
      <span className="project-card-text">
        <span className="project-card-title">{project.title}</span>
        <span className="project-card-sub meta">
          {domainLabel[project.domain]}
          {project.year ? ` · ${project.year}` : ''}
        </span>
        <span className="project-card-tagline">{project.tagline}</span>
      </span>
    </Link>
  )
}
