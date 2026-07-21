import type { Project } from '../types'

export const matrixChair: Project = {
  slug: 'matrix-chair',
  title: 'MATRIX',
  tagline: 'A portable chair that folds flat and carries like a briefcase.',
  domain: 'product',
  role: 'Industrial Design, Carleton University',
  tags: ['furniture design', 'flat-pack', 'plywood', 'steel'],
  tier: 2,
  hero: 'matrix/hero-home',
  card: 'matrix/hero-side',
  cardVideo: 'matrix/user-testing',
  summary: 'Bent plywood and a steel spine: a chair that collapses flat for carrying and springs back for sitting.',
  blocks: [
    {
      kind: 'text',
      title: 'A chair you take with you',
      body: [
        'MATRIX is a portable chair built from two honest materials: a bent plywood shell that gives the seat its spring, and a steel spine that locks the geometry when you sit. Fold the spine, and the whole chair collapses flat enough to carry under an arm.',
      ],
    },
    {
      kind: 'media',
      media: 'matrix/hero-home',
      caption: 'The finished prototype at home: plywood shell, steel leg.',
      full: true,
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'matrix/hero-side', caption: 'Profile view. The cantilever does the comfort' },
        { media: 'matrix/folded-flat', caption: 'Folded flat for transport' },
      ],
    },
    {
      kind: 'process',
      title: 'Built, not just drawn',
      intro: 'From figure sketches to steel bending to plywood forming, the whole chair happened in the workshop.',
      items: [
        { media: 'matrix/sketch-figures', caption: 'Posture studies: how people actually sit' },
        { media: 'matrix/workshop-build', caption: 'Forming the shell' },
        { media: 'matrix/wood-prototype', caption: 'The wood mockup, testing fold geometry' },
        { media: 'matrix/steel-core', caption: 'High-fidelity model, the steel core' },
        { media: 'matrix/user-testing', caption: 'User testing: sit, fold, carry, repeat' },
      ],
    },
    {
      kind: 'text',
      title: 'What it taught me',
      body: [
        'Materials argue back. The plywood wanted a different bend radius than the sketches did, and the steel spine went through three geometries before it stopped racking. Designing the object was half the work. Designing the sequence of folds people could figure out without instructions was the other half.',
      ],
    },
  ],
}
