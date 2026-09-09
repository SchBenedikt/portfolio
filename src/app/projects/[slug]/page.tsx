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
      locale: 'de_DE',
      publishedTime: project.date,
      modifiedTime: project.date,
      authors: ['Benedikt Schächner'],
      tags: project.tags,
      images: [
        {
          url: `${siteUrl}/og/project-${project.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: project.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [`${siteUrl}/og/project-${project.slug}.jpg`],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = projectData.find((p) => p.slug === slug);
  const url = `${siteUrl}/projects/${slug}`;

  const creativeWorkLd = project
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.title,
        description: project.description,
        datePublished: project.date,
        dateModified: project.date,
        inLanguage: 'de-DE',
        keywords: project.tags.join(', '),
        url,
        image: `${siteUrl}/og/project-${project.slug}.jpg`,
        author: {
          '@type': 'Person',
          name: 'Benedikt Schächner',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Person',
          name: 'Benedikt Schächner',
          url: siteUrl,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      }
    : null;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Start',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projekte',
        item: `${siteUrl}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project?.title ?? slug,
        item: url,
      },
    ],
  };

  return (
    <>
      {creativeWorkLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProjectClient slug={slug} />
    </>
  );
}