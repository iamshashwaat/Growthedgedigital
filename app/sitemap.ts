import { MetadataRoute } from 'next'
import { getAllPosts, getAllProjects } from '@/lib/db'

const baseUrl = 'https://www.growthedgedigital.in'

const staticPages: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    url: `${baseUrl}/services`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/pricing`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/projects`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/book-a-call`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/privacy`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${baseUrl}/terms`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
]

const fallbackBlogSlugs = [
  'seo-strategies-2024',
  'social-media-growth',
  'content-marketing-tips',
  'paid-advertising-roi',
  'web-design-trends',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPages: MetadataRoute.Sitemap = []
  let projectPages: MetadataRoute.Sitemap = []

  try {
    const posts = await getAllPosts()
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.createdAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    blogPages = fallbackBlogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  }

  try {
    const projects = await getAllProjects()
    projectPages = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: new Date(project.createdAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // No fallback needed, just skip project pages if DB is unavailable
  }

  return [...staticPages, ...blogPages, ...projectPages]
}
