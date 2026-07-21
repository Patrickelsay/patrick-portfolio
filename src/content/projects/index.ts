import type { Project } from '../types'
import { wobblyBridge } from './wobbly-bridge'
import { waterActivityFootwear } from './water-activity-footwear'
import { sg1KitchenTool } from './sg1-kitchen-tool'
import { motus } from './motus'
import { matrixChair } from './matrix-chair'
import { gilletteRazor } from './gillette-razor'
import { toyotaKeyFob } from './toyota-key-fob'
import { edgeLighting } from './edge-lighting'
import { taptab } from './taptab'
import { gameOn } from './game-on'
import { lisn } from './lisn'
import {
  munch,
  websiteRedesigns,
  princessMargaret,
  lipPodcast,
  reshiJewelry,
  harleyChocolate,
  sketchbook,
} from './tier3'

/** Display order for the /work grid: deliberate rhythm, not alphabetical. */
export const projects: Project[] = [
  wobblyBridge,
  waterActivityFootwear,
  lisn,
  sg1KitchenTool,
  lipPodcast,
  taptab,
  motus,
  gameOn,
  gilletteRazor,
  matrixChair,
  websiteRedesigns,
  edgeLighting,
  toyotaKeyFob,
  munch,
  sketchbook,
  princessMargaret,
  reshiJewelry,
  harleyChocolate,
]

export const projectBySlug = new Map(projects.map((p) => [p.slug, p]))

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
