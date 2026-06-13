'use client'

import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang'

const SECTION_IDS = ['services', 'work', 'about', 'stack', 'process', 'faq', 'contact'] as const

export function ScrollLegend({ className }: { className?: string }) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const lenis = useLenis()
  const { t } = useLang()

  const items = [
    { id: 'services', name: t.nav.links[0].label },
    { id: 'work',     name: t.nav.links[1].label },
    { id: 'about',    name: t.nav.links[2].label },
    { id: 'stack',    name: t.nav.links[3].label },
    { id: 'process',  name: t.nav.links[4].label },
    { id: 'faq',      name: t.nav.links[5].label },
    { id: 'contact',  name: t.contact.label },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const firstEl = document.getElementById(SECTION_IDS[0])
      if (firstEl) {
        setVisible(firstEl.getBoundingClientRect().top < window.innerHeight * 0.9)
      } else {
        setVisible(window.scrollY > 300)
      }

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setActiveSection(SECTION_IDS[i])
          return
        }
      }
      setActiveSection('')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 })
    } else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
    }
  }

  return (
    <div
      className={cn(
        'fixed right-5 top-1/2 -translate-y-1/2 z-90 transition-[opacity,transform] duration-300',
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative flex flex-row-reverse items-center gap-4 group"
              aria-label={`Go to ${item.name}`}
            >
              <div
                className={cn(
                  'h-px rounded-full transition-all duration-300',
                  isActive
                    ? 'w-10 bg-foreground'
                    : 'w-5 bg-foreground/25 group-hover:w-8 group-hover:bg-foreground/40',
                )}
              />
              <span
                className={cn(
                  'text-[13px] font-medium whitespace-nowrap transition-all duration-200',
                  isActive ? 'text-foreground' : 'text-foreground/40',
                  isHovered
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-1 pointer-events-none',
                )}
              >
                {item.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
