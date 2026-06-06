import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Performance-driven digital marketing, SEO, social media, web development, PPC, content marketing, branding, and analytics services to grow your business.',
  openGraph: {
    title: 'Digital Marketing Services | GrowthEdge Digital',
    description: 'Performance-driven digital marketing, SEO, social media, web development, PPC, content marketing, branding, and analytics services.',
    url: '/services',
  },
  twitter: {
    title: 'Digital Marketing Services | GrowthEdge Digital',
    description: 'Performance-driven digital marketing, SEO, social media, web development, PPC, content marketing, branding, and analytics services.',
  },
  alternates: {
    canonical: '/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
