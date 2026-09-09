import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { blogData } from '@/lib/blog';
import type { Metadata } from 'next';

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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogData.find((p) => p.slug === slug);
  if (!post) {
    return (
      <main className="portfolio-subpage">
        <div className="container">
          <h1>Artikel nicht gefunden.</h1>
          <Link href="/blog" className="text-link">
            Zurück zum Blog <span>↗</span>
          </Link>
        </div>
      </main>
    );
  }

  const url = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'de-DE',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
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
    image: `${siteUrl}/og/blog-${post.slug}.jpg`,
    keywords: post.tags.join(', '),
  };

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
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  const relatedPosts = blogData
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  return (
    <div className="portfolio-home">
      <Header />
      <main className="portfolio-subpage blog-post-page">
        <div className="container blog-post-container">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
          />
          <Link href="/blog" className="blog-back" data-cursor-interactive>
            <ArrowLeft size={16} /> Alle Artikel
          </Link>
          <header className="blog-post-heading">
            <p className="eyebrow">Benedikt Schächner / Blog</p>
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <span>
                <Calendar size={14} /> <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span>
                <Clock size={14} /> {post.readingMinutes} Min. Lesezeit
              </span>
              <span className="blog-post-category">{post.category}</span>
            </div>
          </header>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <footer className="blog-post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post-tag">
                {tag}
              </span>
            ))}
          </footer>
          {relatedPosts.length > 0 && (
            <section className="blog-related" aria-labelledby="related-posts">
              <h2 id="related-posts">Weitere Artikel.</h2>
              <div className="blog-related-grid">
                {relatedPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-related-card" data-cursor-interactive>
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <h3>{p.title}</h3>
                    <span>
                      Weiterlesen <ArrowUpRight size={15} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}