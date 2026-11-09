'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { EDITORIAL_MUTED, EDITORIAL_STRONG } from '@/components/blocks/editorial-shell'
import { IndexEntry, IndexSection, INDEX_ASIDE_LINK, INDEX_GRID, PageIntro } from '@/components/blocks/index-section'
import { Navbar } from '@/components/blocks/navbar'
import { blogPosts } from '@/lib/blog-posts'
import { useLang } from '@/lib/lang'

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function BlogPageClient() {
  const { lang, t } = useLang()
  const [category, setCategory] = useState('all')
  const locale = lang === 'en' ? 'en-US' : 'es-SV'
  const sortedPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))
  const categories = [...new Set(blogPosts.map((post) => post.category))]
  const visiblePosts = category === 'all' ? sortedPosts : sortedPosts.filter((post) => post.category === category)
  const copy = lang === 'en' ? {
    notebook: 'The studio notebook',
    title: 'Ideas worth building on.',
    note: 'A few notes from the people behind the pixels.',
    all: 'All topics',
    filter: 'Filter articles by topic',
    article: 'article',
    articles: 'articles',
    end: 'From a good read to a great idea.',
  } : {
    notebook: 'El cuaderno del estudio',
    title: 'Ideas para construir mejor.',
    note: 'Apuntes de las personas detrás de los píxeles.',
    all: 'Todos los temas',
    filter: 'Filtrar artículos por tema',
    article: 'artículo',
    articles: 'artículos',
    end: 'De una buena lectura a una gran idea.',
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageIntro label={copy.notebook} title={copy.title} description={t.blog.subtext} />
        <IndexSection
          id="articles"
          title={t.blog.label}
          intro={copy.note}
          aside={
            <>
              <div role="group" aria-label={copy.filter} className="mt-8 flex flex-wrap gap-x-5 lg:flex-col lg:items-start">
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
                      className={`min-h-9 cursor-pointer text-left text-[13px] font-medium transition-colors ${selected ? EDITORIAL_STRONG : EDITORIAL_MUTED}`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
              <p aria-live="polite" aria-atomic="true" className={`mt-4 text-[13px] ${EDITORIAL_MUTED}`}>
                {visiblePosts.length.toString().padStart(2, '0')} {visiblePosts.length === 1 ? copy.article : copy.articles}
              </p>
            </>
          }
        >
          <ol className={INDEX_GRID}>
            {visiblePosts.map((post) => {
              const postCopy = lang === 'en' && post.en ? post.en : post
              return (
                <IndexEntry
                  key={post.slug}
                  index={sortedPosts.indexOf(post)}
                  name={postCopy.title}
                  compact
                  href={`/blog/${post.slug}`}
                  external={false}
                  details={`${postCopy.category} · ${post.readTime} ${t.blog.readTime} · ${formatDate(post.date, locale)}`}
                  desc={postCopy.description}
                />
              )
            })}
          </ol>
        </IndexSection>
        <IndexSection
          id="blog-cta"
          title={copy.end}
          intro={t.blog.cta}
          aside={
            <Link href="/#contact" className={INDEX_ASIDE_LINK}>
              {t.blog.ctaBtn}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          }
        />
      </main>
    </div>
  )
}
