import type { Metadata } from 'next'
import { Navbar } from '@/components/blocks/navbar'
import { LiveProjectsSection } from '@/components/blocks/sections'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Live Projects',
  description: 'All products built by Numen Agency currently deployed and running in production.',
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
}

export default function ProjectsPage() {
  return (
    <div className="bg-background">
      <Navbar alwaysVisible />
      <main className="flex min-h-screen flex-col">
        <LiveProjectsSection />
      </main>
    </div>
  )
}
