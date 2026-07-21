import type { Project } from '../types'

export const toyotaKeyFob: Project = {
  slug: 'toyota-key-fob',
  title: 'Toyota Key Fob',
  tagline: 'Reverse-engineered, remodeled, and 3D printed to fit the original electronics.',
  domain: 'product',
  role: 'Industrial Design, Carleton University',
  tags: ['3D modelling', '3D printing', 'reverse engineering', 'SolidWorks'],
  tier: 2,
  hero: 'fob/hero-print',
  card: 'fob/thumb-press',
  cardVideo: 'fob/bts-print',
  summary: 'From calipers on the original to a printed shell that clicks: a precision CAD and print exercise.',
  blocks: [
    {
      kind: 'text',
      title: 'The exercise',
      body: [
        'Take a real product, measure everything, rebuild it in CAD, and print a shell the original electronics snap back into. It sounds mechanical until the tolerances start arguing. Every wall thickness, boss, and clip on the original Toyota fob exists for a reason, and the print has to honor all of them.',
      ],
    },
    {
      kind: 'media',
      media: 'fob/hero-print',
      caption: 'The printed shell with the original buttons seated.',
      full: true,
    },
    {
      kind: 'grid',
      cols: 3,
      items: [
        { media: 'fob/original', caption: 'The donor: the original Toyota fob' },
        { media: 'fob/parts', caption: 'Printed shell beside the original board' },
        { media: 'fob/thumb-press', caption: 'It clicks, LED and all' },
      ],
    },
    {
      kind: 'process',
      title: 'Process',
      items: [
        { media: 'fob/render-cad', caption: 'The rebuilt CAD model' },
        { media: 'fob/render', caption: 'Final render' },
        { media: 'fob/shell', caption: 'Shell interior, clips and bosses reproduced' },
        { media: 'fob/bts-print', caption: 'Off the print bed' },
      ],
    },
    {
      kind: 'text',
      title: 'Why it’s here',
      body: [
        'This is craft under constraint: no styling decisions to hide behind, just measurement, modeling discipline, and print tuning until the parts click home. The kind of practice that makes the flashier projects possible.',
      ],
    },
  ],
}
