'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, type LucideIcon } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

interface Option {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  name?: string
  icon?: LucideIcon
}

export function SelectCustom({ value, onChange, options, placeholder = 'Select...', name, icon: Icon }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)

  useEffect(() => { setMounted(true) }, [])

  const toggle = () => {
    if (!open && triggerRef.current) setRect(triggerRef.current.getBoundingClientRect())
    setOpen((p) => !p)
  }

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const selected = options.find((o) => o.value === value)

  const dropdown = rect && mounted ? (
    <div
      style={{
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="rounded-2xl border border-white/[0.08] bg-black/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors duration-100 hover:bg-white/[0.06]"
                >
                  <span className={isSelected ? 'text-white' : 'text-white/50'}>{opt.label}</span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.4 }}
                        transition={{ duration: 0.15, type: 'spring', bounce: 0.3 }}
                      >
                        <Check className="h-3.5 w-3.5 text-white/50" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : null

  return (
    <>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        className={`flex w-full items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] py-3 text-left text-sm transition-colors duration-200 hover:border-white/[0.16] focus:border-white/20 focus:outline-none ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
      >
        <span className={selected ? 'text-white' : 'text-white/20'}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          <ChevronDown className="h-3.5 w-3.5 text-white/25" />
        </motion.span>
      </button>

      {mounted && createPortal(dropdown, document.body)}
    </>
  )
}
