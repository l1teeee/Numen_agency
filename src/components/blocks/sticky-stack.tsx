'use client'

import { useRef } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { ServicesSection, ProjectsSection, AboutSection } from './sections'

interface BlurStyle {
  filter: MotionValue<string>
  opacity: MotionValue<number>
}

function useBlurStyle(
  scrollYProgress: MotionValue<number>,
  start: number,
  end: number,
): BlurStyle {
  const blurPx = useTransform(scrollYProgress, [start, end], [0, 7])
  const opacity = useTransform(scrollYProgress, [start, end], [1, 0.35])
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`)
  return { filter, opacity }
}

export function StickyStack() {
  const containerRef = useRef<HTMLDivElement>(null)

  // progress 0 = container top at viewport top
  // progress 1 = container bottom at viewport top (spans 300 vh of scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Projects enters viewport at ~0.33, sticks at ~0.33 — blur Services during that approach
  const servicesBlur = useBlurStyle(scrollYProgress, 0.18, 0.38)
  // About enters viewport at ~0.67 — blur Projects during that approach
  const projectsBlur = useBlurStyle(scrollYProgress, 0.51, 0.71)

  return (
    <div ref={containerRef} style={{ height: '300vh' }}>
      <ServicesSection blurStyle={servicesBlur} />
      <ProjectsSection blurStyle={projectsBlur} />
      <AboutSection />
    </div>
  )
}
