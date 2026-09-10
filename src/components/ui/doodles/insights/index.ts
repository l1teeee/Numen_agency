import type { ComponentType } from 'react'
import { CloudArchitectureDoodle } from './cloud-architecture'
import { ConvertingDesignDoodle } from './converting-design'
import { AppliedAiDoodle } from './applied-ai'

export { CloudArchitectureDoodle } from './cloud-architecture'
export { ConvertingDesignDoodle } from './converting-design'
export { AppliedAiDoodle } from './applied-ai'

/** Indexed positionally by recentPosts order in sections.tsx. */
export const INSIGHT_DOODLES: ComponentType<{ active?: boolean; className?: string }>[] = [
  CloudArchitectureDoodle,
  ConvertingDesignDoodle,
  AppliedAiDoodle,
]
