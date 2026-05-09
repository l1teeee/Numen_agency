'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const
import { MessageCircle, X, Send } from 'lucide-react'

export function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('sent')
  }

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="w-80 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-xs font-medium text-white/40">
                    N
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-black bg-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Numen Agency</p>
                  <p className="text-xs text-white/30">Usually replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/30 transition-colors hover:text-white"
                aria-label="Close chat"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-3 px-5 py-4">
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-[10px] font-medium text-white/40">
                  JM
                </div>
                <div className="max-w-[210px] rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-3 text-sm leading-relaxed text-white/70">
                  Hey! Tell us about your project and we&apos;ll get back to you right away.
                </div>
              </div>
            </div>

            {/* Input */}
            {status === 'sent' ? (
              <div className="border-t border-white/[0.08] px-5 py-4 text-center">
                <p className="text-sm text-white/50">
                  Message sent! We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={send}
                className="flex items-center gap-2 border-t border-white/[0.08] px-4 py-3"
              >
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="text-white/30 transition-colors hover:text-white disabled:opacity-20"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-white/10"
        aria-label="Open chat"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
