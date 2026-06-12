'use client'
import ReactLenis, { useLenis } from 'lenis/react'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { LangProvider } from '@/lib/lang'

function LenisScrollReset() {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.length > 1) {
      const timer = setTimeout(() => {
        const target = document.querySelector(hash) as HTMLElement | null
        if (target && lenis) {
          lenis.scrollTo(target, { duration: 1.2 })
        } else {
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
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LangProvider>
        <ReactLenis root>
          <LenisScrollReset />
          <ScrollProgress />
          {children}
        </ReactLenis>
      </LangProvider>
    </ThemeProvider>
  )
}
