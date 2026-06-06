import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with GrowthEdge Digital. Call +91 81782 96841, email hello@growthedgedigital.in, or request a free digital marketing audit today.',
  openGraph: {
    title: 'Contact Us | GrowthEdge Digital',
    description: 'Get in touch with GrowthEdge Digital. Call, email, or request a free digital marketing audit today.',
    url: '/contact',
  },
  twitter: {
    title: 'Contact Us | GrowthEdge Digital',
    description: 'Get in touch with GrowthEdge Digital for a free digital marketing audit.',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
