/**
 * The /content dark room: reels wall, client work, personal brand.
 *
 * NOTE ON PROOF MATERIAL: the Client Success folders include lead inboxes,
 * DM screenshots, and testimonials that contain customer names and contact
 * details. Those are deliberately NOT shipped. Stats below are aggregate
 * claims from the source material; swap in redacted proof shots after review.
 */

export interface Reel {
  /** media id (transcoded vertical video + poster) */
  id: string
  title: string
  client?: string
  lane: 'personal' | 'client' | 'podcast'
  tag: string
}

export const reels: Reel[] = [
  /* personal brand */
  { id: 'reels/ai-chatgpt', title: 'ChatGPT image workflows, tested live', lane: 'personal', tag: 'AI & Tech' },
  { id: 'reels/boopo-milestone', title: 'We built Boopo. Milestone drop', lane: 'personal', tag: 'AI & Tech' },
  { id: 'reels/brand-pippit', title: 'Pippit: your production budget is funding a dead workflow', lane: 'personal', tag: 'Brand deal' },
  { id: 'reels/ugc-remio', title: 'Remio, paid UGC ad', lane: 'personal', tag: 'UGC' },
  { id: 'reels/agency-scaling', title: 'Here’s how I scaled', lane: 'personal', tag: 'Agency' },
  { id: 'reels/growth-settings', title: '7 Instagram settings before you post', lane: 'personal', tag: 'Growth' },
  { id: 'reels/viral-ai-fast', title: 'AI too fast', lane: 'personal', tag: 'Skit' },
  { id: 'reels/viral-film-day', title: 'You know it’s film day…', lane: 'personal', tag: 'Skit' },

  /* client work */
  { id: 'reels/auto-toyota', title: 'BIG DAWGS', client: 'Toyota Buckingham', lane: 'client', tag: 'Automotive' },
  { id: 'reels/auto-hyundai', title: 'IONIQ 5 N Halloween surprise', client: 'Hyundai Buckingham', lane: 'client', tag: 'Automotive' },
  { id: 'reels/akke-jewellery', title: 'Jewellery of the day', client: 'Akke Jewellery', lane: 'client', tag: 'Jewellery' },
  { id: 'reels/wedding-first-look', title: 'The first look', client: 'Ramez & Lara', lane: 'client', tag: 'Weddings' },
  { id: 'reels/after5-pov', title: 'POV: you hire AFTER5', client: 'After5 Mobile Bar', lane: 'client', tag: 'Food & bev' },
  { id: 'reels/gym-elias', title: 'Do you know your BF’s favourite workout?', client: 'Savage Mode Fitness', lane: 'client', tag: 'Fitness' },
  { id: 'reels/kellys-phases', title: 'The 3 phases of menopause', client: "Kelly's Clinic", lane: 'client', tag: 'Health' },
  { id: 'reels/sherises-bali', title: 'She Rises Retreat, Bali', client: 'She Rises', lane: 'client', tag: 'Wellness' },
  { id: 'reels/realestate-kd', title: 'Don’t buy a Urus, buy an Airbnb property', client: 'K&D Capital', lane: 'client', tag: 'Real estate' },
  { id: 'reels/retail-cdb', title: 'Vanderlan boots review', client: 'Coureur des Bois', lane: 'client', tag: 'Retail' },

  /* podcast clipping */
  { id: 'reels/podcast-epicest', title: 'Unlock your potential', client: 'Epicest', lane: 'podcast', tag: 'Podcast clips' },
  { id: 'reels/getexpanded-pod', title: 'How 3D tech is changing orthodontics', client: 'GetExpanded', lane: 'podcast', tag: 'Podcast clips' },
]

/** external proof of work: the live Instagram creator portfolio */
export const instagramPortfolio = 'https://www.instagram.com/patrickelsay/portfolio/BATuWeQleW/'

export const contentStats = [
  { value: '30+', label: 'videos shot per month at agency peak' },
  { value: '20+', label: 'client accounts managed across organic strategies' },
  { value: '4 yrs', label: 'running a full-service content agency' },
  { value: '10', label: 'industries served, automotive to healthcare' },
]

export const clientRoster = [
  { name: 'Toyota Buckingham', industry: 'Automotive' },
  { name: 'Hyundai Buckingham', industry: 'Automotive' },
  { name: "Kelly's Clinic", industry: 'Health & wellness' },
  { name: 'Akke Jewellery', industry: 'Jewellery' },
  { name: 'Epicest', industry: 'Podcast production' },
  { name: 'Savage Mode Fitness', industry: 'Fitness' },
  { name: 'After5 Mobile Bar', industry: 'Events' },
  { name: 'K&D Capital', industry: 'Real estate' },
  { name: 'Coureur des Bois', industry: 'Retail' },
  { name: 'She Rises Retreat', industry: 'Wellness' },
]

/** long-form compilations served from Supabase storage (when configured) */
export const remoteShowcase = [
  { id: 'remote/client-results-highlight', title: 'Client results: story highlight' },
  { id: 'remote/bts-story-highlight', title: 'Behind the scenes: story highlight' },
]
