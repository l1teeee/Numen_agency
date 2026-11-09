'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const EASE = [0.22, 1, 0.36, 1] as const
const LETTERS = ['N', 'u', 'm', 'e', 'n']

// Rendered inside the hero h1, so it only uses inline elements.
export function HeroWordmark() {
  const reducedMotion = useReducedMotion()

  return (
    <span className="flex items-start">
      <span role="img" aria-label="Numen" className="-ml-[0.07em] text-[clamp(4rem,11vw,13rem)] font-medium leading-[0.85] tracking-[-0.06em] opacity-[0.62]">
        {LETTERS.map((letter, index) => (
          <motion.span
            key={letter}
            className="inline-block"
            initial={reducedMotion ? false : { opacity: 0, y: '16%', filter: 'blur(16px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: reducedMotion ? 0 : 1.4, ease: EASE, delay: reducedMotion ? 0 : 0.2 + index * 0.09 }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
      <span aria-hidden="true" className="ml-2 mt-1.5 whitespace-nowrap text-[clamp(10px,0.75vw,13px)] font-medium leading-tight tabular-nums text-black/70 sm:ml-3 sm:mt-2.5 lg:mt-4">
        13.69° N
        <br />
        89.22° W
      </span>
    </span>
  )
}
