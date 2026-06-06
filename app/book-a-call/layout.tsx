import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Schedule a free strategy call with GrowthEdge Digital. Get a personalized digital marketing audit and growth plan for your business within 4 hours.',
  openGraph: {
    title: 'Book a Call | GrowthEdge Digital',
    description: 'Schedule a free strategy call. Get a personalized digital marketing audit and growth plan within 4 hours.',
    url: '/book-a-call',
  },
  twitter: {
    title: 'Book a Call | GrowthEdge Digital',
    description: 'Schedule a free strategy call with GrowthEdge Digital.',
  },
  alternates: {
    canonical: '/book-a-call',
  },
}

export default function BookACallLayout({ children }: { children: React.ReactNode }) {
  return children
}
