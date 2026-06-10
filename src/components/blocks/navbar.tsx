'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle'
import { useLang } from '@/lib/lang'
import type { Lang } from '@/lib/translations'
import { SECTION_HREFS, handleSectionLinkClick } from '@/lib/section-scroll'

const EASE = [0.22, 1, 0.36, 1] as const

const allIds = Object.keys(SECTION_HREFS)

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

export function Navbar() {
  const [open,    setOpen]    = useState(false)
  const [visible, setVisible] = useState(false)
  const [active,  setActive]  = useState('')
  const lenis = useLenis()
  const { lang, setLang, t } = useLang()

  const links = t.nav.links
  const contactLink = { label: t.nav.contact, href: SECTION_HREFS.contact }
  const allLinks = [...links, contactLink]

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const updateActive = useCallback(() => {
    let activeId = ''
    for (const id of allIds) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= 1) activeId = id
    }
    setActive(activeId ? '#' + activeId : '')
  }, [])

  useEffect(() => {
    const raf = requestAnimationFrame(updateActive)
    window.addEventListener('scroll', updateActive, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', updateActive)
    }
  }, [updateActive])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    handleSectionLinkClick(e, href, lenis)
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
          {/* Desktop */}
          <div className="hidden items-center gap-1 rounded-full border border-foreground/8 bg-background/70 px-2 py-2 backdrop-blur-xl lg:flex">
            <span className="shrink-0 whitespace-nowrap px-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/40">
              Numen Agency
            </span>
            <div className="mx-1 h-3.5 w-px bg-foreground/8" />
            <nav className="flex items-center">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  className={`px-3 py-2 text-xs transition-colors duration-200 hover:text-foreground ${
                    active === l.href ? 'text-foreground' : 'text-foreground/40'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mx-1 h-3.5 w-px bg-foreground/8" />
            <AnimatedThemeToggle className="mr-1" />
            <LangToggle lang={lang} setLang={setLang} />
            <div className="mx-1 h-3.5 w-px bg-foreground/8" />
            <a
              href={contactLink.href}
              onClick={(e) => scrollTo(e, contactLink.href)}
              className={`rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity duration-200 hover:opacity-80 ${
                active === contactLink.href ? 'opacity-100' : 'opacity-90'
              }`}
            >
              {contactLink.label}
            </a>
          </div>

          {/* Mobile */}
          <div className="relative flex lg:hidden">
            <div className="flex items-center gap-3 rounded-full border border-foreground/8 bg-background/70 px-4 py-2.5 backdrop-blur-xl">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/40">
                Numen
              </span>
              <AnimatedThemeToggle />
              <LangToggle lang={lang} setLang={setLang} />
              <button
                onClick={() => setOpen((p) => !p)}
                className="text-foreground/40 transition-colors hover:text-foreground"
                aria-label="Toggle menu"
              >
                {open ? <X size={14} /> : <Menu size={14} />}
              </button>
            </div>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 rounded-2xl border border-foreground/8 bg-background/80 p-1.5 backdrop-blur-xl"
                >
                  {allLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => scrollTo(e, l.href)}
                      className={`block rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground ${
                        active === l.href ? 'text-foreground' : 'text-foreground/40'
                      }`}
                    >
                      {l.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
