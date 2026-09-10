'use client';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Folder, Newspaper, BookOpen } from 'lucide-react';
import { blogData } from '@/lib/blog';
import { projectData } from '@/lib/projects';
import { articlesData } from '@/lib/articles';
import { useI18n } from '@/components/providers/i18n-provider';
import { motion } from 'framer-motion';

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : 'de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const linkCardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function BlogPostClient({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const post = blogData.find((p) => p.slug === slug);
  if (!post) {
    return (
      <main className="portfolio-subpage">
        <div className="container">
          <h1>{t.blog.notFound}</h1>
          <Link href="/blog" className="text-link">
            {t.blog.backToBlog} <span>↗</span>
          </Link>
        </div>
      </main>
    );
  }

  const relatedPosts = blogData
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  const relatedProject = post.projectSlug
    ? projectData.find(p => p.slug === post.projectSlug)
    : null;

  const relatedArticles = relatedProject?.relatedArticleUrls
    ? articlesData.filter(a => relatedProject.relatedArticleUrls!.includes(a.url))
    : [];

  return (
    <div className="portfolio-home">
      <Header />
      <main className="portfolio-subpage blog-post-page">
        <div className="container blog-post-container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/blog" className="blog-back" data-cursor-interactive>
              <ArrowLeft size={16} /> {t.blog.backToBlog}
            </Link>
          </motion.div>

          <motion.header
            className="blog-post-heading"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p className="eyebrow" variants={fadeUp}>{t.blog.breadcrumb}</motion.p>
            <motion.h1 variants={fadeUp}>{post.title}</motion.h1>
            <motion.div className="blog-post-meta" variants={fadeUp}>
              <span>
                <Calendar size={14} /> <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              </span>
              <span>
                <Clock size={14} /> {post.readingMinutes} {t.blog.minRead}
              </span>
              <span className="blog-post-category">{post.category}</span>
            </motion.div>
          </motion.header>

          <motion.div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <motion.footer
            className="blog-post-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post-tag">
                {tag}
              </span>
            ))}
          </motion.footer>

          {(relatedProject || relatedArticles.length > 0) && (
            <motion.section
              className="blog-cross-links"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={stagger}
            >
              <h2 className="blog-cross-links-heading">Verknüpfte Inhalte</h2>
              <div className="blog-cross-links-grid">
                {relatedProject && (
                  <motion.div variants={linkCardVariant}>
                    <Link href={`/projects/${relatedProject.slug}`} className="blog-cross-link-card" data-cursor-interactive prefetch>
                      <div className="blog-cross-link-icon">
                        <Folder size={18} />
                      </div>
                      <div className="blog-cross-link-content">
                        <span className="blog-cross-link-label">{t.crossLink.relatedProject}</span>
                        <h3>{relatedProject.title}</h3>
                        <p>{relatedProject.description}</p>
                      </div>
                      <ArrowUpRight size={18} className="blog-cross-link-arrow" />
                    </Link>
                  </motion.div>
                )}

                {relatedArticles.length > 0 && (
                  <motion.div variants={linkCardVariant}>
                    <div className="blog-cross-link-card blog-cross-link-press">
                      <div className="blog-cross-link-icon">
                        <Newspaper size={18} />
                      </div>
                      <div className="blog-cross-link-content">
                        <span className="blog-cross-link-label">{t.crossLink.relatedPress}</span>
                        <div className="blog-cross-link-articles">
                          {relatedArticles.slice(0, 3).map(article => (
                            <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer" className="blog-cross-link-article" data-cursor-interactive>
                              <h4>{article.title}</h4>
                              <p>{article.source}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

          {relatedPosts.length > 0 && (
            <motion.section
              className="blog-related"
              aria-labelledby="related-posts"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={stagger}
            >
              <motion.h2 id="related-posts" variants={fadeUp}>{t.blog.relatedPosts}.</motion.h2>
              <div className="blog-related-grid">
                {relatedPosts.map((p) => (
                  <motion.div key={p.slug} variants={linkCardVariant}>
                    <Link href={`/blog/${p.slug}`} className="blog-related-card" data-cursor-interactive>
                      <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
                      <h3>{p.title}</h3>
                      <span>
                        {t.blog.readMore} <ArrowUpRight size={15} />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
