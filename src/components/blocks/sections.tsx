'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Globe, User, Mail, MessageSquare, Plus, Tags, UserPlus } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { GlobeReach } from '@/components/ui/cobe-globe-cdn'
import { companyStats } from '@/lib/company-stats'
import { blogPosts } from '@/lib/blog-posts'
import { useLang } from '@/lib/lang'
import { SECTION_HREFS, handleSectionLinkClick } from '@/lib/section-scroll'
import { SOCIAL_LINKS } from '@/lib/site'
import { FounderAvatar } from '@/components/ui/founder-avatar'
import { CheckScribble } from '@/components/ui/doodles/misc/check-scribble'
import { FounderSticker } from '@/components/ui/doodles/founder-sticker'
import { NumenMark } from '@/components/ui/doodles/numen-mark'
import { IndexEntry, IndexSection, INDEX_ASIDE_LINK, INDEX_GRID, INDEX_GRID_TWO, INDEX_GUTTER } from './index-section'
import { EditorialReveal, EDITORIAL_STRONG, EDITORIAL_MUTED, EDITORIAL_TEXT, EDITORIAL_LINK } from './editorial-shell'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const INPUT =
  'w-full min-h-11 rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-[15px] text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-100'

function useSectionReveal(ref: React.RefObject<HTMLElement | null>) {
  const isInView = useInView(ref, { amount: 0.12, once: true })
  const reducedMotion = useReducedMotion()
  return { isActive: isInView || reducedMotion }
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [val, setVal] = useState(to)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (!inView || reduceMotion) return
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
  }, [inView, to, reduceMotion])
  return <span ref={ref}>{reduceMotion ? to : val}{suffix}</span>
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
      {online && <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-emerald-400 opacity-75" />}
      <span className={`relative inline-flex rounded-full ${size} ${online === undefined ? 'bg-foreground/20' : 'bg-emerald-400'}`} />
    </span>
  )
}

// ─── Static non-translatable data ────────────────────────────
// The Selected Work section shows the first six projects; the rest only appear in the Live Now list.
const SELECTED_PROJECT_COUNT = 6

const projectsMeta = [
  { href: 'https://claro-campus.vercel.app', name: 'Brotiva',    status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Prisma'] },
  { href: 'https://vielinks.com',         name: 'VieLinks',     status: 'Live', dot: 'bg-emerald-400', stack: ['React 19', 'Vite', 'TypeScript', 'Framer Motion', 'GSAP'] },
  { href: 'https://scoutia.dev/landing',   name: 'ScoutIA',      status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { href: 'https://dashboard-bot-whatsapp.vercel.app', name: 'WhatsApp Ops', status: 'Live', dot: 'bg-emerald-400', stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query'] },
  { href: 'https://cora-dashboard-three.vercel.app/login', name: 'CORA', status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'Tailwind CSS'] },
  { href: 'https://nexo-erp-phi.vercel.app/login', name: 'Nexo ERP', status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'NestJS', 'Prisma'] },
  { href: 'https://servilocal-three.vercel.app', name: 'ServiLocal', status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Tkiero'] },
]

const useCaseMeta = [
  { href: 'https://aeri-self.vercel.app/' },
  { href: 'https://savia-cafe-nu.vercel.app/' },
  { href: 'https://luvre-jewerly.vercel.app/' },
]

const liveProjectsMeta = [
  ...projectsMeta,
  { href: 'https://app.inkytap.com',       name: 'InkyTap Quiz', status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'TypeScript', 'Supabase'] },
]

const teamMeta = [
  { figure: 'julian', name: 'Julian Mendez', role: 'Software Engineer & Founder', linkedin: 'https://www.linkedin.com/in/juli%C3%A1n-m%C3%A9ndez-arev/', website: 'https://julian-menz.dev/' },
] as const

// Projects delivered per country; every country that is not the HQ is a live client relationship.
const reachMeta = [
  { id: 'sv', isHQ: true, delivered: 4 },
  { id: 'gt', isHQ: false, delivered: 2 },
  { id: 'mx', isHQ: false, delivered: 2 },
  { id: 'ar', isHQ: false, delivered: 1 },
  { id: 'gb', isHQ: false, delivered: 2 },
  { id: 'de', isHQ: false, delivered: 1 },
] as const

// ─── Services ────────────────────────────────────────────────
export function ServicesSection() {
  const { t, lang } = useLang()
  const deliverables = lang === 'es'
    ? ['MVPs, plataformas SaaS y aplicaciones web', 'Flujos, prototipos y sistemas de diseño', 'Asistentes, búsqueda y automatización', 'Despliegues, monitoreo e infraestructura']
    : ['MVPs, SaaS platforms and web applications', 'User flows, prototypes and design systems', 'Assistants, search and automation', 'Deployments, monitoring and infrastructure']

  return (
    <IndexSection
      id="services"
      fullScreen
      number={1}
      title={t.services.label}
      intro={lang === 'es' ? 'De una buena idea a algo real. Diseño + ingeniería. Un mismo equipo.' : 'From a good idea to the real thing. Design + engineering. One team.'}
    >
      <ol className={INDEX_GRID_TWO}>
        {t.services.items.map((service, index) => (
          <IndexEntry key={service.title} index={index} name={service.title} details={deliverables[index]} desc={service.desc} />
        ))}
      </ol>
    </IndexSection>
  )
}

export function ProjectsSection() {
  const { t, lang } = useLang()
  const status = useProjectStatus()

  return (
    <IndexSection
      id="work"
      number={2}
      title={t.projects.label}
      intro={lang === 'es' ? 'Ideas que ya están ahí afuera.' : 'Ideas out in the real world.'}
      aside={
        <Link href="/projects" className={INDEX_ASIDE_LINK}>
          {t.projects.seeAll}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      }
    >
      <ol className={INDEX_GRID}>
        {projectsMeta.slice(0, SELECTED_PROJECT_COUNT).map((meta, index) => {
          const project = t.projects.items[index]
          const online = status[meta.href]
          return (
            <IndexEntry
              key={meta.href}
              index={index}
              href={meta.href}
              name={project.name}
              details={
                <>
                  <StatusDot online={online} />
                  {project.category}
                  {online === false && <span>· {lang === 'es' ? 'No disponible' : 'Unavailable'}</span>}
                </>
              }
              desc={project.desc}
              footnote={meta.stack.join(' · ')}
            />
          )
        })}
      </ol>
    </IndexSection>
  )
}

export function UseCasesSection() {
  const { t, lang } = useLang()
  const tu = t.useCases

  return (
    <IndexSection
      id="use-cases"
      number={3}
      title={tu.label}
      intro={lang === 'es' ? 'Espacio para explorar. Experimentos de marca, diseño y nuevas posibilidades.' : 'Room to explore. Experiments in brand, design and new possibilities.'}
    >
      <ol className={INDEX_GRID}>
        {tu.concepts.map((concept, index) => (
          <IndexEntry key={concept.name} index={index} href={useCaseMeta[index].href} name={concept.name} details={concept.category} desc={concept.desc} />
        ))}
        {tu.cards.map((card, cardIndex) => (
          <IndexEntry key={card.category} index={tu.concepts.length + cardIndex} name={card.title} details={`${card.category} · ${tu.comingSoon}`} />
        ))}
      </ol>
    </IndexSection>
  )
}

export function LiveProjectsSection() {
  const { t, lang } = useLang()
  const tl = t.liveProjects
  const status = useProjectStatus()

  return (
    <IndexSection
      id="live-projects"
      title={tl.label}
      intro={`${tl.headline1} ${tl.headline2} ${tl.subtext}`}
      aside={
        <Link href={SECTION_HREFS.contact} className={INDEX_ASIDE_LINK}>
          {lang === 'es' ? 'Cuéntanos tu idea' : 'Tell us your idea'}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      }
    >
      <ol className={INDEX_GRID}>
        {liveProjectsMeta.map((project, index) => (
          <IndexEntry
            key={project.href}
            index={index}
            name={project.name}
            href={project.href}
            details={
              <>
                <StatusDot online={status[project.href]} />
                {new URL(project.href).hostname}
                {status[project.href] === false && <span>· {lang === 'es' ? 'No disponible' : 'Unavailable'}</span>}
              </>
            }
            footnote={project.stack.slice(0, 3).join(' · ')}
          />
        ))}
      </ol>
    </IndexSection>
  )
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
  const { t } = useLang()
  const ta = t.about

  return (
    <IndexSection id="about" number={4} title={ta.label} sectionRef={ref} stacked intro={`${ta.headline1} ${ta.headline2}`}>
      <div className="grid gap-12 lg:grid-cols-3 lg:items-center lg:gap-16">
        {teamMeta.map((member, i) => (
          <EditorialReveal key={member.name} className="order-first flex flex-col items-center text-center lg:order-none lg:col-start-2 lg:row-start-1">
            <FounderAvatar figure={member.figure} active={isActive} className="w-48 lg:w-64" />
            <h3 className={`mt-4 text-[clamp(1.5rem,2vw,2.25rem)] font-medium leading-[1.02] tracking-[-0.04em] ${EDITORIAL_STRONG}`}>{member.name}</h3>
            <p className={`mt-2 text-[13px] ${EDITORIAL_MUTED}`}>{member.role}</p>
            <p className={`mt-4 max-w-[24rem] text-[13px] leading-relaxed ${EDITORIAL_MUTED}`}>{ta.team[i].desc}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 text-[13px]">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={EDITORIAL_LINK}>
                LinkedIn<ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
              <a href={member.website} target="_blank" rel="noopener noreferrer" className={EDITORIAL_LINK}>
                <Globe className="size-3.5" aria-hidden="true" />
                julian-menz.dev<ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </EditorialReveal>
        ))}
        <EditorialReveal className={`space-y-4 text-[13px] leading-relaxed lg:col-start-1 lg:row-start-1 ${EDITORIAL_MUTED}`}>
          <p>{ta.p1}</p>
          <p>{ta.p2}</p>
        </EditorialReveal>
        <EditorialReveal className="lg:col-start-3 lg:row-start-1">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
            {companyStats.map((s, i) => (
              <div key={s.key} data-stat-name={s.schemaName} data-stat-value={s.display} className="flex flex-col-reverse justify-end gap-1">
                <dt className={`text-[13px] leading-snug ${EDITORIAL_MUTED}`}>{ta.stats[i].label}</dt>
                <dd className={`text-[clamp(1.5rem,2vw,2.25rem)] font-medium leading-none tracking-[-0.04em] ${EDITORIAL_STRONG}`} aria-label={s.display + ' ' + ta.stats[i].label}>
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </EditorialReveal>
      </div>
      <ol className="mt-16 grid gap-10 md:grid-cols-3 lg:mt-24 lg:gap-16 lg:[&:hover>li:not(:hover)]:opacity-35">
        {ta.principles.map((principle, index) => (
          <IndexEntry key={principle.title} index={index} name={principle.title} desc={principle.desc} compact />
        ))}
      </ol>
    </IndexSection>
  )
}

// ─── Global Reach ────────────────────────────────────────────
export function GlobalReachSection() {
  const { t } = useLang()
  const tr = t.reach
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <IndexSection id="reach" number={5} title={tr.label} intro={`${tr.headline1} ${tr.headline2} ${tr.subtext}`}>
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-12">
        <ul className="order-2 md:order-1">
          {reachMeta.map((c, i) => {
            const country = tr.countries[i]
            return (
              <li key={c.id}>
                <EditorialReveal delay={i * 0.06}>
                  <button
                    type="button"
                    aria-pressed={focused === c.id}
                    onClick={() => setFocused(focused === c.id ? null : c.id)}
                    className={`flex min-h-14 w-full items-center justify-between gap-4 text-left transition-opacity duration-300 hover:opacity-100 ${focused && focused !== c.id ? 'opacity-35' : 'opacity-100'}`}
                  >
                    <span className="min-w-0">
                      <span className={`block truncate text-[15px] font-medium ${EDITORIAL_STRONG}`}>{country.name}</span>
                      <span className={`block truncate text-[13px] ${EDITORIAL_MUTED}`}>{country.city}{c.isHQ ? ` · ${tr.hq}` : ''}</span>
                    </span>
                    <span className={`shrink-0 text-[13px] tabular-nums ${EDITORIAL_MUTED}`}>{c.delivered} {c.delivered === 1 ? tr.project : tr.projects}</span>
                  </button>
                </EditorialReveal>
              </li>
            )
          })}
        </ul>
        <EditorialReveal className="order-1 md:order-2">
          <div aria-hidden="true" className="mx-auto w-full max-w-[22rem] lg:max-w-[30rem]">
            <GlobeReach focus={focused} />
          </div>
        </EditorialReveal>
      </div>
    </IndexSection>
  )
}

// ─── Insights ────────────────────────────────────────────────
const recentPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

export function InsightsSection() {
  const { lang, t } = useLang()
  const tb = t.blog
  const locale = lang === 'en' ? 'en-US' : 'es-SV'

  return (
    <IndexSection
      id="blog"
      number={6}
      title={tb.label}
      intro={`${tb.headline} ${tb.subtext}`}
      aside={
        <Link href="/blog" className={INDEX_ASIDE_LINK}>
          {tb.moreArticles}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      }
    >
      <ol className={INDEX_GRID}>
        {recentPosts.map((post, index) => {
          const title = lang === 'en' && post.en ? post.en.title : post.title
          const description = lang === 'en' && post.en ? post.en.description : post.description
          const category = lang === 'en' && post.en ? post.en.category : post.category
          const date = new Date(post.date + 'T00:00:00').toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
          return (
            <IndexEntry
              key={post.slug}
              index={index}
              name={title}
              compact
              href={`/blog/${post.slug}`}
              external={false}
              linkLabel={title + ', ' + tb.readArticle}
              details={category + ' · ' + post.readTime + ' ' + tb.readTime + ' · ' + date}
              desc={description}
            />
          )
        })}
      </ol>
    </IndexSection>
  )
}

// ─── Process ─────────────────────────────────────────────────
export function ProcessSection() {
  const { t, lang } = useLang()
  const tp = t.process
  const outputs = lang === 'es'
    ? ['Objetivos y alcance definidos', 'Prototipo y sistema visual', 'Producto funcional e integraciones', 'Producto publicado y monitoreado', 'Iteraciones y nuevas funcionalidades']
    : ['Clear goals and project scope', 'Prototype and visual system', 'Working product and integrations', 'Live product and monitoring', 'Iterations and new features']
  const activities = lang === 'es'
    ? [
        ['Investigación de usuarios', 'Análisis de competencia', 'Alcance del proyecto'],
        ['Wireframes', 'Prototipos', 'Sistema de diseño'],
        ['Full-stack', 'CI/CD', 'Automatización de infraestructura'],
        ['Checklist de lanzamiento', 'Seguimiento de errores', 'Analítica'],
        ['Pruebas A/B', 'Optimización de rendimiento', 'Nuevas funciones'],
      ]
    : [
        ['User research', 'Competitor analysis', 'Project scope'],
        ['Wireframes', 'Prototypes', 'Design system'],
        ['Full-stack', 'CI/CD', 'Infrastructure automation'],
        ['Go-live checklist', 'Error tracking', 'Analytics'],
        ['A/B testing', 'Performance tuning', 'New features'],
      ]

  return (
    <IndexSection
      id="process"
      number={7}
      title={tp.label}
      intro={lang === 'es' ? 'Una idea. Cinco pasos claros. Sabes qué sigue, desde el primer día.' : 'One idea. Five clear steps. Know what comes next, from day one.'}
    >
      <ol className={INDEX_GRID}>
        {tp.steps.map((step, index) => (
          <IndexEntry key={step.title} index={index} name={step.title} details={outputs[index]} desc={tp.stepsListDesc[index]} footnote={activities[index].join(' · ')} />
        ))}
      </ol>
    </IndexSection>
  )
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)
  const { t } = useLang()
  const lenis = useLenis()
  const tf = t.faq

  return (
    <IndexSection
      id="faq"
      number={8}
      title={tf.label}
      intro={`${tf.headline1} ${tf.headline2} ${tf.headline3} ${tf.subtext}`}
      aside={
        <Link href={SECTION_HREFS.contact} scroll={false} onClick={(e) => handleSectionLinkClick(e, SECTION_HREFS.contact, lenis)} className={INDEX_ASIDE_LINK}>
          {tf.cta}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      }
    >
      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {tf.items.map((faq, i) => (
          <EditorialReveal key={i} delay={i * 0.05}>
            <button
              type="button"
              id={`faq-trigger-${i}`}
              aria-expanded={open === i}
              aria-controls={`faq-panel-${i}`}
              className="flex min-h-14 w-full items-center justify-between gap-3 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className={`pr-4 font-medium ${EDITORIAL_TEXT} ${EDITORIAL_STRONG}`}>{faq.q}</span>
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${open === i ? 'border-neutral-900 dark:border-neutral-100' : 'border-neutral-300 dark:border-neutral-700'}`}>
                <Plus
                  size={14}
                  className={`${EDITORIAL_MUTED} transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className={`pb-5 ${EDITORIAL_TEXT} ${EDITORIAL_MUTED}`}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </EditorialReveal>
        ))}
      </div>
    </IndexSection>
  )
}

// ─── Contact Form + Footer ───────────────────────────────────
export function ContactFormSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: '',
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

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
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
    <IndexSection
      id="contact"
      number={9}
      title={tc.label}
      intro={`${tc.headline1} ${tc.headline2} ${tc.subtext}`}
      aside={
        <dl className="mt-8 space-y-4 text-[13px]">
          {infoItems.map((item) => (
            <div key={item.label}>
              <dt className={EDITORIAL_MUTED}>{item.label}</dt>
              <dd className="mt-0.5">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={EDITORIAL_LINK}>
                    {item.value} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className={EDITORIAL_STRONG}>{item.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      }
    >
      <EditorialReveal className="max-w-[40rem]">
        {status === 'sent' ? (
          <div role="status" aria-live="polite" className="rounded-lg border border-neutral-200 p-8 text-center dark:border-neutral-800">
            <CheckScribble active className={`mx-auto h-16 w-16 ${EDITORIAL_STRONG}`} />
            <h3 className={`mt-4 font-medium ${EDITORIAL_TEXT} ${EDITORIAL_STRONG}`}>{tc.successTitle}</h3>
            <p className={`mt-2 ${EDITORIAL_TEXT} ${EDITORIAL_MUTED}`}>{tc.successDesc}</p>
            {/* Ink on white, so it needs its paper to survive the dark panel. */}
            <div className="mt-6 w-24 rounded-[1.25rem_0.5rem_1.25rem_0.5rem] border border-black/10 bg-white px-2 pt-2">
              <FounderSticker
                figure="julian"
                active
                bubble={t.doodles.contactSuccessBubble}
                bubbleSide="left"
                size="w-full"
              />
            </div>
          </div>
        ) : (
          <form
            onSubmit={submit}
            aria-busy={status === 'loading'}
            className="space-y-4"
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className={`text-sm ${EDITORIAL_MUTED}`}>{tc.nameLabel}</label>
                <div className="relative">
                  <User className={`pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${EDITORIAL_MUTED}`} />
                  <input
                    id="name"
                    autoComplete="name"
                    maxLength={100}
                    name="name"
                    required
                    value={form.name}
                    onChange={handle}
                    placeholder="Alex Johnson"
                    className={`${INPUT} pl-10`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className={`text-sm ${EDITORIAL_MUTED}`}>{tc.emailLabel}</label>
                <div className="relative">
                  <Mail className={`pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${EDITORIAL_MUTED}`} />
                  <input
                    id="email"
                    autoComplete="email"
                    maxLength={254}
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

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className={`text-sm ${EDITORIAL_MUTED}`}>{tc.categoryLabel}</label>
                <div className="relative">
                  <Tags className={`pointer-events-none absolute left-4 top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 ${EDITORIAL_MUTED}`} />
                  <select id="category" name="category" required value={form.category} onChange={handle} className={`${INPUT} pl-10 pr-8`}>
                    <option value="" disabled>{tc.categoryPlaceholder}</option>
                    {tc.categoryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className={`text-sm ${EDITORIAL_MUTED}`}>{tc.messageLabel}</label>
              <div className="relative">
                <MessageSquare className={`pointer-events-none absolute left-4 top-3.5 h-3.5 w-3.5 ${EDITORIAL_MUTED}`} />
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  maxLength={2000}
                  value={form.message}
                  onChange={handle}
                  placeholder={tc.messagePlaceholder}
                  className={`${INPUT} resize-y pl-10`}
                />
              </div>
            </div>

            {status === 'error' && (
              <p role="alert" className="rounded-lg border border-red-500/30 p-3 text-center text-xs text-red-600 dark:text-red-300">{tc.errorMsg}</p>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={status === 'loading'}
              className="min-h-11 w-full rounded-lg bg-neutral-900 text-neutral-100 hover:bg-neutral-700 disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              <UserPlus className="size-4" />
              {status === 'loading' ? tc.sendingBtn : tc.sendBtn}
            </Button>
            <Link
              href="/blog"
              className={`flex min-h-11 items-center justify-center text-center text-balance text-sm underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-900 dark:decoration-neutral-600 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
            >
              {tc.blogCta}
            </Link>
          </form>
        )}
      </EditorialReveal>
    </IndexSection>
  )
}

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className={`bg-white pb-8 pt-10 lg:pt-14 ${INDEX_GUTTER}`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Link href="/" aria-label="Numen" className={`-m-2 inline-flex p-2 ${EDITORIAL_STRONG}`}>
            <NumenMark className="h-5 w-5" />
          </Link>
          <p className={`mt-4 text-[13px] ${EDITORIAL_MUTED}`}>© {new Date().getFullYear()} Numen Agency. {t.contact.footer}</p>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-2">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7">
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center text-[13px] transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/projects"
              className={`inline-flex min-h-11 items-center text-[13px] transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
            >
              {t.nav.projectsLink}
            </Link>
            <Link
              href="/blog"
              className={`inline-flex min-h-11 items-center text-[13px] transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
            >
              {t.blog.label}
            </Link>
          </nav>
          {/* Negative margin plus padding grows each tap target to 36px without moving the icons. */}
          <div className="flex min-h-11 items-center gap-5">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`-m-2.5 inline-flex p-2.5 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`-m-2.5 inline-flex p-2.5 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
