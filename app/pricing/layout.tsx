import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Affordable digital marketing and web development pricing plans. Choose from social media management, influencer marketing, and website development packages.',
  openGraph: {
    title: 'Pricing Plans | GrowthEdge Digital',
    description: 'Affordable digital marketing and web development pricing plans. Choose from social media management, influencer marketing, and website development packages.',
    url: '/pricing',
  },
  twitter: {
    title: 'Pricing Plans | GrowthEdge Digital',
    description: 'Affordable digital marketing and web development pricing plans.',
  },
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
