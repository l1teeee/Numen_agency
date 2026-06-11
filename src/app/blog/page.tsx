import type { Metadata } from 'next'
import { BlogPageClient } from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos sobre desarrollo web, diseño de productos, integración de IA e infraestructura. Recursos para founders y equipos tech en El Salvador y LATAM.',
}

export default function BlogPage() {
  return <BlogPageClient />
}
