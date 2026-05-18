'use client'

import { useRef, useState, useEffect } from 'react'
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

function r(k: number): [number, number] {
  const base = (k - 1) / TOTAL
  return [base + 0.06, base + 0.12]
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isDesktop
}

export function StickyStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()

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

  const blur = isDesktop
    ? { b1, b2, b3, b4, b5, b6, b7 }
    : { b1: undefined, b2: undefined, b3: undefined, b4: undefined, b5: undefined, b6: undefined, b7: undefined }

  return (
    <div ref={containerRef} style={{ height: `${TOTAL * 100}vh` }}>
      <ServicesSection blurStyle={blur.b1} />
      <ProjectsSection blurStyle={blur.b2} />
      <AboutSection blurStyle={blur.b3} />
      <TestimonialsSection blurStyle={blur.b4} />
      <TechStackSection blurStyle={blur.b5} />
      <ProcessSection blurStyle={blur.b6} />
      <FAQSection blurStyle={blur.b7} />
      <ContactFormSection />
    </div>
  )
}
