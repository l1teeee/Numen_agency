'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { NumenMark } from '@/components/ui/doodles/numen-mark'
import { useLang } from '@/lib/lang'
import { SECTION_HREFS, handleSectionLinkClick } from '@/lib/section-scroll'
import { useNavbarVisible } from '@/lib/use-navbar-visibility'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

export function Navbar() {
  const lenis = useLenis()
  const { lang, setLang, t } = useLang()
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const isHome = pathname === '/'
  const visible = useNavbarVisible(isHome)
  const es = lang === 'es'
  const links = [
    { href: SECTION_HREFS.work, label: t.nav.links[1].label },
    { href: SECTION_HREFS.about, label: t.nav.links[2].label },
  ]

  return (
    <>
      <a href="#main-content" className="skip-link">{es ? 'Saltar al contenido' : 'Skip to content'}</a>
      {/* Tailwind 4 moves elements through the translate property, so the transition has to name it. */}
      <header inert={!visible} className={cn('fixed inset-x-0 top-0 z-100 bg-white text-black', visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0', !reducedMotion && 'transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]')}>
        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 lg:px-[3.25rem]">
          <Link href="/" aria-label={es ? 'Numen, inicio' : 'Numen, home'} className="flex min-h-11 min-w-11 items-center justify-self-start">
            <NumenMark className="h-5 w-5" />
          </Link>
          <nav aria-label={es ? 'Navegación principal' : 'Main navigation'} className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                onClick={(event) => {
                  if (isHome) handleSectionLinkClick(event, link.href, lenis)
                }}
                className="flex min-h-11 items-center text-[13px] font-medium text-neutral-600 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button type="button" onClick={() => setLang(es ? 'en' : 'es')} className="flex h-9 min-w-9 items-center justify-center justify-self-end rounded-full text-[13px] font-medium transition-colors hover:bg-neutral-100" aria-label={es ? 'Cambiar a inglés' : 'Switch to Spanish'}>{es ? 'EN' : 'ES'}</button>
        </div>
      </header>
    </>
  )
}
