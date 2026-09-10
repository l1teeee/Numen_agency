'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle'
import { NumenMark } from '@/components/ui/doodles/numen-mark'
import { useLang } from '@/lib/lang'
import { handleSectionLinkClick } from '@/lib/section-scroll'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const { lang, setLang, t } = useLang()
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const es = lang === 'es'
  const links = [
    { href: '#services', label: t.nav.links[0].label },
    { href: '/projects', label: t.nav.projectsLink },
    { href: '#about', label: t.nav.links[2].label },
    { href: '/blog', label: t.blog.label },
  ]

  useEffect(() => {
    if (!menuOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    function onPointer(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen])

  function destination(href: string) {
    return href.startsWith('#') && pathname !== '/' ? '/' + href : href
  }

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setMenuOpen(false)
    if (pathname === '/') handleSectionLinkClick(event, href, lenis)
  }

  return (
    <>
      <a href="#main-content" className="skip-link">{es ? 'Saltar al contenido' : 'Skip to content'}</a>
      <header ref={headerRef} className="fixed inset-x-4 top-4 z-100 mx-auto max-w-[1408px] sm:inset-x-8 lg:inset-x-12">
        <div className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-foreground/12 bg-background/95 px-4 backdrop-blur-xl sm:px-6">
          <Link href="/" aria-label={es ? 'Numen, inicio' : 'Numen, home'} className="group relative flex min-h-11 items-center text-foreground" onClick={() => setMenuOpen(false)}>
            <NumenMark className="h-6 w-6" />
            {/* Absolute so the wordmark can appear over the empty space to its
                right without pushing the centre nav sideways. */}
            <span aria-hidden="true" className={cn('pointer-events-none absolute left-full top-1/2 ml-2.5 -translate-y-1/2 whitespace-nowrap text-xl font-semibold tracking-[-0.07em] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100', !reducedMotion && '-translate-x-1 transition duration-300 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0')}>numen<span className="text-foreground/40">.</span></span>
          </Link>
          <nav aria-label={es ? 'Navegación principal' : 'Main navigation'} className="hidden items-center gap-7 lg:flex">
            {links.map((link) => <Link key={link.href} href={destination(link.href)} onClick={(event) => navigate(event, link.href)} aria-current={pathname === link.href ? 'page' : undefined} className="flex min-h-11 items-center text-xs font-medium text-foreground/50 transition-colors hover:text-foreground aria-[current=page]:text-foreground">{link.label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <AnimatedThemeToggle />
            <button type="button" onClick={() => setLang(es ? 'en' : 'es')} className="flex h-11 min-w-11 items-center justify-center rounded-full text-xs font-semibold transition-colors hover:bg-foreground/5" aria-label={es ? 'Cambiar a inglés' : 'Switch to Spanish'}>{es ? 'EN' : 'ES'}</button>
            <Link href={destination('#contact')} onClick={(event) => navigate(event, '#contact')} className="ml-2 hidden min-h-11 items-center gap-5 rounded-full bg-foreground px-5 text-xs font-semibold text-background transition-opacity hover:opacity-80 sm:flex">{t.nav.contact}<ArrowUpRight size={14} aria-hidden="true" /></Link>
            <button ref={menuButton} type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? (es ? 'Cerrar menú' : 'Close menu') : (es ? 'Abrir menú' : 'Open menu')} onClick={() => setMenuOpen(!menuOpen)} className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/12 lg:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && <motion.nav id="mobile-navigation" aria-label={es ? 'Navegación móvil' : 'Mobile navigation'} initial={reducedMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }} className="mt-2 rounded-2xl border border-foreground/12 bg-background p-4 lg:hidden">
            {[...links, { href: '#process', label: t.nav.links[3].label }, { href: '#faq', label: 'FAQ' }, { href: '#contact', label: t.nav.contact }].map((link) => <Link key={link.href} href={destination(link.href)} onClick={(event) => navigate(event, link.href)} className="flex min-h-12 items-center justify-between border-b border-foreground/8 px-2 text-sm last:border-0">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}
          </motion.nav>}
        </AnimatePresence>
      </header>
    </>
  )
}
