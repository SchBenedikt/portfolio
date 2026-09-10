"use client";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useEffect } from 'react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useI18n } from '@/components/providers/i18n-provider';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/project-card';
import { projectData } from '@/lib/projects';
import { Trophy, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const pagesData = [
  { key: 'resume' as const, href: '/resume', eyebrow: '01' },
  { key: 'projects' as const, href: '/projects', eyebrow: '02' },
  { key: 'blog' as const, href: '/blog', eyebrow: '03' },
  { key: 'awards' as const, href: '/awards', eyebrow: '04' },
  { key: 'gallery' as const, href: '/gallery', eyebrow: '05' },
  { key: 'press' as const, href: '/press', eyebrow: '06' },
  { key: 'links' as const, href: '/links', eyebrow: '07' },
];

const latestAwards = [
  {
    date: "20. Nov. 2025",
    title: "Crossmedia-Preis",
    subtitle: "Sparte Interactive",
    organization: "Bayerischer Rundfunk",
    project: "Notio",
    projectSlug: "notio",
  },
  {
    date: "22. Nov. 2024",
    title: "Hauptpreis",
    subtitle: "Deutscher Multimediapreis mb21",
    organization: "Deutscher Multimediapreis mb21",
    project: "Meum Diarium",
    projectSlug: "meum-diarium",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const { unlockAchievement } = useAchievements();
  const { t } = useI18n();
  useEffect(() => { unlockAchievement('FIRST_STEP'); }, [unlockAchievement]);
  return <div className="portfolio-home"><Header/><main id="main-content">
    <section className="portfolio-hero" aria-labelledby="hero-title">
      <div className="hero-layout">
        <motion.div className="hero-copy-block" variants={stagger} initial="hidden" animate="visible">
          <motion.p className="eyebrow" variants={fadeUp}>{t.hero.eyebrow}</motion.p>
          <motion.h1 id="hero-title" variants={fadeUp}>{t.hero.name}<span>.</span></motion.h1>
          <motion.p className="hero-description" variants={fadeUp}>{t.hero.description}</motion.p>
          <motion.div className="hero-skills" variants={fadeUp}><span>{t.hero.skills.web}</span><span>{t.hero.skills.crossmedia}</span><span>{t.hero.skills.ai}</span></motion.div>
        </motion.div>
        <motion.div className="hero-photo" data-cursor-interactive initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <div className="hero-photo-frame"><div className="hero-photo-grain" aria-hidden="true"/><Image src="https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/crossmedia-3.jpeg" alt="Benedikt Schächner bei der Crossmedia-Preisverleihung im Bayerischen Rundfunk" width={600} height={800} priority/></div>
        <div className="hero-photo-badge" aria-hidden="true"><Trophy size={13} strokeWidth={1.5}/> {t.hero.badge}</div>
        <span className="hero-photo-arrow" aria-hidden="true">↗</span>
        <span className="hero-photo-caption" aria-hidden="true">{t.hero.caption}</span>
      </motion.div></div>
      <div className="hero-bottom"><a href="#inhalt">{t.hero.cta} <span>↓</span></a></div>
    </section>
    <div className="portfolio-content" id="inhalt">
    <motion.section className="home-selected" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}><div className="recognition-heading"><div className="section-heading-icon"><Trophy size={20} strokeWidth={1.5}/></div><h2>{t.sections.awards.title}</h2></div><div className="home-awards-grid">{latestAwards.map((award) => <Link key={award.date} href={`/projects/${award.projectSlug}`} className="home-award-card"><div className="home-award-top"><span className="home-award-date">{award.date}</span><ArrowUpRight size={16}/></div><h3>{award.title}</h3><p>{award.subtitle}</p><span className="home-award-org">{award.organization}</span><span className="home-award-project">{award.project}</span></Link>)}</div><Link className="home-all-work" href="/awards">{t.sections.awards.viewAll} <span>↗</span></Link></motion.section>
    <motion.section className="home-selected" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}><div className="recognition-heading"><div className="section-heading-icon"><Trophy size={20} strokeWidth={1.5}/></div><h2>{t.sections.projects.title}</h2></div><div className="work-collection">{["notio", "meum-diarium"].map(slug => { const project = projectData.find(p => p.slug === slug); return project ? <ProjectCard key={slug} project={project}/> : null; })}</div><Link className="home-all-work" href="/projects">{t.sections.projects.viewAll} <span>↗</span></Link></motion.section>
    <motion.section className="portfolio-section" style={{paddingTop: '100px', paddingBottom: '100px'}} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}>
      <div className="landing-section-header"><p className="eyebrow">{t.sections.pages.eyebrow}</p><h2>{t.sections.pages.title}</h2></div>
      <motion.div className="landing-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
        {pagesData.map((page) => (
          <motion.div key={page.href} variants={fadeUp}>
            <Link href={page.href} className="landing-card">
              <span className="landing-card-number">{page.eyebrow}</span>
              <div className="landing-card-content">
                <span className="landing-card-name">{t.pages[page.key].name}</span>
                <span className="landing-card-desc">{t.pages[page.key].desc}</span>
              </div>
              <span className="landing-card-arrow">↗</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
    </div>
  </main><Footer/></div>;
}
