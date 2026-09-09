import { blogData } from '@/lib/blog';
import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Artikel nicht gefunden' };
  }
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      siteName: 'Benedikt Schächner',
      locale: 'de_DE',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['Benedikt Schächner'],
      tags: post.tags,
      images: [
        {
          url: `${siteUrl}/og/blog-${post.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteUrl}/og/blog-${post.slug}.jpg`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
