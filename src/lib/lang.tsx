'use client'

import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { translations, type Lang, type Translations } from './translations'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [flashKey, setFlashKey] = useState(0)
  const reduceMotion = useReducedMotion()
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('numen-lang') as Lang | null
    if (stored !== 'en' && stored !== 'es') return
    const timer = setTimeout(() => setLangState(stored), 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  const setLang = (l: Lang) => {
    if (l === lang) return
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    localStorage.setItem('numen-lang', l)

    if (reduceMotion) {
      setLangState(l)
      return
    }

    setFlashKey((k) => k + 1)
    timersRef.current = [
      setTimeout(() => setLangState(l), 120),
      setTimeout(() => {
        timersRef.current = []
      }, 380),
    ]
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
      {flashKey > 0 && (
        <motion.div
          key={flashKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.24, 0] }}
          transition={{ duration: 0.38, times: [0, 0.35, 1], ease: ['easeIn', 'easeOut'] }}
          className="pointer-events-none fixed inset-0 z-9999 bg-background"
          style={{ willChange: 'opacity' }}
        />
      )}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
