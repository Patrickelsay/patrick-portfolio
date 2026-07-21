import type { Project } from '../types'

export const edgeLighting: Project = {
  slug: 'edge-lighting',
  title: 'EDGE',
  tagline: 'A stacked-chevron wall sconce that throws light like a sunrise.',
  year: '2018',
  domain: 'product',
  role: 'Industrial Design, Carleton University',
  tags: ['lighting design', 'CAD rendering', 'model making'],
  tier: 2,
  hero: 'edge/hero-render',
  card: 'edge/hero-render',
  summary: 'Three wooden chevrons, LEDs in the valleys: a fixture designed around the light it hides.',
  blocks: [
    {
      kind: 'text',
      title: 'Light you never see directly',
      body: [
        'EDGE is a wall-mounted LED fixture built from three stacked wooden chevrons. The LEDs sit in the valleys, firing upward against the wood so all you ever see is the glow: warm light washing out of each fold like a contained sunrise.',
        'The chevron stack solves the sconce problem honestly: glare-free light, sculptural presence when it’s off, and a form simple enough to read from across the room.',
      ],
    },
    {
      kind: 'media',
      media: 'edge/hero-render',
      caption: 'The official render: walnut grain, concrete wall, lights on.',
      full: true,
    },
    {
      kind: 'media',
      media: 'edge/context-room',
      caption: 'In context: off, it holds the wall as an object.',
    },
    {
      kind: 'text',
      title: 'Delivered',
      body: [
        'Technical drawings, a physical model, and the full render set. The project ran from concept sketch to buildable documentation.',
      ],
    },
  ],
}
