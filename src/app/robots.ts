import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Explicit allow for major AI crawlers
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Applebot-Extended',
          'Googlebot-Extended',
          'CCBot',
          'cohere-ai',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://numenagency.com/sitemap.xml',
    host: 'https://numenagency.com',
  }
}
