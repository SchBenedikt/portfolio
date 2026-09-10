'use client';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageHeading from '@/components/page-heading';
import Link from 'next/link';
import { ArrowUpRight, Clock, PenLine } from 'lucide-react';
import { blogData } from '@/lib/blog';
import { useI18n } from '@/components/providers/i18n-provider';
import { motion } from 'framer-motion';

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : 'de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const { t, locale } = useI18n();
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
          <motion.div className="blog-list" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            {posts.map((post) => (
              <motion.article className="blog-card" key={post.slug} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
                <div className="blog-card-meta">
                  <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
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
                    {post.readingMinutes} {t.blog.minRead}
                  </span>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link" data-cursor-interactive>
                    {t.blog.readMore} <ArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
          <div className="blog-empty" role="note">
            <PenLine size={18} />
            <p>
              {t.blog.comingSoon}{' '}
              <Link href="/links" data-cursor-interactive>{t.blog.contactMe}</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}