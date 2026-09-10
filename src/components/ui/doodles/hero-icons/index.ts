import type { ComponentType } from 'react'
import { IdeaIcon } from './idea'
import { CodeIcon } from './code'
import { CursorIcon } from './cursor'
import { StarIcon } from './star'
import { HeartIcon } from './heart'
import { GearIcon } from './gear'
import { RocketIcon } from './rocket'
import { ChatIcon } from './chat'
import { WindowIcon } from './window'
import { CoffeeIcon } from './coffee'
import { PencilIcon } from './pencil'
import { ChecklistIcon } from './checklist'
import type { HeroIconProps, HeroIconMotion } from './icon-frame'

export type { HeroIconProps, HeroIconStroke, HeroIconMotion } from './icon-frame'
export { IdeaIcon } from './idea'
export { CodeIcon } from './code'
export { CursorIcon } from './cursor'
export { StarIcon } from './star'
export { HeartIcon } from './heart'
export { GearIcon } from './gear'
export { RocketIcon } from './rocket'
export { ChatIcon } from './chat'
export { WindowIcon } from './window'
export { CoffeeIcon } from './coffee'
export { PencilIcon } from './pencil'
export { ChecklistIcon } from './checklist'

export type HeroIconName = HeroIconMotion

/** The scattered field beside the hero headline picks its icons out of this map. */
export const HERO_ICONS: Record<HeroIconName, ComponentType<HeroIconProps>> = {
  idea: IdeaIcon,
  code: CodeIcon,
  cursor: CursorIcon,
  star: StarIcon,
  heart: HeartIcon,
  gear: GearIcon,
  rocket: RocketIcon,
  chat: ChatIcon,
  window: WindowIcon,
  coffee: CoffeeIcon,
  pencil: PencilIcon,
  checklist: ChecklistIcon,
}
