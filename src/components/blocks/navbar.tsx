'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle'
import { useLang } from '@/lib/lang'
import type { Lang } from '@/lib/translations'
import { SECTION_HREFS, handleSectionLinkClick } from '@/lib/section-scroll'

const EASE = [0.22, 1, 0.36, 1] as const
const MENU_TIMEOUT = 5000

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      className="rounded-full border border-foreground/8 px-2.5 py-1 text-[10px] font-semibold text-foreground/40 transition-colors duration-200 hover:border-foreground/16 hover:text-foreground/70"
      aria-label="Switch language"
    >
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  )
}

export function Navbar({ alwaysVisible }: { alwaysVisible?: boolean } = {}) {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lenis = useLenis()
  const { lang, setLang, t } = useLang()
  const pathname = usePathname()
  const isHome = pathname === '/'

  const contactHref = SECTION_HREFS.contact

  useEffect(() => {
    if (alwaysVisible) { setVisible(true); return }
    const onScroll = () => setVisible(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [alwaysVisible])

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  function openMenu() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setMenuOpen(true)
    timerRef.current = setTimeout(() => setMenuOpen(false), MENU_TIMEOUT)
  }

  function resetTimer() {
    if (!menuOpen) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setMenuOpen(false), MENU_TIMEOUT)
  }

  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) handleSectionLinkClick(e, contactHref, lenis)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed top-5 left-1/2 z-100 -translate-x-1/2"
        >
          <div className="flex items-center rounded-full border border-foreground/8 bg-background/70 px-3 py-2 backdrop-blur-xl">
            <Link
              href="/"
              className="shrink-0 whitespace-nowrap px-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/40 transition-colors duration-200 hover:text-foreground/70"
              onMouseEnter={openMenu}
              onClick={openMenu}
            >
              Numen Agency
            </Link>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
                  initial={{ opacity: 0, maxWidth: 0 }}
                  animate={{
                    opacity: 1,
                    maxWidth: 320,
                    transition: { duration: 0.4, ease: EASE },
                  }}
                  exit={{
                    opacity: 0,
                    maxWidth: 0,
                    transition: { duration: 0.3, ease: 'linear' },
                  }}
                  onMouseEnter={resetTimer}
                  onMouseLeave={resetTimer}
                >
                  <div className="mx-1 h-3.5 w-px shrink-0 bg-foreground/8" />
                  <Link
                    href="/projects"
                    className="shrink-0 whitespace-nowrap px-1 text-xs text-foreground/40 transition-colors duration-200 hover:text-foreground/70"
                  >
                    {t.nav.projectsLink}
                  </Link>
                  <Link
                    href="/blog"
                    className="shrink-0 whitespace-nowrap px-1 text-xs text-foreground/40 transition-colors duration-200 hover:text-foreground/70"
                  >
                    {t.blog.label}
                  </Link>
                  <div className="mx-1 h-3.5 w-px shrink-0 bg-foreground/8" />
                  <AnimatedThemeToggle className="mr-0.5 shrink-0" />
                  <LangToggle lang={lang} setLang={setLang} />
                  <div className="mx-1 h-3.5 w-px shrink-0 bg-foreground/8" />
                  <a
                    href={isHome ? contactHref : `/${contactHref}`}
                    onClick={handleContact}
                    className="shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity duration-200 hover:opacity-80"
                  >
                    {t.nav.contact}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
