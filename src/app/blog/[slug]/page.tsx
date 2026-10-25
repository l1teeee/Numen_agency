import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/blog-posts'
import { SITE_URL } from '@/lib/site'
import { SiteFooter } from '@/components/blocks/sections'
import { BlogPostContent } from './BlogPostContent'

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
  const url = `${SITE_URL}/blog/${post.slug}`
  const title = post.en?.title ?? post.title
  const description = post.en?.description ?? post.description
  return {
    title,
    description,
    keywords: [post.category, 'agencia digital El Salvador', 'Numen Agency', 'desarrollo web El Salvador'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Numen Agency',
      locale: 'en_US',
      publishedTime: post.date,
      images: [
        {
          url: '/OPimage.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/OPimage.png'],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.en?.title ?? post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
      />
      <BlogPostContent post={post} />
      <SiteFooter />
    </>
  )
}
