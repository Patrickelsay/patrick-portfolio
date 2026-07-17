import type { Project } from '../types'

/** Tier 3 — gallery projects: title, context, one-liner, imagery. */

export const munch: Project = {
  slug: 'munch',
  title: 'Munch',
  tagline: 'A community app for foodies who review like they mean it.',
  domain: 'ux',
  role: 'UX/UI exploration',
  tags: ['UI design', 'social', 'branding'],
  tier: 3,
  hero: 'munch/brand',
  summary: 'In-progress UI exploration for a food-review community — bold yellow, bitten-cookie mark, feed-first layouts.',
  blocks: [
    {
      kind: 'text',
      body: [
        'Munch is a working exploration for a social platform where food lovers post honest reviews of what they actually ate. The visual language is appetite-forward: a bitten-cookie mark, ketchup-and-mustard palette, and photo-first feed strips. Shown as-is from the working files — this one’s still cooking.',
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'munch/brand', caption: 'The mark and homepage explorations' },
        { media: 'munch/signin-quiz', caption: 'Sign-in and taste-quiz onboarding' },
        { media: 'munch/profiles', caption: 'Profiles and messaging flows' },
        { media: 'munch/feed-strips', caption: 'Feed strips — the food stays the hero' },
      ],
    },
  ],
}

export const websiteRedesigns: Project = {
  slug: 'website-redesigns',
  title: 'Website Redesigns',
  tagline: 'Client rebrands: a restaurant and a trading dashboard.',
  year: '2021',
  domain: 'ux',
  role: 'Freelance web design',
  tags: ['web design', 'rebrand', 'client work'],
  tier: 3,
  hero: 'webred/ipho-hero',
  cardVideo: 'webred/ws-dashboard',
  summary: 'Two freelance rebuilds — iPho Ottawa’s restaurant site and a stock-trading dashboard concept.',
  blocks: [
    {
      kind: 'text',
      body: [
        'Freelance rebuild work: iPho Vietnamese (Ottawa Byward Market) went from a text-heavy orange template to a photography-led site where the food does the selling. Alongside it, a trading-dashboard rebrand — holdings, performance, and buy/sell flows tightened into one clean card system.',
      ],
    },
    {
      kind: 'compare',
      before: 'webred/ipho-original',
      after: 'webred/ipho-hero',
      beforeLabel: 'Before — the original site',
      afterLabel: 'After — the redesign',
    },
    {
      kind: 'media',
      media: 'webred/ws-dashboard',
      caption: 'The trading dashboard in motion.',
    },
  ],
}

export const princessMargaret: Project = {
  slug: 'princess-margaret-interior',
  title: 'Princess Margaret Hospital',
  tagline: 'Interior renovation study, told in foam-core.',
  domain: 'product',
  role: 'Interior design study, Carleton University',
  tags: ['interior design', 'model making', 'healthcare'],
  tier: 3,
  hero: 'pmh/model-top',
  summary: 'A hospital-interior renovation concept — space planning and material palette, prototyped as physical scale models.',
  blocks: [
    {
      kind: 'text',
      body: [
        'A renovation study for hospital living spaces, worked through the old-fashioned way: foam-core scale models you can look into, move walls in, and argue over. The material palette balances institutional durability against the simple fact that people have to live here on their worst days.',
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'pmh/model-top', caption: 'Plan view — the full unit layout' },
        { media: 'pmh/model-interior', caption: 'Inside the lounge' },
        { media: 'pmh/model-rooms', caption: 'Room studies on the presentation boards' },
        { media: 'pmh/swatches', caption: 'Material palette by room' },
      ],
    },
  ],
}

export const lipPodcast: Project = {
  slug: 'lip-podcast',
  title: 'LIP — Lighter Issue Podcast',
  tagline: 'A full brand system for a podcast that keeps it light.',
  year: '2021',
  domain: 'creative',
  role: 'Brand design & content production',
  tags: ['branding', 'logo design', 'motion graphics', 'podcast'],
  tier: 2,
  hero: 'lip/hero-emblem',
  card: 'lip/rss-red',
  cardVideo: 'lip/motion-intro',
  summary: 'Logo, cover art, RSS artwork, social mockups, and animated intros — a podcast brand built end to end.',
  featured: true,
  blocks: [
    {
      kind: 'text',
      title: 'The whole package',
      body: [
        'LIP needed everything a podcast brand touches: a mark, cover art, RSS artwork, social presence, and motion intros. The identity came out of a design-sprint branding workshop — glossy “lip” script with a lighter flame tucked into the i, red and black doing the heavy lifting.',
      ],
    },
    {
      kind: 'media',
      media: 'lip/hero-emblem',
      caption: 'The cover emblem — gloss on black.',
      full: true,
    },
    {
      kind: 'grid',
      cols: 3,
      items: [
        { media: 'lip/rss-red', caption: 'RSS artwork — the red field' },
        { media: 'lip/rss-zoom', caption: 'Zoom crop for small tiles' },
        { media: 'lip/logo-white', caption: 'The mark, reversed' },
      ],
    },
    {
      kind: 'media',
      media: 'lip/motion-intro',
      caption: 'The animated intro — the mark in motion.',
    },
    {
      kind: 'media',
      media: 'lip/podcast-intro',
      caption: 'Full podcast intro video.',
    },
    {
      kind: 'text',
      body: [
        'Every export in the system — YouTube, Instagram, Twitter, RSS tiles — came from one master file, so the brand survives every crop the platforms throw at it.',
      ],
    },
  ],
}

export const reshiJewelry: Project = {
  slug: 'reshi-jewelry',
  title: 'Reshi Jewellery',
  tagline: 'A monogram built from the jewellery itself.',
  year: '2021',
  domain: 'creative',
  role: 'Logo design',
  tags: ['logo design', 'branding'],
  tier: 3,
  hero: 'reshi/logo-white',
  summary: 'An ornamental RJ monogram for a jewellery brand — the chandelier earring is the logo.',
  blocks: [
    {
      kind: 'text',
      body: [
        'Reshi sells ornate, traditional jewellery — so the mark is one. The RJ monogram sits inside a chandelier-earring silhouette, drawn so the filigree reads at full size and simplifies cleanly when it’s stamped small.',
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'reshi/logo-white', caption: 'Reversed on black' },
        { media: 'reshi/logo-black', caption: 'Positive mark' },
      ],
    },
  ],
}

export const harleyChocolate: Project = {
  slug: 'harley-chocolate',
  title: 'Harley-Davidson Chocolate',
  tagline: 'Packaging study: a chocolate bar with a motor club attitude.',
  domain: 'creative',
  role: 'Packaging design, Carleton University',
  tags: ['packaging', 'graphic design'],
  tier: 3,
  hero: 'harley/board',
  summary: 'A university packaging exercise — Harley-Davidson brand language wrapped around a chocolate bar.',
  blocks: [
    {
      kind: 'text',
      body: [
        'A packaging one-off: take a brand with a fierce visual identity and put it on the least likely product. The bar leans into Harley’s bar-and-shield equity — black, orange, chrome — while the die-line does the real work of making it feel like garage hardware, not candy.',
      ],
    },
    { kind: 'media', media: 'harley/board', caption: 'Final artwork — the die-line, flat.', full: true },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'harley/dieline-stripes', caption: 'Racing-stripe variant' },
        { media: 'harley/logo-studies', caption: 'Bar-and-shield studies' },
      ],
    },
  ],
}

export const sketchbook: Project = {
  slug: 'sketchbook',
  title: 'Sketchbook',
  tagline: 'Footwear studies, Puma concepts, and the pages behind everything else.',
  domain: 'creative',
  role: 'Industrial design sketching',
  tags: ['sketching', 'Procreate', 'footwear', 'ideation'],
  tier: 3,
  hero: 'sketch/puma-render',
  card: 'sketch/feet-study-1',
  summary: 'The drawing practice underneath the product work — digital footwear studies and a Puma concept series.',
  blocks: [
    {
      kind: 'text',
      body: [
        'Sketching is the fastest prototype there is. This is the standing practice behind the product work: anatomy studies of feet and footwear on dark ground, and a Puma footwear-design series that runs from thumbnail lineups to annotated material callouts and full colorway boards.',
      ],
    },
    {
      kind: 'grid',
      cols: 3,
      items: [
        { media: 'sketch/feet-study-1', caption: 'Foot and last studies' },
        { media: 'sketch/feet-study-4', caption: 'Sole geometry' },
        { media: 'sketch/feet-study-6', caption: 'Strap logic' },
      ],
    },
    {
      kind: 'text',
      title: 'Puma series',
      body: [],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'sketch/puma-render', caption: 'Hero concept — strap-lock trail runner' },
        { media: 'sketch/puma-lineup', caption: 'Colorway lineup' },
        { media: 'sketch/puma-materials', caption: 'Annotated materials board' },
        { media: 'sketch/ideation-wall', caption: 'The ideation wall — where every concept starts' },
      ],
    },
    {
      kind: 'media',
      media: 'sketch/desk-bts',
      caption: 'The desk where it happens.',
    },
  ],
}
