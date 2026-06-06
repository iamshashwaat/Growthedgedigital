import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/db'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  const siteUrl = 'https://www.growthedgedigital.in'
  const imageUrl = post.image?.startsWith('http') ? post.image : `${siteUrl}${post.image}`

  return {
    title: post.title,
    description: post.description || `Read about ${post.title} - expert insights from GrowthEdge Digital`,
    openGraph: {
      title: `${post.title} | GrowthEdge Digital`,
      description: post.description,
      type: 'article',
      publishedTime: post.createdAt,
      url: `/blog/${slug}`,
      images: post.image ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      title: `${post.title} | GrowthEdge Digital`,
      description: post.description,
      images: post.image ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
