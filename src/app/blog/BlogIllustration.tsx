'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { AiIntegrationDoodle, DevOpsDoodle, ProductDesignDoodle, WebDevDoodle } from '@/components/ui/doodles/services'
import { DiscoveryDoodle } from '@/components/ui/doodles/process'
import { cn } from '@/lib/utils'

const illustrations = {
  'Guías': DiscoveryDoodle,
  Desarrollo: WebDevDoodle,
  IA: AiIntegrationDoodle,
  Diseño: ProductDesignDoodle,
  DevOps: DevOpsDoodle,
}

export function BlogIllustration({ category, className }: { category: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref, { amount: 0.2 })
  const Illustration = illustrations[category as keyof typeof illustrations] ?? DiscoveryDoodle

  return (
    <div ref={ref} aria-hidden="true" className={cn('flex items-center justify-center text-foreground', className)}>
      <Illustration active={active} className="h-full max-h-64 w-full max-w-sm" />
    </div>
  )
}
