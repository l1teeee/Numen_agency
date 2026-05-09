'use client'
import ReactLenis from 'lenis/react'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <ScrollProgress />
      {children}
    </ReactLenis>
  )
}
