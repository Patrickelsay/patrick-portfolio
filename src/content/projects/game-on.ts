import type { Project } from '../types'

export const gameOn: Project = {
  slug: 'game-on',
  title: 'Game On',
  tagline: 'Find your next game, and the people to play it with.',
  domain: 'ux',
  role: 'UX/UI, Adobe Creative Jam entry',
  tags: ['UI design', 'Adobe XD', 'design sprint', 'social'],
  tier: 2,
  hero: 'gameon/hero-launch',
  card: 'gameon/discovery',
  summary: 'A Creative Jam sprint: a gamer-matching app with discovery, profiles, badges, and a friends-nearby radar.',
  blocks: [
    {
      kind: 'text',
      title: 'The sprint',
      body: [
        'Adobe Creative Jams are a design sprint with a stopwatch: a brief, a few days, and a working prototype at the end. Ours was Game On: an app that matches gamers by platform, genre, and play style, then surfaces people nearby to play with.',
      ],
    },
    {
      kind: 'media',
      media: 'gameon/hero-launch',
      caption: 'Launch and login. The wordmark set the arcade tone.',
      full: true,
    },
    {
      kind: 'grid',
      cols: 3,
      items: [
        { media: 'gameon/platforms', caption: 'Onboarding: pick your platforms' },
        { media: 'gameon/discovery', caption: 'Game discovery, popular worldwide' },
        { media: 'gameon/discovery-detail', caption: 'Title cards with play-style tags' },
        { media: 'gameon/friends-nearby', caption: 'The radar: friends nearby' },
        { media: 'gameon/profile', caption: 'Profile with challenges' },
        { media: 'gameon/badges', caption: 'Badges, platforms, and Gamer DNA' },
      ],
    },
    {
      kind: 'text',
      title: 'The idea that carried it',
      body: [
        '“Gamer DNA”, a profile strip that encodes what you play, how you play, and when, turned matching from a filter form into an identity. People fill out identities; they abandon forms.',
      ],
    },
  ],
}
