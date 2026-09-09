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
  const ogImage = `${siteUrl}/og/organization-${org.slug}.jpg`;
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
      locale: 'de_DE',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: org.name,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: org.name,
      description: `Artikel und Projekte rund um ${org.name}.`,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const org = organizationData.find((o) => o.slug === slug);
  const url = `${siteUrl}/organization/${slug}`;

  const orgLd = org
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: org.name,
        url,
        image: org.logo ? org.logo : `${siteUrl}/og/organization-${org.slug}.jpg`,
        memberOf: {
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
        name: 'Presse',
        item: `${siteUrl}/press`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: org?.name ?? slug,
        item: url,
      },
    ],
  };

  return (
    <>
      {orgLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <OrganizationClient slug={slug} />
    </>
  );
}