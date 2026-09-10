'use client'
import ReactLenis, { useLenis } from 'lenis/react'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { scrollToSection } from '@/lib/section-scroll'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { LangProvider } from '@/lib/lang'

function LenisScrollReset() {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.length > 1) {
      const timer = setTimeout(() => {
        if (!scrollToSection(hash, lenis)) {
          lenis?.scrollTo(0, { immediate: true })
        }
      }, 80)
      return () => clearTimeout(timer)
    }
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <MotionConfig reducedMotion="user">
        <LangProvider>
          <ReactLenis root options={{ smoothWheel: !reducedMotion }}>
            <LenisScrollReset />
            <ScrollProgress />
            {children}
          </ReactLenis>
        </LangProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
