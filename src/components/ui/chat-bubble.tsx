'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

type Message = { role: 'user' | 'assistant'; content: string }

const INITIAL: Message[] = [
  {
    role: 'assistant',
    content: "Hi! I'm Numen's AI assistant. Ask me anything about our services, process, pricing, or how we can help build your project.",
  },
]

export function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply ?? 'Sorry, something went wrong. Please try again.' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again or email us at hola@numenagency.com.' },
      ])
    } finally {
      setLoading(false)
    }
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
            className="flex w-80 flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-background/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-foreground/[0.08] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/[0.08] text-xs font-medium text-foreground/40">
                    N
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Numen AI</p>
                  <p className="text-xs text-foreground/30">Ask about our services</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-foreground/30 transition-colors hover:text-foreground"
                aria-label="Close chat"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-foreground/[0.08] text-[9px] font-medium text-foreground/40">
                      N
                    </div>
                  )}
                  <div
                    className={`max-w-[210px] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-tr-sm bg-foreground text-background'
                        : 'rounded-tl-sm bg-foreground/[0.06] text-foreground/70'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-foreground/[0.08] text-[9px] font-medium text-foreground/40">
                    N
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-foreground/[0.06] px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/30 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/30 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/30 [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={send}
              className="flex shrink-0 items-center gap-2 border-t border-foreground/[0.08] px-4 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/20 focus:outline-none disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="text-foreground/30 transition-colors hover:text-foreground disabled:opacity-20"
                aria-label="Send"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg shadow-white/10"
        aria-label="Open chat"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-foreground/20" />
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
