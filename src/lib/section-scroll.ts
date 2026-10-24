'use client'

import type { MouseEvent } from 'react'

type SectionScroller = {
  scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number; immediate?: boolean }) => void
}

// Long jumps feel calmer when they ease in as well as out.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export const SECTION_HREFS = {
  services: '#services',
  work: '#work',
  about: '#about',
  reach: '#reach',
  blog: '#blog',
  process: '#process',
  faq: '#faq',
  contact: '#contact',
} as const

function getAbsoluteTop(el: HTMLElement): number {
  let top = 0
  let curr: HTMLElement | null = el

  while (curr) {
    top += curr.offsetTop
    curr = curr.offsetParent as HTMLElement | null
  }

  return top
}

function findSection(href: string): HTMLElement | null {
  if (!href.startsWith('#') || href.length <= 1) return null

  try {
    return document.querySelector(href) as HTMLElement | null
  } catch {
    return null
  }
}

export function scrollToSection(href: string, scroller?: SectionScroller | null) {
  const target = findSection(href)
  if (!target) return false

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Sections carry top padding; 40px keeps titles clear of the fixed navbar on phones.
  const top = Math.max(0, getAbsoluteTop(target) - 40)

  if (scroller) {
    scroller.scrollTo(top, { duration: 1.4, easing: easeInOutCubic, immediate: reducedMotion })
  } else {
    window.scrollTo({ top, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  return true
}

export function handleSectionLinkClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  scroller?: SectionScroller | null,
) {
  if (!href.startsWith('#')) return
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  event.preventDefault()
  if (scrollToSection(href, scroller)) window.history.replaceState(null, '', href)
}
