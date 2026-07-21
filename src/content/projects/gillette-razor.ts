import type { Project } from '../types'

export const gilletteRazor: Project = {
  slug: 'gillette-razor',
  title: 'GlaZor Zero',
  tagline: 'A razor rebuilt around the grip, for the Gillette design competition.',
  year: '2017',
  domain: 'product',
  role: 'Industrial Design, Carleton University, Gillette competition entry',
  tags: ['product design', 'CAD rendering', '3D printing', 'ergonomics'],
  tier: 2,
  hero: 'gillette/hero-ultimate',
  card: 'gillette/hero-ultimate',
  summary: 'A competition razor concept with a rotating ring grip: modeled, rendered, and 3D printed to prove the hold.',
  blocks: [
    {
      kind: 'text',
      title: 'The brief',
      body: [
        'Gillette’s student competition asked for a razor that stands out in the most saturated shelf in the drugstore. My angle: stop restyling the handle and rethink the grip itself.',
        'GlaZor Zero puts a rotating ring at the head. Two fingers through the ring gives you the control of shaving with a fingertip. The handle becomes a reach extender instead of the primary grip.',
      ],
    },
    {
      kind: 'media',
      media: 'gillette/hero-ultimate',
      caption: 'The ultimate shot: carbon body, blue control ring.',
      full: true,
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'gillette/ring-rotate', caption: 'The ring rotates to meet the angle of the stroke' },
        { media: 'gillette/zoom-ring', caption: 'Ring detail: where the fingers actually go' },
        { media: 'gillette/raze-full', caption: 'Full profile' },
        { media: 'gillette/glazor-zero', caption: 'Studio view' },
      ],
    },
    {
      kind: 'process',
      title: 'Process',
      items: [
        { media: 'gillette/sketch-lineup', caption: 'Form language studies: four grip directions' },
        { media: 'gillette/print-model', caption: '3D printed grip test, proving the hold in the hand' },
      ],
    },
    {
      kind: 'text',
      title: 'Presented',
      body: [
        'Delivered as competition boards covering features, function, and process, backed by the printable STL component set. The print test settled the argument the renders couldn’t: the ring grip holds steady through a wet stroke.',
      ],
    },
    {
      kind: 'grid',
      cols: 3,
      items: [
        { media: 'gillette/board-features', caption: 'Features board' },
        { media: 'gillette/board-function', caption: 'Function board' },
        { media: 'gillette/board-process', caption: 'Process board' },
      ],
    },
  ],
}
