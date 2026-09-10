'use client';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageHeading from '@/components/page-heading';
import Link from 'next/link';
import { ArrowUpRight, Award, Trophy, Medal, FileCheck, Newspaper } from 'lucide-react';
import { certificates } from '@/lib/resume-data';
import { resumeOrgToSlug } from '@/lib/organizations';
import { articlesData } from '@/lib/articles';
import { useI18n } from '@/components/providers/i18n-provider';
import { motion } from 'framer-motion';

const awards = [
  {
    date: "20. Nov. 2025",
    title: "Crossmedia-Preis",
    subtitle: "Sparte Interactive",
    organization: "Bayerischer Rundfunk",
    project: "Notio",
    projectSlug: "notio",
    highlight: true,
    relatedArticleUrls: [
      'https://www.br.de/medienkompetenzprojekte/inhalt/crossmedia/notio-einfach-besser-lernen-interactive-crossmedia-2025-gewinnerbeitrag-100.html',
      'https://www.koenig-karlmann-gymnasium.de/news/erneuter-erfolg-bei-crossmedia/',
      'https://www.km.bayern.de/meldung/30-jahre-crossmedia-nachwuchstalente-fuer-innovative-digitalprojekte-ausgezeichnet',
    ],
  },
  {
    date: "22. Nov. 2024",
    title: "Hauptpreis",
    subtitle: "Deutscher Multimediapreis mb21",
    organization: "Deutscher Multimediapreis mb21",
    project: "Meum Diarium",
    projectSlug: "meum-diarium",
    highlight: true,
    relatedArticleUrls: [
      'https://www.mb21.de/wettbewerbsjahr_2024.html?articles=meum-diarium',
      'https://www.br.de/medienkompetenzprojekte/inhalt/crossmedia/tagebuch-caesars-heute-feldherr-als-influencer-textbased-crossmedia-2024-gewinnerbeitrag-100.html',
      'https://www.koenig-karlmann-gymnasium.de/news/mit-caesars-tagebuch-den-1-preis-geholt/',
    ],
  },
  {
    date: "21. Nov. 2024",
    title: "1. Platz",
    subtitle: "Crossmedia-Wettbewerb",
    organization: "Bayerischer Rundfunk",
    project: "Meum Diarium",
    projectSlug: "meum-diarium",
  },
  {
    date: "Juli 2026",
    title: "3. Platz",
    subtitle: "Schach-Jugendopen U18",
    organization: "Schachklub Töging e. V.",
    project: "Altersklasse U18",
  },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function AwardsPage() {
  const { t } = useI18n();

  const highlightAwards = awards.filter(a => a.highlight);
  const otherAwards = awards.filter(a => !a.highlight);

  return (
    <div className="portfolio-home">
      <Header />
      <main className="portfolio-subpage recognition-page">
        <div className="container">
          <PageHeading title={t.awards.title} description={t.awards.description} />

          <motion.section
            aria-labelledby="selected-awards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <div className="recognition-heading">
                <div className="section-heading-icon"><Trophy size={20} strokeWidth={1.5} /></div>
                <h2 id="selected-awards">{t.awards.highlights}</h2>
              </div>
            </motion.div>

            <div className="recognition-grid">
              {highlightAwards.map((award, i) => {
                const relatedArticles = award.relatedArticleUrls
                  ? articlesData.filter(a => award.relatedArticleUrls!.includes(a.url))
                  : [];

                return (
                  <motion.article
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className={`recognition-card recognition-${i}`}
                    key={award.date}
                  >
                    <div className="recognition-top">
                      <span>{award.date}</span>
                      <Award size={22} strokeWidth={1} />
                    </div>
                    <div className="recognition-mark" aria-hidden="true">
                      {i === 0 ? (
                        <span>cross<br /><em>media</em></span>
                      ) : (
                        <span>mb<span className="mark-number">21</span></span>
                      )}
                    </div>
                    <div className="recognition-copy">
                      <p>{award.organization}</p>
                      <h3>{award.title}</h3>
                      <span>{award.subtitle}</span>
                    </div>
                    <Link href={`/projects/${award.projectSlug}`} className="recognition-link">
                      <span>{t.awards.awardedProject}<strong>{award.project}</strong></span>
                      <ArrowUpRight size={23} />
                    </Link>

                    {relatedArticles.length > 0 && (
                      <div className="recognition-press-section">
                        <div className="recognition-press-header">
                          <Newspaper size={14} />
                          <span>{t.crossLink.relatedPress}</span>
                        </div>
                        <div className="recognition-press-list">
                          {relatedArticles.slice(0, 3).map(article => (
                            <a
                              key={article.url}
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="recognition-press-item"
                              data-cursor-interactive
                            >
                              <span className="recognition-press-title">{article.title}</span>
                              <span className="recognition-press-source">{article.source}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="recognition-section"
            aria-labelledby="more-awards"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="recognition-heading">
              <div className="section-heading-icon"><Medal size={20} strokeWidth={1.5} /></div>
              <h2 id="more-awards">{t.awards.moreAwards}</h2>
            </div>
            <div className="recognition-list">
              {otherAwards.map(a => (
                <article key={a.date} className="recognition-list-item">
                  <div className="recognition-list-content">
                    <h3>{a.title} · {a.subtitle}</h3>
                    <p>{a.organization}</p>
                    <time>{a.date}</time>
                  </div>
                  {a.projectSlug ? (
                    <Link href={`/projects/${a.projectSlug}`} className="recognition-list-link">
                      {a.project}<ArrowUpRight size={16} />
                    </Link>
                  ) : (
                    <span className="recognition-list-project">{a.project}</span>
                  )}
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="recognition-section"
            aria-labelledby="upcoming-award"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="recognition-heading">
              <div className="section-heading-icon"><Award size={20} strokeWidth={1.5} /></div>
              <h2 id="upcoming-award">{t.awards.upcoming}</h2>
            </div>
            <div className="recognition-upcoming">
              <div className="recognition-upcoming-top">
                <time>20.09.2026</time>
                <span className="recognition-upcoming-badge">{t.awards.secret}</span>
              </div>
              <h3>{t.awards.upcomingAward}</h3>
              <p>{t.awards.upcomingText}</p>
            </div>
          </motion.section>

          <motion.section
            className="recognition-section"
            aria-labelledby="certificates"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="recognition-heading">
              <div className="section-heading-icon"><FileCheck size={20} strokeWidth={1.5} /></div>
              <h2 id="certificates">{t.awards.qualifications}</h2>
            </div>
            <div className="certificate-list">
              {certificates.map(cert => (
                <details key={`${cert.date}-${cert.title}`}>
                  <summary>
                    <span>
                      <strong>{cert.title}</strong>
                      <small>{cert.organization}</small>
                    </span>
                    <span className="certificate-date">{cert.date}</span>
                    <span className="certificate-expand" aria-hidden="true">+</span>
                  </summary>
                  <div className="certificate-detail">
                    {cert.description && <p>{cert.description}</p>}
                    <div className="certificate-skills">
                      {cert.skills.map(skill => <span key={skill}>{skill}</span>)}
                    </div>
                    {resumeOrgToSlug[cert.organization] && (
                      <Link href={`/organization/${resumeOrgToSlug[cert.organization]}`}>
                        {t.awards.toOrganization} <ArrowUpRight size={14} />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </motion.section>

          <div className="recognition-end">
            <p>{t.awards.moreStations}</p>
            <Link href="/resume">{t.awards.toResume} <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
