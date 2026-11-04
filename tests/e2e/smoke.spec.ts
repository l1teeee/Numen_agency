import { expect, test, type Page } from '@playwright/test'
import { blogPosts } from '../../src/lib/blog-posts'
import { SITE_URL } from '../../src/lib/site'

const PAGES = ['/', '/projects', '/blog', ...blogPosts.map((post) => `/blog/${post.slug}`)]

function collectErrors(page: Page): string[] {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
  page.on('console', (message) => {
    if (message.type() !== 'error') return
    // Vercel Analytics and Speed Insights scripts only exist on Vercel; under next start they 404.
    if (message.location().url.includes('/_vercel/')) return
    errors.push(`console: ${message.text()}`)
  })
  return errors
}

for (const path of PAGES) {
  test(`renders ${path} without errors`, async ({ page }) => {
    const errors = collectErrors(page)
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/Numen Agency/)
    await page.waitForLoadState('networkidle')
    expect(errors).toEqual([])
  })
}

test('unknown page answers 404', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist')
  expect(response?.status()).toBe(404)
})

test('unknown blog post answers 404', async ({ page }) => {
  const response = await page.goto('/blog/not-a-real-post')
  expect(response?.status()).toBe(404)
})

test('robots.txt points at the sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt')
  expect(response.status()).toBe(200)
  expect(await response.text()).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
})

test('sitemap.xml lists blog posts', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)
  expect(await response.text()).toContain(`/blog/${blogPosts[0].slug}`)
})

test('contact API rejects a request without an Origin header', async ({ request }) => {
  const response = await request.post('/api/contact', { data: { name: 'x' } })
  expect(response.status()).toBe(403)
})
