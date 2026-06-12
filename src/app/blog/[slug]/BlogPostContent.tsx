'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/blocks/navbar'
import type { BlogPost } from '@/lib/blog-posts'
import { useLang } from '@/lib/lang'

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
        <strong key={i} className="font-semibold text-foreground/80">
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
        <h2 key={i} className="mb-4 mt-10 text-xl font-semibold tracking-tight text-foreground first:mt-0">
          {block.slice(3)}
        </h2>
      )
    }
    if (block.startsWith('### ')) {
      return (
        <h3 key={i} className="mb-3 mt-8 text-base font-semibold text-foreground">
          {block.slice(4)}
        </h3>
      )
    }
    const lines = block.split('\n')
    if (lines.every((l) => l.startsWith('- '))) {
      return (
        <ul key={i} className="mb-4 space-y-1.5 pl-5">
          {lines.map((l, j) => (
            <li key={j} className="list-disc text-sm leading-relaxed text-foreground/60">
              {formatInline(l.slice(2))}
            </li>
          ))}
        </ul>
      )
    }
    if (block.startsWith('```')) {
      const codeContent = block.replace(/^```[^\n]*\n/, '').replace(/```$/, '')
      return (
        <pre key={i} className="mb-4 overflow-x-auto rounded-lg border border-foreground/8 bg-foreground/3 p-4 text-xs leading-relaxed text-foreground/70">
          <code>{codeContent}</code>
        </pre>
      )
    }
    return (
      <p key={i} className="mb-4 text-sm leading-relaxed text-foreground/60">
        {formatInline(block)}
      </p>
    )
  })
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  const { lang, t } = useLang()
  const locale = lang === 'en' ? 'en-US' : 'es-SV'

  const title = lang === 'en' && post.en ? post.en.title : post.title
  const description = lang === 'en' && post.en ? post.en.description : post.description
  const category = lang === 'en' && post.en ? post.en.category : post.category
  const content = lang === 'en' && post.en ? post.en.content : post.content

  return (
    <div className="min-h-screen bg-background">
      <Navbar alwaysVisible />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-xs text-foreground/30 transition-colors hover:text-foreground/60"
          >
            {t.blog.backToBlog}
          </Link>
        </motion.div>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-foreground/10 px-3 py-0.5 text-xs text-foreground/40">
              {category}
            </span>
            <span className="text-xs text-foreground/25">{post.readTime} {t.blog.readTime}</span>
            <span className="text-xs text-foreground/25">{formatDate(post.date, locale)}</span>
          </div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/40">{description}</p>
        </motion.div>

        <motion.div
          className="border-t border-foreground/8 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          {renderContent(content)}
        </motion.div>

        <motion.div
          className="mt-16 border-t border-foreground/8 pt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
        >
          <p className="mb-2 text-sm font-medium text-foreground">
            {t.blog.readyTitle}
          </p>
          <p className="mb-6 text-sm text-foreground/40">
            {t.blog.readyDesc}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {t.blog.startProject}
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-foreground/10 px-6 py-2.5 text-sm text-foreground/50 transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              {t.blog.moreArticles}
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
