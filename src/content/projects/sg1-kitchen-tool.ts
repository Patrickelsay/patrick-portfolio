import type { Project } from '../types'

export const sg1KitchenTool: Project = {
  slug: 'sg1-kitchen-tool',
  title: 'SG1: 3-in-1 Kitchen Tool',
  tagline: 'Pot, grill, and slow cooker in one countertop footprint.',
  year: '2017',
  domain: 'product',
  role: 'Industrial Design, Carleton University',
  tags: ['appliance design', 'CAD', 'prototyping', 'interface design'],
  tier: 2,
  hero: 'sg1/hero-interface',
  card: 'sg1/context-counter',
  summary: 'A multi-function countertop appliance that bundles three cooking modes without complicating any of them.',
  featured: true,
  blocks: [
    {
      kind: 'text',
      title: 'Do more with less counter',
      body: [
        'Small kitchens force a choice: the pot, the grill, or the slow cooker. Pick two, store one. The SG1 brief was the constraint I love most: bundle functions in a way that actually improves the experience instead of complicating it.',
        'The answer is a vertical stack. A deep pot body, a reversible grill plate that doubles as the lid, and a slow-cook mode driven by one rotating interface ring. Three appliances, one footprint, no mode buried in a menu.',
      ],
    },
    {
      kind: 'media',
      media: 'sg1/hero-interface',
      caption: 'The interface ring: temperature on one side, time on the other, mode by rotation.',
      full: true,
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'sg1/context-counter', caption: 'At home on the counter' },
        { media: 'sg1/context-kitchen', caption: 'In context, it reads as cookware, not gadget' },
        { media: 'sg1/grill-open', caption: 'Grill mode: the lid flips into a waffle-grill plate' },
        { media: 'sg1/pot-closed', caption: 'Closed for slow cooking' },
      ],
    },
    {
      kind: 'process',
      title: 'From cardboard to appearance model',
      intro: 'The form was tested rough first, with cardboard and Tim Hortons box lids, before committing to the appearance model.',
      items: [
        { media: 'sg1/proto-cardboard', caption: 'Cardboard rig, proving the hinge and handle geometry' },
        { media: 'sg1/proto-white', caption: 'White model, for a form and proportion check' },
        { media: 'sg1/proto-lift', caption: 'Testing the plate lift, one hand, no burns' },
        { media: 'sg1/proto-appearance', caption: 'The appearance model, with tambour door and rotating dials' },
      ],
    },
    {
      kind: 'text',
      title: 'Why it works',
      body: [
        'Every mode change is a physical action you can see and feel: flip the plate, turn the ring. Nothing hides in software. That’s the bundling test: if a feature needs a manual, it didn’t earn its place.',
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'sg1/context-hood', caption: 'CAD context render' },
        { media: 'sg1/context-oven', caption: 'Fits the kitchen it was designed for' },
      ],
    },
  ],
}
