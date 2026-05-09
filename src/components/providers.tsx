'use client'
import ReactLenis from 'lenis/react'
import { ThemeProvider } from 'next-themes'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ReactLenis root>
        <ScrollProgress />
        {children}
      </ReactLenis>
    </ThemeProvider>
  )
}
