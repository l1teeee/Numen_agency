'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
})

export function HeroSection() {
  return (
    <section id="hero" className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black px-6">
      {/* Grid — stronger color, visible breathing pulse */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:60px_60px]"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,transparent_30%,#000_100%)]" />

      {/* Content — staggered entrance */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          {...enter(0.1)}
          className="mb-8 text-xs uppercase tracking-[0.3em] text-white/25"
        >
          Numen Agency
        </motion.span>

        <motion.h1
          {...enter(0.2)}
          className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          We Build Digital Products
        </motion.h1>

        <motion.p
          {...enter(0.32)}
          className="mt-5 max-w-sm text-base leading-relaxed text-white/40"
        >
          Design-driven development for brands that demand excellence.
        </motion.p>

        <motion.div {...enter(0.44)} className="mt-10 flex items-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white px-8 text-black hover:bg-white/90"
          >
            <Link href="#work">View Our Work</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="rounded-full border border-white/[0.08] px-8 text-white/50 hover:border-white/[0.16] hover:bg-transparent hover:text-white"
          >
            <Link href="#contact">Let&apos;s Talk</Link>
          </Button>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        {...enter(0.6)}
        className="absolute inset-x-0 bottom-0 px-8 py-6 lg:px-16"
      >
        <div className="flex items-center justify-between border-t border-white/[0.08] pt-5">
          <span className="text-xs text-white/20">01</span>
          <span className="text-xs text-white/20">Scroll to explore ↓</span>
        </div>
      </motion.div>
    </section>
  )
}
