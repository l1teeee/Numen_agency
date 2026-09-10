import type { ComponentType } from 'react'
import { WebDevDoodle } from './web-dev'
import { ProductDesignDoodle } from './product-design'
import { AiIntegrationDoodle } from './ai-integration'
import { DevOpsDoodle } from './devops'

export { WebDevDoodle } from './web-dev'
export { ProductDesignDoodle } from './product-design'
export { AiIntegrationDoodle } from './ai-integration'
export { DevOpsDoodle } from './devops'

/** Keyed by servicesMeta[i].num in sections.tsx. */
export const SERVICE_DOODLES: Record<'01' | '02' | '03' | '04', ComponentType<{ active?: boolean; className?: string }>> = {
  '01': WebDevDoodle,
  '02': ProductDesignDoodle,
  '03': AiIntegrationDoodle,
  '04': DevOpsDoodle,
}
