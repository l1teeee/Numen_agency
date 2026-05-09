"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  title?: string
  highlightText?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
  colors?: string[]
  distortion?: number
  swirl?: number
  speed?: number
  offsetX?: number
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  buttonClassName?: string
  maxWidth?: string
  veilOpacity?: string
}

export function HeroSection({
  title = "Intelligent AI Agents for",
  highlightText = "Smart Brands",
  description = "Transform your brand and evolve it through AI-driven brand guidelines and always up-to-date core components.",
  buttonText = "Join Waitlist",
  onButtonClick,
  colors = ["#000000", "#0a0a0a", "#1a1a1a", "#ffffff", "#d0d0d0", "#606060"],
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.42,
  offsetX = 0.08,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-6xl",
  veilOpacity = "bg-black/50",
}: HeroSectionProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <section
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black ${className}`}
    >
      <div className="fixed inset-0 h-screen w-screen">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div className={`pointer-events-none absolute inset-0 ${veilOpacity}`} />
          </>
        )}
      </div>

      <div className={`relative z-10 mx-auto w-full px-6 ${maxWidth}`}>
        <div className="text-center">
          <h1
            className={`mb-6 text-balance text-4xl font-extrabold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl xl:text-[80px] xl:leading-[1.05] ${titleClassName}`}
          >
            {title}{" "}
            <span className="text-white/20">{highlightText}</span>
          </h1>
          <p
            className={`mx-auto mb-10 max-w-2xl text-pretty px-4 text-lg leading-relaxed text-white/40 sm:text-xl ${descriptionClassName}`}
          >
            {description}
          </p>
          <button
            onClick={onButtonClick}
            className={`rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:px-10 sm:py-5 sm:text-base ${buttonClassName}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}
