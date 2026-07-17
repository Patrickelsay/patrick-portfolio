import type { Project } from '../types'

export const waterActivityFootwear: Project = {
  slug: 'water-activity-footwear',
  title: 'Water Activity Footwear',
  tagline: 'Thesis project. Footwear engineered for the one place shoes aren’t welcome.',
  year: '2019',
  domain: 'product',
  role: 'Final Thesis, Industrial Design, Carleton University',
  tags: ['footwear design', 'thesis', 'user research', 'prototyping'],
  tier: 2,
  hero: 'waf/hero-annotated',
  card: 'waf/render-three-quarter',
  summary: 'A year-long thesis on water park injuries — from NEISS injury statistics to a wearable, packable water shoe.',
  featured: true,
  blocks: [
    {
      kind: 'text',
      title: 'The problem nobody packs for',
      body: [
        'Water parks are built for bare feet, and bare feet pay for it. Hot decks, abrasive grip surfaces, dropped-weight injuries, and infections — the injury statistics (NEISS data) backed up what every parent already knows from carrying a limping kid to first aid.',
        'My thesis question: can you design footwear people will actually keep on at a water park — something that survives slides and wave pools, protects where injuries actually happen, and doesn’t feel like wearing a rule.',
      ],
    },
    {
      kind: 'media',
      media: 'waf/wow-header',
      caption: 'Worn on deck — the final concept at the water park.',
      full: true,
    },
    {
      kind: 'text',
      title: 'Research first',
      body: [
        'I mapped mechanisms of injury against body zones — slips, falls, cuts, and burns concentrate on the sole and the ankle. Market teardown next: water shoes exist, but they’re either flimsy pool socks or rigid sandals that come off on the first slide. The gap was a secure, drainable, barely-there shoe built around how people actually move through a park.',
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'waf/sketch-feet', caption: 'Foot studies — where skin meets surface' },
        { media: 'waf/sketch-lineup', caption: 'Ideation lineup, diverging before converging' },
      ],
    },
    {
      kind: 'process',
      title: 'Process',
      intro: 'Sketch, test, repeat — the loop ran all year.',
      items: [
        { media: 'waf/sketch-concept', caption: 'Annotated direction — securing the heel' },
        { media: 'waf/sketch-board-dark', caption: 'Digital concept board, injury zones mapped' },
        { media: 'waf/process-board', caption: 'The full process board' },
      ],
    },
    {
      kind: 'text',
      title: 'The design',
      body: [
        'The final concept is a wrap-structure water shoe: a perforated, quick-drain sole with a flexible upper that locks around the ankle so slides can’t strip it off. It packs flat, dries fast, and reads as swimwear, not safety equipment — because gear people are embarrassed to wear is gear that stays in the bag.',
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'waf/render-side', caption: 'Side profile — drain channels and grip zones' },
        { media: 'waf/render-worn', caption: 'The ankle wrap, worn' },
        { media: 'waf/render-three-quarter', caption: 'Three-quarter view, final materials' },
        { media: 'waf/render-open', caption: 'Open structure — packs flat, dries fast' },
      ],
    },
    {
      kind: 'media',
      media: 'waf/hero-annotated',
      caption: 'The final model, annotated — strap, quarter, midsole, outsole.',
      full: true,
    },
    {
      kind: 'text',
      title: 'Delivered',
      body: [
        'Full thesis documentation: research report, design specification document, poster, and presentation boards, plus the physical model. Five years of the program, condensed into one product.',
      ],
    },
    {
      kind: 'media',
      media: 'waf/poster-board',
      caption: 'The thesis poster — research to final design on one board.',
    },
  ],
}
