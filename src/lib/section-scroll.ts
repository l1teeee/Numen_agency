'use client'

import type { MouseEvent } from 'react'

type SectionScroller = {
  scrollTo: (target: number, options?: { duration?: number }) => void
}

export const SECTION_HREFS = {
  services: '#services',
  work: '#work',
  about: '#about',
  reach: '#reach',
  stack: '#stack',
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

  if (scroller) {
    scroller.scrollTo(getAbsoluteTop(target), { duration: 1.4 })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return true
}

export function handleSectionLinkClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  scroller?: SectionScroller | null,
) {
  if (!href.startsWith('#')) return

  event.preventDefault()
  scrollToSection(href, scroller)
}
