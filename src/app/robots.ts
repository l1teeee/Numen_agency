import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all crawlers on public pages, block API and private routes
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },

      // Search engines
      { userAgent: 'Googlebot',         allow: '/' },
      { userAgent: 'Googlebot-Image',   allow: '/' },
      { userAgent: 'Googlebot-Video',   allow: '/' },
      { userAgent: 'Googlebot-News',    allow: '/' },
      { userAgent: 'Bingbot',           allow: '/' },
      { userAgent: 'Slurp',             allow: '/' }, // Yahoo
      { userAgent: 'DuckDuckBot',       allow: '/' },
      { userAgent: 'Baiduspider',       allow: '/' },
      { userAgent: 'YandexBot',         allow: '/' },
      { userAgent: 'Sogou',             allow: '/' },
      { userAgent: 'Exabot',            allow: '/' },
      { userAgent: 'ia_archiver',       allow: '/' }, // Wayback Machine

      // AI / LLM crawlers
      { userAgent: 'GPTBot',            allow: '/' }, // OpenAI
      { userAgent: 'ChatGPT-User',      allow: '/' },
      { userAgent: 'OAI-SearchBot',     allow: '/' },
      { userAgent: 'ClaudeBot',         allow: '/' }, // Anthropic
      { userAgent: 'Claude-Web',        allow: '/' },
      { userAgent: 'anthropic-ai',      allow: '/' },
      { userAgent: 'PerplexityBot',     allow: '/' }, // Perplexity
      { userAgent: 'Perplexity-User',   allow: '/' },
      { userAgent: 'YouBot',            allow: '/' }, // You.com
      { userAgent: 'DuckAssistBot',     allow: '/' }, // DuckDuckGo AI
      { userAgent: 'Applebot',          allow: '/' }, // Apple / Siri
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Googlebot-Extended',allow: '/' }, // Google AI
      { userAgent: 'CCBot',             allow: '/' }, // Common Crawl
      { userAgent: 'cohere-ai',         allow: '/' }, // Cohere
      { userAgent: 'Amazonbot',         allow: '/' }, // Amazon / Alexa
      { userAgent: 'Meta-ExternalAgent',allow: '/' }, // Meta AI
      { userAgent: 'Meta-ExternalFetcher', allow: '/' },
      { userAgent: 'Diffbot',           allow: '/' },
      { userAgent: 'Bytespider',        allow: '/' }, // ByteDance
      { userAgent: 'Timpibot',          allow: '/' },
      { userAgent: 'Omgilibot',         allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
