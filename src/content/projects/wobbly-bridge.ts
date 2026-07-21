import type { Project } from '../types'

/**
 * Tier 1: authored. Copy converted 1:1 from
 * portfolio-assets/.../wobbly-bridge-content.md (the finished narrative).
 * Deviations from the source file:
 * - the "research infographic" placeholder is omitted (file missing from batch)
 * - the "future ideas (draft, replace before publishing)" list is omitted
 * - concept_board_1-3 (missing Spin_Master_Toy_3_concept.pdf) are stood in
 *   by the surviving concept sketch sheets
 */
export const wobblyBridge: Project = {
  slug: 'wobbly-bridge',
  title: 'Wobbly Bridge',
  tagline: 'A two player balance battle in wood, brick, and steel.',
  year: '2018',
  domain: 'product',
  role: 'Industrial Design, Carleton University',
  context: 'Created in response to a Spin Master toy design brief.',
  tags: ['toy design', 'CAD', 'game systems', 'Fusion 360'],
  tier: 1,
  hero: 'wobbly/topdisplay-hero',
  card: 'wobbly/box-cover',
  summary: 'A competitive tabletop toy that teaches weight and balance through play, from Spin Master brief to CAD-built game system.',
  featured: true,
  blocks: [
    {
      kind: 'text',
      title: 'The brief',
      body: [
        'Design a competitive tabletop toy for kids ages 8 to 12 that rewards strategy and coordination, feeds social play, and sneaks in a real lesson about weight and balance.',
      ],
    },
    {
      kind: 'list',
      items: [
        'Audience with an edge: ages 8 to 12, competitive streaks, friendship circles.',
        'Learning that hides in play: weight distribution taught by the table, not a textbook.',
        'Head to head by design: two players, quick rounds, endless rematches.',
      ],
    },
    {
      kind: 'media',
      media: 'wobbly/topdisplay-hero',
      caption: 'The empty stage, a tilting deck that punishes greed.',
      full: true,
    },
    {
      kind: 'text',
      title: 'Research and inspiration',
      body: ['Who it’s for:'],
    },
    {
      kind: 'list',
      items: [
        'Ages 8 to 12, the competitive years',
        'Plays out inside friendship circles',
        'Builds coordination, balance, and critical thinking',
        'Rewards patience and strategy over speed',
      ],
    },
    {
      kind: 'grid',
      cols: 3,
      items: [
        { media: 'wobbly/jenga-box', caption: 'Jenga, tension as a toy, reference' },
        { media: 'wobbly/jenga-play', caption: 'The laugh at the fall, reference' },
        { media: 'wobbly/hape-crane', caption: 'Hape crane, construction play, reference' },
      ],
    },
    {
      kind: 'memo',
      text: 'Jenga nights proved it, the room goes quiet right before the fall. That silence is the product.',
    },
    {
      kind: 'text',
      title: 'Ideation, three directions',
      body: [],
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Balance Blocks (selected): load a tilting bridge, manage the weight, keep the fewest blocks on your side.',
        'Target Twist: a reaction pad, tap, hold, and double hit to chase a high score.',
        'Angry Genie: turn the knob, push your luck, hope the cap pops on someone else.',
      ],
    },
    {
      kind: 'memo',
      text: 'Balance Blocks moved forward, the deepest strategy, the biggest table drama, and the clearest learning hook.',
    },
    {
      kind: 'grid',
      cols: 3,
      items: [
        { media: 'wobbly/concept-blocks', caption: 'Concept sheet, the block set' },
        { media: 'wobbly/concept-crane', caption: 'Concept sheet, the gantry system' },
        { media: 'wobbly/concept-materials', caption: 'Materials study, the 3-block set' },
      ],
    },
    {
      kind: 'text',
      title: 'Behind the scenes, sketchbook',
      body: [],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'wobbly/sketch-weight-system', caption: 'Weight system ideation' },
        { media: 'wobbly/sketch-lineup', caption: 'The Balance Blocks lineup' },
      ],
    },
    {
      kind: 'memo',
      text: 'The fairness math, two lights equal one medium, two mediums equal one heavy. Wheel odds lean light on purpose, the bridge should build before it breaks.',
    },
    {
      kind: 'text',
      title: 'How it plays',
      body: [],
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Spin the wheel. It hands you a block, or a twist of fate.',
        'Place it anywhere. Weight and position both matter.',
        'Wild cards flip the plan. Swaps, extras, and skipped turns.',
        'Force the tip. Fewest blocks on your side takes the win.',
      ],
    },
    {
      kind: 'meta',
      items: [
        { label: 'Players', value: '2' },
        { label: 'Ages', value: '8 to 12' },
        { label: 'Block weights', value: '3: wood/light, brick/medium, steel/heavy' },
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'wobbly/wheel-cards', caption: 'The spinner wheel and wild card deck' },
        { media: 'wobbly/blocks', caption: 'Wood, brick, and steel, the material set' },
      ],
    },
    {
      kind: 'text',
      title: 'Behind the scenes, CAD development',
      body: [
        'Modeled and rendered in Fusion 360, iterated through versions until the wobble felt right.',
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'wobbly/fusion-wip', caption: 'Work in progress, the v2 grey model' },
        { media: 'wobbly/render-hero', caption: 'Final materials, lighting, and textures' },
      ],
    },
    {
      kind: 'memo',
      text: 'Saved as Wobbly_Crane_v2 at 10:35 PM on a May night. Version numbers never lie.',
    },
    {
      kind: 'text',
      title: 'Final model',
      body: [
        'What’s in the box: tilting deck with guard rails and a hazard striped pivot, blocks in wood, brick, and steel, a spinner wheel, and a wild card deck.',
      ],
    },
    {
      kind: 'grid',
      cols: 2,
      items: [
        { media: 'wobbly/render-action', caption: 'Mid round, every placement moves the center of mass' },
        { media: 'wobbly/render-profile', caption: 'Side profile, the pivot only forgives so much' },
      ],
    },
    {
      kind: 'text',
      title: 'In action',
      body: [
        'The lapse below tells the whole story, careful early turns, a bridge that fills up, one greedy placement, and gravity takes the win.',
      ],
    },
    {
      kind: 'media',
      media: 'wobbly/story-render',
      caption: 'One round, start to spill',
      full: true,
    },
    {
      kind: 'sequence',
      media: 'wobbly/lapse-strip',
      caption: 'Game lapse, level start to tumble',
    },
    {
      kind: 'text',
      title: 'Takeaways',
      body: ['What this demonstrates:'],
    },
    {
      kind: 'list',
      items: [
        'End to end product thinking, research to concept to CAD',
        'Game system design, rules, odds, and fairness math',
        'Concept selection grounded in audience research',
        'Visual storytelling through renders and sequence shots',
      ],
    },
  ],
}
