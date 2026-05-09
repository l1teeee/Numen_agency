'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: EASE, delay },
})

export function HeroSection() {
  return (
    <section id="hero" className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Grid — uses CSS var so it flips with theme */}
      <motion.div
        className="absolute inset-0 bg-[size:60px_60px]"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 30%, var(--vignette) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          {...enter(0.1)}
          className="mb-8 text-xs uppercase tracking-[0.3em] text-foreground/25"
        >
          Numen Agency
        </motion.span>

        <motion.h1
          {...enter(0.2)}
          className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          We Build Digital Products
        </motion.h1>

        <motion.p
          {...enter(0.32)}
          className="mt-5 max-w-md text-base leading-relaxed text-foreground/40"
        >
          Design-driven development for startups and founders that demand excellence. We turn ideas into products people actually use.
        </motion.p>

        <motion.div {...enter(0.44)} className="mt-10 flex items-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
          >
            <Link href="#work">View Our Work</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="rounded-full border border-foreground/[0.08] px-8 text-foreground/50 hover:border-foreground/[0.16] hover:bg-transparent hover:text-foreground"
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
        <div className="flex items-center justify-between border-t border-foreground/[0.08] pt-5">
          <span className="text-xs text-foreground/20">01</span>
          <span className="text-xs text-foreground/20">Scroll to explore ↓</span>
        </div>
      </motion.div>
    </section>
  )
}
