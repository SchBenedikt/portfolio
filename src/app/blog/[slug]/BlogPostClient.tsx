'use client';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { blogData } from '@/lib/blog';
import { useI18n } from '@/components/providers/i18n-provider';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const { t } = useI18n();
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

  const relatedPosts = blogData
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  return (
    <div className="portfolio-home">
      <Header />
      <main className="portfolio-subpage blog-post-page">
        <div className="container blog-post-container">
          <Link href="/blog" className="blog-back" data-cursor-interactive>
            <ArrowLeft size={16} /> {t.blog.backToBlog}
          </Link>
          <header className="blog-post-heading">
            <p className="eyebrow">Benedikt Schächner / Blog</p>
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <span>
                <Calendar size={14} /> <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span>
                <Clock size={14} /> {post.readingMinutes} {t.blog.minRead}
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
              <h2 id="related-posts">{t.blog.relatedPosts}.</h2>
              <div className="blog-related-grid">
                {relatedPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-related-card" data-cursor-interactive>
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <h3>{p.title}</h3>
                    <span>
                      {t.blog.readMore} <ArrowUpRight size={15} />
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
