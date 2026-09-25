import type { CharacterScene } from '../scene-types'
import { clap } from './clap'
import { ponder } from './ponder'
import { surprise } from './surprise'
import { waveHello } from './wave-hello'

export type CharacterId = 'purple-flower' | 'coral-flower' | 'green-round' | 'yellow-round'

export const SCENE_OF: Record<CharacterId, CharacterScene> = {
  'purple-flower': ponder,
  'coral-flower': waveHello,
  'green-round': clap,
  'yellow-round': surprise,
}
