'use client'

import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

// Past this offset the hero no longer owns the first screen: the navbar swaps to the dock and the chat launcher shows on phones.
const HERO_TOP_THRESHOLD = 48

export function useAtPageTop(onLeaveTop?: () => void): boolean {
  const { scrollY } = useScroll()
  const [atPageTop, setAtPageTop] = useState(true)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const isAtTop = y < HERO_TOP_THRESHOLD
    setAtPageTop(isAtTop)
    if (!isAtTop) onLeaveTop?.()
  })
  return atPageTop
}
