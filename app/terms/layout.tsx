import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'GrowthEdge Digital terms of service. Read our service agreement, delivery terms, and governing laws for digital marketing services.',
  openGraph: {
    title: 'Terms of Service | GrowthEdge Digital',
    description: 'GrowthEdge Digital terms of service. Read our service agreement and governing laws.',
    url: '/terms',
  },
  twitter: {
    title: 'Terms of Service | GrowthEdge Digital',
    description: 'GrowthEdge Digital terms of service.',
  },
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
