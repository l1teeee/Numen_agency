'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, User, Mail, MessageSquare, DollarSign, Plus, Building2, MapPin, Phone, Tags, UserPlus } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { motion, AnimatePresence, useInView, type MotionValue } from 'framer-motion'
import { GlobeReach } from '@/components/ui/cobe-globe-cdn'
import { companyStats } from '@/lib/company-stats'
import { blogPosts } from '@/lib/blog-posts'
import { useLang } from '@/lib/lang'
import { SECTION_HREFS, handleSectionLinkClick } from '@/lib/section-scroll'
import { SOCIAL_LINKS } from '@/lib/site'
import { HoverPeek } from '@/components/ui/link-preview'
import { FounderAvatar } from '@/components/ui/founder-avatar'
import { ScribbleUnderline } from '@/components/ui/doodles/scribbles'
import { SERVICE_DOODLES } from '@/components/ui/doodles/services'
import { PROCESS_DOODLES } from '@/components/ui/doodles/process'
import { INSIGHT_DOODLES } from '@/components/ui/doodles/insights'
import { COUNTRY_DOODLES, PaperTileFrame } from '@/components/ui/doodles/reach'
import { CheckScribble, PaperPlaneDoodle, QuestionMarkDoodle, SketchPencilDoodle, SparkleDoodle } from '@/components/ui/doodles/misc'
import { FounderSticker } from '@/components/ui/doodles/founder-sticker'
import { SpeechBubble } from '@/components/ui/doodles/speech-bubble'
import { NumenBot } from '@/components/ui/doodles/numen-bot'
import { NumenMark } from '@/components/ui/doodles/numen-mark'
import { EditorialConceptArt } from './editorial-concept-art'
import { useReducedMotion } from '@/lib/use-reduced-motion'

interface BlurStyle { filter: MotionValue<string> }

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0, reducedMotion = false) => ({
  initial: reducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.08 },
  transition: reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 150, damping: 22, delay },
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

const immediateContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
}

const immediateItem = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
}

const LIFT = {
  whileHover: { y: -4, transition: { type: 'spring' as const, stiffness: 400, damping: 25 } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
}

const INPUT =
  'w-full min-h-11 rounded-xl border border-foreground/20 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/65 focus:border-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 transition-colors duration-200'

function useSectionReveal(ref: React.RefObject<HTMLElement | null>) {
  const isInView = useInView(ref, { amount: 0.12, once: true })
  const reducedMotion = useReducedMotion()
  return {
    isInView,
    isActive: isInView || reducedMotion,
    reducedMotion,
    containerVariants: reducedMotion ? immediateContainer : staggerContainer,
    itemVariants: reducedMotion ? immediateItem : staggerItem,
  }
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

/** Section label, underlined by hand the way the hero headline is. */
function SectionEyebrow({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="relative inline-block text-[10px] uppercase tracking-[0.16em] text-foreground/65 lg:text-xs lg:tracking-widest">
      {label}
      <ScribbleUnderline active={active} strokeWidth={1.5} className="absolute -bottom-1.5 left-0 h-2 w-full" />
    </span>
  )
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
// `as const` keeps `num` a literal so it can key SERVICE_DOODLES.
const serviceNums = ['01', '02', '03', '04'] as const

const projectsMeta = [
  { href: 'https://vielinks.com',          name: 'VieLinks',     status: 'Live', dot: 'bg-emerald-400', stack: ['React 19', 'Vite', 'TypeScript', 'Framer Motion', 'GSAP'] },
  { href: 'https://scoutia.dev/landing',   name: 'ScoutIA',      status: 'Live', dot: 'bg-emerald-400', stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { href: 'https://dashboard-bot-whatsapp.vercel.app', name: 'WhatsApp Ops', status: 'Live', dot: 'bg-emerald-400', stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query'] },
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
  { figure: 'julian', name: 'Julian Mendez',  role: 'Software Engineer & Founder',     linkedin: 'https://www.linkedin.com/in/juli%C3%A1n-m%C3%A9ndez-arev/' },
  { figure: 'igmer',  name: 'Igmer Rodriguez', role: 'Software Engineer & Co-founder', linkedin: 'https://www.linkedin.com/in/igmer-rodriguez/' },
] as const

// Every country that is not the HQ is a live client relationship.
const reachMeta = [
  { id: 'sv', isHQ: true },
  { id: 'gt', isHQ: false },
  { id: 'mx', isHQ: false },
  { id: 'ar', isHQ: false },
  { id: 'gb', isHQ: false },
  { id: 'de', isHQ: false },
] as const

// ─── Services ────────────────────────────────────────────────
export function ServicesSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const { isActive, reducedMotion, containerVariants, itemVariants } = useSectionReveal(ref)
  const { t, lang } = useLang()
  const ts = t.services
  const deliverables = lang === 'es'
    ? ['MVPs, plataformas SaaS y aplicaciones web', 'Flujos, prototipos y sistemas de diseño', 'Asistentes, búsqueda y automatización', 'Despliegues, monitoreo e infraestructura']
    : ['MVPs, SaaS platforms and web applications', 'User flows, prototypes and design systems', 'Assistants, search and automation', 'Deployments, monitoring and infrastructure']

  return (
    <section ref={ref} id="services" className="relative z-10 flex flex-col border-t border-foreground/15 bg-background lg:sticky lg:top-0 lg:h-screen">
      <motion.div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col px-6 pb-16 pt-16 lg:px-8 lg:pb-8 lg:pt-24" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/15 pb-4">
          <SectionEyebrow label={ts.label} active={isActive} />
          <span className="font-mono text-xs text-foreground/65">02</span>
        </div>
        <div className="my-4 flex items-end justify-between gap-6">
          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight lg:text-4xl">{lang === 'es' ? 'De una buena idea a algo real.' : 'From a good idea to the real thing.'}</h2>
          <span className="hidden shrink-0 text-right text-xs leading-relaxed text-foreground/65 sm:block">{lang === 'es' ? 'Diseño + ingeniería.' : 'Design + engineering.'}<br />{lang === 'es' ? 'Un mismo equipo.' : 'One team.'}</span>
        </div>
        <motion.div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-rows-2" variants={containerVariants} initial={reducedMotion ? false : 'hidden'} animate={isActive ? 'visible' : 'hidden'}>
          {serviceNums.map((num, i) => {
            const item = ts.items[i]
            const Doodle = SERVICE_DOODLES[num]
            return (
              <motion.article key={num} variants={itemVariants} className="group flex min-h-0 flex-col rounded-2xl border border-foreground/15 bg-foreground/[0.02] p-5 transition-colors hover:border-foreground/40">
                <div><span className="font-mono text-[11px] text-foreground/65">/{num}</span><h3 className="mt-1 text-lg font-semibold leading-tight tracking-tight">{item.title}</h3></div>
                <Doodle active={isActive} className="mx-auto my-3 min-h-24 w-[86%] max-h-28 flex-1 text-foreground motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-rotate-2" />
                <p className="text-xs leading-relaxed text-foreground/75">{item.desc}</p>
                <p className="flex items-start gap-2 pt-3 text-[11px] font-medium"><CheckScribble active={isActive} className="mt-0.5 h-3 w-3 shrink-0" />{deliverables[i]}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

export function ProjectsSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const { isActive, reducedMotion, containerVariants, itemVariants } = useSectionReveal(ref)
  const { t, lang } = useLang()
  const status = useProjectStatus()
  const [featuredMeta, ...restMeta] = projectsMeta
  const [featuredText, ...restText] = t.projects.items

  return (
    <section ref={ref} id="work" className="relative z-20 flex flex-col rounded-t-[2rem] border-t border-foreground/15 bg-background lg:sticky lg:top-0 lg:h-screen">
      <motion.div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col px-6 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/15 pb-4">
          <SectionEyebrow label={t.projects.label} active={isActive} />
          <span className="font-mono text-xs text-foreground/65">03</span>
        </div>
        <div className="my-5 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">{lang === 'es' ? 'Ideas que ya están ahí afuera.' : 'Ideas out in the real world.'}</h2>
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-xs font-medium">{t.projects.seeAll}<ArrowUpRight className="size-4" /></Link>
        </div>
        <motion.div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-5" variants={containerVariants} initial={reducedMotion ? false : 'hidden'} animate={isActive ? 'visible' : 'hidden'}>
          <motion.div variants={itemVariants} className="min-h-0 lg:col-span-3">
            <Link href={featuredMeta.href} target="_blank" rel="noopener noreferrer" className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-foreground/15 transition-colors hover:border-foreground/50">
              <div className="relative min-h-48 flex-1 overflow-hidden bg-[#100f0b] lg:min-h-0">
                <Image src="/vielink/live-home.png" alt={lang === 'es' ? 'Página de VieLinks para campañas de correo y redes sociales' : 'VieLinks website for email campaigns and social media'} fill sizes="(min-width: 1024px) 570px, 90vw" className="object-cover object-top motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]" />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black px-3 py-1 text-[10px] text-white">{lang === 'es' ? 'Proyecto destacado' : 'Selected project'}</span>
              </div>
              <div className="relative p-5">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-[11px] text-foreground/65">{featuredText.category}</p><h3 className="mt-1 text-2xl font-semibold tracking-tight">{featuredText.name}</h3></div>
                  <ArrowUpRight className="size-5" />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground/75">{featuredText.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{featuredMeta.stack.map((tag) => <span key={tag} className="rounded-full border border-foreground/15 px-2 py-0.5 text-[10px] text-foreground/65">{tag}</span>)}</div>
              </div>
            </Link>
          </motion.div>
          <div className="grid min-h-0 gap-3 lg:col-span-2 lg:grid-rows-3">
            {restMeta.map((project, i) => (
              <motion.div key={project.href} variants={itemVariants} className="min-h-0">
                <Link href={project.href} target="_blank" rel="noopener noreferrer" className="group relative flex h-full flex-col rounded-2xl border border-foreground/15 p-4 transition-colors hover:border-foreground/50 hover:bg-foreground/[0.02]">
                  <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] text-foreground/65">{restText[i].category}</p><h3 className="mt-1 text-lg font-semibold">{restText[i].name}</h3></div><span className="font-mono text-[11px] text-foreground/65">0{i + 2}</span></div>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/75">{restText[i].desc}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3"><span className="flex items-center gap-2 text-[10px] text-foreground/65"><StatusDot online={status[project.href]} />{status[project.href] === false ? (lang === 'es' ? 'No disponible' : 'Unavailable') : (lang === 'es' ? 'Ver producto' : 'Explore product')}</span><ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" /></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export function UseCasesSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const { isActive, reducedMotion, containerVariants, itemVariants } = useSectionReveal(ref)
  const { t, lang } = useLang()
  const tu = t.useCases
  const placement = ['lg:col-span-2 lg:row-span-2', 'lg:row-span-2', 'lg:col-span-2']

  return (
    <section ref={ref} id="use-cases" className="relative z-[25] flex flex-col rounded-t-[2rem] border-t border-foreground/15 bg-background lg:sticky lg:top-0 lg:h-screen">
      <motion.div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col px-6 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/15 pb-4">
          <SectionEyebrow label={tu.label} active={isActive} />
          <span className="font-mono text-xs text-foreground/65">04</span>
        </div>
        <div className="my-5 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">{lang === 'es' ? 'Espacio para explorar.' : 'Room to explore.'}</h2>
          <span className="hidden max-w-48 text-right text-xs leading-relaxed text-foreground/65 sm:block">{lang === 'es' ? 'Experimentos de marca, diseño y nuevas posibilidades.' : 'Experiments in brand, design and new possibilities.'}</span>
        </div>
        <motion.div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3" variants={containerVariants} initial={reducedMotion ? false : 'hidden'} animate={isActive ? 'visible' : 'hidden'}>
          {tu.concepts.map((concept, i) => (
            <motion.div key={concept.name} variants={itemVariants} className={`min-h-0 ${placement[i]}`}>
              <HoverPeek url={useCaseMeta[i].href} peekWidth={320} peekHeight={200}>
                <Link href={useCaseMeta[i].href} target="_blank" rel="noopener noreferrer" className={`group relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-foreground/15 p-5 transition-colors hover:border-foreground/50 lg:min-h-0 ${i === 0 ? 'bg-foreground/[0.03] lg:p-6' : 'bg-background'}`}>
                  <div className="flex items-start justify-between gap-2"><div><p className="text-[10px] text-foreground/65">{concept.category}</p><h3 className={`mt-1 font-semibold tracking-tight ${i === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>{concept.name}</h3></div><ArrowUpRight className="size-4 shrink-0" /></div>
                  {/* The third tile is one grid row tall and two wide, so its art sits beside the copy instead of above it. */}
                  <EditorialConceptArt kind={i} active={isActive} className={`my-3 w-full text-foreground motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-rotate-2 ${i === 2 ? 'h-32 lg:absolute lg:inset-y-5 lg:right-5 lg:my-0 lg:h-auto lg:w-64' : 'h-40 min-h-0 flex-1'}`} />
                  <div className={i === 2 ? 'lg:pr-72' : ''}><p className="text-xs leading-relaxed text-foreground/75">{concept.desc}</p><span className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium">{concept.cta}<ArrowUpRight className="size-3" /></span></div>
                </Link>
              </HoverPeek>
            </motion.div>
          ))}
          {tu.cards.map((card) => (
            <motion.article key={card.category} variants={itemVariants} className="relative flex min-h-48 flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-foreground/25 p-5 lg:min-h-0">
              <div className="flex items-center justify-between"><span className="font-mono text-[10px] text-foreground/65">/04</span><span className="text-[10px] uppercase tracking-wider text-foreground/65">{tu.comingSoon}</span></div>
              <SketchPencilDoodle active={isActive} className="absolute right-3 top-9 w-20 text-foreground/65" />
              <div className="relative mt-12 max-w-44"><p className="text-[10px] text-foreground/65">{card.category}</p><h3 className="mt-1 text-sm font-medium">{card.title}</h3></div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export function LiveProjectsSection({ blurStyle, standalone = false }: { blurStyle?: BlurStyle; standalone?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { isActive, reducedMotion, containerVariants, itemVariants } = useSectionReveal(ref)
  const { t, lang } = useLang()
  const tl = t.liveProjects
  const status = useProjectStatus()

  return (
    <section ref={ref} id="live-projects" className={`relative z-[25] flex flex-col border-t border-foreground/15 bg-background ${standalone ? '' : 'rounded-t-[2rem] lg:sticky lg:top-0 lg:h-screen'}`}>
      <motion.div className={`mx-auto flex min-h-0 w-full max-w-5xl flex-col px-6 py-16 lg:px-8 lg:py-24 ${standalone ? '' : 'h-full'}`} style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/15 pb-4"><SectionEyebrow label={tl.label} active={isActive} /><span className="font-mono text-xs text-foreground/65">{String(liveProjectsMeta.length).padStart(2, '0')}</span></div>
        <div className="my-8 flex items-center justify-between gap-6">
          <motion.div {...fadeUp(0, reducedMotion)}><h2 className="text-3xl font-semibold tracking-tight lg:text-5xl">{tl.headline1}<br /><span className="text-foreground/65">{tl.headline2}</span></h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/75">{tl.subtext}</p></motion.div>
          <PaperPlaneDoodle active={isActive} className="hidden w-40 shrink-0 text-foreground sm:block" />
        </div>
        <motion.div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" variants={containerVariants} initial={reducedMotion ? false : 'hidden'} animate={isActive ? 'visible' : 'hidden'}>
          {liveProjectsMeta.map((project, i) => (
            <motion.div key={project.href} variants={itemVariants}>
              <Link href={project.href} target="_blank" rel="noopener noreferrer" className="group flex h-full min-h-48 flex-col rounded-2xl border border-foreground/15 p-5 transition-colors hover:border-foreground/50 hover:bg-foreground/[0.02]">
                <div className="flex items-center justify-between"><span className="font-mono text-xs text-foreground/65">/{String(i + 1).padStart(2, '0')}</span><ArrowUpRight className="size-4" /></div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{project.name}</h3>
                <p className="mt-1 break-all text-[11px] text-foreground/65">{new URL(project.href).hostname}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{project.stack.slice(0, 3).map((tag) => <span key={tag} className="rounded-full border border-foreground/15 px-2 py-0.5 text-[10px] text-foreground/65">{tag}</span>)}</div>
                <div className="mt-auto flex items-center gap-2 pt-4 text-[10px] text-foreground/65"><StatusDot online={status[project.href]} />{status[project.href] === true ? (lang === 'es' ? 'En línea' : 'Online') : status[project.href] === false ? (lang === 'es' ? 'No disponible' : 'Unavailable') : (lang === 'es' ? 'Visitar proyecto' : 'Visit project')}</div>
              </Link>
            </motion.div>
          ))}
          <motion.div variants={itemVariants} className="flex min-h-48 flex-col items-start justify-between rounded-2xl border border-dashed border-foreground/25 p-5">
            <SparkleDoodle active={isActive} className="size-10" /><p className="mt-3 text-xl font-medium tracking-tight">{lang === 'es' ? 'El siguiente puede ser el tuyo.' : 'Yours could be next.'}</p><Link href={SECTION_HREFS.contact} className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-medium">{lang === 'es' ? 'Cuéntanos tu idea' : 'Tell us your idea'}<ArrowUpRight className="size-4" /></Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export function AboutSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const { isActive, reducedMotion } = useSectionReveal(ref)
  const [hoveredFounder, setHoveredFounder] = useState<number | null>(null)
  const { t } = useLang()
  const ta = t.about

  return (
    <section ref={ref} id="about" className="relative lg:sticky lg:top-0 z-30 flex flex-col lg:h-screen rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col px-6 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <SectionEyebrow label={ta.label} active={isActive} />
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isActive ? 'text-foreground/65' : 'text-foreground/65'}`}>05</span>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-5">
          {/* Headline + stats */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            <motion.div {...fadeUp(0, reducedMotion)}>
              <h2 className="text-3xl font-semibold leading-snug tracking-tight text-foreground lg:text-4xl">
                {ta.headline1}<br />
                <span className="text-foreground/65">{ta.headline2}</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/65">{ta.p1}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">{ta.p2}</p>
            </motion.div>

            <dl className="grid grid-cols-2 self-center">
              {companyStats.map((s, i) => (
                <motion.div
                  key={s.key}
                  {...fadeUp(0.1 + i * 0.07, reducedMotion)}
                  className={`px-5 py-4 lg:py-5 ${i % 2 === 0 ? 'border-r border-foreground/[0.08]' : ''} ${i < 2 ? 'border-b border-foreground/[0.08]' : ''}`}
                  data-stat-name={s.schemaName}
                  data-stat-value={s.display}
                >
                  <dd className="text-3xl font-bold text-foreground" aria-label={`${s.display} ${ta.stats[i].label}`}>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-1 text-xs text-foreground/65">{ta.stats[i].label}</dt>
                </motion.div>
              ))}
            </dl>
          </div>

          {/* Founders */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {teamMeta.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(0.12 + i * 0.08, reducedMotion)}
                {...LIFT}
                onMouseEnter={() => setHoveredFounder(i)}
                onMouseLeave={() => setHoveredFounder(null)}
                onFocus={() => setHoveredFounder(i)}
                onBlur={() => setHoveredFounder(null)}
                className="relative flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-4 transition-colors duration-200 hover:border-black/20 lg:gap-5"
              >
                {/* The card is white in both themes, so the bubble gets its own
                    paper and ink tokens instead of the theme's. display:contents
                    keeps the wrapper out of the card's flex row and its gap. */}
                <div className="contents [--background:#ffffff] [--foreground:#171717]">
                  <SpeechBubble side="right" active={hoveredFounder === i} delay={0} className="-top-4 left-20 lg:left-24">
                    {t.doodles.aboutBubbles[i]}
                  </SpeechBubble>
                </div>
                <div className="shrink-0">
                  <FounderAvatar figure={member.figure} active={isActive} className="w-24 lg:w-32" />
                </div>
                {/* The card is pinned white in both themes to keep the portrait
                    on its own paper, so its type is pinned to dark neutrals too. */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-900">{member.name}</p>
                  <p className="mt-0.5 text-[10px] text-neutral-600">{member.role}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-neutral-600">{ta.team[i].desc}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs text-neutral-600 transition-colors duration-150 hover:text-neutral-700"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 shrink-0">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Principles */}
          <motion.div
            {...fadeUp(0.32, reducedMotion)}
            className="grid grid-cols-1 gap-4 border-t border-foreground/[0.08] pt-5 sm:grid-cols-3 sm:gap-0"
          >
            {ta.principles.map((v) => (
              <div key={v.title} className="sm:border-l sm:border-foreground/[0.08] sm:px-5 sm:first:border-l-0 sm:first:pl-0">
                <p className="text-xs font-semibold text-foreground">{v.title}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-foreground/65">{v.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Global Reach ────────────────────────────────────────────
export function GlobalReachSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const { isActive, reducedMotion, containerVariants, itemVariants } = useSectionReveal(ref)
  const { t } = useLang()
  const tr = t.reach
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <section ref={ref} id="reach" className="relative lg:sticky lg:top-0 z-[35] flex flex-col lg:h-screen rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col px-6 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <SectionEyebrow label={tr.label} active={isActive} />
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isActive ? 'text-foreground/65' : 'text-foreground/65'}`}>06</span>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-6 overflow-visible lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:overflow-visible">
          <motion.div {...fadeUp(0, reducedMotion)} className="relative">
            <h2 className="text-3xl font-semibold leading-snug tracking-tight text-foreground lg:text-4xl">
              {tr.headline1}<br /><span className="text-foreground/65">{tr.headline2}</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/65">{tr.subtext}</p>

            {/* Mobile globe — above the legend, decorative only */}
            <div className="my-6 flex justify-center lg:hidden" aria-hidden="true">
              <div className="relative w-full max-w-[260px]">
                <GlobeReach focus={focused} />
              </div>
            </div>

            <motion.div
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-8"
              variants={containerVariants}
              initial={reducedMotion ? false : 'hidden'}
              animate={isActive ? 'visible' : 'hidden'}
            >
              {reachMeta.map((c, i) => {
                const text = tr.countries[i]
                const CountryMark = COUNTRY_DOODLES[c.id]
                return (
                  <motion.button
                    key={c.id}
                    type="button"
                    variants={itemVariants}
                    aria-pressed={focused === c.id}
                    onClick={() => setFocused(focused === c.id ? null : c.id)}
                    // Alternating tilt so six sheets of paper do not read as a table.
                    whileHover={reducedMotion ? undefined : { y: -3, rotate: i % 2 === 0 ? -1.2 : 1.2, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
                    className="relative isolate flex items-center gap-3.5 px-4 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  >
                    <PaperTileFrame active={isActive} className={`absolute inset-0 -z-10 h-full w-full transition-colors duration-300 ${focused === c.id ? 'text-foreground/60' : 'text-foreground/30'}`} />
                    <CountryMark active={isActive} className="size-[72px] shrink-0 text-foreground" />
                    {/* Status sits above the name: the sheet's folded corner eats the
                        bottom right of every tile, and the Spanish label runs into it. */}
                    <div className="min-w-0 flex-1">
                      <span className={`flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] transition-colors duration-300 ${focused === c.id ? 'text-foreground' : 'text-foreground/50'}`}>
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        {c.isHQ ? tr.hq : tr.liveProject}
                      </span>
                      <p className="mt-1 text-xs font-semibold leading-tight text-foreground">{text.name}</p>
                      <p className="mt-0.5 text-[10px] text-foreground/65">{text.city}</p>
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>
          </motion.div>

          <motion.div {...fadeUp(0.1, reducedMotion)} className="relative hidden flex-col items-center justify-center lg:flex" aria-hidden="true">
            <div className="relative w-full max-w-[420px]">
              <GlobeReach focus={focused} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Insights ────────────────────────────────────────────────
const recentPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

export function InsightsSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const { isActive, reducedMotion } = useSectionReveal(ref)
  const { lang, t } = useLang()
  const tb = t.blog
  const locale = lang === 'en' ? 'en-US' : 'es-SV'

  return (
    <section ref={ref} id="blog" className="relative lg:sticky lg:top-0 z-40 flex flex-col lg:h-screen rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col px-6 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <SectionEyebrow label={tb.label} active={isActive} />
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isActive ? 'text-foreground/65' : 'text-foreground/65'}`}>07</span>
        </div>

        <motion.h2 {...fadeUp(0.05, reducedMotion)} className="mt-6 max-w-2xl text-2xl font-semibold tracking-tight text-foreground lg:mt-10 lg:text-4xl">
          {tb.headline}
        </motion.h2>
        <motion.p {...fadeUp(0.1, reducedMotion)} className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/65">
          {tb.subtext}
        </motion.p>

        <div className="mt-6 grid grid-cols-1 gap-3 overflow-visible lg:mt-10 lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
          {recentPosts.map((post, i) => {
            const title = lang === 'en' && post.en ? post.en.title : post.title
            const description = lang === 'en' && post.en ? post.en.description : post.description
            const ArticleDoodle = INSIGHT_DOODLES[i]
            const category = lang === 'en' && post.en ? post.en.category : post.category

            return (
              <motion.div key={post.slug} {...fadeUp(0.15 + i * 0.07, reducedMotion)} {...LIFT}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-foreground/15 p-5 transition-colors duration-200 hover:border-foreground/40"
                >
                  <div className="relative mb-4 flex h-40 items-center justify-center border-b border-foreground/10 pb-4">
                    <ArticleDoodle active={isActive} className="h-full w-full text-foreground motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-rotate-2" />
                    <span className="absolute right-0 top-0 font-mono text-xs text-foreground/65">0{i + 1}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-foreground/10 px-2.5 py-0.5 text-[10px] text-foreground/65">{category}</span>
                    <span className="text-[10px] text-foreground/65">{post.readTime} {tb.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold leading-snug tracking-tight text-foreground">{title}</h3>
                  <p className="mt-2 flex-1 text-[11px] leading-relaxed text-foreground/65">{description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-foreground/[0.08] pt-3">
                    <span className="text-[10px] text-foreground/65">
                      {new Date(post.date + 'T00:00:00').toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-foreground/65 transition-colors duration-150 group-hover:text-foreground">
                      <SparkleDoodle className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      {tb.readArticle}
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div {...fadeUp(0.36, reducedMotion)} className="mt-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-foreground/65 transition-colors duration-150 hover:text-foreground"
          >
            {tb.moreArticles}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Process ─────────────────────────────────────────────────
const stepNums = ['01', '02', '03', '04', '05'] as const

export function ProcessSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const { isActive, reducedMotion, containerVariants, itemVariants } = useSectionReveal(ref)
  const { t, lang } = useLang()
  const tp = t.process
  const outputs = lang === 'es'
    ? ['Objetivos y alcance definidos', 'Prototipo y sistema visual', 'Producto funcional e integraciones', 'Producto publicado y monitoreado', 'Iteraciones y nuevas funcionalidades']
    : ['Clear goals and project scope', 'Prototype and visual system', 'Working product and integrations', 'Live product and monitoring', 'Iterations and new features']

  return (
    <section ref={ref} id="process" className="relative z-50 flex flex-col rounded-t-[2rem] border-t border-foreground/15 bg-background lg:sticky lg:top-0 lg:h-screen">
      <motion.div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col px-6 pb-16 pt-16 lg:px-8 lg:pb-8 lg:pt-24" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/15 pb-4"><SectionEyebrow label={tp.label} active={isActive} /><span className="font-mono text-xs text-foreground/65">08</span></div>
        <div className="my-4 flex items-end justify-between gap-5"><h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">{lang === 'es' ? 'Una idea. Cinco pasos claros.' : 'One idea. Five clear steps.'}</h2><p className="hidden max-w-44 text-right text-xs leading-relaxed text-foreground/65 sm:block">{lang === 'es' ? 'Sabes qué sigue, desde el primer día.' : 'Know what comes next, from day one.'}</p></div>
        <motion.div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2" variants={containerVariants} initial={reducedMotion ? false : 'hidden'} animate={isActive ? 'visible' : 'hidden'}>
          {tp.steps.map((step, i) => {
            const Doodle = PROCESS_DOODLES[stepNums[i]]
            return (
              <motion.article key={step.title} variants={itemVariants} className={`group flex min-h-0 flex-col rounded-2xl border border-foreground/15 p-5 transition-colors hover:border-foreground/40 ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === 4 ? 'bg-foreground/[0.03]' : ''}`}>
                <div><span className="font-mono text-[11px] text-foreground/65">/{stepNums[i]}</span><h3 className="mt-1 text-xl font-semibold tracking-tight">{step.title}</h3></div>
                <Doodle active={isActive} className="my-3 min-h-20 w-full flex-1 text-foreground motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-rotate-2" />
                <p className="text-xs leading-relaxed text-foreground/75">{tp.stepsListDesc[i]}</p>
                <div className="mt-3 flex items-center gap-2 border-t border-foreground/10 pt-3 text-[11px] font-medium"><CheckScribble active={isActive} className="h-3 w-3 shrink-0" />{outputs[i]}</div>
              </motion.article>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

export function FAQSection({ blurStyle }: { blurStyle?: BlurStyle }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.12, once: true })
  const [open, setOpen] = useState<number | null>(0)
  const { t } = useLang()
  const lenis = useLenis()
  const tf = t.faq

  return (
    <section ref={ref} id="faq" className="relative lg:sticky lg:top-0 z-60 flex flex-col lg:h-screen rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col px-6 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <SectionEyebrow label={tf.label} active={isInView} />
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/65' : 'text-foreground/65'}`}>09</span>
        </div>

        <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div {...fadeUp(0)} className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground lg:text-6xl">
                {tf.headline1}<br />{tf.headline2}<br />
                <span className="text-foreground/65">{tf.headline3}</span>
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/65 lg:mt-5">
                {tf.subtext}
              </p>
              {/* The assistant alone: the founder portraits are ink on white and go
                  invisible on this page's black ground. */}
              <div className="mt-10 flex items-end gap-5">
                <div className="relative">
                  <NumenBot active={isInView} className="w-28 text-foreground" />
                  <SpeechBubble side="right" active={isInView} delay={0.5} className="-top-3 left-[80%]">
                    {t.doodles.faqBubble}
                  </SpeechBubble>
                </div>
                <QuestionMarkDoodle active={isInView} className="mb-4 w-10 text-foreground/65" />
              </div>
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
            className="min-h-0 lg:overflow-y-auto"
            style={{ scrollbarWidth: 'none' }}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {tf.items.map((faq, i) => (
              <motion.div key={i} variants={staggerItem} className="border-b border-foreground/[0.06]">
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  className="flex min-h-14 w-full items-center justify-between gap-3 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="pr-4 text-sm font-medium text-foreground">{faq.q}</span>
                  <Plus
                    size={14}
                    className={`shrink-0 text-foreground/65 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                  />
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
                      <p className="pb-4 text-xs leading-relaxed text-foreground/65">{faq.a}</p>
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
  const isInView = useInView(ref, { amount: 0.12, once: true })
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
    <section ref={ref} id="contact" className="relative lg:sticky lg:top-0 z-[70] flex flex-col lg:h-screen rounded-t-[2rem] border-t border-foreground/[0.08] bg-background">
      <motion.div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col px-6 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24" style={blurStyle}>
        <div className="flex items-center justify-between border-b border-foreground/[0.08] pb-4 lg:pb-6">
          <SectionEyebrow label={tc.label} active={isInView} />
          <span className={`text-[10px] transition-colors duration-500 lg:text-xs ${isInView ? 'text-foreground/65' : 'text-foreground/65'}`}>10</span>
        </div>

        <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="hidden min-h-0 flex-col gap-5 lg:flex">
            <motion.div {...fadeUp(0.05)}>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
                {tc.headline1}<br />
                <span className="text-foreground/65">{tc.headline2}</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/65">{tc.subtext}</p>
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
                      className="group flex items-center gap-3 rounded-2xl border border-foreground/15 px-4 py-3 transition-colors duration-200 hover:border-foreground/20"
                    >
                      <span className="w-24 shrink-0 text-xs text-foreground/65">{item.label}</span>
                      <span className="flex-1 text-sm text-foreground/60 transition-colors duration-200 group-hover:text-foreground/80">{item.value}</span>
                      <ArrowUpRight className="size-3.5 shrink-0 text-foreground/65 transition-colors duration-200 group-hover:text-foreground/60" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-foreground/15 px-4 py-3">
                      <span className="w-24 shrink-0 text-xs text-foreground/65">{item.label}</span>
                      <span className="text-sm text-foreground/60">{item.value}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            {/* Julian sends the message off toward the form on the right. */}
            <div className="mt-auto flex min-h-0 items-end gap-4 pt-2">
              <PaperPlaneDoodle active={isInView} className="mb-6 w-40 scale-x-[-1] text-foreground" />
            </div>
          </div>

          <motion.div {...fadeUp(0.05)} className="flex min-h-0 flex-col">
            <div className="mb-4 lg:hidden">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {tc.headline1}<br />
                <span className="text-foreground/65">{tc.headline2}</span>
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {infoItems.map((item) =>
                  item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-[11px] text-foreground/65 transition-colors hover:border-foreground/20 hover:text-foreground/70"
                    >
                      {item.label === 'Email'
                        ? <Mail className="h-3 w-3 shrink-0" />
                        : <MessageSquare className="h-3 w-3 shrink-0" />}
                      <span>{item.value}</span>
                    </a>
                  ) : (
                    <div
                      key={item.label}
                      className="flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-[11px] text-foreground/65"
                    >
                      <span className="text-foreground/65">{item.label}:</span>
                      <span>{item.value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            {status === 'sent' ? (
              <div role="status" aria-live="polite" className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-foreground/[0.08] p-8 text-center">
                <CheckScribble active className="h-16 w-16 text-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{tc.successTitle}</h3>
                <p className="mt-2 text-sm text-foreground/65">{tc.successDesc}</p>
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
                className="min-h-0 space-y-3 lg:overflow-y-auto lg:pr-2"
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
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-xs text-foreground/65">{tc.nameLabel}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/65 pointer-events-none" />
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
                    <label htmlFor="email" className="text-xs text-foreground/65">{tc.emailLabel}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/65 pointer-events-none" />
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

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="company" className="text-xs text-foreground/65">{tc.companyLabel}</label>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/65" />
                      <input
                        id="company"
                        autoComplete="organization"
                        maxLength={120}
                        name="company"
                        value={form.company}
                        onChange={handle}
                        placeholder={tc.companyPlaceholder}
                        className={`${INPUT} pl-10`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="text-xs text-foreground/65">{tc.phoneLabel}</label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/65" />
                      <input
                        id="phone"
                        autoComplete="tel"
                        maxLength={40}
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

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="location" className="text-xs text-foreground/65">{tc.locationLabel}</label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/65" />
                      <input
                        id="location"
                        autoComplete="country-name"
                        maxLength={120}
                        name="location"
                        required
                        value={form.location}
                        onChange={handle}
                        placeholder={tc.locationPlaceholder}
                        className={`${INPUT} pl-10`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="text-xs text-foreground/65">{tc.categoryLabel}</label>
                    <div className="relative">
                      <Tags className="pointer-events-none absolute left-4 top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 text-foreground/65" />
                      <select id="category" name="category" required value={form.category} onChange={handle} className={`${INPUT} pl-10 pr-8`}>
                        <option value="" disabled>{tc.categoryPlaceholder}</option>
                        {tc.categoryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="budget" className="text-xs text-foreground/65">{tc.budgetLabel}</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/65 pointer-events-none z-10" />
                    <select id="budget" name="budget" value={form.budget} onChange={handle} className={`${INPUT} pl-10 pr-8`}>
                      <option value="">{tc.budgetPlaceholder}</option>
                      {tc.budgetOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-xs text-foreground/65">{tc.messageLabel}</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 h-3.5 w-3.5 text-foreground/65 pointer-events-none" />
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
                  className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
                >
                  <UserPlus className="size-4" />
                  {status === 'loading' ? tc.sendingBtn : tc.sendBtn}
                </Button>
                <Link
                  href="/blog"
                  className="block text-center text-xs text-foreground/65 transition-colors hover:text-foreground/65"
                >
                  {tc.blogCta}
                </Link>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className="border-t border-foreground/[0.08] bg-background">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground/65">© {new Date().getFullYear()} Numen Agency. {t.contact.footer}</span>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-5">
          <NumenMark className="hidden h-6 w-6 text-foreground/65 transition-colors hover:text-foreground md:inline-block" />
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-foreground/65 transition-colors hover:text-foreground/70"
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
            className="text-foreground/65 transition-colors hover:text-foreground/70"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <Link
            href="/"
            className="text-xs text-foreground/65 transition-colors hover:text-foreground/70"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/projects"
            className="text-xs text-foreground/65 transition-colors hover:text-foreground/70"
          >
            {t.nav.projectsLink}
          </Link>
          <Link
            href="/blog"
            className="text-xs text-foreground/65 transition-colors hover:text-foreground/70"
          >
            {t.blog.label}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
