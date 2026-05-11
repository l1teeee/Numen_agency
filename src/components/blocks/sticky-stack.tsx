'use client'

import { useRef } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'
import {
  ServicesSection,
  ProjectsSection,
  AboutSection,
  TestimonialsSection,
  TechStackSection,
  ProcessSection,
  FAQSection,
  ContactFormSection,
} from './sections'

export interface BlurStyle {
  filter: MotionValue<string>
}

function useBlurStyle(
  scrollYProgress: MotionValue<number>,
  start: number,
  end: number,
): BlurStyle {
  const blurPx = useTransform(scrollYProgress, [start, end], [0, 8])
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`)
  return { filter }
}

const TOTAL = 8

// blur starts when next section covers ~48% of viewport, ends at ~96%
function r(k: number): [number, number] {
  const base = (k - 1) / TOTAL
  return [base + 0.06, base + 0.12]
}

export function StickyStack() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const b1 = useBlurStyle(scrollYProgress, ...r(1))
  const b2 = useBlurStyle(scrollYProgress, ...r(2))
  const b3 = useBlurStyle(scrollYProgress, ...r(3))
  const b4 = useBlurStyle(scrollYProgress, ...r(4))
  const b5 = useBlurStyle(scrollYProgress, ...r(5))
  const b6 = useBlurStyle(scrollYProgress, ...r(6))
  const b7 = useBlurStyle(scrollYProgress, ...r(7))

  return (
    <div ref={containerRef} style={{ height: `${TOTAL * 100}vh` }}>
      <ServicesSection blurStyle={b1} />
      <ProjectsSection blurStyle={b2} />
      <AboutSection blurStyle={b3} />
      <TestimonialsSection blurStyle={b4} />
      <TechStackSection blurStyle={b5} />
      <ProcessSection blurStyle={b6} />
      <FAQSection blurStyle={b7} />
      <ContactFormSection />
    </div>
  )
}
