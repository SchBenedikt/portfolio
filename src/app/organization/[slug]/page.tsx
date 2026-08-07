import OrganizationClient from './OrganizationClient';
import { organizationData } from '@/lib/organizations';
import { articlesData } from '@/lib/articles';
import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return organizationData.map((org) => ({
    slug: org.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const org = organizationData.find((o) => o.slug === slug);
  if (!org) {
    return { title: 'Organisation nicht gefunden' };
  }
  const articleCount = articlesData.filter(
    (a) => a.organizationSlug === org.slug
  ).length;
  const url = `${siteUrl}/organization/${org.slug}`;
  return {
    title: org.name,
    description: `Alle Artikel und Projekte im Zusammenhang mit ${org.name} auf der Seite von Benedikt Schächner (${articleCount} Presse-Artikel).`,
    alternates: { canonical: url },
    openGraph: {
      title: `${org.name} | Benedikt Schächner`,
      description: `Artikel und Projekte rund um ${org.name}.`,
      url,
      type: 'website',
      siteName: 'Benedikt Schächner',
      images: org.logo ? [{ url: org.logo, alt: org.name }] : ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: org.name,
      description: `Artikel und Projekte rund um ${org.name}.`,
      images: org.logo ? [org.logo] : ['/og-image.png'],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <OrganizationClient slug={slug} />;
}
