'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { ArrowUpRight, AtSign, Menu, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle'
import { NumenMark } from '@/components/ui/doodles/numen-mark'
import { useLang } from '@/lib/lang'
import { handleSectionLinkClick } from '@/lib/section-scroll'
import { cn } from '@/lib/utils'

const HERO_TOP_THRESHOLD = 48
type NavLink = { href: string; label: string }

type NavbarDockProps = {
  links: NavLink[]
  destination: (href: string) => string
  navigate: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void
  onHome: () => void
  onToggleLanguage: () => void
  pathname: string
  es: boolean
  reducedMotion: boolean
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const { lang, setLang, t } = useLang()
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const [atPageTop, setAtPageTop] = useState(true)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const isAtTop = y < HERO_TOP_THRESHOLD
    setAtPageTop(isAtTop)
    if (!isAtTop) setMenuOpen(false)
  })
  const es = lang === 'es'
  const links = [
    { href: '#services', label: t.nav.links[0].label },
    { href: '/projects', label: t.nav.projectsLink },
    { href: '#about', label: t.nav.links[2].label },
    { href: '/blog', label: t.blog.label },
  ]
  const mobileLinks = [...links, { href: '#process', label: t.nav.links[3].label }, { href: '#faq', label: 'FAQ' }, { href: '#contact', label: t.nav.contact }]

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

  function scrollHome() {
    if (lenis) {
      lenis.scrollTo(0, { immediate: reducedMotion })
    } else {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-link">{es ? 'Saltar al contenido' : 'Skip to content'}</a>
      <header ref={headerRef} inert={!atPageTop} className={cn('fixed inset-x-0 top-0 z-100 pt-5 sm:pt-7 lg:pt-10', atPageTop ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0', !reducedMotion && 'transition-[opacity,transform] duration-400 ease-out')}>
        <div className="h-14 px-5 sm:px-8 lg:px-12">
          <div className="mx-auto grid h-full max-w-[1408px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6">
            <Link href="/" aria-label={es ? 'Numen, inicio' : 'Numen, home'} className="group relative flex min-h-11 items-center justify-self-start text-foreground" onClick={() => setMenuOpen(false)}>
              <NumenMark className="h-5 w-5" />
              {/* Absolute so the wordmark can appear over the empty space to its
                  right without pushing the centre nav sideways. */}
              <span aria-hidden="true" className={cn('pointer-events-none absolute left-full top-1/2 ml-2.5 -translate-y-1/2 whitespace-nowrap text-lg font-semibold tracking-[-0.07em] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100', !reducedMotion && '-translate-x-1 transition duration-300 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0')}>numen<span className="text-foreground/40">.</span></span>
            </Link>
            <nav aria-label={es ? 'Navegación principal' : 'Main navigation'} className="hidden items-center gap-8 lg:flex">
              {links.map((link) => <Link key={link.href} href={destination(link.href)} onClick={(event) => navigate(event, link.href)} aria-current={pathname === link.href ? 'page' : undefined} className="flex min-h-9 items-center text-[13px] font-medium text-neutral-500 transition-colors hover:text-neutral-900 aria-[current=page]:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 dark:aria-[current=page]:text-neutral-100">{link.label}</Link>)}
            </nav>
            <div className="col-start-3 flex items-center justify-self-end gap-2">
              <AnimatedThemeToggle className="h-9 w-9 border-0" />
              <button type="button" onClick={() => setLang(es ? 'en' : 'es')} className="flex h-9 min-w-9 items-center justify-center rounded-full text-[13px] font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900" aria-label={es ? 'Cambiar a inglés' : 'Switch to Spanish'}>{es ? 'EN' : 'ES'}</button>
              <Link href={destination('#contact')} onClick={(event) => navigate(event, '#contact')} className="ml-1 hidden h-8 items-center gap-2 rounded-full bg-foreground px-3.5 text-[13px] font-medium text-background transition-opacity hover:opacity-80 sm:flex">{t.nav.contact}<ArrowUpRight size={13} aria-hidden="true" /></Link>
              <button ref={menuButton} type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? (es ? 'Cerrar menú' : 'Close menu') : (es ? 'Abrir menú' : 'Open menu')} onClick={() => setMenuOpen(!menuOpen)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 lg:hidden">{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && <motion.nav id="mobile-navigation" aria-label={es ? 'Navegación móvil' : 'Mobile navigation'} initial={reducedMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }} className="mx-5 mt-2 rounded-xl border border-neutral-200 bg-background p-2 dark:border-neutral-800 lg:hidden">
            {mobileLinks.map((link) => <Link key={link.href} href={destination(link.href)} onClick={(event) => navigate(event, link.href)} className="flex min-h-11 items-center justify-between border-b border-neutral-100 px-2 text-[14px] last:border-0 dark:border-neutral-900">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}
          </motion.nav>}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {!atPageTop && <NavbarDock key="navbar-dock" links={mobileLinks} destination={destination} navigate={navigate} onHome={scrollHome} onToggleLanguage={() => setLang(es ? 'en' : 'es')} pathname={pathname} es={es} reducedMotion={reducedMotion} />}
      </AnimatePresence>
    </>
  )
}

function NavbarDock({ links, destination, navigate, onHome, onToggleLanguage, pathname, es, reducedMotion }: NavbarDockProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const dockRef = useRef<HTMLDivElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    function onPointer(event: PointerEvent) {
      if (!dockRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen])

  function onLinkClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setMenuOpen(false)
    navigate(event, href)
  }

  const buttonClass = 'flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10'

  return (
    <motion.div ref={dockRef} initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }} transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 bottom-5 z-100 mx-auto w-fit">
      <div id="dock-menu" className="absolute bottom-full left-1/2 mb-3 w-60 -translate-x-1/2">
        <AnimatePresence>
          {menuOpen && (
            <motion.nav aria-label={es ? 'Navegación móvil' : 'Mobile navigation'} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }} className="rounded-2xl bg-neutral-950 p-2 text-white ring-1 ring-white/10 dark:bg-neutral-900">
              {links.map((link) => <Link key={link.href} href={destination(link.href)} onClick={(event) => onLinkClick(event, link.href)} className="flex min-h-10 items-center justify-between rounded-lg px-3 text-[14px] text-white/80 hover:bg-white/10 hover:text-white">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}
              <div className="mt-2 flex items-center justify-between border-t border-white/10 px-1 pt-2">
                <AnimatedThemeToggle className="h-9 w-9 border-0 text-white/70 hover:text-white" />
                <button type="button" onClick={onToggleLanguage} className="flex h-9 min-w-9 items-center justify-center rounded-full text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white" aria-label={es ? 'Cambiar a inglés' : 'Switch to Spanish'}>{es ? 'EN' : 'ES'}</button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-neutral-950 p-1.5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 dark:bg-neutral-900">
        {pathname === '/' ? (
          <button type="button" onClick={onHome} aria-label={es ? 'Numen, inicio' : 'Numen, home'} className={buttonClass}><NumenMark className="h-4 w-4" /></button>
        ) : (
          <Link href="/" aria-label={es ? 'Numen, inicio' : 'Numen, home'} className={buttonClass}><NumenMark className="h-4 w-4" /></Link>
        )}
        <button ref={menuButton} type="button" aria-expanded={menuOpen} aria-controls="dock-menu" aria-label={menuOpen ? (es ? 'Cerrar menú' : 'Close menu') : (es ? 'Abrir menú' : 'Open menu')} onClick={() => setMenuOpen(!menuOpen)} className={buttonClass}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        <Link href={destination('#contact')} onClick={(event) => onLinkClick(event, '#contact')} aria-label={es ? 'Ir a contacto' : 'Go to contact'} className={buttonClass}><AtSign size={18} /></Link>
      </div>
    </motion.div>
  )
}
