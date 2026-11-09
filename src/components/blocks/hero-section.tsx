'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useLang } from '@/lib/lang'
import { NumenArtLink } from '@/components/ui/numen-art-link'
import { HeroWordmark } from '@/components/ui/hero-wordmark'
import { SectionFocusFade } from './editorial-shell'

const EASE = [0.22, 1, 0.36, 1] as const

const HERO_VIDEO_SRC = '/6466848-hd_1920_1080_30fps.mp4'

export function HeroSection() {
  const { t } = useLang()
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useReducedMotion()

  // The reduced-motion preference is only known after hydration, when autoPlay has already started.
  useEffect(() => {
    if (reducedMotion) videoRef.current?.pause()
  }, [reducedMotion])

  return (
    <section id="hero" className="hero-editorial flex min-h-svh flex-col bg-white p-4 pb-[2.45rem] sm:p-6 sm:pb-[3.85rem] lg:p-[3.25rem] lg:pb-[8.4rem]">
      <SectionFocusFade visibleOnLoad className="flex flex-1 flex-col">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, ease: EASE, delay: reducedMotion ? 0 : 0.05 }}
          className="relative min-h-64 flex-1 overflow-hidden bg-neutral-200"
        >
          <video
            ref={videoRef}
            src={HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[72%_50%] grayscale"
          />
          <h1 className="absolute bottom-[4.25rem] left-3 text-black sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
            <HeroWordmark />
            <span className="mt-3 block text-[clamp(11.5px,3.4vw,13px)] font-medium leading-snug sm:mt-4 sm:text-base">
              {t.hero.summary.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </span>
          </h1>
          <NumenArtLink className="absolute bottom-3 right-3 active:scale-[0.98] sm:bottom-6 sm:right-20 lg:bottom-8 lg:right-14" />
        </motion.div>
      </SectionFocusFade>
    </section>
  )
}
