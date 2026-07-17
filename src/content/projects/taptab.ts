import type { Project } from '../types'

export const taptab: Project = {
  slug: 'taptab',
  title: 'TapTab',
  tagline: 'Open a tab, split the bill, walk out — no waving at waiters.',
  domain: 'ux',
  role: 'UX Design (team of 3), Carleton University',
  tags: ['UX research', 'mobile app', 'user flows', 'branding'],
  tier: 2,
  hero: 'taptab/hero-brand',
  card: 'taptab/hero-brand',
  summary: 'A bar-tab app concept — connect to the venue, order, split payments, and leave without the line-up.',
  featured: true,
  blocks: [
    {
      kind: 'text',
      title: 'The friction',
      body: [
        'Long waits and unpaid orders are the two failure modes of every busy bar. TapTab attacks both: connect to the server, start a tab, order from the phone, split the payment with the table, and auto-pay on the way out. The venue keeps its flow; the customer keeps their night.',
      ],
    },
    {
      kind: 'media',
      media: 'taptab/hero-brand',
      caption: 'Brand system — Comfortaa wordmark, teal gradient, component sheet.',
      full: true,
    },
    {
      kind: 'text',
      title: 'Process, condensed',
      body: [
        'This was an end-to-end UX intro project done properly: problem definition from real bar-night pain points, task flows and storyboards, low-fi wireframes tested and revised, then a branded hi-fi prototype. Three flows carried the concept — close a tab, split payment, and leave-and-auto-pay.',
      ],
    },
    {
      kind: 'grid',
      cols: 3,
      items: [
        { media: 'taptab/board-intro', caption: 'The pitch — hero screens and objective' },
        { media: 'taptab/board-flows', caption: 'Problem definition, task flows, wireframes' },
        { media: 'taptab/board-storyboards', caption: 'Storyboards for the three core flows' },
      ],
    },
    {
      kind: 'text',
      title: 'What stuck with me',
      body: [
        'Testing killed our favorite screen — the elaborate menu browser — because people at a bar don’t browse, they re-order. The final flows are shorter than the first wireframes in every path. That lesson (users compress, designers expand) shows up in everything I’ve shipped since.',
      ],
    },
  ],
}
