'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Navbar } from '@/components/blocks/navbar'
import { FounderSticker } from '@/components/ui/doodles/founder-sticker'
import { ScribbleUnderline } from '@/components/ui/doodles/scribbles'
import { blogPosts } from '@/lib/blog-posts'
import { useLang } from '@/lib/lang'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { BlogIllustration } from './BlogIllustration'

const EASE = [0.22, 1, 0.36, 1] as const

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function BlogPageClient() {
  const { lang, t } = useLang()
  const reduceMotion = useReducedMotion()
  const [category, setCategory] = useState('all')
  const locale = lang === 'en' ? 'en-US' : 'es-SV'
  const sortedPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))
  const categories = [...new Set(blogPosts.map((post) => post.category))]
  const visiblePosts = category === 'all' ? sortedPosts : sortedPosts.filter((post) => post.category === category)
  const featured = category === 'all' ? visiblePosts[0] : null
  const articles = featured ? visiblePosts.slice(1) : visiblePosts
  const copy = lang === 'en' ? {
    notebook: 'The studio notebook',
    title: 'Ideas worth',
    accent: 'building on.',
    note: 'A few notes from the people behind the pixels.',
    browse: 'Explore the notebook',
    all: 'All topics',
    filter: 'Filter articles by topic',
    featured: 'Latest in the notebook',
    article: 'article',
    articles: 'articles',
    end: 'From a good read to a great idea.',
    read: 'Read article',
  } : {
    notebook: 'El cuaderno del estudio',
    title: 'Ideas para',
    accent: 'construir mejor.',
    note: 'Apuntes de las personas detrás de los píxeles.',
    browse: 'Explorar el cuaderno',
    all: 'Todos los temas',
    filter: 'Filtrar artículos por tema',
    featured: 'Lo último del cuaderno',
    article: 'artículo',
    articles: 'artículos',
    end: 'De una buena lectura a una gran idea.',
    read: 'Leer artículo',
  }
  const featuredCopy = featured && (lang === 'en' && featured.en ? featured.en : featured)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-6xl px-6 pb-24 pt-32 lg:px-8 lg:pt-40">
        <motion.header
          className="mb-12 grid gap-10 border-b border-foreground/15 pb-12 md:grid-cols-[1fr_220px] md:items-end lg:mb-16 lg:pb-16"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
        >
          <div className="min-w-0">
            <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-foreground/65">
              <span className="h-px w-8 bg-foreground/60" />
              {copy.notebook}
            </p>
            <h1 className="text-[clamp(2.65rem,6.6vw,5rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-foreground">
              {copy.title} <br />
              <span className="relative inline-block pb-4">
                {copy.accent}
                <ScribbleUnderline className="absolute bottom-0 left-0 h-3 w-full text-foreground/70" />
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/65">
              {t.blog.subtext}
            </p>
            <a href="#articles" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">
              {copy.browse}<ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div className="flex items-center gap-6 md:flex-col md:items-end md:pb-4">
            <FounderSticker figure="julian" size="w-20 md:w-32" tilt={4} delay={0.2} className="shrink-0" />
            <p className="max-w-[190px] text-sm leading-relaxed text-foreground/65 md:text-right">{copy.note}</p>
          </div>
        </motion.header>

        <section id="articles" aria-label={t.blog.label} className="scroll-mt-28">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
            <div role="group" aria-label={copy.filter} className="flex flex-wrap gap-2">
              {['all', ...categories].map((item) => {
                const sample = blogPosts.find((post) => post.category === item)
                const label = item === 'all' ? copy.all : lang === 'en' && sample?.en ? sample.en.category : item
                const selected = category === item

                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCategory(item)}
                    className={`min-h-11 cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${selected ? 'border-foreground bg-foreground text-background' : 'border-foreground/20 text-foreground/70 hover:border-foreground/50 hover:text-foreground'}`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <p aria-live="polite" aria-atomic="true" className="text-xs text-foreground/65">
              {visiblePosts.length.toString().padStart(2, '0')} {visiblePosts.length === 1 ? copy.article : copy.articles}
            </p>
          </div>

          {featured && featuredCopy && (
            <Link href={`/blog/${featured.slug}`} className="group mb-6 grid overflow-hidden rounded-[1.5rem] border border-foreground/20 transition-colors hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-offset-4 md:grid-cols-2">
              <div className="relative flex min-h-64 flex-col justify-between border-b border-foreground/15 bg-foreground/[0.035] p-6 md:min-h-96 md:border-r md:border-b-0 lg:p-8">
                <div className="flex items-center justify-between text-xs font-medium uppercase tracking-widest text-foreground/65">
                  <span>{copy.featured}</span><span>01</span>
                </div>
                <BlogIllustration category={featured.category} className="h-56 md:h-64" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/65">Numen / {featuredCopy.category}</span>
                  <span className="flex size-10 items-center justify-center rounded-full border border-foreground/25 transition-colors group-hover:bg-foreground group-hover:text-background"><ArrowUpRight className="size-5" aria-hidden="true" /></span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 lg:p-10">
                <p className="mb-5 text-xs text-foreground/65">{featured.readTime} {t.blog.readTime}</p>
                <h2 className="text-2xl font-semibold leading-snug tracking-tight text-foreground lg:text-3xl">{featuredCopy.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground/65">{featuredCopy.description}</p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/15 pt-5">
                  <time dateTime={featured.date} className="text-xs text-foreground/65">{formatDate(featured.date, locale)}</time>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">{copy.read}<ArrowUpRight className="size-4" aria-hidden="true" /></span>
                </div>
              </div>
            </Link>
          )}

          <div className="grid gap-6 md:grid-cols-2">
          {articles.map((post, i) => {
            const title = lang === 'en' && post.en ? post.en.title : post.title
            const description = lang === 'en' && post.en ? post.en.description : post.description
            const category = lang === 'en' && post.en ? post.en.category : post.category

            return (
              <motion.div
                key={post.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE, delay: reduceMotion ? 0 : i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-foreground/20 bg-background transition-colors hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <div className="relative border-b border-foreground/15 bg-foreground/[0.035] px-8 py-4">
                    <span className="absolute top-5 left-6 text-xs text-foreground/60">{String(sortedPosts.indexOf(post) + 1).padStart(2, '0')}</span>
                    <BlogIllustration category={post.category} className="h-44 md:h-48" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs text-foreground/70">
                      {category}
                    </span>
                    <span className="text-xs text-foreground/65">{post.readTime} {t.blog.readTime}</span>
                  </div>
                  <h2 className="mb-3 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
                    {title}
                  </h2>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/65">
                    {description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-foreground/15 pt-4">
                    <time dateTime={post.date} className="text-xs text-foreground/65">{formatDate(post.date, locale)}</time>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
                      {copy.read}<ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
          </div>
        </section>

        <section className="mt-16 rounded-[1.5rem] border border-foreground/20 px-6 py-12 text-center lg:mt-24 lg:py-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/65">{copy.notebook} / Numen</p>
          <h2 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{copy.end}</h2>
          <p className="mt-4 mb-7 text-base text-foreground/65">{t.blog.cta}</p>
          <Link
            href="/#contact"
            className="inline-flex min-h-12 items-center gap-4 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            {t.blog.ctaBtn}<ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      </main>
    </div>
  )
}
