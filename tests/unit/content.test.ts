import { describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { blogPosts } from '@/lib/blog-posts'
import { SITE_URL } from '@/lib/site'
import { translations } from '@/lib/translations'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function keyPaths(value: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return isPlainObject(child) ? keyPaths(child, path) : [path]
  })
}

describe('translations', () => {
  it('has the same keys in English and Spanish', () => {
    expect(keyPaths(translations.es).sort()).toEqual(keyPaths(translations.en).sort())
  })
})

describe('blogPosts', () => {
  it('is not empty', () => {
    expect(blogPosts.length).toBeGreaterThan(0)
  })

  it('has unique slugs', () => {
    const slugs = blogPosts.map((post) => post.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has URL-safe slugs', () => {
    for (const post of blogPosts) {
      expect(post.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    }
  })

  it('has parseable dates', () => {
    for (const post of blogPosts) {
      expect(Number.isNaN(Date.parse(post.date))).toBe(false)
    }
  })
})

describe('sitemap', () => {
  it('lists the static pages and every blog post', () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      SITE_URL,
      `${SITE_URL}/projects`,
      `${SITE_URL}/blog`,
      ...blogPosts.map((post) => `${SITE_URL}/blog/${post.slug}`),
    ])
  })
})

describe('robots', () => {
  it('points at the sitemap and blocks the API for all crawlers', () => {
    const result = robots()
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`)
    expect(rules[0].userAgent).toBe('*')
    expect(rules[0].disallow).toContain('/api/')
  })
})
