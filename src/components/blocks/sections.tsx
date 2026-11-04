'use client'

import { useState, useRef, useEffect, type ComponentType, type ReactNode } from 'react'
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
import { HoverPeek } from '@/components/ui/link-preview'
import { FounderAvatar } from '@/components/ui/founder-avatar'
import { SERVICE_DOODLES } from '@/components/ui/doodles/services'
import { PROCESS_DOODLES } from '@/components/ui/doodles/process'
import { INSIGHT_DOODLES } from '@/components/ui/doodles/insights'
import { COUNTRY_DOODLES } from '@/components/ui/doodles/reach'
import { CheckScribble, PaperPlaneDoodle, QuestionMarkDoodle, SketchPencilDoodle, SparkleDoodle } from '@/components/ui/doodles/misc'
import { FounderSticker } from '@/components/ui/doodles/founder-sticker'
import { NumenBot } from '@/components/ui/doodles/numen-bot'
import { NumenMark } from '@/components/ui/doodles/numen-mark'
import { ColumnLines } from '@/components/ui/column-lines'
import { BrotivaScene } from '@/components/ui/brotiva/brotiva-scene'
import { ScoutiaScene } from '@/components/ui/scoutia/scoutia-scene'
import { EditorialConceptArt } from './editorial-concept-art'
import { EditorialSection, EditorialEntry, EditorialRow, EditorialReveal, EDITORIAL_STRONG, EDITORIAL_MUTED, EDITORIAL_PROSE, EDITORIAL_TEXT, EDITORIAL_LINK } from './editorial-shell'
import { HorizontalScroll, twoDigits } from './horizontal-scroll'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const INPUT =
  'w-full min-h-11 rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-[15px] text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-100'

const CTA_PILL =
  'inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-300 px-5 text-[14px] font-medium text-neutral-900 transition-[background-color,color,border-color,transform] duration-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-neutral-100 active:scale-[0.98] dark:border-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900'

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

function CheckLine({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <span className="flex items-start gap-2">
      <span className="flex h-[1.75em] shrink-0 items-center">
        <CheckScribble active={active} className="h-3.5 w-3.5 translate-y-px" />
      </span>
      {children}
    </span>
  )
}

// ─── Static non-translatable data ────────────────────────────
// `as const` keeps `num` a literal so it can key SERVICE_DOODLES.
const serviceNums = ['01', '02', '03', '04'] as const

// The first entry is the featured project of the Selected Work section and the
// next five follow it there; the rest only appear in the Live Now list.
const SIDE_CARD_COUNT = 5

// Project scenes keyed by project name.
const PROJECT_SCENES: Record<string, ComponentType<{ active: boolean; covered: boolean }>> = {
  Brotiva: BrotivaScene,
  ScoutIA: ScoutiaScene,
}

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
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
  const { t, lang } = useLang()
  const ts = t.services
  const deliverables = lang === 'es'
    ? ['MVPs, plataformas SaaS y aplicaciones web', 'Flujos, prototipos y sistemas de diseño', 'Asistentes, búsqueda y automatización', 'Despliegues, monitoreo e infraestructura']
    : ['MVPs, SaaS platforms and web applications', 'User flows, prototypes and design systems', 'Assistants, search and automation', 'Deployments, monitoring and infrastructure']

  return (
    <EditorialSection id="services" number={1} title={ts.label} sectionRef={ref}>
      <EditorialReveal>
        <p className={EDITORIAL_PROSE}>
          <span className={EDITORIAL_STRONG}>{lang === 'es' ? 'De una buena idea a algo real.' : 'From a good idea to the real thing.'}</span>{' '}
          {lang === 'es' ? 'Diseño + ingeniería. Un mismo equipo.' : 'Design + engineering. One team.'}
        </p>
      </EditorialReveal>
      <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
        {serviceNums.map((num, i) => {
          const item = ts.items[i]
          const Doodle = SERVICE_DOODLES[num]
          return (
            <EditorialEntry
              key={num}
              icon={<Doodle active={isActive} className="h-full w-full" />}
              stackedMobileIcon
              title={item.title}
              subtitle={<CheckLine active={isActive}>{deliverables[i]}</CheckLine>}
            >
              <p>{item.desc}</p>
            </EditorialEntry>
          )
        })}
      </div>
    </EditorialSection>
  )
}

const PROJECT_STAGE = 'relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 dark:border-neutral-800 md:aspect-auto md:h-[min(26rem,42svh)]'

interface ProjectPanelProps {
  index: number
  meta: (typeof projectsMeta)[number]
  text: { name: string; category: string; desc: string }
  online?: boolean
  active: boolean
  lang: string
}

function ProjectPanel({ index, meta, text, online, active, lang }: ProjectPanelProps) {
  const Scene = PROJECT_SCENES[meta.name]
  const number = twoDigits(index + 1)
  return (
    <EditorialReveal className="group">
      {/* Decorative duplicate of the title link, so it stays out of the tab order. */}
      <a href={meta.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className={PROJECT_STAGE}>
        {Scene ? (
          <Scene active={active} covered={false} />
        ) : (
          <>
            <span className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">{text.category}</span>
              <span className="text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white transition-transform duration-700 group-hover:-translate-y-1">{text.name}</span>
            </span>
            <span className="pointer-events-none absolute -bottom-4 right-5 text-[clamp(6rem,14vw,11rem)] font-medium leading-none tracking-[-0.06em] tabular-nums text-white/[0.07]">{number}</span>
          </>
        )}
        <span className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white text-neutral-950 transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </a>
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className={`min-w-0 ${EDITORIAL_TEXT}`}>
          <h3 className={`flex items-baseline gap-3 font-medium ${EDITORIAL_STRONG}`}>
            <span className={`font-normal tabular-nums ${EDITORIAL_MUTED}`}>{number}</span>
            <Link href={meta.href} target="_blank" rel="noopener noreferrer" className={EDITORIAL_LINK}>{text.name}<ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>
          </h3>
          <p className={EDITORIAL_MUTED}>{text.category}</p>
          <p className={`mt-3 max-w-[32rem] md:line-clamp-3 ${EDITORIAL_MUTED}`}>{text.desc}</p>
          <p className={`mt-2 text-sm ${EDITORIAL_MUTED}`}>{meta.stack.join(' · ')}</p>
        </div>
        <a href={meta.href} target="_blank" rel="noopener noreferrer" className={`${CTA_PILL} shrink-0`}>
          <StatusDot online={online} />
          {online === false ? (lang === 'es' ? 'No disponible' : 'Unavailable') : (lang === 'es' ? 'Ver producto' : 'Explore product')}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </EditorialReveal>
  )
}

function SeeAllProjectsPanel({ label, liveLabel, liveCount }: { label: string; liveLabel: string; liveCount: number }) {
  return (
    <EditorialReveal>
      <Link
        href="/projects"
        className={`group flex aspect-[16/10] w-full flex-col justify-between rounded-2xl border border-neutral-200 p-6 transition-colors duration-500 hover:bg-neutral-950 hover:text-white dark:border-neutral-800 dark:hover:bg-white dark:hover:text-neutral-950 md:aspect-auto md:h-[min(26rem,42svh)] md:p-8 ${EDITORIAL_STRONG}`}
      >
        <span className="text-[11px] uppercase tracking-[0.2em] opacity-60">{liveLabel} · {twoDigits(liveCount)}</span>
        <span className="flex items-end justify-between gap-6">
          <span className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em]">{label}</span>
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-current transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="size-6" aria-hidden="true" />
          </span>
        </span>
      </Link>
    </EditorialReveal>
  )
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
  const { t, lang } = useLang()
  const status = useProjectStatus()
  const [featuredMeta, ...restMeta] = projectsMeta
  const [featuredText, ...restText] = t.projects.items
  const selectedProjects = [
    { meta: featuredMeta, text: featuredText },
    ...restMeta.slice(0, SIDE_CARD_COUNT).map((meta, i) => ({ meta, text: restText[i] })),
  ]

  return (
    <EditorialSection id="work" number={2} title={t.projects.label} sectionRef={ref} heading={false} columnLines={false}>
      <HorizontalScroll
        panelClassName="w-[min(44rem,78vw)]"
        intro={
          <p className={EDITORIAL_PROSE}>
            <span className={EDITORIAL_STRONG}>{lang === 'es' ? 'Ideas que ya están ahí afuera.' : 'Ideas out in the real world.'}</span>
          </p>
        }
      >
        {selectedProjects.map(({ meta, text }, i) => (
          <ProjectPanel key={meta.href} index={i} meta={meta} text={text} online={status[meta.href]} active={isActive} lang={lang} />
        ))}
        <SeeAllProjectsPanel label={t.projects.seeAll} liveLabel={t.liveProjects.label} liveCount={liveProjectsMeta.length} />
      </HorizontalScroll>
    </EditorialSection>
  )
}

export function UseCasesSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
  const { t, lang } = useLang()
  const tu = t.useCases

  return (
    <EditorialSection id="use-cases" number={3} title={tu.label} sectionRef={ref}>
      <EditorialReveal>
        <p className={EDITORIAL_PROSE}>
          <span className={EDITORIAL_STRONG}>{lang === 'es' ? 'Espacio para explorar.' : 'Room to explore.'}</span>{' '}
          {lang === 'es' ? 'Experimentos de marca, diseño y nuevas posibilidades.' : 'Experiments in brand, design and new possibilities.'}
        </p>
      </EditorialReveal>
      <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
        {tu.concepts.map((concept, i) => (
          <EditorialEntry
            key={concept.name}
            icon={<EditorialConceptArt kind={i} active={isActive} className="h-full w-full" />}
            title={concept.name}
            subtitle={concept.category}
          >
            <p>{concept.desc}</p>
            <p>
              <HoverPeek url={useCaseMeta[i].href} peekWidth={320} peekHeight={200}>
                <Link href={useCaseMeta[i].href} target="_blank" rel="noopener noreferrer" className={CTA_PILL}>
                  {concept.cta}<ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </HoverPeek>
            </p>
          </EditorialEntry>
        ))}
        <EditorialEntry
          icon={<SketchPencilDoodle active={isActive} className="h-full w-full" />}
          title={
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-400 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.14em] text-neutral-700 dark:border-neutral-600 dark:text-neutral-300">
              <span className="size-1.5 rounded-full bg-current motion-safe:animate-pulse" aria-hidden="true" />
              {tu.comingSoon}
            </span>
          }
        >
          {tu.cards.map((card) => (
            <p key={card.category}><span className={EDITORIAL_STRONG}>{card.title}</span> · {card.category}</p>
          ))}
        </EditorialEntry>
      </div>
    </EditorialSection>
  )
}

export function LiveProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
  const { t, lang } = useLang()
  const tl = t.liveProjects
  const status = useProjectStatus()

  return (
    <EditorialSection id="live-projects" title={tl.label} sectionRef={ref}>
      <EditorialEntry
        icon={<PaperPlaneDoodle active={isActive} className="h-full w-full" />}
        title={tl.headline1}
        stackedMobileIcon
        subtitle={tl.headline2}
      >
        <p>{tl.subtext}</p>
      </EditorialEntry>

      <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
        {liveProjectsMeta.map((project) => (
          <EditorialEntry
            key={project.href}
            title={
              <a href={project.href} target="_blank" rel="noopener noreferrer" className={EDITORIAL_LINK}>
                {project.name}<ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            }
            subtitle={new URL(project.href).hostname}
          >
            <p>{project.stack.slice(0, 3).join(' · ')}</p>
            <p>
              <a href={project.href} target="_blank" rel="noopener noreferrer" className={CTA_PILL}>
                <StatusDot online={status[project.href]} />
                {status[project.href] === true ? (lang === 'es' ? 'En línea' : 'Online') : status[project.href] === false ? (lang === 'es' ? 'No disponible' : 'Unavailable') : (lang === 'es' ? 'Visitar proyecto' : 'Visit project')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </p>
          </EditorialEntry>
        ))}
        <EditorialEntry
          icon={<SparkleDoodle active={isActive} className="h-full w-full" />}
          title={lang === 'es' ? 'El siguiente puede ser el tuyo.' : 'Yours could be next.'}
        >
          <Link href={SECTION_HREFS.contact} className={CTA_PILL}>
            {lang === 'es' ? 'Cuéntanos tu idea' : 'Tell us your idea'}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </EditorialEntry>
      </div>
    </EditorialSection>
  )
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
  const { t } = useLang()
  const ta = t.about

  return (
    <EditorialSection id="about" number={4} title={ta.label} sectionRef={ref} spotlight>
      <EditorialReveal>
        <p className={EDITORIAL_PROSE}>
          <span className={EDITORIAL_STRONG}>{ta.headline1} {ta.headline2}</span>
        </p>
      </EditorialReveal>
      <EditorialReveal><p className={`mt-6 ${EDITORIAL_PROSE}`}>{ta.p1}</p></EditorialReveal>
      <EditorialReveal><p className={`mt-6 ${EDITORIAL_PROSE}`}>{ta.p2}</p></EditorialReveal>

      <div className="mt-10 space-y-3">
        {companyStats.map((s, i) => (
          <div key={s.key} data-stat-name={s.schemaName} data-stat-value={s.display}>
            <EditorialRow
              delay={i * 0.08}
              label={
                <span className={EDITORIAL_STRONG} aria-label={s.display + ' ' + ta.stats[i].label}>
                  <CountUp to={s.value} suffix={s.suffix} />
                </span>
              }
            >
              <span className={EDITORIAL_MUTED}>{ta.stats[i].label}</span>
            </EditorialRow>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
        {teamMeta.map((member, i) => (
          <EditorialEntry
            key={member.name}
            media={<div className="flex h-full w-full items-center justify-center bg-white p-6"><FounderAvatar figure={member.figure} active={isActive} className="w-36" /></div>}
            title={member.name}
            subtitle={member.role}
          >
            <p>{ta.team[i].desc}</p>
            <div className="flex flex-wrap gap-x-6">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={EDITORIAL_LINK}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn<ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
              <a href={member.website} target="_blank" rel="noopener noreferrer" className={EDITORIAL_LINK}>
                <Globe className="size-3.5" aria-hidden="true" />
                julian-menz.dev<ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </EditorialEntry>
        ))}
      </div>

      <div className="mt-10 space-y-3">
        {ta.principles.map((v, i) => (
          <EditorialRow key={v.title} delay={i * 0.08} label={<span className={EDITORIAL_STRONG}>{v.title}</span>}>
            <span className={EDITORIAL_MUTED}>{v.desc}</span>
          </EditorialRow>
        ))}
      </div>
    </EditorialSection>
  )
}

// ─── Global Reach ────────────────────────────────────────────
export function GlobalReachSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
  const { t } = useLang()
  const tr = t.reach
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <EditorialSection id="reach" number={5} title={tr.label} sectionRef={ref}>
      <EditorialReveal>
        <p className={EDITORIAL_PROSE}>
          <span className={EDITORIAL_STRONG}>{tr.headline1}</span> {tr.headline2}
        </p>
      </EditorialReveal>
      <EditorialReveal><p className={`mt-6 ${EDITORIAL_PROSE}`}>{tr.subtext}</p></EditorialReveal>

      <div className="mt-10 grid gap-10 md:mt-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-center lg:gap-8">
        <div className="order-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:order-1 lg:grid-cols-1">
          {reachMeta.map((c, i) => {
            const country = tr.countries[i]
            const CountryMark = COUNTRY_DOODLES[c.id]

            return (
              <EditorialReveal key={c.id} delay={i * 0.06}>
                <button
                  type="button"
                  aria-pressed={focused === c.id}
                  onClick={() => setFocused(focused === c.id ? null : c.id)}
                  className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-[opacity,transform,border-color] duration-300 hover:opacity-100 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100 ${focused === c.id ? 'border-neutral-900 dark:border-neutral-100' : 'border-neutral-200 dark:border-neutral-800'} ${focused && focused !== c.id ? 'opacity-40' : 'opacity-100'}`}
                >
                  <CountryMark active={isActive} className="size-7 shrink-0 text-neutral-900 dark:text-neutral-100" />
                  <span className="min-w-0 flex-1">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className={`truncate text-[14px] font-medium ${EDITORIAL_STRONG}`}>{country.name}</span>
                      <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                    </span>
                    <span className={`block truncate text-[12px] ${EDITORIAL_MUTED}`}>{country.city}{c.isHQ ? ` · ${tr.hq}` : ''}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className={`block text-[16px] font-medium leading-none tabular-nums ${EDITORIAL_STRONG}`}>{c.delivered}</span>
                    <span className={`mt-1 block whitespace-nowrap text-[11px] ${EDITORIAL_MUTED}`}>{c.delivered === 1 ? tr.project : tr.projects}</span>
                  </span>
                </button>
              </EditorialReveal>
            )
          })}
        </div>
        <EditorialReveal className="order-1 lg:order-2">
          <div aria-hidden="true" className="mx-auto w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[34rem]">
            <GlobeReach focus={focused} />
          </div>
        </EditorialReveal>
      </div>
    </EditorialSection>
  )
}

// ─── Insights ────────────────────────────────────────────────
const recentPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

export function InsightsSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
  const { lang, t } = useLang()
  const tb = t.blog
  const locale = lang === 'en' ? 'en-US' : 'es-SV'

  return (
    <EditorialSection id="blog" number={6} title={tb.label} sectionRef={ref}>
      <EditorialReveal>
        <p className={EDITORIAL_PROSE}>
          <span className={EDITORIAL_STRONG}>{tb.headline}</span> {tb.subtext}
        </p>
      </EditorialReveal>

      <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
        {recentPosts.map((post, i) => {
          const title = lang === 'en' && post.en ? post.en.title : post.title
          const description = lang === 'en' && post.en ? post.en.description : post.description
          const ArticleDoodle = INSIGHT_DOODLES[i]
          const category = lang === 'en' && post.en ? post.en.category : post.category
          const date = new Date(post.date + 'T00:00:00').toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })

          return (
            <EditorialEntry
              key={post.slug}
              icon={<ArticleDoodle active={isActive} className="h-full w-full" />}
              title={
                <Link href={`/blog/${post.slug}`} className={EDITORIAL_LINK} aria-label={title + ', ' + tb.readArticle}>
                  {title}<ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              }
              subtitle={category + ' · ' + post.readTime + ' ' + tb.readTime + ' · ' + date}
            >
              <p>{description}</p>
            </EditorialEntry>
          )
        })}
      </div>

      <EditorialReveal>
        <div className="mt-10 md:mt-12">
          <Link href="/blog" className={CTA_PILL}>
            {tb.moreArticles}<ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </EditorialReveal>
    </EditorialSection>
  )
}

// ─── Process ─────────────────────────────────────────────────
const stepNums = ['01', '02', '03', '04', '05'] as const

const PROCESS_STAGE = 'relative flex aspect-[5/2] w-full items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 md:aspect-auto md:h-[min(22rem,36svh)]'

interface ProcessPanelProps {
  index: number
  count: number
  title: string
  extra: string
  desc: string
  output: string
  activities: readonly string[]
  active: boolean
  stepLabel: string
}

function ProcessPanel({ index, count, title, extra, desc, output, activities, active, stepLabel }: ProcessPanelProps) {
  const Doodle = PROCESS_DOODLES[stepNums[index]]
  const number = twoDigits(index + 1)
  return (
    <EditorialReveal>
      <div className={PROCESS_STAGE}>
        <span className={`absolute left-6 top-5 text-[11px] uppercase tracking-[0.2em] ${EDITORIAL_MUTED}`}>
          {stepLabel} {number} / {twoDigits(count)}
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-4 right-5 text-[clamp(5rem,12vw,9rem)] font-medium leading-none tracking-[-0.06em] tabular-nums text-neutral-900/[0.06] dark:text-white/[0.07]">
          {number}
        </span>
        <div aria-hidden="true" className={`relative aspect-[4/3] h-3/5 ${EDITORIAL_STRONG}`}>
          <Doodle active={active} className="h-full w-full" />
        </div>
      </div>
      <div className={`mt-6 ${EDITORIAL_TEXT}`}>
        <h3 className={`text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.02em] ${EDITORIAL_STRONG}`}>{title}</h3>
        <div className={`mt-2 ${EDITORIAL_STRONG}`}>
          <CheckLine active={active}>{output}</CheckLine>
        </div>
        <p className={`mt-3 max-w-[34rem] md:line-clamp-3 ${EDITORIAL_MUTED}`}>{desc}</p>
        {extra && <p className={`mt-2 max-w-[34rem] text-sm md:line-clamp-2 ${EDITORIAL_MUTED}`}>{extra}</p>}
        <ul className="mt-4 flex flex-wrap gap-2">
          {activities.map((activity) => (
            <li key={activity} className={`rounded-full border border-neutral-200 px-3 py-1 text-[12px] dark:border-neutral-800 ${EDITORIAL_MUTED}`}>
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </EditorialReveal>
  )
}

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
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
    <EditorialSection id="process" number={7} title={tp.label} sectionRef={ref} heading={false} columnLines={false}>
      <HorizontalScroll
        panelClassName="w-[min(40rem,74vw)]"
        intro={
          <p className={EDITORIAL_PROSE}>
            <span className={EDITORIAL_STRONG}>{lang === 'es' ? 'Una idea. Cinco pasos claros.' : 'One idea. Five clear steps.'}</span>{' '}
            {lang === 'es' ? 'Sabes qué sigue, desde el primer día.' : 'Know what comes next, from day one.'}
          </p>
        }
      >
        {tp.steps.map((step, i) => (
          <ProcessPanel
            key={step.title}
            index={i}
            count={tp.steps.length}
            title={step.title}
            extra={step.extra}
            desc={tp.stepsListDesc[i]}
            output={outputs[i]}
            activities={activities[i]}
            active={isActive}
            stepLabel={lang === 'es' ? 'Paso' : 'Step'}
          />
        ))}
      </HorizontalScroll>
    </EditorialSection>
  )
}

export function FAQSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
  const [open, setOpen] = useState<number | null>(0)
  const { t } = useLang()
  const lenis = useLenis()
  const tf = t.faq

  return (
    <EditorialSection id="faq" number={8} title={tf.label} sectionRef={ref}>
      <EditorialEntry
        icon={<QuestionMarkDoodle active={isActive} className="h-full w-full" />}
        title={`${tf.headline1} ${tf.headline2}`}
        subtitle={tf.headline3}
      >
        <p>{tf.subtext}</p>
      </EditorialEntry>
      <div className="mt-10 max-w-[36rem] divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
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
      <EditorialReveal>
        <div className="mt-10 md:mt-12">
          <EditorialEntry
            icon={<NumenBot active={isActive} className="h-full w-full" />}
            title={
              <Link
                href={SECTION_HREFS.contact}
                scroll={false}
                onClick={(e) => handleSectionLinkClick(e, SECTION_HREFS.contact, lenis)}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[14px] font-medium text-background transition-opacity hover:opacity-80"
              >
                {tf.cta} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            }
          />
        </div>
      </EditorialReveal>
    </EditorialSection>
  )
}

// ─── Contact Form + Footer ───────────────────────────────────
export function ContactFormSection() {
  const ref = useRef<HTMLElement>(null)
  const { isActive } = useSectionReveal(ref)
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
    <EditorialSection id="contact" number={9} title={tc.label} sectionRef={ref}>
      <EditorialEntry
        icon={<PaperPlaneDoodle active={isActive} className="h-full w-full" />}
        title={tc.headline1}
        stackedMobileIcon
        subtitle={tc.headline2}
      >
        <p>{tc.subtext}</p>
      </EditorialEntry>
      <div className="mt-10 space-y-3">
        {infoItems.map((item, i) => (
          <EditorialRow key={item.label} delay={i * 0.08} label={item.label}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={EDITORIAL_LINK}>
                {item.value} <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ) : (
              <span className={EDITORIAL_STRONG}>{item.value}</span>
            )}
          </EditorialRow>
        ))}
      </div>
      <EditorialReveal className="mt-10 max-w-[36rem] md:mt-12">
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
              className="w-full rounded-lg bg-neutral-900 text-neutral-100 hover:bg-neutral-700 disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              <UserPlus className="size-4" />
              {status === 'loading' ? tc.sendingBtn : tc.sendBtn}
            </Button>
            <Link
              href="/blog"
              className={`flex min-h-11 items-center justify-center text-center text-sm underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-900 dark:decoration-neutral-600 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
            >
              {tc.blogCta}
            </Link>
          </form>
        )}
      </EditorialReveal>
    </EditorialSection>
  )
}

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className="relative border-t border-neutral-200 bg-surface dark:bg-black dark:border-neutral-800">
      <ColumnLines />
      <div className="relative mx-auto max-w-[46rem] px-9 pb-36 pt-14 sm:px-14">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" aria-label="Numen" className={`-m-2 inline-flex p-2 ${EDITORIAL_STRONG}`}>
            <NumenMark className="h-5 w-5" />
          </Link>
          {/* Negative margin plus padding grows each tap target to 36px without moving the icons. */}
          <div className="flex items-center gap-5">
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
        <nav aria-label="Footer" className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
          <Link
            href="/"
            className={`inline-flex min-h-11 items-center text-[14px] transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/projects"
            className={`inline-flex min-h-11 items-center text-[14px] transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
          >
            {t.nav.projectsLink}
          </Link>
          <Link
            href="/blog"
            className={`inline-flex min-h-11 items-center text-[14px] transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${EDITORIAL_MUTED}`}
          >
            {t.blog.label}
          </Link>
        </nav>
        <p className={`mt-6 text-[13px] ${EDITORIAL_MUTED}`}>© {new Date().getFullYear()} Numen Agency. {t.contact.footer}</p>
      </div>
    </footer>
  )
}
