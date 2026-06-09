import type { Metadata } from 'next'
import { Navbar } from '@/components/blocks/navbar'
import { LiveProjectsSection } from '@/components/blocks/sections'

export const metadata: Metadata = {
  title: 'Live Projects',
  description: 'All products built by Numen Agency currently deployed and running in production.',
}

export default function ProjectsPage() {
  return (
    <div className="bg-background">
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <LiveProjectsSection />
      </main>
    </div>
  )
}
