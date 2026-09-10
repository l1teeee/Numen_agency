import type { ComponentType } from 'react'
import { BuildDoodle } from './build'
import { DesignDoodle } from './design'
import { DiscoveryDoodle } from './discovery'
import { LaunchDoodle } from './launch'
import { ScaleDoodle } from './scale'

export { BuildDoodle, DesignDoodle, DiscoveryDoodle, LaunchDoodle, ScaleDoodle }

/** Keyed by the step numbers the Process bento renders next to each tile. */
export const PROCESS_DOODLES: Record<'01' | '02' | '03' | '04' | '05', ComponentType<{ active?: boolean; className?: string }>> = {
  '01': DiscoveryDoodle,
  '02': DesignDoodle,
  '03': BuildDoodle,
  '04': LaunchDoodle,
  '05': ScaleDoodle,
}
