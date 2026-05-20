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
      {/* Atmospheric orb — slow drift, brand-warm glow */}
      <motion.div
        className="pointer-events-none absolute rounded-full blur-[120px]"
        style={{ width: 560, height: 560, top: '0%', left: '10%', background: 'radial-gradient(circle, rgba(200,85,58,0.07) 0%, transparent 70%)' }}
        animate={{ x: [0, 60, -30, 0], y: [0, 50, 20, 0], scale: [1, 1.12, 0.94, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute rounded-full blur-[100px]"
        style={{ width: 400, height: 400, bottom: '5%', right: '8%', background: 'radial-gradient(circle, rgba(200,85,58,0.05) 0%, transparent 70%)' }}
        animate={{ x: [0, -40, 20, 0], y: [0, -30, 15, 0], scale: [1, 1.08, 0.97, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
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
          Numen
        </motion.span>

        <motion.h1
          {...enter(0.2)}
          className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          From Idea to Production in Weeks.
        </motion.h1>

        <motion.p
          {...enter(0.32)}
          className="mt-5 max-w-md text-base leading-relaxed text-foreground/40"
        >
          Numen is a digital product studio from El Salvador. We build full-stack apps, SaaS platforms, and AI-powered tools — with the speed of a startup and the craft of a senior team.
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
            className="rounded-full border border-foreground/8 px-8 text-foreground/50 hover:border-foreground/16 hover:bg-transparent hover:text-foreground"
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
        <div className="flex items-center justify-between border-t border-foreground/8 pt-5">
          <span className="text-xs text-foreground/20">01</span>
          <motion.span
            className="text-xs text-foreground/20"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Scroll to explore ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  )
}
