import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore our portfolio of digital excellence. See how GrowthEdge Digital delivers high-converting websites, marketing strategies, and branding solutions.',
  openGraph: {
    title: 'Our Projects | GrowthEdge Digital',
    description: 'Explore our portfolio of digital excellence. See how we deliver high-converting websites, marketing strategies, and branding solutions.',
    url: '/projects',
  },
  twitter: {
    title: 'Our Projects | GrowthEdge Digital',
    description: 'Explore our portfolio of digital excellence.',
  },
  alternates: {
    canonical: '/projects',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
