'use client'

import type { MouseEvent } from 'react'

type SectionScroller = {
  scrollTo: (target: number, options?: { duration?: number; immediate?: boolean }) => void
}

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
  const stack = el.parentElement
  if (stack?.classList.contains('section-stack')) {
    let top = stack.getBoundingClientRect().top + window.scrollY
    for (const section of stack.children) {
      if (section === el) return top
      top += (section as HTMLElement).offsetHeight
    }
  }

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
  const sticky = getComputedStyle(target).position === 'sticky'
  const top = Math.max(0, getAbsoluteTop(target) - (sticky ? 0 : 96))

  if (scroller) {
    scroller.scrollTo(top, { duration: 1.1, immediate: reducedMotion })
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
