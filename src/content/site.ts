import type { Domain } from './types'

export const site = {
  name: 'Patrick El-Sayegh',
  title: 'Patrick El-Sayegh — Content, Design & Ventures',
  description:
    'Portfolio of Patrick El-Sayegh: short-form content and marketing, UX/UI, industrial product design, and the ventures in between.',
  email: 'patrick.elsayegh@gmail.com',
  hero: {
    /* distilled from about-me-portfolio.md — roles, not adjectives */
    roles: ['Content & Marketing', 'UX / UI', 'Product Design', 'Founder'],
    statement:
      'I make things that move people — short-form content with real client results, products designed from research to model, and a venture I’m scaling right now.',
  },
  aboutTeaser:
    'Cofounder of GetExpanded, content creator, and Carleton industrial design grad. Creativity paired with a business-first systems mindset — I think cinematically and build like an operator.',
  cta: {
    heading: 'Let’s make something people feel.',
    sub: 'Client work, collabs, or just stuck and need momentum — my inbox is open.',
    action: 'Reach out',
  },
  nav: [
    { to: '/work', label: 'Work' },
    { to: '/content', label: 'Content' },
    { to: '/ventures', label: 'Ventures' },
    { to: '/about', label: 'About' },
  ],
}

export const domains: { key: Domain | 'all'; label: string }[] = [
  { key: 'all', label: 'Everything' },
  { key: 'product', label: 'Product Design' },
  { key: 'ux', label: 'UX / UI' },
  { key: 'creative', label: 'Creative' },
]

/** Domain lens intros — from the about-me file's domain headers (condensed). */
export const domainIntros: Record<string, string> = {
  product:
    'Five years of industrial design at Carleton — ideation, sketching, 3D CAD, and the full process from research to final model. The foundation under all of it: design is problem solving.',
  ux: 'UX/UI came through building my own ventures — a CRM platform, GetExpanded’s constant iteration, client projects. The core question never changes: how do you make the interaction so simple it feels invisible?',
  creative:
    'The drawing, branding, and packaging practice that keeps the eye sharp — the work behind the work.',
}
