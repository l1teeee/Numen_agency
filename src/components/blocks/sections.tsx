'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, User, Mail, MessageSquare, DollarSign, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { motion, AnimatePresence, useInView, type MotionValue } from 'framer-motion'
import { SelectCustom } from '@/components/ui/select-custom'
import { PhotoSpread } from '@/components/ui/gallery'
interface BlurStyle {
  filter: MotionValue<string>
  opacity: MotionValue<number>
}

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, ease: EASE, delay },
})

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
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
      <motion.div
        className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-10 lg:px-8"
        style={blurStyle}
      >
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-6">
          <span className={`text-xs uppercase tracking-widest transition-colors duration-500 ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>What We Do</span>
          <span className={`text-xs transition-colors duration-500 ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>02</span>
        </div>
        <div className="mt-6 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 overflow-hidden">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              {...fadeUp(i * 0.08)}
              className="group relative overflow-hidden rounded-2xl border border-foreground/[0.08] transition-colors duration-300 hover:border-foreground/[0.14]"
            >
              {/* full-card background image */}
              <img
                src={s.img}
                alt={s.title}
                style={{ objectPosition: 'center 18%' }}
                className="absolute inset-0 h-full w-full object-contain scale-[0.82] origin-top transition-transform duration-700 group-hover:scale-[0.87] invert brightness-[0.88] dark:invert-0 dark:brightness-100"
              />

              {/* gradient: transparent top → soft mid */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/20" />

              {/* strong gradient behind text area only */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background via-background/90 to-transparent" />

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
        </div>
      </motion.div>
    </section>
  )
}

// ─── Projects ────────────────────────────────────────────────
const projects = [
  {
    name: 'VieLinks',
    category: 'Platform · 2024',
    desc: 'Your entire online presence, one link. VieLinks lets digital professionals centralize their portfolio, social profiles, and work history into a single shareable page — clean, fast, and fully customizable.',
    stack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    href: 'https://vielinks.com',
    status: 'Live',
    dot: 'bg-emerald-400',
  },
  {
    name: 'InkyTap',
    category: 'Web App · 2026',
    desc: '"Historias para descubrir." A curated story library for Spanish readers — browse 15+ genres from fiction to biography, filter by reading time, and find your next great read.',
    stack: ['Next.js', 'AWS S3', 'TypeScript', 'Tailwind CSS'],
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
      <motion.div
        className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-10 lg:px-8"
        style={blurStyle}
      >
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-6">
          <span className={`text-xs uppercase tracking-widest transition-colors duration-500 ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>Selected Work</span>
          <span className={`text-xs transition-colors duration-500 ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>03</span>
        </div>
        <div className="mt-6 flex flex-1 flex-col gap-3 lg:flex-row">
          <motion.div {...fadeUp(0)} className="flex flex-col flex-1 lg:flex-[3]">
            <Link href={featured.href} target="_blank" rel="noopener noreferrer" className="group relative flex flex-1 flex-col justify-between rounded-2xl bg-background p-6 ring-1 ring-foreground/[0.08]">
              {/* gradient ring on hover — CSS mask creates a hollow 1px donut */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(to right, #d394ff, #f0dcff, #c97cff)',
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
                    <h3 className="text-xl font-semibold text-foreground">{featured.name}</h3>
                    {featured.status && (
                      <span className="flex items-center gap-1 rounded-full border border-foreground/[0.08] px-2 py-0.5 text-[10px] text-foreground/35">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${featured.dot}`} />
                        {featured.status}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-foreground/20 transition-colors duration-200 group-hover:text-[#d394ff]" />
              </div>
              <div className="flex items-center justify-center">
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
                <p className="mb-4 text-sm leading-relaxed text-foreground/40">{featured.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.stack.map((t) => (
                    <span key={t} className="rounded-full border border-foreground/[0.08] px-3 py-1 text-xs text-foreground/40">{t}</span>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-foreground/20 transition-colors duration-200 group-hover:text-foreground/40">{featured.href.replace('https://', '')}</p>
              </div>
            </Link>
          </motion.div>
          <div className="flex flex-row gap-3 lg:flex-col lg:flex-[2]">
            {rest.map((p, i) => (
              <motion.div key={p.name} {...fadeUp(0.1 + i * 0.08)} className="flex-1">
                <Link href={p.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-foreground/[0.08] p-5 transition-colors duration-300 hover:border-foreground/[0.16]">
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
                    <div className="my-4 flex-1 overflow-hidden rounded-xl">
                      <img src={p.img} alt={p.name} className="h-full w-full object-cover invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.04]" />
                    </div>
                  )}
                  <div className={p.img ? '' : 'mt-auto'}>
                    <p className="mb-3 text-xs leading-relaxed text-foreground/40">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((t) => (
                        <span key={t} className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 text-xs text-foreground/40">{t}</span>
                      ))}
                    </div>
                    <p className="mt-2 text-[10px] text-foreground/20 transition-colors duration-200 group-hover:text-foreground/35">{p.href.replace('https://', '')}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────
const team = [
  {
    initials: 'JM',
    name: 'Julian Mendez',
    role: 'Full-Stack Developer & Co-founder',
    desc: 'Leads architecture, backend systems, and infrastructure. Obsessed with clean code, performance, and shipping products that actually scale.',
    linkedin: 'https://linkedin.com/in/julianmendez',
  },
  {
    initials: 'IR',
    name: 'Igmer Rodriguez',
    role: 'Full-Stack Developer & Co-founder',
    desc: 'Drives frontend engineering and product design. Turns complex UX challenges into fast, accessible, pixel-perfect interfaces.',
    linkedin: 'https://linkedin.com/in/igmerrodriguez',
  },
]

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })
  return (
    <section ref={ref} id="about" className="sticky top-0 z-30 flex h-screen flex-col rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-10 lg:px-8">
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-6">
          <span className={`text-xs uppercase tracking-widest transition-colors duration-500 ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>About Numen</span>
          <span className={`text-xs transition-colors duration-500 ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>04</span>
        </div>

        <div className="mt-8 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div {...fadeUp(0)} className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-semibold leading-snug tracking-tight text-foreground lg:text-4xl">
                A small team that builds<br />
                <span className="text-foreground/25">great digital products.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/40">
                Numen Agency was founded with one mission: build digital products that actually work.
                We combine design thinking with engineering precision to deliver software that scales
                and experiences that people love.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/30">
                Based in El Salvador, working fully remote with clients worldwide. We move fast, communicate clearly, and treat every project like it&apos;s our own product.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {team.map((member, i) => (
                  <motion.div
                    key={member.name}
                    {...fadeUp(0.12 + i * 0.08)}
                    className="flex flex-col rounded-2xl border border-foreground/[0.08] p-4 transition-colors duration-200 hover:border-foreground/[0.16]"
                  >
                    {/* Photo placeholder */}
                    <div className="mb-3 flex h-28 w-full items-end justify-end overflow-hidden rounded-xl bg-foreground/[0.04] p-2">
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

              <motion.p {...fadeUp(0.3)} className="text-[11px] italic text-foreground/25">
                Engineered with precision. Designed with purpose.
              </motion.p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 content-start gap-3">
            {[
              { value: '10+', label: 'Projects delivered' },
              { value: '3+', label: 'Years of experience' },
              { value: '2', label: 'Products live in production' },
              { value: '24h', label: 'Max response time' },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(0.1 + i * 0.07)} className="rounded-2xl border border-foreground/[0.08] p-6">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs text-foreground/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ────────────────────────────────────────────
const testimonials = [
  {
    quote: 'Working with Numen was exactly what our startup needed. They took our rough idea and shipped a product our users actually love. Fast, communicative, and genuinely invested in the outcome.',
    name: 'Maria Santos',
    role: 'CEO, Finspark',
    initials: 'MS',
  },
  {
    quote: 'The level of polish they deliver is remarkable. Our redesign went from concept to launch in 6 weeks, and the design system they built saved us months of future work.',
    name: 'Carlos Herrera',
    role: 'Founder, Stackr',
    initials: 'CH',
  },
  {
    quote: 'Most agencies over-promise and under-deliver. Numen did the opposite — low ego, high output. They felt like part of our team from day one.',
    name: 'Ana Rodriguez',
    role: 'Head of Product, Lumos',
    initials: 'AR',
  },
  {
    quote: 'We needed an AI integration built fast without sacrificing quality. Numen delivered a production-ready solution in three weeks. The code is clean and our team could take it over immediately.',
    name: 'David Chen',
    role: 'CTO, Pulsar Labs',
    initials: 'DC',
  },
  {
    quote: 'From the first call it was clear these guys care about outcomes, not just deliverables. Our conversion rate went up 34% after they rebuilt our onboarding flow.',
    name: 'Sofia Ramirez',
    role: 'Founder, Bloom',
    initials: 'SR',
  },
  {
    quote: 'Numen handled a complex migration with zero downtime. Their communication throughout was exceptional — we always knew exactly where things stood.',
    name: 'James Osei',
    role: 'Head of Engineering, Drift',
    initials: 'JO',
  },
]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

const PAGES = [testimonials.slice(0, 3), testimonials.slice(3, 6)]

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const prev = () => { setDirection(-1); setPage((p) => (p - 1 + PAGES.length) % PAGES.length) }
  const next = () => { setDirection(1);  setPage((p) => (p + 1) % PAGES.length) }

  useEffect(() => {
    const id = setInterval(() => { setDirection(1); setPage((p) => (p + 1) % PAGES.length) }, 7000)
    return () => clearInterval(id)
  }, [])

  return (
    <section ref={ref} id="testimonials" className="border-t border-foreground/[0.08] bg-background py-24">
      <motion.div {...blurLeave} className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between border-b border-foreground/[0.08] pb-6"
          {...fadeUp(0)}
        >
          <span className={`text-xs uppercase tracking-widest transition-colors duration-500 ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>What Clients Say</span>
          <span className={`text-xs transition-colors duration-500 ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>05</span>
        </motion.div>

        <motion.div {...fadeUp(0.05)} className="mt-16">
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: EASE }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                {PAGES[page].map((t) => (
                  <div key={t.name} className="flex flex-col justify-between rounded-2xl border border-foreground/[0.08] p-6">
                    <p className="text-sm leading-relaxed text-foreground/60">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/[0.08] text-[10px] font-medium text-foreground/40">
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{t.name}</p>
                        <p className="text-[10px] text-foreground/30">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {PAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setDirection(i > page ? 1 : -1); setPage(i) }}
                  className={`h-1 rounded-full transition-all duration-300 ${i === page ? 'w-6 bg-foreground/40' : 'w-1.5 bg-foreground/[0.12] hover:bg-foreground/20'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={prev} className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/[0.08] text-foreground/30 transition-colors duration-200 hover:border-foreground/[0.16] hover:text-foreground">
                <ChevronLeft size={15} />
              </button>
              <button type="button" onClick={next} className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/[0.08] text-foreground/30 transition-colors duration-200 hover:border-foreground/[0.16] hover:text-foreground">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Tech Stack ──────────────────────────────────────────────
const stackCategories = [
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Framer Motion', icon: 'framer' },
    ],
  },
  {
    label: 'Backend & DB',
    items: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Prisma', icon: 'prisma' },
      { name: 'Redis', icon: 'redis' },
    ],
  },
  {
    label: 'Payments & AI',
    items: [
      { name: 'Stripe', icon: 'stripe' },
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Anthropic', icon: 'anthropic' },
    ],
  },
  {
    label: 'Design',
    items: [
      { name: 'Figma', icon: 'figma' },
    ],
  },
  {
    label: 'DevOps & Tools',
    items: [
      { name: 'Vercel', icon: 'vercel' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Notion', icon: 'notion' },
      { name: 'Linear', icon: 'linear' },
    ],
  },
]

export function TechStackSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })
  return (
    <section ref={ref} id="stack" className="rounded-t-[2rem] border-t border-foreground/[0.08] bg-background py-24">
      <motion.div {...blurLeave} className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between border-b border-foreground/[0.08] pb-6"
          {...fadeUp(0)}
        >
          <span className={`text-xs uppercase tracking-widest transition-colors duration-500 ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>Our Stack</span>
          <span className={`text-xs transition-colors duration-500 ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>06</span>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div {...fadeUp(0.05)}>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
              Tools we trust<br />
              <span className="text-foreground/25">to build with.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-foreground/40">
              We carefully select every tool for reliability, developer experience, and long-term
              scalability. No hype — only tools that actually deliver in production.
            </p>
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {stackCategories.map((cat) => (
              <motion.div key={cat.label} variants={staggerItem}>
                <span className="mb-3 block text-xs uppercase tracking-widest text-foreground/25">
                  {cat.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item.name}
                      className="flex items-center gap-2 rounded-2xl border border-foreground/[0.08] px-4 py-2 transition-colors duration-200 hover:border-foreground/[0.16]"
                    >
                      <img
                        src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${item.icon}.svg`}
                        alt={item.name}
                        className="h-3.5 w-3.5 dark:invert opacity-60"
                      />
                      <span className="text-sm text-foreground/60">{item.name}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })
  return (
    <section ref={ref} id="process" className="border-t border-foreground/[0.08] bg-background py-24">
      <motion.div {...blurLeave} className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between border-b border-foreground/[0.08] pb-6"
          {...fadeUp(0)}
        >
          <span className={`text-xs uppercase tracking-widest transition-colors duration-500 ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>How We Work</span>
          <span className={`text-xs transition-colors duration-500 ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>07</span>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-2 lg:grid-cols-3 lg:[grid-template-rows:repeat(3,minmax(12rem,1fr))]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* 01 Discovery — cols 1-2, row 1 */}
          <motion.div
            variants={staggerItem}
            className="group flex min-h-[14rem] flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black transition-colors duration-300 hover:border-foreground/[0.16] lg:flex-row lg:min-h-0 lg:[grid-column-start:1] lg:[grid-column-end:3] lg:[grid-row-start:1]"
          >
            <div className="flex flex-1 flex-col justify-between p-5 lg:w-1/2 lg:flex-none">
              <span className="text-[10px] font-medium text-foreground/30">01</span>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Discovery</h3>
                <p className="text-xs leading-relaxed text-foreground/50">We start by understanding your goals, users, and constraints. Deep dive into the problem space before writing a single line of code.</p>
                <p className="mt-2 text-xs leading-relaxed text-foreground/35">From user research and competitor analysis to technical requirements and project scope — we leave nothing to assumptions before development begins.</p>
              </div>
            </div>
            <div className="relative h-48 overflow-hidden lg:h-auto lg:w-1/2">
              <img src="/discovery.png" alt="Discovery" className="absolute inset-0 h-full w-full object-contain p-4 invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
          </motion.div>

          {/* 02 Design — col 3, rows 1-2 (tall) */}
          <motion.div
            variants={staggerItem}
            className="group flex min-h-[16rem] flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black transition-colors duration-300 hover:border-foreground/[0.16] lg:min-h-0 lg:[grid-column-start:3] lg:[grid-row-start:1] lg:[grid-row-end:3]"
          >
            <div className="relative min-h-0 flex-[4] overflow-hidden">
              <img src="/ux.png" alt="Design" className="absolute inset-0 h-full w-full object-contain p-0 scale-[1.2] translate-y-[8%] invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.25] group-hover:translate-y-[8%]" />
            </div>
            <div className="flex flex-[2] flex-col justify-end p-4">
              <span className="text-[10px] font-medium text-foreground/30">02</span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">Design</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">Wireframes, prototypes and design systems built in Figma. We validate ideas early so nothing is left to chance during development.</p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/35">Every screen is designed for real users — accessible, responsive, and aligned with your brand from day one.</p>
            </div>
          </motion.div>

          {/* 03 Build — col 2, row 2 */}
          <motion.div
            variants={staggerItem}
            className="group flex min-h-[10rem] flex-col justify-between overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black p-5 transition-colors duration-300 hover:border-foreground/[0.16] lg:min-h-0 lg:[grid-column-start:2] lg:[grid-row-start:2]"
          >
            <span className="text-[10px] font-medium text-foreground/30">03</span>
            <div>
              <h3 className="mb-1.5 text-sm font-semibold text-foreground">Build</h3>
              <p className="text-xs leading-relaxed text-foreground/50">Full-stack development with our proven stack. Clean code, thorough testing, and weekly demos to keep you in the loop.</p>
            </div>
          </motion.div>

          {/* 04 Launch — col 1, rows 2-3 (tall) */}
          <motion.div
            variants={staggerItem}
            className="group flex min-h-[16rem] flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black transition-colors duration-300 hover:border-foreground/[0.16] lg:min-h-0 lg:[grid-column-start:1] lg:[grid-row-start:2] lg:[grid-row-end:4]"
          >
            <div className="relative min-h-0 flex-[4] overflow-hidden">
              <img src="/launch.png" alt="Launch" className="absolute inset-0 h-full w-full object-contain p-0 scale-[1.2] translate-y-[8%] invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.25] group-hover:translate-y-[8%]" />
            </div>
            <div className="flex flex-[2] flex-col justify-end p-4">
              <span className="text-[10px] font-medium text-foreground/30">04</span>
              <h3 className="mt-1 text-sm font-semibold text-foreground">Launch</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">Deploy with confidence. We handle infrastructure setup, CI/CD pipelines, environment configuration, and go-live checklists so nothing slips through the cracks.</p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/35">We set up monitoring, error tracking, and analytics — then stay close for the first weeks post-launch to catch anything that surfaces in production.</p>
            </div>
          </motion.div>

          {/* 05 Scale — cols 2-3, row 3 */}
          <motion.div
            variants={staggerItem}
            className="group flex min-h-[14rem] flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-black transition-colors duration-300 hover:border-foreground/[0.16] lg:flex-row lg:min-h-0 lg:[grid-column-start:2] lg:[grid-column-end:4] lg:[grid-row-start:3]"
          >
            <div className="relative h-48 overflow-hidden lg:h-auto lg:w-2/5">
              <img src="/scale.png" alt="Scale" className="absolute inset-0 h-full w-full object-contain p-0 scale-[1.2] translate-y-[8%] invert dark:invert-0 transition-transform duration-700 group-hover:scale-[1.25] group-hover:translate-y-[8%]" />
            </div>
            <div className="flex flex-col justify-between p-5 lg:w-3/5">
              <span className="text-[10px] font-medium text-foreground/30">05</span>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Scale</h3>
                <p className="text-xs leading-relaxed text-foreground/50">Continuous iteration, performance tuning, and growth features. We stay by your side long after launch to make sure the product thrives.</p>
                <p className="mt-2 text-xs leading-relaxed text-foreground/35">From A/B testing and analytics to new feature rollouts and infrastructure scaling — we treat your product as a living system, not a finished deliverable.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────────
const faqs = [
  {
    q: 'What does Numen Agency do?',
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
    a: "Fill out the contact form below or email hola@numenagency.com. We'll schedule a 30-minute discovery call to understand your goals, then send a detailed proposal within a few days.",
  },
]

export function FAQSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section ref={ref} id="faq" className="border-t border-foreground/[0.08] bg-background py-24">
      <motion.div {...blurLeave} className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div className="flex items-center justify-between border-b border-foreground/[0.08] pb-6" {...fadeUp(0)}>
          <span className={`text-xs uppercase tracking-widest transition-colors duration-500 ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>FAQ</span>
          <span className={`text-xs transition-colors duration-500 ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>08</span>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp(0.05)}>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
              Common questions<br />
              <span className="text-foreground/25">answered.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/40">
              Not finding what you&apos;re looking for? Use the AI assistant at the bottom right or send us a message directly.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={staggerItem} className="border-b border-foreground/[0.06]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left"
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
  { label: 'Email', value: 'hola@numenagency.com' },
  { label: 'Based in', value: 'El Salvador · Remote worldwide' },
  { label: 'Availability', value: 'Open to new projects' },
]

const budgetOptions = [
  { value: 'under5k', label: 'Under $5k' },
  { value: '5-15k', label: '$5k – $15k' },
  { value: '15-50k', label: '$15k – $50k' },
  { value: '50k+', label: '$50k+' },
]

export function ContactFormSection() {
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
    <>
      <section ref={ref} id="contact" className="border-t border-foreground/[0.08] bg-background py-24">
        <motion.div {...blurLeave} className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between border-b border-foreground/[0.08] pb-6"
            {...fadeUp(0)}
          >
            <span className={`text-xs uppercase tracking-widest transition-colors duration-500 ${isInView ? 'text-foreground/60' : 'text-foreground/30'}`}>Start a Project</span>
            <span className={`text-xs transition-colors duration-500 ${isInView ? 'text-foreground/40' : 'text-foreground/20'}`}>09</span>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="flex flex-col justify-between gap-10">
              <motion.div {...fadeUp(0.05)}>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
                  Let&apos;s build something<br />
                  <span className="text-foreground/25">great together.</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-foreground/40">
                  Tell us about your project. We&apos;ll get back to you within 24 hours with
                  thoughts and next steps.
                </p>
              </motion.div>

              <motion.div
                className="space-y-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
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

            <motion.div {...fadeUp(0.12)}>
              {status === 'sent' ? (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-foreground/[0.08] p-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/[0.08] text-foreground">
                    ✓
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">Message sent!</h3>
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
                        rows={5}
                        value={form.message}
                        onChange={handle}
                        placeholder="We're looking to build..."
                        className={`${INPUT} resize-none pl-10`}
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <p className="text-center text-xs text-red-400/70">
                      Something went wrong. Please try again or email us directly.
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
        </motion.div>
      </section>

      <footer className="border-t border-foreground/[0.08] bg-background">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          <span className="text-xs text-foreground/20">© 2025 Numen Agency. All rights reserved.</span>
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
    </>
  )
}
