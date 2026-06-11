import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/blocks/navbar'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos sobre desarrollo web, diseño de productos, integración de IA e infraestructura. Recursos para founders y equipos tech en El Salvador y LATAM.',
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-SV', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  return (
    <div className="bg-background">
      <Navbar alwaysVisible />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <div className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-foreground/25">Blog</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Recursos para founders y equipos tech.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/40">
            Artículos sobre desarrollo web, diseño de productos, integración de IA e
            infraestructura — escritos desde El Salvador para LATAM y el mundo.
          </p>
        </div>

        <div className="grid gap-px border border-foreground/8 bg-foreground/8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-background p-8 transition-colors hover:bg-foreground/[0.02]"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full border border-foreground/10 px-3 py-0.5 text-xs text-foreground/40">
                  {post.category}
                </span>
                <span className="text-xs text-foreground/25">{post.readTime} lectura</span>
              </div>
              <h2 className="mb-3 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
                {post.title}
              </h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/40">
                {post.description}
              </p>
              <div className="flex items-center justify-between border-t border-foreground/8 pt-4">
                <span className="text-xs text-foreground/25">{formatDate(post.date)}</span>
                <span className="text-xs text-foreground/40 transition-colors group-hover:text-foreground">
                  Leer artículo →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 border-t border-foreground/8 pt-12 text-center">
          <p className="mb-6 text-sm text-foreground/40">
            ¿Tienes un proyecto en mente? Hablemos.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Iniciar un proyecto
          </Link>
        </div>
      </main>
    </div>
  )
}
