import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/blocks/navbar'
import { blogPosts } from '@/lib/blog-posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-SV', { year: 'numeric', month: 'long', day: 'numeric' })
}

function renderContent(content: string): React.ReactNode[] {
  const blocks = content.split(/\n\n+/)
  return blocks.map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2
          key={i}
          className="mb-4 mt-10 text-xl font-semibold tracking-tight text-foreground first:mt-0"
        >
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
        <pre
          key={i}
          className="mb-4 overflow-x-auto rounded-lg border border-foreground/8 bg-foreground/[0.03] p-4 text-xs leading-relaxed text-foreground/70"
        >
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="bg-background">
      <Navbar alwaysVisible />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-32">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 text-xs text-foreground/30 transition-colors hover:text-foreground/60"
        >
          ← Volver al blog
        </Link>

        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-foreground/10 px-3 py-0.5 text-xs text-foreground/40">
              {post.category}
            </span>
            <span className="text-xs text-foreground/25">{post.readTime} de lectura</span>
            <span className="text-xs text-foreground/25">{formatDate(post.date)}</span>
          </div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/40">{post.description}</p>
        </div>

        <div className="border-t border-foreground/8 pt-10">
          {renderContent(post.content)}
        </div>

        <div className="mt-16 border-t border-foreground/8 pt-12">
          <p className="mb-2 text-sm font-medium text-foreground">
            ¿Listo para empezar tu proyecto?
          </p>
          <p className="mb-6 text-sm text-foreground/40">
            En Numen Agency construimos productos digitales desde El Salvador para el mundo.
            Respondemos en menos de 24 horas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Iniciar un proyecto
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-foreground/10 px-6 py-2.5 text-sm text-foreground/50 transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              Ver más artículos
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
