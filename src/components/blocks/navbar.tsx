'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle'

const EASE = [0.22, 1, 0.36, 1] as const

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
  { label: 'About',   href: '#about'    },
  { label: 'Stack',   href: '#stack'    },
]

const allIds = [...links.map((l) => l.href.slice(1)), 'contact']

export function Navbar() {
  const [open,    setOpen]    = useState(false)
  const [visible, setVisible] = useState(false)
  const [active,  setActive]  = useState('')
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = allIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive('#' + entry.target.id)
        })
      },
      { threshold: 0.25, rootMargin: '-10% 0px -60% 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    lenis?.scrollTo(href, { duration: 1.4 })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
        >
          {/* Desktop */}
          <div className="hidden items-center gap-1 rounded-full border border-foreground/[0.08] bg-background/70 px-2 py-2 backdrop-blur-xl sm:flex">
            <span className="px-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/40">
              Numen
            </span>
            <div className="mx-1 h-3.5 w-px bg-foreground/[0.08]" />
            <nav className="flex items-center">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  className={`px-4 py-2 text-xs transition-colors duration-200 hover:text-foreground ${
                    active === l.href ? 'text-foreground' : 'text-foreground/40'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mx-1 h-3.5 w-px bg-foreground/[0.08]" />
            <AnimatedThemeToggle className="mr-1" />
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity duration-200 hover:opacity-80"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile */}
          <div className="relative flex sm:hidden">
            <div className="flex items-center gap-3 rounded-full border border-foreground/[0.08] bg-background/70 px-4 py-2.5 backdrop-blur-xl">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/40">
                Numen
              </span>
              <AnimatedThemeToggle />
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
                  className="absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 rounded-2xl border border-foreground/[0.08] bg-background/80 p-1.5 backdrop-blur-xl"
                >
                  {[...links, { label: "Let's Talk", href: '#contact' }].map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => scrollTo(e, l.href)}
                      className={`block rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-foreground/[0.05] hover:text-foreground ${
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
