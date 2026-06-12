'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/blocks/navbar'
import { blogPosts } from '@/lib/blog-posts'
import { useLang } from '@/lib/lang'

const EASE = [0.22, 1, 0.36, 1] as const

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function BlogPageClient() {
  const { lang, t } = useLang()
  const locale = lang === 'en' ? 'en-US' : 'es-SV'

  return (
    <div className="min-h-screen bg-background">
      <Navbar alwaysVisible />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-foreground/25">{t.blog.label}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t.blog.headline}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/40">
            {t.blog.subtext}
          </p>
        </motion.div>

        <div className="grid gap-px border border-foreground/8 bg-foreground/8 md:grid-cols-2">
          {blogPosts.map((post, i) => {
            const title = lang === 'en' && post.en ? post.en.title : post.title
            const description = lang === 'en' && post.en ? post.en.description : post.description
            const category = lang === 'en' && post.en ? post.en.category : post.category

            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.07 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-foreground/2"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full border border-foreground/10 px-3 py-0.5 text-xs text-foreground/40">
                      {category}
                    </span>
                    <span className="text-xs text-foreground/25">{post.readTime} {t.blog.readTime}</span>
                  </div>
                  <h2 className="mb-3 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
                    {title}
                  </h2>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/40">
                    {description}
                  </p>
                  <div className="flex items-center justify-between border-t border-foreground/8 pt-4">
                    <span className="text-xs text-foreground/25">{formatDate(post.date, locale)}</span>
                    <span className="text-xs text-foreground/40 transition-colors group-hover:text-foreground">
                      {t.blog.readArticle}
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-16 border-t border-foreground/8 pt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        >
          <p className="mb-6 text-sm text-foreground/40">
            {t.blog.cta}
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t.blog.ctaBtn}
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
