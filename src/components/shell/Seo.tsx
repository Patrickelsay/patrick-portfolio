import { useEffect } from 'react'
import { site } from '../../content/site'

interface Props {
  title?: string
  description?: string
  /** absolute-path og image, e.g. /media/wobbly/topdisplay-hero-og.jpg */
  image?: string | null
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function Seo({ title, description, image }: Props) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : site.title
    document.title = fullTitle
    const desc = description ?? site.description
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:type', 'website')
    if (image) setMeta('property', 'og:image', new URL(image, window.location.origin).href)
  }, [title, description, image])
  return null
}
