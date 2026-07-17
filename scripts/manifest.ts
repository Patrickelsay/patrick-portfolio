/**
 * Curated asset manifest — the single source of truth mapping files in
 * portfolio-assets/ (untouched originals) to web asset ids.
 *
 * id format: "<project>/<name>". Outputs land in public/media/<id>-<w>.webp
 * (videos: public/media/<id>.mp4 + <id>-poster.jpg).
 */

export interface ImageEntry {
  id: string
  src: string // relative to portfolio-assets/
  hero?: boolean // adds a 2400w rendition
  og?: boolean // also emit a 1200w jpg for social cards
}

export interface PdfEntry {
  id: string
  src: string
  page: number // 1-based
  hero?: boolean
}

export interface VideoEntry {
  id: string
  src: string
  /** long-side pixel cap (default 1280) */
  cap?: number
  /** upload to Supabase storage instead of shipping with the site */
  remote?: boolean
  /** poster timestamp in seconds (default 1) */
  posterAt?: number
}

const A = {
  about: '00-about-me',
  mkt: '01-marketing-content',
  ux: '02-ux-ui',
  pd: '03-product-design',
  vent: '04-ventures',
  cre: '05-other-creative',
}

const wob = `${A.pd}/(UNI) Wobbly Crane - Spinmaster childrens Toy`
const waf = `${A.pd}/(UNI) Water Activity Footwear - Final Thesis Project`
const sg1 = `${A.pd}/(UNI) SG1 - 3-1 Kitchen Tool `
const motus = `${A.pd}/(UNI) MOTUS - 2in1 Shoe Organizer`
const fob = `${A.pd}/(UNI) Toyota Key Fob - 3D modelling & printing`
const edge = `${A.pd}/(UNI) EDGE - Lighting Fixture`
const gil = `${A.pd}/(UNI) Gillette Razor Design Competition`
const matrix = `${A.pd}/(UNI) MATRIX-Portable Chair`
const pmh = `${A.pd}/(UNI) Princess Margaret Hospital Interior Renovation`
const taptab = `${A.ux}/(UNI) TapTab`
const gameon = `${A.ux}/Game on - Adobe Creative Jam`
const lisn = `${A.ux}/LISN - Podcast app (subcontracted to design pre-lim design)`
const munch = `${A.ux}/Munch - Social media Community platfrom for foodies and reviewers`
const webred = `${A.ux}/Website Redesigns`
const lip = `${A.cre}/Brand design & Content Production/LIP - Lighter Issue Podcast`
const reshi = `${A.cre}/graphic-design/RJ - Reshi Jewelry`
const sketch = `${A.cre}/sketching`
const ge = `${A.vent}/GetExpanded`
const organic = `${A.mkt}/Organic Content Marketing (Short Form Reels:tiktoks)`
const brand = `${A.mkt}/My Personal Brand`

export const images: ImageEntry[] = [
  /* ---- about / identity ------------------------------------------------- */
  { id: 'about/portrait', src: `${A.about}/headshot/DSC07308.JPG`, hero: true, og: true },
  { id: 'about/creator', src: `${A.about}/headshot/IMG_3343.HEIC`, hero: true },
  { id: 'about/creator-camera', src: `${A.about}/headshot/IMG_3344.HEIC` },
  { id: 'about/studio', src: `${A.about}/headshot/E7DAE1B9-FC26-4EC8-A59C-2BD25C1D6985.jpg` },
  { id: 'about/laptop-smile', src: `${A.about}/headshot/IMG_3342.HEIC` },
  { id: 'about/street', src: `${A.about}/headshot/IMG_7540.JPG` },
  { id: 'about/bts-desk', src: `${A.about}/office-working-BTS/Screenshot 2026-07-16 at 11.35.07 PM.png` },
  { id: 'about/bts-whiteboard', src: `${A.about}/office-working-BTS/Screenshot 2026-07-16 at 11.35.30 PM.png` },
  { id: 'about/bts-analytics', src: `${A.about}/office-working-BTS/Screenshot 2026-07-16 at 11.35.53 PM.png` },
  { id: 'about/bts-kitchen', src: `${A.about}/office-working-BTS/NVD05002.jpg` },

  /* ---- wobbly bridge (tier 1 — ids follow the content.md asset map) ----- */
  { id: 'wobbly/topdisplay-hero', src: `${wob}/WIP/WC Renders/WC Render Cover Potential/TopDisplay2.png`, hero: true, og: true },
  { id: 'wobbly/box-cover', src: `${wob}/WIP/WC Renders/Toy_Box_with_Wobbly_Crane_Cover.png`, hero: true },
  { id: 'wobbly/jenga-box', src: `${wob}/WIP/Inspiration pics/71DYKpALgTL._AC_SL1500_.jpg` },
  { id: 'wobbly/jenga-play', src: `${wob}/WIP/Inspiration pics/816upefCAzL._AC_SL1500_.jpg` },
  { id: 'wobbly/hape-crane', src: `${wob}/WIP/Inspiration pics/Crane Toy.webp` },
  { id: 'wobbly/wheel-cards', src: `${wob}/WIP/WC Renders/WC Render Cover Potential/Wheel and Cards1.png` },
  { id: 'wobbly/blocks', src: `${wob}/WIP/WC Renders/WC Render Cover Potential/Blocks1.png` },
  { id: 'wobbly/fusion-wip', src: `${wob}/WIP/WC Renders/WC Render Cover Potential/Wobbly_Crane_v2_2018-May-25_10-35-45PM-000_CustomizedView37694338986_png.png` },
  { id: 'wobbly/render-hero', src: `${wob}/WIP/WC Renders/WC Renders/Wobbly Crane Still/Crane pose 1.png`, hero: true },
  { id: 'wobbly/render-action', src: `${wob}/WIP/WC Renders/WC Renders/Wobbly Crane Still/Crane pose 7.png` },
  { id: 'wobbly/render-profile', src: `${wob}/WIP/WC Renders/WC Renders/Wobbly Crane Still/Crane pose 6.png` },
  { id: 'wobbly/story-render', src: `${wob}/WIP/WC Renders/WC Renders/Wobbly Crane in Action/Crane Story 1.png` },
  { id: 'wobbly/lapse-strip', src: `${wob}/WIP/images/Storyline.png` },
  { id: 'wobbly/concept-blocks', src: `${wob}/WIP/WC Renders/Otttermind - Sketches and early 3D modelling/Concept_sketch_of_building_blocks.png` },
  { id: 'wobbly/concept-crane', src: `${wob}/WIP/WC Renders/Otttermind - Sketches and early 3D modelling/Concept_sketch_of_toy_crane.png` },
  { id: 'wobbly/concept-materials', src: `${wob}/WIP/WC Renders/Otttermind - Sketches and early 3D modelling/Concept_sketch_of_building_blocks-3.png` },
  { id: 'wobbly/clay-blocks', src: `${wob}/WIP/WC Renders/Otttermind - Sketches and early 3D modelling/Clay_render_of_building_blocks.png` },
  { id: 'wobbly/clay-crane', src: `${wob}/WIP/WC Renders/Otttermind - Sketches and early 3D modelling/Clay_render_of_toy_crane.png` },

  /* ---- water activity footwear ------------------------------------------ */
  { id: 'waf/hero-annotated', src: `${waf}/Final/IMG_0319.JPG`, hero: true, og: true },
  { id: 'waf/wow-header', src: `${waf}/Final/Wow shot - Official Board Header.png`, hero: true },
  { id: 'waf/poster-board', src: `${waf}/Final/Poster_WaterActivityFootwear.jpg` },
  { id: 'waf/process-board', src: `${waf}/Final/Process_WaterActivityFootwear.jpg` },
  { id: 'waf/render-side', src: `${waf}/WIP/Final Renders/Untitled_Artwork 4.png` },
  { id: 'waf/render-worn', src: `${waf}/WIP/Final Renders/Untitled_Artwork 7 copy.png` },
  { id: 'waf/render-three-quarter', src: `${waf}/WIP/Final Renders/Untitled_Artwork 7-2.png` },
  { id: 'waf/render-open', src: `${waf}/WIP/Final Renders/Untitled_Artwork 7.jpg` },

  /* ---- waf process ------------------------------------------------------- */
  { id: 'waf/sketch-lineup', src: `${waf}/WIP/Sketches Ideation/DSC_0911.jpg` },
  { id: 'waf/sketch-feet', src: `${waf}/WIP/Sketches Ideation/DSC_0916.jpg` },
  { id: 'waf/sketch-concept', src: `${waf}/WIP/Sketches Ideation/DSC_0918.jpg` },
  { id: 'waf/sketch-board-dark', src: `${waf}/WIP/Sketches Ideation/Untitled_Artwork.png` },

  /* ---- sg1 kitchen tool -------------------------------------------------- */
  { id: 'sg1/proto-appearance', src: `${sg1}/WIP/Prototype shots/DSC_1027.jpg` },
  { id: 'sg1/proto-lift', src: `${sg1}/WIP/Prototype shots/DSC_1059.jpg` },
  { id: 'sg1/proto-cardboard', src: `${sg1}/WIP/Prototype shots/DSC_1069.jpg` },
  { id: 'sg1/proto-white', src: `${sg1}/WIP/Prototype shots/IMG_6786-2.png` },
  { id: 'motus/form-lineup', src: `${motus}/WIP/Presentation setup/IMG_4661.JPG` },
  { id: 'motus/steel-forms', src: `${motus}/WIP/Prototyping/IMG_4631.jpg` },
  { id: 'motus/wood-studies', src: `${motus}/WIP/Prototyping/IMG_4634.JPG` },
  { id: 'motus/cad-tri', src: `${motus}/WIP/SO REDNER 22.JPG` },
  { id: 'motus/usage-sketch', src: `${motus}/WIP/Shoe organizer.jpg` },

  { id: 'sg1/hero-interface', src: `${sg1}/FINAL/Wow Shots/asm0001_asm_2017-Nov-29_05-49-48AM-000_CustomizedView7393968011_png_alpha.png`, hero: true, og: true },
  { id: 'sg1/context-counter', src: `${sg1}/FINAL/Wow Shots/asm0001_asm_2017-Dec-14_01-02-26AM-000_CustomizedView12503821792_png.png`, hero: true },
  { id: 'sg1/context-kitchen', src: `${sg1}/FINAL/Wow Shots/asm0001_asm_2017-Nov-29_02-34-59AM-000_CustomizedView8674426767_png.png` },
  { id: 'sg1/context-hood', src: `${sg1}/FINAL/Wow Shots/asm0001_asm_2017-Nov-29_07-02-50AM-000_CustomizedView1836087083_png.png` },
  { id: 'sg1/context-oven', src: `${sg1}/FINAL/Wow Shots/asm0001_asm_2017-Nov-29_08-10-35AM-000_CustomizedView4089177826_png.png` },
  { id: 'sg1/grill-open', src: `${sg1}/FINAL/Wow Shots/asm0001_asm_2017-Nov-29_08-12-30AM-000_CustomizedView10016153325_png.png` },
  { id: 'sg1/pot-closed', src: `${sg1}/FINAL/Wow Shots/asm0001_asm_2017-Nov-29_08-13-53AM-000_CustomizedView21240280041_png.png` },

  /* ---- motus ------------------------------------------------------------- */
  { id: 'motus/hero-display', src: `${motus}/FINAL/DSC_0407.jpg`, hero: true, og: true },
  { id: 'motus/front', src: `${motus}/FINAL/8989889.jpg` },
  { id: 'motus/side', src: `${motus}/FINAL/98989898.jpg` },
  { id: 'motus/fold-sequence', src: `${motus}/FINAL/99998888.jpg` },
  { id: 'motus/frame-only', src: `${motus}/FINAL/DSC_0441.jpg` },
  { id: 'motus/detail', src: `${motus}/FINAL/DSC_0395.jpg` },
  { id: 'motus/pair', src: `${motus}/FINAL/DSC_0409.jpg` },

  /* ---- toyota key fob ----------------------------------------------------- */
  { id: 'fob/hero-print', src: `${fob}/final/3D Printed Final Model/IMG_1408.jpg`, hero: true, og: true },
  { id: 'fob/thumb-press', src: `${fob}/final/3D Printed Final Model/IMG_1415.jpg` },
  { id: 'fob/parts', src: `${fob}/final/3D Printed Final Model/IMG_1407.jpg` },
  { id: 'fob/shell', src: `${fob}/final/3D Printed Final Model/IMG_1404.jpg` },
  { id: 'fob/render', src: `${fob}/final/Fob 3D Renders/Final render.png` },
  { id: 'fob/render-cad', src: `${fob}/final/Fob 3D Renders/RENDERScreen.PNG` },
  { id: 'fob/original', src: `${fob}/final/3D Printed Final Model/s-l640.jpg` },

  /* ---- matrix chair (finals are pdf reports; heroes come from WIP) -------- */
  { id: 'matrix/hero-home', src: `${matrix}/WIP/02 Low Fidelity Mock Up Prototyping/IMG_7360.JPG`, hero: true, og: true },
  { id: 'matrix/hero-side', src: `${matrix}/WIP/02 Low Fidelity Mock Up Prototyping/IMG_7361.JPG` },
  { id: 'matrix/sketch-figures', src: `${matrix}/WIP/01 Sketching & Ideation/IMG_7570.JPG` },
  { id: 'matrix/workshop-build', src: `${matrix}/WIP/02 Low Fidelity Mock Up Prototyping/IMG_7326.JPG` },
  { id: 'matrix/folded-flat', src: `${matrix}/WIP/02 Low Fidelity Mock Up Prototyping/IMG_7382.JPG` },
  { id: 'matrix/wood-prototype', src: `${matrix}/WIP/02 Low Fidelity Mock Up Prototyping/IMG_7388.JPG` },
  { id: 'matrix/steel-core', src: `${matrix}/WIP/03 High Fidelity Model Model Making/IMG_7448.JPG` },

  /* ---- gillette (renders live in WIP; boards are the pdf-only finals) ----- */
  { id: 'gillette/hero-ultimate', src: `${gil}/WIP/The ultimate.png`, hero: true, og: true },
  { id: 'gillette/ring-rotate', src: `${gil}/WIP/Ring Rotate 1Gilette_razor_zero_v10_2017-Apr-25_08-58-57PM-000_CustomizedView6315120776.png` },
  { id: 'gillette/zoom-ring', src: `${gil}/WIP/Zoom ring.png` },
  { id: 'gillette/raze-full', src: `${gil}/WIP/Raze 1 Gilette_razor_zero_v6_44_2017-Apr-25_08-37-33PM-000_CustomizedView14627296977.png` },
  { id: 'gillette/glazor-zero', src: `${gil}/WIP/GlaZor Zero.png` },
  { id: 'gillette/sketch-lineup', src: `${gil}/WIP/Untitled_Artwork 2.jpg` },
  { id: 'gillette/print-model', src: `${gil}/WIP/IMG_5037.JPG` },

  /* ---- edge -------------------------------------------------------------- */
  { id: 'edge/hero-render', src: `${edge}/Final/LED_PROJECT_OFFICIAL_v1_2018-Mar-16_02-31-30AM-000_CustomizedView5212444662_jpg.jpg`, hero: true, og: true },
  { id: 'edge/context-room', src: `${edge}/Final/Context 4.30 wall bang.jpg` },

  /* ---- taptab ------------------------------------------------------------ */
  { id: 'taptab/hero-brand', src: `${taptab}/final/Screenshot 2026-07-14 at 1.03.40 PM.png`, hero: true, og: true },
  { id: 'taptab/board-intro', src: `${taptab}/final/Screenshot 2026-07-14 at 1.03.16 PM.png` },
  { id: 'taptab/board-flows', src: `${taptab}/final/Screenshot 2026-07-14 at 1.03.23 PM.png` },
  { id: 'taptab/board-storyboards', src: `${taptab}/final/Screenshot 2026-07-14 at 1.03.47 PM.png` },

  /* ---- game on ----------------------------------------------------------- */
  { id: 'gameon/hero-launch', src: `${gameon}/FINAL/Screen navigation/Launch Page – 3.jpg`, hero: true, og: true },
  { id: 'gameon/discovery', src: `${gameon}/FINAL/Screen navigation/Game DIscovery.jpg` },
  { id: 'gameon/discovery-detail', src: `${gameon}/FINAL/Screen navigation/Game Discovery – 3.jpg` },
  { id: 'gameon/friends-nearby', src: `${gameon}/FINAL/Screen navigation/Friend Nearby – 5.jpg` },
  { id: 'gameon/profile', src: `${gameon}/FINAL/Screen navigation/Profile – Attempt – 6.jpg` },
  { id: 'gameon/badges', src: `${gameon}/FINAL/Screen navigation/Misaki.jpg` },
  { id: 'gameon/platforms', src: `${gameon}/FINAL/Screen navigation/Platform – 3.jpg` },

  /* ---- lisn -------------------------------------------------------------- */
  { id: 'lisn/hero-phone', src: `${lisn}/FINAL/LISN_Mockup_Playpodcast_2021.png`, hero: true, og: true },
  { id: 'lisn/screens-display', src: `${lisn}/FINAL/LISN_Screens_Display_2021.png` },
  { id: 'lisn/appstore-display', src: `${lisn}/FINAL/FINAL DESIGN AFTER ME LISN_appstore_display_2021-02.png` },
  { id: 'lisn/display-board', src: `${lisn}/FINAL/LISN_display_2021-01.png` },
  { id: 'lisn/hand-mockup', src: `${lisn}/FINAL/Holding-Hand-Smart-Phone-Mockup.jpg` },

  /* ---- munch (wip-only) --------------------------------------------------- */
  { id: 'munch/brand', src: `${munch}/WIP/Screenshot 2026-07-14 at 11.03.24 PM.png`, hero: true },
  { id: 'munch/signin-quiz', src: `${munch}/WIP/Screenshot 2026-07-14 at 11.04.10 PM.png` },
  { id: 'munch/feed-strips', src: `${munch}/WIP/Screenshot 2026-07-14 at 11.04.36 PM.png` },
  { id: 'munch/profiles', src: `${munch}/WIP/Screenshot 2026-07-14 at 11.04.33 PM.png` },

  /* ---- website redesigns --------------------------------------------------- */
  { id: 'webred/ipho-hero', src: `${webred}/iPho_Rebrand_2021/iPho_rebrand_2021.jpg`, hero: true },
  { id: 'webred/ipho-before-after', src: `${webred}/iPho_Rebrand_2021/iPho_rebrand_2021.png` },
  { id: 'webred/ipho-original', src: `${webred}/iPho_Rebrand_2021/screencapture-iphoottawa-2021-08-05-20_27_26.png` },

  /* ---- princess margaret (wip-only) ---------------------------------------- */
  { id: 'pmh/model-top', src: `${pmh}/WIP/IMG_4938.JPG`, hero: true },
  { id: 'pmh/model-context', src: `${pmh}/WIP/IMG_4939.JPG` },
  { id: 'pmh/model-rooms', src: `${pmh}/WIP/IMG_4940.JPG` },
  { id: 'pmh/model-interior', src: `${pmh}/WIP/IMG_2482.JPG` },
  { id: 'pmh/swatches', src: `${pmh}/WIP/Color swatches.jpg` },

  /* ---- lip podcast brand ---------------------------------------------------- */
  { id: 'lip/hero-emblem', src: `${lip}/FINAL/LIP COVER EMBLEM.png`, hero: true, og: true },
  { id: 'lip/rss-red', src: `${lip}/FINAL/LIP RSS Content/LIP_RSS_Artwork_2021.01_V1.jpg` },
  { id: 'lip/rss-zoom', src: `${lip}/FINAL/LIP RSS Content/LIP_RSS_Artwork(Zoom)_221.01_V2.jpg` },
  { id: 'lip/logo-white', src: `${lip}/FINAL/LIP Logo/LIP_Logo-Black3k_2021.01_v1-08.png` },
  { id: 'lip/logo-black', src: `${lip}/FINAL/LIP Logo/LIP_Logo-Black3k_2021.01_v1-07.png` },

  /* ---- reshi jewelry --------------------------------------------------------- */
  { id: 'reshi/logo-white', src: `${reshi}/FINAL/White4x.png`, hero: true },
  { id: 'reshi/logo-black', src: `${reshi}/FINAL/Black4x.png` },

  /* ---- sketching --------------------------------------------------------------- */
  { id: 'sketch/feet-study-1', src: `${sketch}/(UNI) Footwear & Feet sketching/Untitled_Artwork 1.png`, hero: true },
  { id: 'sketch/feet-study-3', src: `${sketch}/(UNI) Footwear & Feet sketching/Untitled_Artwork 3.png` },
  { id: 'sketch/feet-study-4', src: `${sketch}/(UNI) Footwear & Feet sketching/Untitled_Artwork 4.png` },
  { id: 'sketch/feet-study-5', src: `${sketch}/(UNI) Footwear & Feet sketching/Untitled_Artwork 5.png` },
  { id: 'sketch/feet-study-6', src: `${sketch}/(UNI) Footwear & Feet sketching/Untitled_Artwork 6.png` },
  { id: 'sketch/puma-render', src: `${sketch}/(UNI) Shoe Design/Screen Shot 2018-12-13 at 12.42.35 PM.png`, hero: true },
  { id: 'sketch/puma-lineup', src: `${sketch}/(UNI) Shoe Design/Screenshot 2026-07-14 at 10.40.59 PM.png` },
  { id: 'sketch/puma-materials', src: `${sketch}/(UNI) Shoe Design/Screenshot 2026-07-14 at 10.41.25 PM.png` },
  { id: 'sketch/puma-colorways', src: `${sketch}/(UNI) Shoe Design/Screenshot 2026-07-14 at 10.41.30 PM.png` },
  { id: 'sketch/puma-title', src: `${sketch}/(UNI) Shoe Design/Screenshot 2026-07-14 at 10.41.35 PM.png` },
  { id: 'sketch/ideation-wall', src: `${sketch}/(UNI) Shoe Design/Screen Shot 2018-12-13 at 12.49.21 PM.png` },
  { id: 'sketch/spec-sketch', src: `${sketch}/(UNI) Shoe Design/Screen Shot 2018-12-13 at 12.49.43 PM.png` },
  { id: 'sketch/desk-bts', src: `${sketch}/(UNI) Shoe Design/IMG_1170.JPG` },

  /* ---- getexpanded ------------------------------------------------------------- */
  { id: 'getexpanded/landing', src: `${ge}/GE landing page.png`, hero: true, og: true },
  { id: 'getexpanded/analytics-year', src: `${ge}/Current Analytics/Directory's google analytics traffic and clicks/GE Year analytics.png` },
  { id: 'getexpanded/analytics-month', src: `${ge}/Current Analytics/Directory's google analytics traffic and clicks/GE Month analtyics.png` },
  { id: 'getexpanded/instagram', src: `${ge}/Current Analytics/Instagram account.png` },
  { id: 'getexpanded/admin-dashboard', src: `${ge}/Directories listings and active users/Screenshot 2026-07-16 at 11.16.25 PM.png` },
  { id: 'getexpanded/discord', src: `${ge}/Discord Community/603 members.png` },
  { id: 'getexpanded/collabs-july', src: `${ge}/Weekly live collabs/a view at how busy we are (every friday booke dup in july crossing till august/Screenshot 2026-07-16 at 3.37.03 PM.png` },
  { id: 'getexpanded/collabs-august', src: `${ge}/Weekly live collabs/a view at how busy we are (every friday booke dup in july crossing till august/Screenshot 2026-07-16 at 3.37.12 PM.png` },
]

export const pdfs: PdfEntry[] = [
  /* wobbly sketch scans (pages per the content.md asset map) */
  { id: 'wobbly/sketch-weight-system', src: `${wob}/WIP/Sketches Photographs/CUontheGO-Scan20180406_0137.pdf`, page: 6 },
  { id: 'wobbly/sketch-lineup', src: `${wob}/WIP/Sketches Photographs/CUontheGO-Scan20180406_0155.pdf`, page: 3 },
  /* gillette boards (final folder is pdf-only) */
  { id: 'gillette/board-process', src: `${gil}/final/GG Process.pdf`, page: 1, hero: true },
  { id: 'gillette/board-function', src: `${gil}/final/GG Function.pdf`, page: 1 },
  { id: 'gillette/board-features', src: `${gil}/final/GG Features.pdf`, page: 1 },
  /* matrix report pages (final folder is pdf-only; cover + selected spreads) */
  { id: 'matrix/report-cover', src: `${matrix}/Final/Matrix report Official reduced.pdf`, page: 1, hero: true },
  /* harley chocolate packaging — p12 is the final-artwork die-line */
  { id: 'harley/board', src: `${A.cre}/package-design/(UNI) Harley Davison Chocolate/A-3 P&D - HARLEY.pdf`, page: 12, hero: true },
  { id: 'harley/dieline-stripes', src: `${A.cre}/package-design/(UNI) Harley Davison Chocolate/A-3 P&D - HARLEY.pdf`, page: 8 },
  { id: 'harley/logo-studies', src: `${A.cre}/package-design/(UNI) Harley Davison Chocolate/A-3 P&D - HARLEY.pdf`, page: 4 },
  /* utensil sketching process book cover */
  { id: 'sketch/utensil-book', src: `${sketch}/(UNI) utencil-sketching/PROCESS BOOK.pdf`, page: 1 },
]

export const videos: VideoEntry[] = [
  /* ---- reels wall (vertical short-form, one per lane) --------------------- */
  { id: 'reels/ai-chatgpt', src: `${brand}/AI and Tech/294 - ChatGPT Images 2 - Response video.mp4` },
  { id: 'reels/boopo-milestone', src: `${brand}/AI and Tech/MD-233. New Milestone_ We Built Boopo.mp4` },
  { id: 'reels/brand-pippit', src: `${brand}/Brand Deals/# 308 Pippit -  Your production budget is funding a dead workflow.mp4` },
  { id: 'reels/ugc-remio', src: `${brand}/Brand Partnerships (Paid UGC organic ads)/274 - Remio.mp4` },
  { id: 'reels/agency-scaling', src: `${brand}/Scaling Your Content Agency/006. Here's how I scaled.m4v` },
  { id: 'reels/growth-settings', src: `${brand}/Social Media Growth/002 - 7 Insta Settings Before You Post.mp4` },
  { id: 'reels/viral-ai-fast', src: `${brand}/Viral Trends & Skits/279. AI TOO FAST V2.mp4` },
  { id: 'reels/viral-film-day', src: `${brand}/Viral Trends & Skits/003 - You know it's film day when the full setup cmes out - HD 720p.mov` },
  { id: 'reels/auto-toyota', src: `${organic}/Automotive/Toyota/BT - BIG DAWGS.m4v` },
  { id: 'reels/auto-hyundai', src: `${organic}/Automotive/Hyundai/BH - IONIQ 5 N Halloween Surprise.m4v` },
  { id: 'reels/akke-jewellery', src: `${organic}/Beauty & Cosmetics/Akke Jewellery/AKKE - JOFD.m4v` },
  { id: 'reels/wedding-first-look', src: `${organic}/Events & Weddings/Ramez & Lara/4. the First look - 07.05.23 .mp4` },
  { id: 'reels/after5-pov', src: `${organic}/Food & beverages/After5 - Mobile Bar/POV You hire AFTER5 to serve the drinks - HD 720p.mov` },
  { id: 'reels/gym-elias', src: `${organic}/Gym /Savage Mode Fitness - Local gym & PT/19. Elias - Do you know your bf, which is his fave workout_ - HD 1080p.mov` },
  { id: 'reels/kellys-phases', src: `${organic}/Health & Wellness/Kelly's Clinic - Menopause Nurse Practitioner /8. The 3 phases of menopause .mp4` },
  { id: 'reels/sherises-bali', src: `${organic}/Health & Wellness/She Rises Retreat - Bali Meditation Therapy/She Rises Retreat - Thargiya.mov` },
  { id: 'reels/podcast-epicest', src: `${organic}/Podcast : Interview Clipping/Epicest : Kellys Clinic Podcast/10-09 Unlock your potential_10-12_FAD.mp4` },
  { id: 'reels/realestate-kd', src: `${organic}/Real Estate/K&D Captial - Multiunit investement coaching/10 - Dont buy a urus, buy airbnb property - HD 720p.mov` },
  { id: 'reels/retail-cdb', src: `${organic}/Retail/Coureur des Bois - Hunting Shop/10. Vanderlan Boots.mov` },
  { id: 'reels/getexpanded-pod', src: `${organic}/Podcast : Interview Clipping/GetExpanded - Live Discussions with weekly Experts/How is 3D tech changing orthotdontics.mp4` },

  /* ---- case-study / channel clips ---------------------------------------- */
  { id: 'getexpanded/site-nav', src: `${A.vent}/GetExpanded/Get Expanded Site Navigation.mp4` },
  { id: 'lip/motion-intro', src: `${lip}/FINAL/Motion graphics video intro/LIP_MG_2021.08_v2.m4v` },
  { id: 'lip/podcast-intro', src: `${lip}/FINAL/Podcast intro video/LIP_IntroVideo_2021.01_v2.mov` },
  { id: 'lisn/phone-mockup', src: `${lisn}/FINAL/iPhone-Clay-White-Perspective-Free-Mockup.mp4` },
  { id: 'webred/ws-dashboard', src: `${webred}/WS_Rebrand_SW_2021/02_Assets/Videos/WS_Rebrand_S&M_GIF_2021.m4v` },
  { id: 'motus/bts-action', src: `${motus}/WIP/Me in action BTS /IMG_4604.MOV` },
  { id: 'matrix/user-testing', src: `${matrix}/WIP/05 User Testing/IMG_7364.MP4` },
  { id: 'fob/bts-print', src: `${fob}/wip/BTS/UJDD6186.MP4` },
  { id: 'bts/fx3-testing', src: `${A.mkt}/BTS/BTS Testing the FX3 Nov 15 2024.mov` },

  /* ---- long compilations → Supabase storage ------------------------------- */
  { id: 'remote/bts-story-highlight', src: `${A.mkt}/BTS/BTS_Story Highlight.mp4`, remote: true },
  { id: 'remote/client-results-highlight', src: `${A.mkt}/Client Success/Client Results_Story Highlight.mp4`, remote: true },
  { id: 'remote/waf-film', src: `${waf}/WIP/WAFootwear.mov`, remote: true, cap: 1920 },
]
