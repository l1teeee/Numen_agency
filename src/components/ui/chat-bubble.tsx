'use client'

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mail, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import { NumenBot } from '@/components/ui/doodles/numen-bot'
import { useLang } from '@/lib/lang'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const EASE = [0.22, 1, 0.36, 1] as const

type Message = { role: 'user' | 'assistant'; content: string; showContact?: boolean; initial?: boolean }

function createInitialMessage(content: string): Message {
  return { role: 'assistant', content, initial: true }
}

/** Fraction of the visible rail one arrow press travels. */
const RAIL_STEP = 0.8

/**
 * Horizontal rail of suggestion chips. The native scrollbar is hidden and each
 * arrow appears only while there is actually room to travel that way, so the
 * control never lies about what it will do.
 */
function SuggestionRail({ children, previousLabel, nextLabel }: { children: ReactNode; previousLabel: string; nextLabel: string }) {
  const railRef = useRef<HTMLDivElement>(null)
  const [canScrollBack, setCanScrollBack] = useState(false)
  const [canScrollOn, setCanScrollOn] = useState(false)

  const sync = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    // Browsers leave a sub-pixel remainder at either end, so a 1px slack keeps
    // an arrow from lingering on a rail that has nowhere left to go.
    const travel = rail.scrollWidth - rail.clientWidth
    setCanScrollBack(rail.scrollLeft > 1)
    setCanScrollOn(rail.scrollLeft < travel - 1)
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(rail)
    return () => observer.disconnect()
  }, [sync])

  function nudge(direction: -1 | 1) {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: direction * rail.clientWidth * RAIL_STEP, behavior: 'smooth' })
  }

  const arrow =
    'absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background text-foreground/70 transition-colors hover:bg-foreground hover:text-background'

  return (
    <div className="relative shrink-0 border-t border-foreground/10">
      <div ref={railRef} onScroll={sync} className="rail-scroll flex gap-2 overflow-x-auto px-4 py-3">
        {children}
      </div>
      {canScrollBack && (
        <>
          {/* The chips run under the arrow, so fade them out rather than let them look cut. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-background via-background/90 to-transparent" />
          <button type="button" onClick={() => nudge(-1)} aria-label={previousLabel} className={`${arrow} left-1.5`}>
            <ChevronLeft size={15} aria-hidden="true" />
          </button>
        </>
      )}
      {canScrollOn && (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-background via-background/90 to-transparent" />
          <button type="button" onClick={() => nudge(1)} aria-label={nextLabel} className={`${arrow} right-1.5`}>
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}

function parseReply(raw: string): { content: string; showContact: boolean } {
  const showContact = /\[CONTACT\]/i.test(raw)
  const content = raw.replace(/\[CONTACT\]/gi, '').trim()
  return { content, showContact }
}

function ContactLinks() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
      className="mt-2.5 flex flex-col gap-1.5"
    >
      <a
        href="mailto:contact@delta-numen.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center gap-2 rounded-xl border border-foreground/20 bg-background px-3 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-foreground hover:text-background"
      >
        <Mail size={14} className="shrink-0" aria-hidden="true" />
        contact@delta-numen.com
      </a>
      <a
        href="https://wa.me/50360463566"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center gap-2 rounded-xl border border-foreground/20 bg-background px-3 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-foreground hover:text-background"
      >
        <MessageSquare size={14} className="shrink-0" aria-hidden="true" />
        WhatsApp · +503 6046 3566
      </a>
    </motion.div>
  )
}

function SmoothText({ text, className }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={text}
        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
        className={className}
      >
        {text}
      </motion.span>
    </AnimatePresence>
  )
}

export function ChatBubble() {
  const { t, lang } = useLang()
  const chat = t.chat
  const es = lang === 'es'
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => [createInitialMessage(chat.initialMessage)])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    bottomRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'nearest',
    })
  }, [messages, loading, open, reduceMotion])

  useEffect(() => {
    if (!open) return
    const focusTimer = window.setTimeout(
      () => inputRef.current?.focus({ preventScroll: true }),
      reduceMotion ? 0 : 250,
    )
    return () => window.clearTimeout(focusTimer)
  }, [open, reduceMotion])

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      triggerRef.current?.focus({ preventScroll: true })
    }
    wasOpenRef.current = open
  }, [open])

  const callApi = async (msgs: Message[]) => {
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: msgs
            .filter((msg) => !msg.initial)
            .map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error('Chat request failed')
      const reply = typeof data.reply === 'string' && data.reply.trim() ? data.reply : chat.fallbackReply
      const { content, showContact } = parseReply(reply)
      setMessages((prev) => [...prev, { role: 'assistant', content, showContact }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: chat.errorReply },
      ])
    } finally {
      setLoading(false)
    }
  }

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    await callApi(next)
  }

  const quickSend = async (text: string) => {
    if (loading) return
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    await callApi(next)
  }

  const showSuggestions = messages.length === 1 && !loading

  return (
    <div ref={containerRef} className="fixed inset-x-4 bottom-4 z-100 flex flex-col items-end gap-3 sm:inset-x-auto sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id="numen-chat-dialog"
            role="dialog"
            aria-modal="false"
            aria-label={chat.title}
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
            className="flex max-h-[calc(100dvh-8rem)] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-foreground/20 bg-background/95 shadow-xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-foreground/8 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <NumenBot state={loading ? 'thinking' : 'idle'} className="h-8 w-8 text-foreground/60" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    <SmoothText text={chat.title} />
                  </p>
                  <p className="text-xs text-foreground/30">
                    <SmoothText text={chat.subtitle} />
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/6 hover:text-foreground"
                aria-label={chat.closeLabel}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              aria-busy={loading}
              className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((msg, i) => {
                const messageContent = msg.initial ? chat.initialMessage : msg.content

                return (
                  <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.role === 'assistant' && <NumenBot className="h-6 w-6 text-foreground/45" />}
                    <div className={`flex flex-col max-w-52 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`break-words rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                          msg.role === 'user'
                            ? 'rounded-tr-sm bg-foreground text-background'
                            : 'rounded-tl-sm bg-foreground/6 text-foreground/70'
                        }`}
                      >
                        <SmoothText text={messageContent} className="block" />
                      </div>
                      {msg.role === 'assistant' && msg.showContact && <ContactLinks />}
                    </div>
                  </div>
                )
              })}

              {loading && (
                <div className="flex gap-2.5">
                  <NumenBot state="thinking" className="h-6 w-6 text-foreground/45" />
                  <div aria-hidden="true" className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-foreground/6 px-3.5 py-3">
                    <span className={`h-1.5 w-1.5 rounded-full bg-foreground/30 ${reduceMotion ? '' : 'animate-bounce [animation-delay:0ms]'}`} />
                    <span className={`h-1.5 w-1.5 rounded-full bg-foreground/30 ${reduceMotion ? '' : 'animate-bounce [animation-delay:150ms]'}`} />
                    <span className={`h-1.5 w-1.5 rounded-full bg-foreground/30 ${reduceMotion ? '' : 'animate-bounce [animation-delay:300ms]'}`} />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestion chips */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, ease: EASE }}
                  className="shrink-0"
                >
                  <SuggestionRail
                    previousLabel={es ? 'Ver sugerencias anteriores' : 'See previous suggestions'}
                    nextLabel={es ? 'Ver más sugerencias' : 'See more suggestions'}
                  >
                    {chat.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => quickSend(s)}
                        className="min-h-11 shrink-0 rounded-full border border-foreground/20 bg-background px-4 text-xs font-medium text-foreground/70 transition-colors duration-150 hover:bg-foreground hover:text-background"
                      >
                        <SmoothText text={s} />
                      </button>
                    ))}
                  </SuggestionRail>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <form
              onSubmit={send}
              // The field has no border of its own, so the global focus ring floated as a
              // loose rectangle over the panel. The composer row carries the state instead.
              className="chat-composer flex shrink-0 items-center gap-2 border-t border-foreground/10 px-4 py-2.5 transition-colors focus-within:border-foreground/40 focus-within:bg-foreground/[0.05]"
            >
              <div className="relative min-w-0 flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder=""
                  aria-label={chat.placeholder}
                  disabled={loading}
                  className="h-11 w-full bg-transparent text-sm text-foreground focus:outline-none focus-visible:outline-none disabled:opacity-40"
                />
                <AnimatePresence mode="wait" initial={false}>
                  {!input && (
                    <motion.span
                      key={chat.placeholder}
                      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2, ease: EASE }}
                      className="pointer-events-none absolute inset-y-0 left-0 flex items-center truncate text-sm text-foreground/60"
                    >
                      {chat.placeholder}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-75 disabled:opacity-25"
                aria-label={chat.sendLabel}
              >
                <Send size={17} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((p) => !p)}
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-background/20 bg-foreground text-background shadow-lg"
        aria-label={open ? chat.closeLabel : chat.openLabel}
        aria-expanded={open}
        aria-controls="numen-chat-dialog"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
            >
              <X size={20} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={reduceMotion ? false : { rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
            >
              <NumenBot className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
