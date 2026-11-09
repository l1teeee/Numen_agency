'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react'
import { Navbar } from '@/components/blocks/navbar'
import { IndexEntry, INDEX_ASIDE_LINK, INDEX_GRID, INDEX_GUTTER } from '@/components/blocks/index-section'
import { blogPosts, type BlogPost } from '@/lib/blog-posts'
import { useLang } from '@/lib/lang'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const EASE = [0.22, 1, 0.36, 1] as const

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

function renderContent(content: string): React.ReactNode[] {
  const blocks = content.split(/\n\n+/)
  return blocks.map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 id={`section-${i}`} key={i} className="mb-5 mt-12 scroll-mt-28 text-2xl font-semibold leading-snug tracking-tight text-foreground first:mt-0">
          {block.slice(3)}
        </h2>
      )
    }
    if (block.startsWith('### ')) {
      return (
        <h3 key={i} className="mb-4 mt-8 text-xl font-semibold leading-snug text-foreground">
          {block.slice(4)}
        </h3>
      )
    }
    const lines = block.split('\n')
    if (lines.every((l) => l.startsWith('- '))) {
      return (
        <ul key={i} className="mb-6 space-y-3 pl-6">
          {lines.map((l, j) => (
            <li key={j} className="list-disc text-base leading-[1.85] text-foreground/75 md:text-[17px]">
              {formatInline(l.slice(2))}
            </li>
          ))}
        </ul>
      )
    }
    if (block.startsWith('```')) {
      const codeContent = block.replace(/^```[^\n]*\n/, '').replace(/```$/, '')
      return (
        <pre key={i} tabIndex={0} className="mb-6 max-w-full overflow-x-auto rounded-xl border border-foreground/20 bg-foreground/5 p-5 text-sm leading-relaxed text-foreground/80 focus-visible:outline-2">
          <code>{codeContent}</code>
        </pre>
      )
    }
    return (
      <p key={i} className="mb-6 text-base leading-[1.85] text-foreground/75 md:text-[17px]">
        {formatInline(block)}
      </p>
    )
  })
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  const { lang, t } = useLang()
  const reduceMotion = useReducedMotion()
  const locale = lang === 'en' ? 'en-US' : 'es-SV'

  const title = lang === 'en' && post.en ? post.en.title : post.title
  const description = lang === 'en' && post.en ? post.en.description : post.description
  const category = lang === 'en' && post.en ? post.en.category : post.category
  const content = lang === 'en' && post.en ? post.en.content : post.content
  const headings = content.split(/\n\n+/).flatMap((block, index) =>
    block.startsWith('## ') ? [{ id: `section-${index}`, title: block.slice(3) }] : [],
  )
  const related = blogPosts.filter((article) => article.slug !== post.slug).slice(0, 2)
  const copy = lang === 'en' ? {
    back: 'Back to the notebook',
    journal: 'The studio notebook',
    contents: 'In this article',
    written: 'A note from Numen',
    related: 'Keep the ideas going.',
    next: 'Next in your reading list',
    top: 'Back to top',
  } : {
    back: 'Volver al cuaderno',
    journal: 'El cuaderno del estudio',
    contents: 'En este artículo',
    written: 'Un apunte de Numen',
    related: 'Sigue conectando ideas.',
    next: 'Para tu próxima lectura',
    top: 'Volver arriba',
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" tabIndex={-1} className={`pb-16 pt-28 lg:pt-36 ${INDEX_GUTTER}`}>
        <div id="article-top" className="mb-8 flex flex-wrap items-center justify-between gap-3 lg:mb-12">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />{copy.back}
          </Link>
          <span className="text-xs uppercase tracking-widest text-foreground/60">Numen / {copy.journal}</span>
        </div>

        <article>
        <motion.header
          className="mb-10 lg:mb-14"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
        >
          <div className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="text-xs text-foreground/75">
              {category}
            </span>
            <span className="text-xs text-foreground/65">{post.readTime} {t.blog.readTime}</span>
            <time dateTime={post.date} className="text-xs text-foreground/65">{formatDate(post.date, locale)}</time>
          </div>
          <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.05em] text-foreground">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">{description}</p>
          <p className="mt-6 text-xs font-medium uppercase tracking-widest text-foreground/65">{copy.written}</p>
          </div>
        </motion.header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:gap-16">
          <aside className="min-w-0">
            <details className="lg:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {copy.contents}<ChevronDown className="size-4" aria-hidden="true" />
              </summary>
              <nav aria-label={copy.contents} className="mt-3">
                <ol className="space-y-1">
                  {headings.map((heading, index) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="flex min-h-11 gap-3 py-2 text-sm leading-relaxed text-foreground/70 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2">
                        <span className="shrink-0 text-xs leading-6">{String(index + 1).padStart(2, '0')}</span>{heading.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
            <nav aria-label={copy.contents} className="sticky top-28 hidden max-h-[calc(100svh-9rem)] overflow-y-auto pr-3 lg:block">
              <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-foreground">{copy.contents}</h2>
              <ol className="space-y-1">
                {headings.map((heading, index) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`} className="flex min-h-11 gap-3 py-2 text-xs leading-relaxed text-foreground/65 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2">
                      <span className="shrink-0">{String(index + 1).padStart(2, '0')}</span>{heading.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="min-w-0 max-w-2xl">
            {renderContent(content)}
            <a href="#article-top" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{copy.top}<ArrowUpRight className="size-4 -rotate-45" aria-hidden="true" /></a>
          </div>
        </div>
        </article>

        <section className="mt-16 lg:mt-24">
          <h2 className="max-w-xl text-[clamp(1.5rem,2vw,2.25rem)] font-medium leading-[1.02] tracking-[-0.04em] text-foreground">{t.blog.readyTitle}</h2>
          <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-foreground/65">{t.blog.readyDesc}</p>
          <div className="flex flex-wrap gap-x-6">
            <Link href="/#contact" className={INDEX_ASIDE_LINK}>
              {t.blog.startProject}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link href="/blog" className={INDEX_ASIDE_LINK}>{t.blog.moreArticles}</Link>
          </div>
        </section>

        <section className="mt-16 lg:mt-24" aria-labelledby="related-heading">
          <p className="text-[13px] text-foreground/65">{copy.next}</p>
          <h2 id="related-heading" className="mb-8 mt-2 text-[clamp(1.5rem,2vw,2.25rem)] font-medium leading-[1.02] tracking-[-0.04em] text-foreground">{copy.related}</h2>
          <ol className={INDEX_GRID}>
            {related.map((article, index) => {
              const articleCopy = lang === 'en' && article.en ? article.en : article
              return (
                <IndexEntry
                  key={article.slug}
                  index={index}
                  name={articleCopy.title}
                  compact
                  href={`/blog/${article.slug}`}
                  external={false}
                  details={`${articleCopy.category} · ${article.readTime} ${t.blog.readTime}`}
                />
              )
            })}
          </ol>
        </section>
      </main>
    </div>
  )
}
