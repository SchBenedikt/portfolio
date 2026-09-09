'use client';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageHeading from '@/components/page-heading';
import Link from 'next/link';
import { ArrowUpRight, Clock, PenLine } from 'lucide-react';
import { blogData } from '@/lib/blog';
import { useI18n } from '@/components/providers/i18n-provider';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const { t } = useI18n();
  const posts = [...blogData].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="portfolio-home">
      <Header />
      <main className="portfolio-subpage blog-page">
        <div className="container">
          <PageHeading
            title={t.blog.title}
            description={t.blog.description}
          />
          <div className="blog-list">
            {posts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <div className="blog-card-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="blog-card-category">{post.category}</span>
                </div>
                <h2>
                  <Link href={`/blog/${post.slug}`} data-cursor-interactive>
                    {post.title}
                  </Link>
                </h2>
                <p className="blog-card-description">{post.description}</p>
                <div className="blog-card-bottom">
                  <span className="blog-card-reading">
                    <Clock size={13} />
                    {post.readingMinutes} Min. Lesezeit
                  </span>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link" data-cursor-interactive>
                    {t.blog.readMore} <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="blog-empty" role="note">
            <PenLine size={18} />
            <p>
              Weitere Artikel folgen. Schau bald wieder vorbei oder{' '}
              <Link href="/links" data-cursor-interactive>kontaktiere mich</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}