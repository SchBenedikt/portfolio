import ProjectClient from './ProjectClient';
import { projectData } from '@/lib/projects';
import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projectData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectData.find((p) => p.slug === slug);
  if (!project) {
    return { title: 'Projekt nicht gefunden' };
  }
  const url = `${siteUrl}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    keywords: project.tags,
    openGraph: {
      title: project.title,
      description: project.description,
      url,
      type: 'article',
      siteName: 'Benedikt Schächner',
      images: [
        {
          url: project.image || '/og-image.png',
          width: 1200,
          height: 675,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image || '/og-image.png'],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProjectClient slug={slug} />;
}
