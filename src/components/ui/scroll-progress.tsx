'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  })

  return (
    <div className="fixed right-4 top-0 z-100 h-screen w-px bg-foreground/6">
      <motion.div
        className="w-full origin-top bg-foreground/25"
        style={{ scaleY, height: '100%' }}
      />
    </div>
  )
}
