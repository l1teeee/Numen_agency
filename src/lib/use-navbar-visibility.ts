'use client'

import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

const HOME_REVEAL_OFFSET = 8

// The home hero stays a clean frame, so the header waits for the first scroll and only leaves back at the top. Other pages have no hero and always show it.
export function useNavbarVisible(isHome: boolean): boolean {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y >= HOME_REVEAL_OFFSET))
  return !isHome || scrolled
}
