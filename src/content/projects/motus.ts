import type { Project } from '../types'

export const motus: Project = {
  slug: 'motus-shoe-organizer',
  title: 'MOTUS',
  tagline: 'A 2-in-1 shoe organizer bent from a single ribbon of steel.',
  domain: 'product',
  role: 'Industrial Design, Carleton University',
  tags: ['furniture design', 'metal fabrication', 'form study'],
  tier: 2,
  hero: 'motus/hero-display',
  card: 'motus/hero-display',
  cardVideo: 'motus/bts-action',
  summary: 'Organizer flat against the wall, display stand in your hand — one continuous steel form, two jobs.',
  blocks: [
    {
      kind: 'text',
      title: 'One ribbon, two jobs',
      body: [
        'MOTUS started with a constraint I set myself: one continuous material, no fasteners doing the real work, and a form that earns a second function. The result is a folded steel ribbon that organizes a pair flat against the wall — and unfolds into a display stand that presents a single shoe like it’s in a store window.',
      ],
    },
    {
      kind: 'media',
      media: 'motus/hero-display',
      caption: 'Display mode — the shoe floats.',
      full: true,
    },
    {
      kind: 'grid',
      cols: 3,
      items: [
        { media: 'motus/front', caption: 'Held vertical — the full pair' },
        { media: 'motus/fold-sequence', caption: 'The fold sequence, organizer to display' },
        { media: 'motus/side', caption: 'Profile — one bend line does everything' },
      ],
    },
    {
      kind: 'process',
      title: 'Finding the bend',
      intro: 'The form came from dozens of physical studies — wood blocks, then steel test bends, then the full-scale ribbon.',
      items: [
        { media: 'motus/usage-sketch', caption: 'Usage sketches — how hands meet the form' },
        { media: 'motus/wood-studies', caption: 'Wood form studies' },
        { media: 'motus/steel-forms', caption: 'Steel test bends' },
        { media: 'motus/form-lineup', caption: 'The full lineup, pinned against the research wall' },
        { media: 'motus/cad-tri', caption: 'CAD studies — testing the stance' },
        { media: 'motus/bts-action', caption: 'Working the steel' },
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'motus/detail', caption: 'Cork grips, ready position' },
        { media: 'motus/frame-only', caption: 'The empty frame — the bend is the design' },
      ],
    },
    {
      kind: 'text',
      title: 'Why it matters',
      body: [
        'This is the two-in-one obsession that runs through my product work: a fold that adds a function instead of a feature. The steel remembers one bend line, and that line is the whole product.',
      ],
    },
  ],
}
