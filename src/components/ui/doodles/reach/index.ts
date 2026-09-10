import type { ComponentType } from 'react'
import { ElSalvadorMark } from './el-salvador'
import { GuatemalaMark } from './guatemala'
import { MexicoMark } from './mexico'
import { ArgentinaMark } from './argentina'
import { UnitedKingdomMark } from './united-kingdom'
import { GermanyMark } from './germany'

export { ElSalvadorMark } from './el-salvador'
export { GuatemalaMark } from './guatemala'
export { MexicoMark } from './mexico'
export { ArgentinaMark } from './argentina'
export { UnitedKingdomMark } from './united-kingdom'
export { GermanyMark } from './germany'
export { PaperTileFrame } from './paper-tile-frame'

/** Keyed by reachMeta[i].id in sections.tsx. */
export const COUNTRY_DOODLES: Record<
  'sv' | 'gt' | 'mx' | 'ar' | 'gb' | 'de',
  ComponentType<{ active?: boolean; className?: string }>
> = {
  sv: ElSalvadorMark,
  gt: GuatemalaMark,
  mx: MexicoMark,
  ar: ArgentinaMark,
  gb: UnitedKingdomMark,
  de: GermanyMark,
}
