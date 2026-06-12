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
