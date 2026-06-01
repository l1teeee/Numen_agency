'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

  useEffect(() => {
    const stored = localStorage.getItem('numen-lang') as Lang | null
    if (stored === 'en' || stored === 'es') setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setFlashKey((k) => k + 1)
    // Swap text after a brief delay so the flash covers the snap
    setTimeout(() => setLangState(l), 80)
    localStorage.setItem('numen-lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
      {/* Full-screen overlay that flashes on lang change, giving a soft transition feel */}
      {flashKey > 0 && (
        <motion.div
          key={flashKey}
          initial={{ opacity: 0.18 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
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
