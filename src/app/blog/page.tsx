'use client';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageHeading from '@/components/page-heading';
import Link from 'next/link';
import { ArrowUpRight, Clock, PenLine, Folder, Sparkles } from 'lucide-react';
import { blogData } from '@/lib/blog';
import { projectData } from '@/lib/projects';
import { useI18n } from '@/components/providers/i18n-provider';
import { motion } from 'framer-motion';

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : 'de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const cardVariant = {
  hidden: { opacity: 0, x: -30, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const tagVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 0.3 + i * 0.05,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

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
          <motion.div
            className="blog-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {posts.map((post, i) => {
              const relatedProject = post.projectSlug
                ? projectData.find(p => p.slug === post.projectSlug)
                : null;

              return (
                <motion.article
                  className="blog-card"
                  key={post.slug}
                  custom={i}
                  variants={cardVariant}
                >
                  <div className="blog-card-inner">
                    <div className="blog-card-header">
                      <div className="blog-card-meta">
                        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                        <span className="blog-card-category">{post.category}</span>
                        {i === 0 && (
                          <motion.span
                            className="blog-card-badge"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                          >
                            <Sparkles size={12} /> Neuester Beitrag
                          </motion.span>
                        )}
                      </div>
                      <div className="blog-card-reading">
                        <Clock size={13} />
                        {post.readingMinutes} {t.blog.minRead}
                      </div>
                    </div>

                    <h2>
                      <Link href={`/blog/${post.slug}`} data-cursor-interactive>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="blog-card-description">{post.description}</p>

                    <div className="blog-card-tags">
                      {post.tags.map((tag, j) => (
                        <motion.span
                          key={tag}
                          className="blog-card-tag"
                          custom={j}
                          variants={tagVariant}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {relatedProject && (
                      <Link
                        href={`/projects/${relatedProject.slug}`}
                        className="blog-card-project-link"
                        data-cursor-interactive
                        prefetch
                      >
                        <Folder size={14} />
                        <div>
                          <span className="blog-card-project-label">{t.crossLink.relatedProject}</span>
                          <span className="blog-card-project-name">{relatedProject.title}</span>
                        </div>
                        <ArrowUpRight size={16} className="blog-card-project-arrow" />
                      </Link>
                    )}

                    <div className="blog-card-bottom">
                      <Link href={`/blog/${post.slug}`} className="blog-card-link" data-cursor-interactive>
                        {t.blog.readMore} <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
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
