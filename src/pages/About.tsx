import { Seo } from '../components/shell/Seo'
import { Reveal } from '../components/shell/Reveal'
import { SmartImage } from '../components/media/SmartImage'
import { ContactForm } from '../components/about/ContactForm'
import { aboutMain, pullQuote, aboutLenses, resumes, btsGallery } from '../content/about'
import { site } from '../content/site'
import '../styles/about.css'

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Cofounder of GetExpanded, content creator, Carleton industrial design grad. The person behind the work."
        image="/media/about/portrait-og.jpg"
      />

      <header className="about-head container">
        <div className="about-head-text">
          <h1>
            So, Patrick
            <br />
            El-Sayegh
          </h1>
          <p className="about-lede prose">{aboutMain[0]}</p>
        </div>
        <Reveal className="about-portrait">
          <SmartImage
            id="about/portrait"
            alt="Patrick El-Sayegh, portrait"
            sizes="(max-width: 900px) 90vw, 38vw"
            priority
          />
        </Reveal>
      </header>

      <section className="about-story container">
        <Reveal className="prose about-story-text">
          {aboutMain.slice(1, 4).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="about-quote" data-room="dark">
          <blockquote>{pullQuote}</blockquote>
        </Reveal>
        <Reveal className="prose about-story-text">
          {aboutMain.slice(4).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      </section>

      <section className="about-lenses container" aria-label="Three lenses">
        {aboutLenses.map((lens, i) => (
          <Reveal key={lens.key} delay={i * 0.05} className="about-lens">
            <h2>{lens.title}</h2>
            <div className="prose">
              {lens.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </Reveal>
        ))}
      </section>

      <section className="about-bts" data-room="dark">
        <div className="container">
          <Reveal>
            <h2>Behind the scenes</h2>
          </Reveal>
          <div className="about-bts-grid">
            {btsGallery.map((item, i) => (
              <Reveal key={item.media} delay={i * 0.05}>
                <figure>
                  <SmartImage id={item.media} alt={item.caption} sizes="(max-width: 700px) 50vw, 25vw" />
                  <figcaption className="meta">{item.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-contact container" id="contact">
        <div className="about-contact-info">
          <Reveal>
            <h2>Say hey</h2>
            <p className="prose">
              Fastest route is email: <a href={`mailto:${site.email}`}>{site.email}</a>. Or use the
              form; it lands in the same place.
            </p>
            <div className="about-resumes">
              <span className="meta">Resumes, by focus:</span>
              <ul>
                {resumes.map((r) => (
                  <li key={r.label}>
                    <a href={r.file} target="_blank" rel="noreferrer">
                      {r.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  )
}
