'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, User, Mail, MessageSquare, DollarSign, Plus, Search, PenTool, Code2, Rocket, TrendingUp, Building2, MapPin, Phone, Tags, UserPlus, type LucideIcon } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { motion, AnimatePresence, useInView, type MotionValue } from 'framer-motion'
import { SelectCustom } from '@/components/ui/select-custom'
import { PhotoSpread } from '@/components/ui/gallery'
import Image from 'next/image'
import { companyStats } from '@/lib/company-stats'
import { useLang } from '@/lib/lang'
import { SECTION_HREFS, handleSectionLinkClick } from '@/lib/section-scroll'

interface BlurStyle { filter: MotionValue<string> }

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.08 },
  transition: { type: 'spring' as const, stiffness: 150, damping: 22, delay },
})

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 150, damping: 22 },
  },
}

const LIFT = {
  whileHover: { y: -4, transition: { type: 'spring' as const, stiffness: 400, damping: 25 } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
}

const INPUT =
  'w-full rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none transition-colors duration-200'

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [val, setVal] = useState(to)
  useEffect(() => {
    if (!inView) return
    const dur = 1400
    let frame = requestAnimationFrame((start) => {
      setVal(0)
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        setVal(Math.round((1 - (1 - p) ** 3) * to))
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [inView, to])
  return <span ref={ref}>{val}{suffix}</span>
}

// ─── Live status check ────────────────────────────────────────
function useProjectStatus() {
  const [status, setStatus] = useState<Record<string, boolean>>({})
  useEffect(() => {
    let active = true
    fetch('/api/project-status')
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => { if (active) setStatus(data) })
      .catch(() => {})
    return () => { active = false }
  }, [])
  return status
}

function StatusDot({ online, size = 'h-1.5 w-1.5' }: { online?: boolean; size?: string }) {
  if (online === false) {
    return <span className={`inline-block rounded-full bg-red-400 ${size}`} />
  }
  return (
    <span className={`relative flex shrink-0 ${size}`}>
      {online && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
      <span className={`relative inline-flex rounded-full ${size} ${online === undefined ? 'bg-foreground/20' : 'bg-emerald-400'}`} />
    </span>
  )
}

// ─── Static non-translatable data ────────────────────────────
const servicesMeta = [
  { num: '01', tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe'],          img: '/programming.png' },
  { num: '02', tags: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'],               img: '/design.png' },
  { num: '03', tags: ['OpenAI', 'Anthropic', 'RAG', 'Embeddings', 'Automation'],             img: '/ia.png' },
  { num: '04', tags: ['Kubernetes', 'AWS EKS', 'Google GKE', 'Istio', 'Terraform', 'Docker', 'GitHub Actions'], img: '/launch.png' },
]

const projectsMeta = [
  { href: 'https://vielinks.com',          name: 'VieLinks',     status: 'Live', dot: 'bg-emerald-400', stack: ['React 19', 'Vite', 'TypeScript', 'Framer Motion', 'GSAP'] },
  { href: 'https://scoutia.dev/landing',   name: 'ScoutIA',      status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], img: '/scoutia/inicio.png' },
  { href: 'https://inkytap.com',           name: 'InkyTap',      status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'TypeScript', 'Supabase', 'PayPal', 'Framer Motion'] },
]

const liveProjectsMeta = [
  ...projectsMeta,
  { href: 'https://app.inkytap.com',       name: 'InkyTap Quiz', status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'TypeScript', 'Supabase'] },
]

const teamMeta = [
  { initials: 'JM', name: 'Julian Mendez',  role: 'Software Engineer & Founder',     linkedin: 'https://www.linkedin.com/in/juli%C3%A1n-m%C3%A9ndez-arev/' },
  { initials: 'IR', name: 'Igmer Rodriguez', role: 'Software Engineer & Co-founder', linkedin: 'https://www.linkedin.com/in/igmer-rodriguez/' },
]

const stackCategories = [
  {
    key: 'UI Layer',
    items: [
      { name: 'Next.js',       icon: 'nextdotjs'   },
      { name: 'React',         icon: 'react'        },
      { name: 'TypeScript',    icon: 'typescript'   },
      { name: 'Tailwind CSS',  icon: 'tailwindcss'  },
      { name: 'Framer Motion', icon: 'framer'       },
      { name: 'GSAP',          icon: 'greensock'    },
      { name: 'Vite',          icon: 'vite'         },
      { name: 'Radix UI',      icon: 'radixui'      },
    ],
  },
  {
    key: 'Data',
    items: [
      { name: 'Node.js',    icon: 'nodedotjs'  },
      { name: 'Supabase',   icon: 'supabase'   },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Prisma',     icon: 'prisma'     },
      { name: 'Redis',      icon: 'redis'      },
    ],
  },
  {
    key: 'Intelligence',
    items: [
      { name: 'OpenAI',    icon: 'openai'    },
      { name: 'Anthropic', icon: 'anthropic' },
    ],
  },
  {
    key: 'Revenue',
    items: [
      { name: 'Stripe', icon: 'stripe' },
      { name: 'PayPal', icon: 'paypal' },
    ],
  },
  {
    key: 'Workflow',
    items: [
      { name: 'Vercel', icon: 'vercel'  },
      { name: 'GitHub', icon: 'github'  },
      { name: 'Docker', icon: 'docker'  },
      { name: 'Figma',  icon: 'figma'   },
      { name: 'Notion', icon: 'notion'  },
      { name: 'Linear', icon: 'linear'  },
    ],
  },
  {
    key: 'Infrastructure & DevOps',
    items: [
      { name: 'Kubernetes',     icon: 'kubernetes'    },
      { name: 'AWS',            icon: 'amazonaws'     },
      { name: 'Google Cloud',   icon: 'googlecloud'   },
      { name: 'Terraform',      icon: 'terraform'     },
      { name: 'Istio',          icon: 'istio'         },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Prometheus',     icon: 'prometheus'    },
      { name: 'Grafana',        icon: 'grafana'       },
    ],
  },
]

const stepIcons: Record<string, LucideIcon> = {
  '01': Search,
  '02': PenTool,
  '03': Code2,
  '04': Rocket,
  '05': TrendingUp,
}

// ─── Services ────────────────────────────────────────────────
export function ServicesSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })
  const { t } = useLang()
  const ts = t.services

  return (
    <section ref={ref} id="services" className="sticky top-0 z-10 flex h-screen flex-col bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-10 lg:pb-10 lg:pt-24 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <div className="flex items-center gap-2">
            <motion.div animate={{ scaleX: isInView ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ originX: 0 }} className="h-px w-4 bg-foreground/40" />
            <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>{ts.label}</span>
          </div>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>02</span>
        </div>
        <motion.div
          className="mt-6 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:overflow-hidden lg:pb-0"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {servicesMeta.map((s, i) => {
            const text = ts.items[i]
            return (
              <motion.div
                key={s.num}
                variants={staggerItem}
                {...LIFT}
                className={`group relative overflow-hidden rounded-2xl border border-foreground/8 transition-colors duration-300 hover:border-foreground/[0.14]${i >= 2 ? ' lg:mb-14' : ''}`}
              >
                <Image
                  fill
                  src={s.img}
                  alt={text.title}
                  sizes="(max-width: 640px) 0px, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectPosition: 'center 18%' }}
                  className="object-contain scale-[0.82] origin-top transition-transform duration-700 group-hover:scale-[0.87] invert brightness-[0.88] dark:invert-0 dark:brightness-100 hidden sm:block"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/30 to-background/20 hidden sm:block" />
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-background via-background/90 to-transparent hidden sm:block" />
                <div className="relative z-10 flex h-full flex-col justify-end sm:justify-between p-5">
                  <span className="text-[10px] font-medium text-foreground/30">{s.num}</span>
                  <div>
                    <h3 className="mb-1.5 text-sm font-semibold text-foreground">{text.title}</h3>
                    <p className="mb-0 lg:mb-3 text-xs leading-relaxed text-foreground/50">{text.desc}</p>
                    <div className="service-tags flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-foreground/[0.14] bg-background/40 px-2.5 py-0.5 text-[10px] text-foreground/40 backdrop-blur-sm">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Projects ────────────────────────────────────────────────
export function ProjectsSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })
  const { t } = useLang()
  const tp = t.projects
  const status = useProjectStatus()

  const [featuredMeta, ...restMeta] = projectsMeta
  const [featuredText, ...restText] = tp.items

  return (
    <section ref={ref} id="work" className="sticky top-0 z-20 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-24 pb-10 lg:pb-10 lg:pt-24 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <motion.div animate={{ scaleX: isInView ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ originX: 0 }} className="h-px w-4 bg-foreground/40" />
              <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>{tp.label}</span>
            </div>
            <Link href="/projects" className={`flex items-center gap-1 text-[10px] transition-colors duration-200 hover:text-foreground/70 lg:text-xs ${isInView ? 'text-foreground/30' : 'text-foreground/15'}`}>
              <span>{tp.seeAll}</span>
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>03</span>
        </div>
        <motion.div
          className="mt-4 flex flex-1 flex-col gap-2 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:mt-6 lg:mb-24 lg:gap-3 lg:overflow-visible lg:pb-0 lg:flex-row"
          style={{ scrollbarWidth: 'none' }}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={staggerItem} {...LIFT} className="flex flex-col flex-none lg:flex-3">
            <Link href={featuredMeta.href} target="_blank" rel="noopener noreferrer" className="group relative flex h-full flex-col gap-2 rounded-2xl bg-background p-4 ring-1 ring-foreground/8 lg:justify-between lg:gap-0 lg:p-6">
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(to right, #C8553A, #e8896e, #C8553A)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  padding: '1px',
                }}
              />
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-foreground/30">{featuredText.category}</span>
                  <div className="mt-1 flex items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground lg:text-xl">{featuredText.name}</h3>
                    {featuredMeta.status && (
                      <span className="flex items-center gap-1 rounded-full border border-foreground/[0.08] px-2 py-0.5 text-[10px] text-foreground/35">
                        <StatusDot online={status[featuredMeta.href]} />
                        {status[featuredMeta.href] === false ? 'Offline' : featuredMeta.status}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-foreground/20 transition-colors duration-200 group-hover:text-[#C8553A]" />
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <PhotoSpread
                  images={['/vielink/vielink2.png', '/vielink/inici vie.png', '/vielink/vielink3.png']}
                  width={170}
                  height={280}
                  centerWidth={260}
                />
              </div>
              <div>
                <p className="mb-2 line-clamp-2 text-[13px] leading-relaxed text-foreground/40 lg:mb-3 lg:line-clamp-none">{featuredText.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {featuredMeta.stack.map((t) => (
                    <span key={t} className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 text-[11px] text-foreground/40 lg:px-3 lg:py-1 lg:text-xs">{t}</span>
                  ))}
                </div>
                <p className="mt-3 hidden text-[11px] text-foreground/20 transition-colors duration-200 group-hover:text-foreground/40 lg:block">{featuredMeta.href.replace('https://', '')}</p>
              </div>
            </Link>
          </motion.div>
          <motion.div variants={staggerContainer} className="flex flex-col gap-2 lg:flex-[2]">
            {restMeta.map((pm, i) => {
              const pt = restText[i]
              return (
                <motion.div key={pm.href} variants={staggerItem} {...LIFT} className="flex-1">
                  <Link href={pm.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-foreground/[0.08] p-4 transition-colors duration-300 hover:border-foreground/[0.16] lg:p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-foreground/30">{pt.category}</span>
                        <div className="mt-1 flex items-center gap-1.5">
                          <h3 className="text-sm font-semibold text-foreground">{pt.name}</h3>
                          {pm.status && (
                            <span className="flex items-center gap-1 rounded-full border border-foreground/[0.08] px-1.5 py-0.5 text-[9px] text-foreground/30">
                              <StatusDot online={status[pm.href]} size="h-1 w-1" />
                              {status[pm.href] === false ? 'Offline' : pm.status}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowUpRight className="size-3.5 shrink-0 text-foreground/20 transition-colors duration-200 group-hover:text-foreground" />
                    </div>
                    {'img' in pm && pm.img && (
                      <div className="relative hidden my-4 overflow-hidden rounded-xl lg:block lg:flex-1">
                        <Image fill src={pm.img as string} alt={pt.name}
                          sizes="(max-width: 1024px) 0px, 33vw"
                          className="object-cover invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.04]" />
                      </div>
                    )}
                    <div className="mt-auto">
                      <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-foreground/40 lg:mb-3 lg:line-clamp-none">{pt.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pm.stack.map((s) => (
                          <span key={s} className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 text-xs text-foreground/40">{s}</span>
                        ))}
                      </div>
                      <p className="mt-2 hidden text-[10px] text-foreground/20 transition-colors duration-200 group-hover:text-foreground/35 lg:block">{pm.href.replace('https://', '')}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Live Projects ───────────────────────────────────────────
export function LiveProjectsSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })
  const { t } = useLang()
  const tl = t.liveProjects
  const status = useProjectStatus()

  return (
    <section ref={ref} id="live-projects" className="sticky top-0 z-[25] flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-24 pb-10 lg:pb-10 lg:pt-24 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <div className="flex items-center gap-2">
            <motion.div animate={{ scaleX: isInView ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ originX: 0 }} className="h-px w-4 bg-foreground/40" />
            <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>{tl.label}</span>
          </div>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>04</span>
        </div>

        <motion.div
          className="mt-6 flex flex-1 flex-col gap-6 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pb-0 lg:mt-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem}>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-5xl">
              {tl.headline1}<br />
              <span className="text-foreground/25">{tl.headline2}</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/40">{tl.subtext}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3 lg:grid-cols-4"
            variants={staggerContainer}
          >
            {liveProjectsMeta.map((pm) => (
              <motion.div key={pm.href} variants={staggerItem} {...LIFT}>
                <Link
                  href={pm.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-foreground/[0.08] p-4 transition-colors duration-300 hover:border-foreground/[0.16]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <StatusDot online={status[pm.href]} />
                      <span className="text-[10px] text-foreground/30">{status[pm.href] === false ? 'Offline' : pm.status}</span>
                    </div>
                    <ArrowUpRight className="size-3.5 shrink-0 text-foreground/20 transition-colors duration-200 group-hover:text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{pm.name}</p>
                    <p className="mt-0.5 text-[11px] text-foreground/30">{pm.href.replace('https://', '')}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-1">
                    {pm.stack.slice(0, 2).map((s) => (
                      <span key={s} className="rounded-full border border-foreground/[0.08] px-2 py-0.5 text-[10px] text-foreground/35">{s}</span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────
export function AboutSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })
  const { t } = useLang()
  const ta = t.about

  return (
    <section ref={ref} id="about" className="sticky top-0 z-30 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-10 lg:pb-10 lg:pt-24 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <div className="flex items-center gap-2">
            <motion.div animate={{ scaleX: isInView ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ originX: 0 }} className="h-px w-4 bg-foreground/40" />
            <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>{ta.label}</span>
          </div>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>04</span>
        </div>

        <div className="mt-6 flex flex-1 flex-col gap-4 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:overflow-hidden lg:pb-0">
          {/* Top row: headline + stats */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            <motion.div {...fadeUp(0)}>
              <h2 className="text-3xl font-semibold leading-snug tracking-tight text-foreground lg:text-4xl">
                {ta.headline1}<br />
                <span className="text-foreground/25">{ta.headline2}</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/40">{ta.p1}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/30">{ta.p2}</p>
            </motion.div>

            <dl className="grid h-full grid-cols-2 grid-rows-2 gap-3">
              {companyStats.map((s, i) => (
                <motion.div
                  key={s.key}
                  {...fadeUp(0.1 + i * 0.07)}
                  {...LIFT}
                  className="flex flex-col items-center justify-center rounded-2xl border border-foreground/8 p-3 text-center transition-colors duration-200 hover:border-foreground/18 hover:bg-foreground/2 lg:p-6"
                  data-stat-name={s.schemaName}
                  data-stat-value={s.display}
                >
                  <dt className="order-2 mt-1 text-xs text-foreground/40">{ta.stats[i].label}</dt>
                  <dd className="order-1 text-3xl font-bold text-foreground" aria-label={`${s.display} ${ta.stats[i].label}`}>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          {/* Bottom row: team cards + principles */}
          <div className="grid grid-cols-1 gap-6 lg:mb-24 lg:grid-cols-2 lg:gap-10">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {teamMeta.map((member, i) => (
                <motion.div
                  key={member.name}
                  {...fadeUp(0.12 + i * 0.08)}
                  {...LIFT}
                  className="flex flex-col rounded-2xl border border-foreground/8 p-4 transition-colors duration-200 hover:border-foreground/16"
                >
                  <div className="mb-3 flex h-20 w-full items-center justify-center rounded-xl bg-linear-to-br from-foreground/8 to-foreground/4">
                    <span className="select-none text-2xl font-bold text-foreground/20">{member.initials}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="mt-0.5 text-[10px] text-foreground/30">{member.role}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-foreground/40">{ta.team[i].desc}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-1.5 text-[10px] text-foreground/25 transition-colors duration-150 hover:text-foreground/55"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 shrink-0">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.32)} className="flex flex-col gap-2">
              {ta.principles.map((v) => (
                <motion.div key={v.title} whileHover={{ x: 4, transition: { type: 'spring', stiffness: 300, damping: 25 } }} className="flex items-start gap-3 rounded-2xl border border-foreground/8 px-4 py-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/20" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{v.title}</p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/40">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Tech Stack ──────────────────────────────────────────────
export function TechStackSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })
  const { t } = useLang()
  const ts = t.stack

  return (
    <section ref={ref} id="stack" className="sticky top-0 z-40 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-10 lg:pb-10 lg:pt-24 lg:px-8" style={blurStyle}>

        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <div className="flex items-center gap-2">
            <motion.div animate={{ scaleX: isInView ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ originX: 0 }} className="h-px w-4 bg-foreground/40" />
            <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>{ts.label}</span>
          </div>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>05</span>
        </div>

        <motion.h2 {...fadeUp(0.05)} className="mt-6 text-2xl font-semibold tracking-tight text-foreground lg:mt-10 lg:text-5xl">
          {ts.headline1}<br />
          <span className="text-foreground/25">{ts.headline2}</span>
        </motion.h2>

        <motion.div
          className="mt-6 grid grid-cols-1 gap-6 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:mb-20 lg:mt-10 lg:grid-cols-2 lg:gap-8 lg:overflow-auto lg:pb-0"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stackCategories.map((cat) => (
            <motion.div key={cat.key} variants={staggerItem} className="flex flex-col">
              <span className="mb-3 text-[9px] font-medium uppercase tracking-widest text-foreground/30">
                {ts.capabilities[cat.key as keyof typeof ts.capabilities]}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <motion.span
                    key={item.name}
                    whileHover={{ scale: 1.07, y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 rounded-xl border border-foreground/8 bg-foreground/2 px-3 py-2.5 text-xs text-foreground/50 transition-all duration-200 hover:border-foreground/18 hover:bg-foreground/4 hover:text-foreground/80"
                  >
                    <img
                      src={`/icons/${item.icon}.svg`}
                      alt=""
                      loading="lazy"
                      className="h-3.5 w-3.5 opacity-60 dark:invert"
                    />
                    {item.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  )
}

// ─── Process ─────────────────────────────────────────────────
const stepNums = ['01', '02', '03', '04', '05']

export function ProcessSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })
  const { t } = useLang()
  const tp = t.process

  return (
    <section ref={ref} id="process" className="sticky top-0 z-50 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-24 pb-10 lg:pb-10 lg:pt-24 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <div className="flex items-center gap-2">
            <motion.div animate={{ scaleX: isInView ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ originX: 0 }} className="h-px w-4 bg-foreground/40" />
            <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>{tp.label}</span>
          </div>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>06</span>
        </div>

        {/* Mobile: icon-led list */}
        <motion.div
          className="mt-5 flex flex-col gap-2.5 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:hidden"
          style={{ scrollbarWidth: 'none' }}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tp.steps.map((s, i) => {
            const num = stepNums[i]
            const Icon = stepIcons[num]
            return (
              <motion.div
                key={num}
                variants={staggerItem}
                whileHover={{ x: 4, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
                className="flex gap-3 rounded-2xl border border-foreground/8 bg-foreground/4 p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-foreground/8 bg-foreground/4">
                  <Icon className="size-4 text-foreground/55" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                    <span className="text-[10px] text-foreground/25">{num}</span>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-foreground/50">{tp.stepsListDesc[i]}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Desktop: bento grid */}
        <motion.div
          className="mt-6 hidden flex-1 grid-cols-2 gap-2 overflow-hidden lg:grid lg:grid-cols-3 lg:grid-rows-3"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 01 Discovery — cols 1-2 row 1 */}
          <motion.div
            variants={staggerItem}
            className="col-span-2 group flex min-h-[6rem] flex-col overflow-hidden rounded-2xl border border-foreground/8 dark:bg-black transition-colors duration-300 hover:border-foreground/16 lg:flex-row lg:min-h-0 lg:col-start-1 lg:col-end-3 lg:row-start-1"
          >
            <div className="flex flex-1 flex-col justify-between p-4 lg:p-5 lg:w-1/2 lg:flex-none">
              <span className="text-[10px] font-medium text-foreground/30">01</span>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{tp.steps[0].title}</h3>
                <p className="text-xs leading-relaxed text-foreground/50">{tp.steps[0].desc}</p>
                {tp.steps[0].extra && <p className="mt-2 hidden line-clamp-2 text-xs leading-relaxed text-foreground/35 lg:block">{tp.steps[0].extra}</p>}
              </div>
            </div>
            <div className="relative h-24 overflow-hidden lg:h-auto lg:w-1/2">
              <Image fill src="/discovery.png" alt="Discovery"
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-contain p-4 invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
          </motion.div>

          {/* 02 Design — col 3 rows 1-2 */}
          <motion.div
            variants={staggerItem}
            className="group flex min-h-[10rem] flex-col overflow-hidden rounded-2xl border border-foreground/8 dark:bg-black transition-colors duration-300 hover:border-foreground/16 lg:min-h-0 lg:col-start-3 lg:row-start-1 lg:row-end-3"
          >
            <div className="relative h-28 overflow-hidden lg:h-auto lg:min-h-0 lg:flex-[4]">
              <Image fill src="/ux.png" alt="Design"
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain p-0 scale-[1.2] translate-y-[8%] invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.25] group-hover:translate-y-[8%]" />
            </div>
            <div className="flex flex-col justify-end p-4 lg:flex-[2]">
              <span className="text-[10px] font-medium text-foreground/30">02</span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">{tp.steps[1].title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">{tp.steps[1].desc}</p>
              {tp.steps[1].extra && <p className="mt-2 hidden line-clamp-2 text-xs leading-relaxed text-foreground/35 lg:block">{tp.steps[1].extra}</p>}
            </div>
          </motion.div>

          {/* 03 Build — col 2 row 2 */}
          <motion.div
            variants={staggerItem}
            className="group flex min-h-[10rem] flex-col overflow-hidden rounded-2xl border border-foreground/8 dark:bg-black transition-colors duration-300 hover:border-foreground/16 lg:min-h-0 lg:col-start-2 lg:row-start-2"
          >
            <div className="relative h-28 overflow-hidden lg:h-auto lg:min-h-0 lg:flex-[3]">
              <Image fill src="/build.png" alt="Build"
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain p-2 invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
            <div className="flex flex-col justify-end p-4">
              <span className="text-[10px] font-medium text-foreground/30">03</span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">{tp.steps[2].title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">{tp.steps[2].desc}</p>
            </div>
          </motion.div>

          {/* 04 Launch — col 1 rows 2-3 */}
          <motion.div
            variants={staggerItem}
            className="col-span-2 group flex min-h-[6rem] flex-row overflow-hidden rounded-2xl border border-foreground/8 dark:bg-black transition-colors duration-300 hover:border-foreground/16 lg:mb-14 lg:min-h-0 lg:flex-col lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4"
          >
            <div className="relative w-2/5 overflow-hidden lg:w-auto lg:min-h-0 lg:flex-[4]">
              <Image fill src="/launch.png" alt="Launch"
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain p-2 scale-[1.2] translate-y-[8%] invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.25] group-hover:translate-y-[8%]" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-4 lg:flex-[2] lg:justify-end">
              <span className="text-[10px] font-medium text-foreground/30">04</span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">{tp.steps[3].title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">{tp.steps[3].desc}</p>
              {tp.steps[3].extra && <p className="mt-2 hidden line-clamp-2 text-xs leading-relaxed text-foreground/35 lg:block">{tp.steps[3].extra}</p>}
            </div>
          </motion.div>

          {/* 05 Scale — cols 2-3 row 3 */}
          <motion.div
            variants={staggerItem}
            className="col-span-2 group flex min-h-[6rem] flex-row overflow-hidden rounded-2xl border border-foreground/8 dark:bg-black transition-colors duration-300 hover:border-foreground/16 lg:mb-14 lg:min-h-0 lg:col-start-2 lg:col-end-4 lg:row-start-3"
          >
            <div className="relative w-2/5 overflow-hidden lg:h-auto lg:w-2/5">
              <Image fill src="/scale.png" alt="Scale"
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-contain p-0 scale-[1.2] translate-y-[8%] invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.25] group-hover:translate-y-[8%]" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-4 lg:justify-between lg:w-3/5">
              <span className="text-[10px] font-medium text-foreground/30">05</span>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{tp.steps[4].title}</h3>
                <p className="text-xs leading-relaxed text-foreground/50">{tp.steps[4].desc}</p>
                {tp.steps[4].extra && <p className="mt-2 hidden line-clamp-2 text-xs leading-relaxed text-foreground/35 lg:block">{tp.steps[4].extra}</p>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────
export function FAQSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })
  const [open, setOpen] = useState<number | null>(null)
  const { t } = useLang()
  const lenis = useLenis()
  const tf = t.faq

  return (
    <section ref={ref} id="faq" className="sticky top-0 z-60 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-10 lg:pb-10 lg:pt-24 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <div className="flex items-center gap-2">
            <motion.div animate={{ scaleX: isInView ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ originX: 0 }} className="h-px w-4 bg-foreground/40" />
            <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>{tf.label}</span>
          </div>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>07</span>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-4 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:gap-12 lg:overflow-hidden lg:pb-0 lg:mb-24 lg:grid-cols-2">
          <motion.div {...fadeUp(0)} className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground lg:text-6xl">
                {tf.headline1}<br />{tf.headline2}<br />
                <span className="text-foreground/25">{tf.headline3}</span>
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/40 lg:mt-5">
                {tf.subtext}
              </p>
            </div>
            <Link
              href={SECTION_HREFS.contact}
              scroll={false}
              onClick={(e) => handleSectionLinkClick(e, SECTION_HREFS.contact, lenis)}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-75 lg:mt-0"
            >
              {tf.cta} <ArrowUpRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            className="overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {tf.items.map((faq, i) => (
              <motion.div key={i} variants={staggerItem} className="border-b border-foreground/[0.06]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3.5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="pr-4 text-sm font-medium text-foreground">{faq.q}</span>
                  <Plus
                    size={14}
                    className={`shrink-0 text-foreground/30 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-xs leading-relaxed text-foreground/45">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Contact Form + Footer ───────────────────────────────────
export function ContactFormSection({ blurStyle }: { blurStyle?: BlurStyle } = {}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.3, once: false })
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    location: '',
    category: '',
    budget: '',
    message: '',
    website: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const { t } = useLang()
  const tc = t.contact

  const infoItems = [
    { label: 'Email',        value: 'contact@delta-numen.com',       href: 'mailto:contact@delta-numen.com' },
    { label: 'WhatsApp',     value: '+503 6046 3566',                 href: 'https://wa.me/50360463566' },
    { label: tc.infoLabels.basedIn,   value: tc.infoValues.basedIn },
    { label: tc.infoLabels.availability, value: tc.infoValues.availability },
  ]

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={ref} id="contact" className="sticky top-0 z-[70] flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-0 lg:pt-24 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <div className="flex items-center gap-2">
            <motion.div animate={{ scaleX: isInView ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ originX: 0 }} className="h-px w-4 bg-foreground/40" />
            <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>{tc.label}</span>
          </div>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>08</span>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-8 overflow-hidden lg:grid-cols-2">
          <div className="hidden flex-col justify-between gap-6 lg:flex">
            <motion.div {...fadeUp(0.05)}>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
                {tc.headline1}<br />
                <span className="text-foreground/25">{tc.headline2}</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/40">{tc.subtext}</p>
            </motion.div>

            <motion.div
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {infoItems.map((item) => (
                <motion.div key={item.label} variants={staggerItem}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-foreground/8 px-5 py-4 transition-colors duration-200 hover:border-foreground/20"
                    >
                      <span className="w-24 shrink-0 text-xs text-foreground/30">{item.label}</span>
                      <span className="flex-1 text-sm text-foreground/60 transition-colors duration-200 group-hover:text-foreground/80">{item.value}</span>
                      <ArrowUpRight className="size-3.5 shrink-0 text-foreground/20 transition-colors duration-200 group-hover:text-foreground/60" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-foreground/8 px-5 py-4">
                      <span className="w-24 shrink-0 text-xs text-foreground/30">{item.label}</span>
                      <span className="text-sm text-foreground/60">{item.value}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.05)} className="flex min-h-0 flex-col">
            <div className="mb-4 lg:hidden">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {tc.headline1}<br />
                <span className="text-foreground/25">{tc.headline2}</span>
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {infoItems.map((item) =>
                  item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-[11px] text-foreground/50 transition-colors hover:border-foreground/20 hover:text-foreground/70"
                    >
                      {item.label === 'Email'
                        ? <Mail className="h-3 w-3 shrink-0" />
                        : <MessageSquare className="h-3 w-3 shrink-0" />}
                      <span>{item.value}</span>
                    </a>
                  ) : (
                    <div
                      key={item.label}
                      className="flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-[11px] text-foreground/50"
                    >
                      <span className="text-foreground/30">{item.label}:</span>
                      <span>{item.value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            {status === 'sent' ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-foreground/[0.08] p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/[0.08] text-foreground">
                  ✓
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{tc.successTitle}</h3>
                <p className="mt-2 text-sm text-foreground/40">{tc.successDesc}</p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="min-h-0 space-y-3 overflow-y-auto pb-4 pr-1 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none' }}
              >
                {/* Honeypot — invisible to users, bots fill it and get silently rejected */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handle}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, overflow: 'hidden', opacity: 0 }}
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs text-foreground/30">{tc.nameLabel}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20 pointer-events-none" />
                      <input
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handle}
                        placeholder="Alex Johnson"
                        className={`${INPUT} pl-10`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs text-foreground/30">{tc.emailLabel}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20 pointer-events-none" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handle}
                        placeholder="alex@company.com"
                        className={`${INPUT} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-xs text-foreground/30">{tc.companyLabel}</label>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/20" />
                      <input
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handle}
                        placeholder={tc.companyPlaceholder}
                        className={`${INPUT} pl-10`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs text-foreground/30">{tc.phoneLabel}</label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/20" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handle}
                        placeholder={tc.phonePlaceholder}
                        className={`${INPUT} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="location" className="text-xs text-foreground/30">{tc.locationLabel}</label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/20" />
                      <input
                        id="location"
                        name="location"
                        required
                        value={form.location}
                        onChange={handle}
                        placeholder={tc.locationPlaceholder}
                        className={`${INPUT} pl-10`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="category" className="text-xs text-foreground/30">{tc.categoryLabel}</label>
                    <div className="relative">
                      <Tags className="pointer-events-none absolute left-4 top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 text-foreground/20" />
                      <SelectCustom
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={(v) => setForm((p) => ({ ...p, category: v }))}
                        options={tc.categoryOptions}
                        placeholder={tc.categoryPlaceholder}
                        icon={Tags}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="budget" className="text-xs text-foreground/30">{tc.budgetLabel}</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20 pointer-events-none z-10" />
                    <SelectCustom
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={(v) => setForm((p) => ({ ...p, budget: v }))}
                      options={tc.budgetOptions}
                      placeholder={tc.budgetPlaceholder}
                      icon={DollarSign}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs text-foreground/30">{tc.messageLabel}</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 h-3.5 w-3.5 text-foreground/20 pointer-events-none" />
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={3}
                      value={form.message}
                      onChange={handle}
                      placeholder={tc.messagePlaceholder}
                      className={`${INPUT} resize-none pl-10`}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-center text-xs text-red-400/70">{tc.errorMsg}</p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'loading'}
                  className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
                >
                  <UserPlus className="size-4" />
                  {status === 'loading' ? tc.sendingBtn : tc.sendBtn}
                </Button>
                <Link
                  href="/blog"
                  className="block text-center text-xs text-foreground/25 transition-colors hover:text-foreground/50"
                >
                  {tc.blogCta}
                </Link>
              </form>
            )}
          </motion.div>
        </div>
        <div className="mt-3 shrink-0 flex items-center border-t border-foreground/8 py-4">
          <span className="text-xs text-foreground/20">© {new Date().getFullYear()} Numen Agency. {tc.footer}</span>
        </div>
      </motion.div>
    </section>
  )
}

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className="border-t border-foreground/[0.08] bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 lg:px-8">
        <span className="text-xs text-foreground/20">© {new Date().getFullYear()} Numen Agency. {t.contact.footer}</span>
        <Link
          href="/blog"
          className="text-xs text-foreground/30 transition-colors hover:text-foreground/70"
        >
          Blog →
        </Link>
      </div>
    </footer>
  )
}
