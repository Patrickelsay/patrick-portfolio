import type { Block } from '../../content/types'
import { SmartImage } from '../media/SmartImage'
import { VideoPlayer } from '../media/VideoPlayer'
import { isVideo } from '../../lib/media'
import { Reveal } from '../shell/Reveal'

function MediaAny({ id, alt, sizes }: { id: string; alt: string; sizes?: string }) {
  if (isVideo(id)) return <VideoPlayer id={id} label={alt} />
  return <SmartImage id={id} alt={alt} sizes={sizes} />
}

function Figure({ media, caption, sizes }: { media: string; caption?: string; sizes?: string }) {
  return (
    <figure className="case-figure">
      <MediaAny id={media} alt={caption ?? ''} sizes={sizes} />
      {caption && <figcaption className="meta">{caption}</figcaption>}
    </figure>
  )
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="case-blocks">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'text':
            return (
              <Reveal key={i} className="case-text prose">
                {block.title && <h2>{block.title}</h2>}
                {block.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </Reveal>
            )
          case 'media':
            return (
              <Reveal key={i} className={block.full ? 'case-media-full' : 'case-media'}>
                <Figure media={block.media} caption={block.caption} sizes={block.full ? '100vw' : '(max-width: 900px) 100vw, 72rem'} />
              </Reveal>
            )
          case 'grid':
            return (
              <Reveal key={i} className={`case-grid case-grid-${block.cols ?? 2}`}>
                {block.items.map((item, j) => (
                  <Figure
                    key={j}
                    media={item.media}
                    caption={item.caption}
                    sizes={`(max-width: 700px) 100vw, ${Math.floor(100 / (block.cols ?? 2))}vw`}
                  />
                ))}
              </Reveal>
            )
          case 'memo':
            return (
              <Reveal key={i} className="case-memo">
                <p>{block.text}</p>
              </Reveal>
            )
          case 'list':
            return (
              <Reveal key={i} className="case-list prose">
                {block.title && <h3>{block.title}</h3>}
                {block.ordered ? (
                  <ol>
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul>
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            )
          case 'meta':
            return (
              <Reveal key={i} className="case-meta">
                {block.items.map((item, j) => (
                  <div key={j}>
                    <span className="meta">{item.label}</span>
                    <span className="case-meta-value">{item.value}</span>
                  </div>
                ))}
              </Reveal>
            )
          case 'sequence':
            return (
              <Reveal key={i} className="case-sequence">
                <Figure media={block.media} caption={block.caption} sizes="100vw" />
              </Reveal>
            )
          case 'stats':
            return (
              <Reveal key={i} className="case-stats">
                {block.items.map((s, j) => (
                  <div key={j}>
                    <span className="case-stats-value">{s.value}</span>
                    <span className="meta">{s.label}</span>
                  </div>
                ))}
              </Reveal>
            )
          case 'process':
            return (
              <Reveal key={i} className="case-process" data-room="dark">
                <div className="case-process-head">
                  <h3>{block.title ?? 'Process'}</h3>
                  {block.intro && <p className="prose">{block.intro}</p>}
                </div>
                <div className="case-process-strip" tabIndex={0} role="group" aria-label={`${block.title ?? 'Process'} images`}>
                  {block.items.map((item, j) => (
                    <figure key={j} className="case-process-item">
                      <MediaAny id={item.media} alt={item.caption ?? ''} sizes="360px" />
                      {item.caption && <figcaption className="meta">{item.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </Reveal>
            )
          case 'compare':
            return (
              <Reveal key={i} className="case-compare">
                <figure>
                  <SmartImage id={block.before} alt={block.beforeLabel ?? 'Before'} sizes="(max-width: 700px) 100vw, 50vw" />
                  <figcaption className="meta">{block.beforeLabel ?? 'Before'}</figcaption>
                </figure>
                <figure>
                  <SmartImage id={block.after} alt={block.afterLabel ?? 'After'} sizes="(max-width: 700px) 100vw, 50vw" />
                  <figcaption className="meta">{block.afterLabel ?? 'After'}</figcaption>
                </figure>
              </Reveal>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
