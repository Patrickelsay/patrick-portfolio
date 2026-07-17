import type { Project } from '../types'

export const lisn: Project = {
  slug: 'lisn',
  title: 'LISN',
  tagline: 'Clip the best moments of any podcast, and share them forward.',
  year: '2021',
  domain: 'ux',
  role: 'Contract UI design — preliminary product design for the LISN team',
  tags: ['UI design', 'mobile app', 'client work', 'app store assets'],
  tier: 2,
  hero: 'lisn/hero-phone',
  card: 'lisn/hero-phone',
  cardVideo: 'lisn/phone-mockup',
  summary: 'Subcontracted preliminary UI for a podcast-clipping app — player, discovery, and the full app-store display set.',
  blocks: [
    {
      kind: 'text',
      title: 'The engagement',
      body: [
        'The LISN team brought me in to design the preliminary UI for their podcast app — the product bet was clipping: let listeners cut the best 60 seconds of an episode and share it as the hook back into the full show.',
      ],
    },
    {
      kind: 'media',
      media: 'lisn/hero-phone',
      caption: 'The player — bold cover art stays the hero.',
      full: true,
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'lisn/screens-display', caption: 'The screen family — discover, play, clip, share' },
        { media: 'lisn/appstore-display', caption: 'App Store display set, final design' },
        { media: 'lisn/display-board', caption: 'Brand board — the LISN mark' },
        { media: 'lisn/hand-mockup', caption: 'In hand' },
      ],
    },
    {
      kind: 'media',
      media: 'lisn/phone-mockup',
      caption: 'Motion mockup — the player in motion.',
    },
    {
      kind: 'text',
      title: 'Working preliminary',
      body: [
        'Preliminary design means giving a team something concrete enough to argue with. The deliverable wasn’t pixel-perfection — it was a visual direction, a screen family, and store-ready displays the founders could put in front of users and investors the same week.',
      ],
    },
  ],
}
