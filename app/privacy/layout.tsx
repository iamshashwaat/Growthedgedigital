import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'GrowthEdge Digital privacy policy. Learn how we collect, use, and protect your personal information when you use our digital marketing services.',
  openGraph: {
    title: 'Privacy Policy | GrowthEdge Digital',
    description: 'GrowthEdge Digital privacy policy. Learn how we collect, use, and protect your personal information.',
    url: '/privacy',
  },
  twitter: {
    title: 'Privacy Policy | GrowthEdge Digital',
    description: 'GrowthEdge Digital privacy policy.',
  },
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
