'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, User, Mail, MessageSquare, DollarSign, Plus, Search, PenTool, Code2, Rocket, TrendingUp, type LucideIcon } from 'lucide-react'
import { motion, AnimatePresence, useInView, type MotionValue } from 'framer-motion'
import { SelectCustom } from '@/components/ui/select-custom'
import { PhotoSpread } from '@/components/ui/gallery'

interface BlurStyle { filter: MotionValue<string> }

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 60, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.08 },
  transition: { type: 'spring' as const, stiffness: 60, damping: 14, delay },
})

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 60, damping: 14 },
  },
}

const blurLeave = {
  initial: { filter: 'blur(6px)', opacity: 0.5 },
  whileInView: { filter: 'blur(0px)', opacity: 1 },
  viewport: { once: false as const, amount: 0.15 },
  transition: { duration: 0.55, ease: EASE },
}

const INPUT =
  'w-full rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none transition-colors duration-200'

// ─── Services ────────────────────────────────────────────────
const services = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'Full-stack applications built with Next.js, TypeScript, and Supabase. From zero-to-one MVPs to production-grade SaaS — fast, scalable, and maintainable from day one.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe'],
    img: '/programming.png',
  },
  {
    num: '02',
    title: 'Product Design',
    desc: 'End-to-end design in Figma: user flows, wireframes, interactive prototypes, and production-ready design systems. Pixel-perfect and accessible across every screen.',
    tags: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'],
    img: '/design.png',
  },
  {
    num: '03',
    title: 'AI Integration',
    desc: 'Embed intelligence into your product — conversational AI, semantic search, content automation, and smart recommendations — powered by the latest frontier models.',
    tags: ['OpenAI', 'Anthropic', 'RAG', 'Embeddings', 'Automation'],
    img: '/ia.png',
  },
  {
    num: '04',
    title: 'Digital Strategy',
    desc: 'Architecture planning, tech stack selection, and growth roadmaps. We make the right decisions before a line of code is written so you never have to rebuild from scratch.',
    tags: ['Architecture', 'Roadmapping', 'Tech Audits', 'Consulting'],
    img: '/strategy.png',
  },
]

export function ServicesSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })
  return (
    <section ref={ref} id="services" className="sticky top-0 z-10 flex h-screen flex-col bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-10 lg:py-10 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>What We Do</span>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>02</span>
        </div>
        <motion.div
          className="mt-6 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:overflow-hidden lg:pb-0"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              variants={staggerItem}
              className={`group relative overflow-hidden rounded-2xl border border-foreground/[0.08] transition-colors duration-300 hover:border-foreground/[0.14]${i >= 2 ? ' lg:mb-14' : ''}`}
            >
              {/* full-card background image */}
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                style={{ objectPosition: 'center 18%' }}
                className="absolute inset-0 h-full w-full object-contain scale-[0.82] origin-top transition-transform duration-700 group-hover:scale-[0.87] invert brightness-[0.88] dark:invert-0 dark:brightness-100 hidden sm:block"
              />

              {/* gradient: transparent top → soft mid */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/20 hidden sm:block" />

              {/* strong gradient behind text area only */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background via-background/90 to-transparent hidden sm:block" />

              {/* content overlay */}
              <div className="relative z-10 flex h-full flex-col justify-between p-5">
                <span className="text-[10px] font-medium text-foreground/30">{s.num}</span>
                <div>
                  <h3 className="mb-1.5 text-sm font-semibold text-foreground">{s.title}</h3>
                  <p className="mb-3 text-xs leading-relaxed text-foreground/50">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-foreground/[0.14] bg-background/40 px-2.5 py-0.5 text-[10px] text-foreground/40 backdrop-blur-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Projects ────────────────────────────────────────────────
const projects = [
  {
    name: 'VieLinks',
    category: 'Platform · 2026',
    desc: 'Your entire online presence, one link. VieLinks lets digital professionals centralize their portfolio, social profiles, and work history into a single shareable page — clean, fast, and fully customizable.',
    stack: ['React 19', 'Vite', 'TypeScript', 'Framer Motion', 'GSAP'],
    href: 'https://vielinks.com',
    status: 'Live',
    dot: 'bg-emerald-400',
  },
  {
    name: 'InkyTap',
    category: 'Web App · 2026',
    desc: '"Historias para descubrir." A curated story library for Spanish readers — browse 15+ genres from fiction to biography, filter by reading time, and find your next great read.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PayPal', 'Framer Motion'],
    href: 'https://inkytap.com',
    status: 'Live',
    dot: 'bg-emerald-400',
    img: '/inkytap/principal.png',
  },
  {
    name: 'InkyTap Quiz',
    category: 'Web App · 2026',
    desc: '"Desafía tu conocimiento." Create and share quizzes on any topic — no account needed to play. Covers hobbies, history, and exam prep.',
    stack: ['Next.js', 'TypeScript', 'Supabase'],
    href: 'https://app.inkytap.com',
    status: 'Live',
    dot: 'bg-emerald-400',
  },
]

export function ProjectsSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })
  const [featured, ...rest] = projects
  return (
    <section ref={ref} id="work" className="sticky top-0 z-20 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-24 pb-10 lg:py-10 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>Selected Work</span>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>03</span>
        </div>
        <motion.div
          className="mt-4 flex flex-1 flex-col gap-2 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:mt-6 lg:mb-24 lg:gap-3 lg:overflow-visible lg:pb-0 lg:flex-row"
          style={{ scrollbarWidth: 'none' }}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={staggerItem} className="flex flex-col flex-none lg:flex-1 lg:flex-[3]">
            <Link href={featured.href} target="_blank" rel="noopener noreferrer" className="group relative flex h-full flex-col gap-2 rounded-2xl bg-background p-4 ring-1 ring-foreground/8 lg:justify-between lg:gap-0 lg:p-6">
              {/* gradient ring on hover — CSS mask creates a hollow 1px donut */}
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
                  <span className="text-xs text-foreground/30">{featured.category}</span>
                  <div className="mt-1 flex items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground lg:text-xl">{featured.name}</h3>
                    {featured.status && (
                      <span className="flex items-center gap-1 rounded-full border border-foreground/[0.08] px-2 py-0.5 text-[10px] text-foreground/35">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${featured.dot}`} />
                        {featured.status}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-foreground/20 transition-colors duration-200 group-hover:text-[#C8553A]" />
              </div>
              {/* Desktop only: photo spread */}
              <div className="hidden lg:flex items-center justify-center">
                <PhotoSpread
                  images={[
                    '/vielink/dashboard.png',
                    '/vielink/principal.png',
                    '/vielink/know.png',
                  ]}
                  width={170}
                  height={280}
                  centerWidth={260}
                />
              </div>
              <div>
                <p className="mb-2 line-clamp-2 text-[13px] leading-relaxed text-foreground/40 lg:mb-3 lg:line-clamp-none">{featured.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {featured.stack.map((t) => (
                    <span key={t} className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 text-[11px] text-foreground/40 lg:px-3 lg:py-1 lg:text-xs">{t}</span>
                  ))}
                </div>
                <p className="mt-3 hidden text-[11px] text-foreground/20 transition-colors duration-200 group-hover:text-foreground/40 lg:block">{featured.href.replace('https://', '')}</p>
              </div>
            </Link>
          </motion.div>
          <motion.div variants={staggerContainer} className="flex flex-col gap-2 lg:flex-[2]">
            {rest.map((p, i) => (
              <motion.div key={p.name} variants={staggerItem} className="flex-1">
                <Link href={p.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-foreground/[0.08] p-4 transition-colors duration-300 hover:border-foreground/[0.16] lg:p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-foreground/30">{p.category}</span>
                      <div className="mt-1 flex items-center gap-1.5">
                        <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                        {p.status && (
                          <span className="flex items-center gap-1 rounded-full border border-foreground/[0.08] px-1.5 py-0.5 text-[9px] text-foreground/30">
                            <span className={`inline-block h-1 w-1 rounded-full ${p.dot}`} />
                            {p.status}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight className="size-3.5 shrink-0 text-foreground/20 transition-colors duration-200 group-hover:text-foreground" />
                  </div>
                  {p.img && (
                    <div className="hidden my-4 overflow-hidden rounded-xl lg:block lg:flex-1">
                      <img src={p.img} alt={p.name} loading="lazy"
                      className="h-full w-full object-cover invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.04]" />
                    </div>
                  )}
                  <div className={p.img ? '' : 'mt-auto'}>
                    <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-foreground/40 lg:mb-3 lg:line-clamp-none">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((t) => (
                        <span key={t} className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 text-xs text-foreground/40">{t}</span>
                      ))}
                    </div>
                    <p className="mt-2 hidden text-[10px] text-foreground/20 transition-colors duration-200 group-hover:text-foreground/35 lg:block">{p.href.replace('https://', '')}</p>
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
const team = [
  {
    initials: 'JM',
    name: 'Julian Mendez',
    role: 'Software Engineer & Founder',
    desc: 'Founder of Numen. Leads product vision, design direction, and project execution — from concept to launch.',
    linkedin: 'https://www.linkedin.com/in/juli%C3%A1n-m%C3%A9ndez-arev/',
  },
  {
    initials: 'IR',
    name: 'Igmer Rodriguez',
    role: 'Software Engineer & Co-founder',
    desc: 'Handles domain services, infrastructure, and deployment. Keeps the systems running so the products can ship.',
    linkedin: 'https://www.linkedin.com/in/igmer-rodriguez/',
  },
]

export function AboutSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })
  return (
    <section ref={ref} id="about" className="sticky top-0 z-30 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-10 lg:py-10 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>About Numen</span>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>04</span>
        </div>

        <div className="mt-6 flex flex-1 flex-col gap-4 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:overflow-hidden lg:pb-0">
          {/* Top row: headline + stats */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            <motion.div {...fadeUp(0)}>
              <h2 className="text-3xl font-semibold leading-snug tracking-tight text-foreground lg:text-4xl">
                A small team that builds<br />
                <span className="text-foreground/25">great digital products.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/40">
                Numen was founded with one mission: build digital products that actually work.
                We combine design thinking with engineering precision to deliver software that scales
                and experiences that people love.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/30">
                Based in El Salvador, working fully remote with clients worldwide. We move fast, communicate clearly, and treat every project like it&apos;s our own product.
              </p>
            </motion.div>

            <div className="grid h-full grid-cols-2 grid-rows-2 gap-3">
              {[
                { value: '10+', label: 'Projects delivered' },
                { value: '10+', label: 'Years of experience' },
                { value: '3', label: 'Products live in production' },
                { value: '24h', label: 'Max response time' },
              ].map((stat, i) => (
                <motion.div key={stat.label} {...fadeUp(0.1 + i * 0.07)} className="flex flex-col items-center justify-center rounded-2xl border border-foreground/[0.08] p-3 text-center transition-colors duration-200 hover:border-foreground/[0.18] hover:bg-foreground/[0.02] lg:p-6">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-foreground/40">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom row: team cards + principles */}
          <div className="grid grid-cols-1 gap-6 lg:mb-24 lg:grid-cols-2 lg:gap-10">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  {...fadeUp(0.12 + i * 0.08)}
                  className="flex flex-col rounded-2xl border border-foreground/[0.08] p-4 transition-colors duration-200 hover:border-foreground/[0.16]"
                >
                  <div className="mb-3 flex h-20 w-full items-end justify-end overflow-hidden rounded-xl bg-foreground/[0.04] p-2">
                    <span className="select-none text-4xl font-bold text-foreground/[0.07]">{member.initials}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="mt-0.5 text-[10px] text-foreground/30">{member.role}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-foreground/40">{member.desc}</p>
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
              {[
                { title: 'Ship fast', desc: 'We deliver working software in weeks, not months. Momentum beats perfection every time.' },
                { title: 'Outcome-focused', desc: 'We measure success by results — conversion rates, retention, revenue — not by hours billed.' },
                { title: 'Zero lock-in', desc: 'Clean code, full documentation, and a clean handoff. You own everything we build, always.' },
              ].map((v) => (
                <div key={v.title} className="flex items-start gap-3 rounded-2xl border border-foreground/[0.08] px-4 py-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/20" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{v.title}</p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/40">{v.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Tech Stack ──────────────────────────────────────────────
const stackCategories = [
  {
    capability: 'UI Layer',
    items: [
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Framer Motion', icon: 'framer' },
      { name: 'GSAP', icon: 'greensock' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Radix UI', icon: 'radixui' },
    ],
  },
  {
    capability: 'Data',
    items: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Prisma', icon: 'prisma' },
      { name: 'Redis', icon: 'redis' },
    ],
  },
  {
    capability: 'Intelligence',
    items: [
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Anthropic', icon: 'anthropic' },
    ],
  },
  {
    capability: 'Revenue',
    items: [
      { name: 'Stripe', icon: 'stripe' },
      { name: 'PayPal', icon: 'paypal' },
    ],
  },
  {
    capability: 'Workflow',
    items: [
      { name: 'Vercel', icon: 'vercel' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Notion', icon: 'notion' },
      { name: 'Linear', icon: 'linear' },
    ],
  },
]

export function TechStackSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })

  return (
    <section ref={ref} id="stack" className="sticky top-0 z-40 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-10 lg:py-10 lg:px-8" style={blurStyle}>

        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>Our Stack</span>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>05</span>
        </div>

        <motion.h2 {...fadeUp(0.05)} className="mt-6 text-2xl font-semibold tracking-tight text-foreground lg:mt-10 lg:text-5xl">
          Tools we trust<br />
          <span className="text-foreground/25">to build with.</span>
        </motion.h2>

        <motion.div
          className="mt-6 grid grid-cols-1 gap-6 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:mb-20 lg:mt-10 lg:grid-cols-2 lg:gap-8 lg:overflow-auto lg:pb-0"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stackCategories.map((cat) => (
            <motion.div key={cat.capability} variants={staggerItem} className="flex flex-col">
              <span className="mb-3 text-[9px] font-medium uppercase tracking-widest text-foreground/30">
                {cat.capability}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item.name}
                    className="flex items-center gap-2 rounded-xl border border-foreground/8 bg-foreground/2 px-3 py-2.5 text-xs text-foreground/50 transition-all duration-200 hover:border-foreground/18 hover:bg-foreground/4 hover:text-foreground/80"
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${item.icon}.svg`}
                      alt=""
                      loading="lazy"
                      className="h-3.5 w-3.5 opacity-60 dark:invert"
                    />
                    {item.name}
                  </span>
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
const steps = [
  { num: '01', title: 'Discovery', desc: 'We start by understanding your goals, users, and constraints. Deep dive into the problem space before writing a single line of code.', img: '/discovery.png' },
  { num: '02', title: 'Design',    desc: 'Wireframes, prototypes and design systems built in Figma. We validate ideas early so nothing is left to chance during development.',     img: '/ux.png' },
  { num: '03', title: 'Build',     desc: 'Full-stack development with our proven stack. Clean code, thorough testing, and weekly demos to keep you in the loop.',                  img: '/build.png' },
  { num: '04', title: 'Launch',    desc: 'Deploy with confidence. We set up monitoring, analytics and documentation, then stay close for the first weeks post-launch.',            img: '/launch.png' },
  { num: '05', title: 'Scale',     desc: 'Continuous iteration, performance tuning, and growth features. We stay by your side long after launch to make sure the product thrives.', img: '/scale.png' },
]

const stepIcons: Record<string, LucideIcon> = {
  '01': Search,
  '02': PenTool,
  '03': Code2,
  '04': Rocket,
  '05': TrendingUp,
}

export function ProcessSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })
  return (
    <section ref={ref} id="process" className="sticky top-0 z-50 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-24 pb-10 lg:py-10 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>How We Work</span>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>06</span>
        </div>

        {/* Mobile: icon-led list, no images */}
        <motion.div
          className="mt-5 flex flex-col gap-2.5 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:hidden"
          style={{ scrollbarWidth: 'none' }}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((s) => {
            const Icon = stepIcons[s.num]
            return (
              <motion.div
                key={s.num}
                variants={staggerItem}
                className="flex gap-3 rounded-2xl border border-foreground/8 bg-foreground/4 p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-foreground/8 bg-foreground/4">
                  <Icon className="size-4 text-foreground/55" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                    <span className="text-[10px] text-foreground/25">{s.num}</span>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-foreground/50">{s.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Desktop: bento grid with images */}
        <motion.div
          className="mt-6 hidden flex-1 grid-cols-2 gap-2 overflow-hidden lg:grid lg:grid-cols-3 lg:grid-rows-3"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 01 Discovery — cols 1-2 row 1 desktop */}
          <motion.div
            variants={staggerItem}
            className="col-span-2 group flex min-h-[6rem] flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black transition-colors duration-300 hover:border-foreground/[0.16] lg:flex-row lg:min-h-0 lg:[grid-column-start:1] lg:[grid-column-end:3] lg:[grid-row-start:1]"
          >
            <div className="flex flex-1 flex-col justify-between p-4 lg:p-5 lg:w-1/2 lg:flex-none">
              <span className="text-[10px] font-medium text-foreground/30">01</span>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Discovery</h3>
                <p className="text-xs leading-relaxed text-foreground/50">We start by understanding your goals, users, and constraints. Deep dive into the problem space before writing a single line of code.</p>
                <p className="mt-2 hidden text-xs leading-relaxed text-foreground/35 lg:block">From user research and competitor analysis to technical requirements and project scope — we leave nothing to assumptions before development begins.</p>
              </div>
            </div>
            <div className="relative h-24 overflow-hidden lg:h-auto lg:w-1/2">
              <img src="/discovery.png" alt="Discovery" loading="lazy"
              className="absolute inset-0 h-full w-full object-contain p-4 invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
          </motion.div>

          {/* 02 Design — col 3 rows 1-2 desktop */}
          <motion.div
            variants={staggerItem}
            className="group flex min-h-[10rem] flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black transition-colors duration-300 hover:border-foreground/[0.16] lg:min-h-0 lg:[grid-column-start:3] lg:[grid-row-start:1] lg:[grid-row-end:3]"
          >
            <div className="relative h-28 overflow-hidden lg:h-auto lg:min-h-0 lg:flex-[4]">
              <img src="/ux.png" alt="Design" loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-0 scale-[1.2] translate-y-[8%] invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.25] group-hover:translate-y-[8%]" />
            </div>
            <div className="flex flex-col justify-end p-4 lg:flex-[2]">
              <span className="text-[10px] font-medium text-foreground/30">02</span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">Design</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">Wireframes, prototypes and design systems built in Figma. We validate ideas early so nothing is left to chance during development.</p>
              <p className="mt-2 hidden text-xs leading-relaxed text-foreground/35 lg:block">Every screen is designed for real users — accessible, responsive, and aligned with your brand from day one.</p>
            </div>
          </motion.div>

          {/* 03 Build — col 2 row 2 desktop */}
          <motion.div
            variants={staggerItem}
            className="group flex min-h-[10rem] flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black transition-colors duration-300 hover:border-foreground/[0.16] lg:min-h-0 lg:[grid-column-start:2] lg:[grid-row-start:2]"
          >
            <div className="relative h-28 overflow-hidden lg:h-auto lg:min-h-0 lg:flex-[3]">
              <img src="/build.png" alt="Build" loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-2 invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
            <div className="flex flex-col justify-end p-4">
              <span className="text-[10px] font-medium text-foreground/30">03</span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">Build</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">Full-stack development with our proven stack. Clean code, thorough testing, and weekly demos.</p>
            </div>
          </motion.div>

          {/* 04 Launch — col 1 rows 2-3 desktop */}
          <motion.div
            variants={staggerItem}
            className="col-span-2 group flex min-h-[6rem] flex-row overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black transition-colors duration-300 hover:border-foreground/[0.16] lg:mb-14 lg:min-h-0 lg:flex-col lg:[grid-column-start:1] lg:[grid-column-end:2] lg:[grid-row-start:2] lg:[grid-row-end:4]"
          >
            <div className="relative w-2/5 overflow-hidden lg:w-auto lg:min-h-0 lg:flex-[4]">
              <img src="/launch.png" alt="Launch" loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-2 scale-[1.2] translate-y-[8%] invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.25] group-hover:translate-y-[8%]" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-4 lg:flex-[2] lg:justify-end">
              <span className="text-[10px] font-medium text-foreground/30">04</span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">Launch</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">Deploy with confidence. We handle infrastructure setup, CI/CD pipelines, and go-live checklists.</p>
              <p className="mt-2 hidden text-xs leading-relaxed text-foreground/35 lg:block">We set up monitoring, error tracking, and analytics — then stay close for the first weeks post-launch.</p>
            </div>
          </motion.div>

          {/* 05 Scale — cols 2-3 row 3 desktop */}
          <motion.div
            variants={staggerItem}
            className="col-span-2 group flex min-h-[6rem] flex-row overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black transition-colors duration-300 hover:border-foreground/[0.16] lg:mb-14 lg:min-h-0 lg:[grid-column-start:2] lg:[grid-column-end:4] lg:[grid-row-start:3]"
          >
            <div className="relative w-2/5 overflow-hidden lg:h-auto lg:w-2/5">
              <img src="/scale.png" alt="Scale" loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-0 scale-[1.2] translate-y-[8%] invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.25] group-hover:translate-y-[8%]" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-4 lg:justify-between lg:w-3/5">
              <span className="text-[10px] font-medium text-foreground/30">05</span>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Scale</h3>
                <p className="text-xs leading-relaxed text-foreground/50">Continuous iteration, performance tuning, and new features. We stay by your side long after launch.</p>
                <p className="mt-2 hidden text-xs leading-relaxed text-foreground/35 lg:block">From A/B testing to infrastructure scaling — we treat your product as a living system, not a finished deliverable.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────
const faqs = [
  {
    q: 'What does Numen do?',
    a: 'We are a boutique digital product studio that designs and builds full-stack web applications, SaaS products, and AI-powered tools. From zero-to-one MVPs to production-grade platforms — we handle design, development, and strategy end to end.',
  },
  {
    q: 'How much does a project cost?',
    a: 'Projects start at under $5k for focused scopes and scale to $50k+ for complex SaaS or enterprise platforms. After a quick discovery call we give you a transparent estimate with no surprises.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A focused MVP typically ships in 4–8 weeks. More complex products with multiple modules and design systems take 10–16 weeks. We give you a realistic timeline upfront.',
  },
  {
    q: 'Do you work with international clients?',
    a: "Yes. We're based in El Salvador and work fully remote with clients worldwide. We adapt our schedule to overlap with your timezone for key meetings and demos.",
  },
  {
    q: 'What technologies do you use?',
    a: 'Our primary stack is Next.js, TypeScript, Tailwind CSS, Supabase, and PostgreSQL. For AI we use OpenAI and Anthropic APIs. For design, Figma. We pick tools that are battle-tested and give your team a clean foundation.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes. We stay close during the first weeks post-launch and offer ongoing maintenance, monitoring, and feature iteration. Many clients continue on a retainer after the initial build.',
  },
  {
    q: 'How do I start a project with you?',
    a: "Fill out the contact form below or email contact@delta-numen.com. We'll schedule a 30-minute discovery call to understand your goals, then send a detailed proposal within a few days.",
  },
]

export function FAQSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section ref={ref} id="faq" className="sticky top-0 z-60 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-10 lg:py-10 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>FAQ</span>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>07</span>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-4 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden lg:gap-12 lg:overflow-hidden lg:pb-0 lg:mb-24 lg:grid-cols-2">
          {/* Left: large headline + CTA */}
          <motion.div {...fadeUp(0)} className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground lg:text-6xl">
                Common<br />questions,<br />
                <span className="text-foreground/25">answered.</span>
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/40 lg:mt-5">
                Not finding what you&apos;re looking for? Use the AI assistant at the bottom right or send us a message.
              </p>
            </div>
            <Link
              href="#contact"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-75 lg:mt-0"
            >
              Start a project <ArrowUpRight size={14} />
            </Link>
          </motion.div>

          {/* Right: scrollable FAQ accordion */}
          <motion.div
            className="overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {faqs.map((faq, i) => (
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
const infoItems = [
  { label: 'Email', value: 'contact@delta-numen.com' },
  { label: 'Based in', value: 'El Salvador · Remote worldwide' },
  { label: 'Availability', value: 'Open to new projects' },
]

const budgetOptions = [
  { value: 'under5k', label: 'Under $5k' },
  { value: '5-15k', label: '$5k – $15k' },
  { value: '15-50k', label: '$15k – $50k' },
  { value: '50k+', label: '$50k+' },
]

export function ContactFormSection({ blurStyle }: { blurStyle?: BlurStyle } = {}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.3, once: false })
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

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
      <motion.div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 pt-20 pb-0 lg:pt-10 lg:px-8" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <span className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 lg:text-xs lg:tracking-widest ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>Start a Project</span>
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>08</span>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-8 overflow-hidden lg:grid-cols-2">
          <div className="hidden flex-col justify-between gap-6 lg:flex">
            <motion.div {...fadeUp(0.05)}>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
                Let&apos;s build something<br />
                <span className="text-foreground/25">great together.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/40">
                Tell us about your project. We&apos;ll get back to you within 24 hours with
                thoughts and next steps.
              </p>
            </motion.div>

            <motion.div
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {infoItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={staggerItem}
                  className="flex items-center gap-4 rounded-2xl border border-foreground/[0.08] px-5 py-4"
                >
                  <span className="w-20 shrink-0 text-xs text-foreground/30">{item.label}</span>
                  <span className="text-sm text-foreground/60">{item.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.05)} className="flex flex-col">
            <div className="mb-4 lg:hidden">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Let&apos;s build something<br />
                <span className="text-foreground/25">great together.</span>
              </h2>
            </div>
            {status === 'sent' ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-foreground/[0.08] p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/[0.08] text-foreground">
                  ✓
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Message sent!</h3>
                <p className="mt-2 text-sm text-foreground/40">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-foreground/30">Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20 pointer-events-none" />
                      <input
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
                    <label className="text-xs text-foreground/30">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20 pointer-events-none" />
                      <input
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

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-foreground/30">Budget range</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20 pointer-events-none z-10" />
                    <SelectCustom
                      name="budget"
                      value={form.budget}
                      onChange={(v) => setForm((p) => ({ ...p, budget: v }))}
                      options={budgetOptions}
                      placeholder="Select a range"
                      icon={DollarSign}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-foreground/30">Tell us about your project *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 h-3.5 w-3.5 text-foreground/20 pointer-events-none" />
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={form.message}
                      onChange={handle}
                      placeholder="We're looking to build..."
                      className={`${INPUT} resize-none pl-10`}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-center text-xs text-red-400/70">
                    Something went wrong. Please try again or email us at contact@delta-numen.com.
                  </p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'loading'}
                  className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
        <div className="mt-3 shrink-0 flex flex-col items-center justify-between gap-2 border-t border-foreground/[0.08] py-4 sm:flex-row">
          <span className="text-xs text-foreground/20">© 2025 Numen. All rights reserved.</span>
          <div className="flex gap-5">
            {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map((s) => (
              <Link key={s} href="#" className="text-xs text-foreground/20 transition-colors duration-150 hover:text-foreground/60">{s}</Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/[0.08] bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
        <span className="text-xs text-foreground/20">© 2025 Numen. All rights reserved.</span>
        <div className="flex gap-6">
          {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map((s) => (
            <Link
              key={s}
              href="#"
              className="text-xs text-foreground/20 transition-colors duration-150 hover:text-foreground/60"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
