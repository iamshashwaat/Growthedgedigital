import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Fresh ideas for digital minds. Explore expert insights on SEO, social media marketing, content strategy, paid advertising, and web design trends.',
  openGraph: {
    title: 'Blog | GrowthEdge Digital',
    description: 'Fresh ideas for digital minds. Explore expert insights on SEO, social media marketing, content strategy, paid advertising, and web design trends.',
    url: '/blog',
  },
  twitter: {
    title: 'Blog | GrowthEdge Digital',
    description: 'Fresh ideas for digital minds. Explore expert insights on digital marketing.',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
