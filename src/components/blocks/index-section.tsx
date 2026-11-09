import type { ReactNode, Ref } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorialReveal, SectionFocusFade, ViewportFade, EDITORIAL_MUTED, EDITORIAL_STRONG } from './editorial-shell'

export const INDEX_GUTTER = 'px-9 sm:px-14 lg:px-[7vw] xl:px-[12vw]'
export const INDEX_GRID_TWO = 'grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:[&:hover>li:not(:hover)]:opacity-35'
export const INDEX_GRID = `${INDEX_GRID_TWO} xl:grid-cols-3`
export const INDEX_ASIDE_LINK = `mt-8 inline-flex min-h-11 items-center gap-2 text-[13px] font-medium underline decoration-1 underline-offset-4 ${EDITORIAL_STRONG}`
const INDEX_NAME = `text-[clamp(1.5rem,2vw,2.25rem)] font-medium leading-[1.02] tracking-[-0.04em] ${EDITORIAL_STRONG}`
const INDEX_NAME_COMPACT = `text-[clamp(1.125rem,1.4vw,1.375rem)] font-medium leading-snug tracking-[-0.02em] ${EDITORIAL_STRONG}`

function twoDigits(value: number) {
  return String(value).padStart(2, '0')
}

interface IndexSectionProps {
  id: string
  number?: number
  title: string
  intro?: ReactNode
  sectionRef?: Ref<HTMLElement>
  /** Extra content for the left column, under the intro. */
  aside?: ReactNode
  /** Gives the section the whole screen; sections without it sit closer together. */
  fullScreen?: boolean
  /** Puts the heading above the content instead of beside it. */
  stacked?: boolean
  children?: ReactNode
}

export function IndexSection({ id, number, title, intro, sectionRef, aside, fullScreen = false, stacked = false, children }: IndexSectionProps) {
  const Fade = fullScreen ? SectionFocusFade : ViewportFade

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn('bg-white', INDEX_GUTTER, fullScreen ? 'flex min-h-svh flex-col justify-center py-20 lg:py-24' : 'py-20 lg:pb-[27svh] lg:pt-16')}
    >
      <Fade className={stacked ? undefined : 'grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:gap-16'}>
        <EditorialReveal className={stacked ? 'mb-12 lg:mb-16' : 'lg:sticky lg:top-24 lg:self-start'}>
          <h2 className={`text-[15px] font-medium ${EDITORIAL_STRONG}`}>
            {number !== undefined && <span aria-hidden="true" className={`mr-3 font-normal tabular-nums ${EDITORIAL_MUTED}`}>{number}</span>}
            {title}
          </h2>
          {intro && <p className={`mt-4 max-w-[22rem] text-[13px] leading-relaxed ${EDITORIAL_MUTED}`}>{intro}</p>}
          {aside}
        </EditorialReveal>
        {children}
      </Fade>
    </section>
  )
}

interface PageIntroProps {
  label: string
  title: string
  description: string
}

export function PageIntro({ label, title, description }: PageIntroProps) {
  return (
    <header className={`bg-white pb-6 pt-32 lg:pt-40 ${INDEX_GUTTER}`}>
      <EditorialReveal>
        <p className={`text-[13px] ${EDITORIAL_MUTED}`}>{label}</p>
        <h1 className={`mt-4 max-w-[18ch] text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.05em] ${EDITORIAL_STRONG}`}>{title}</h1>
        <p className={`mt-6 max-w-[34rem] text-[15px] leading-relaxed ${EDITORIAL_MUTED}`}>{description}</p>
      </EditorialReveal>
    </header>
  )
}

interface IndexEntryProps {
  index: number
  name: string
  details?: ReactNode
  desc?: string
  footnote?: string
  compact?: boolean
  href?: string
  external?: boolean
  linkLabel?: string
}

export function IndexEntry({ index, name, details, desc, footnote, compact = false, href, external = true, linkLabel }: IndexEntryProps) {
  const content = (
    <>
      <span className={`block text-[13px] tabular-nums ${EDITORIAL_MUTED}`}>{twoDigits(index + 1)}.</span>
      <h3 className={`mt-3 flex items-start justify-between gap-3 ${compact ? INDEX_NAME_COMPACT : INDEX_NAME}`}>
        {name}
        {href && <ArrowUpRight className="mt-1 size-5 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />}
      </h3>
      {details && <p className={`mt-3 flex flex-wrap items-center gap-x-2 text-[13px] ${EDITORIAL_MUTED}`}>{details}</p>}
      {desc && <p className={`mt-4 line-clamp-4 max-w-[26rem] text-[13px] leading-relaxed ${EDITORIAL_MUTED}`}>{desc}</p>}
      {footnote && <p className={`mt-3 text-[12px] ${EDITORIAL_MUTED}`}>{footnote}</p>}
    </>
  )

  return (
    <li className="transition-opacity duration-500">
      <EditorialReveal delay={(index % 3) * 0.08}>
        {href ? (
          <Link href={href} aria-label={linkLabel} className="group block" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {content}
          </Link>
        ) : content}
      </EditorialReveal>
    </li>
  )
}
