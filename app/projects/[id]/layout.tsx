import type { Metadata } from 'next'
import { getProjectById } from '@/lib/db'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectById(Number(id))

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const siteUrl = 'https://www.growthedgedigital.in'
  const imageUrl = project.image?.startsWith('http') ? project.image : `${siteUrl}${project.image}`

  return {
    title: project.title,
    description: project.description || `${project.title} - A project by GrowthEdge Digital`,
    openGraph: {
      title: `${project.title} | GrowthEdge Digital`,
      description: project.description,
      url: `/projects/${id}`,
      images: project.image ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      title: `${project.title} | GrowthEdge Digital`,
      description: project.description,
      images: project.image ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `/projects/${id}`,
    },
  }
}

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
