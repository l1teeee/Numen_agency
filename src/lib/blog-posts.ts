import blogPostsJson from './blog-posts.json'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  content: string
  en?: {
    title: string
    description: string
    category: string
    content: string
  }
}

export const blogPosts = blogPostsJson satisfies BlogPost[]
