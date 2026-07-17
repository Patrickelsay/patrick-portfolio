import { mediaOrNull, imageSrc, imageSrcSet } from '../../lib/media'

interface Props {
  id: string
  alt: string
  /** the `sizes` attribute; defaults to full-bleed-ish */
  sizes?: string
  className?: string
  /** eager-load + high priority (hero/LCP imagery) */
  priority?: boolean
}

export function SmartImage({ id, alt, sizes = '100vw', className, priority }: Props) {
  const entry = mediaOrNull(id)
  if (!entry) return null
  return (
    <img
      src={imageSrc(id)}
      srcSet={imageSrcSet(id)}
      sizes={sizes}
      width={entry.w}
      height={entry.h}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
    />
  )
}
