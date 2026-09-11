"use client";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useEffect, useRef } from 'react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useI18n } from '@/components/providers/i18n-provider';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/project-card';
import { projectData } from '@/lib/projects';
import { Trophy, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

const heroNameWords = ["Benedikt", "Schächner."];

const wordReveal = {
  hidden: { opacity: 0, y: 40, rotateX: 45 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const skillBadge = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.8 + i * 0.1,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

const photoSlide = {
  hidden: { opacity: 0, x: 80, rotate: 8, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 2,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const awardCardLeft = {
  hidden: { opacity: 0, x: -60, rotate: -2 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const awardCardRight = {
  hidden: { opacity: 0, x: 60, rotate: 2 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const projectCardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const landingCardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Home() {
  const { unlockAchievement } = useAchievements();
  const { t } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), { stiffness: 100, damping: 20 });
  const photoRotate = useTransform(scrollYProgress, [0, 1], [2, 6]);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), { stiffness: 100, damping: 20 });

  useEffect(() => { unlockAchievement('FIRST_STEP'); }, [unlockAchievement]);

  return (
    <div className="portfolio-home">
      <Header />
      <main id="main-content">
        <section className="portfolio-hero" aria-labelledby="hero-title" ref={heroRef}>
          <div className="hero-layout">
            <motion.div
              className="hero-copy-block"
              initial="hidden"
              animate="visible"
              style={{ y: textY }}
            >
              <motion.p className="eyebrow" variants={fadeUp}>
                {t.hero.eyebrow}
              </motion.p>
              <h1 id="hero-title" className="hero-title-split">
                {heroNameWords.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={wordReveal}
                    className="hero-word"
                  >
                    {word === "Schächner." ? (
                      <>Schächner<span>.</span></>
                    ) : (
                      word
                    )}
                    {i === 0 && " "}
                  </motion.span>
                ))}
              </h1>
              <motion.p className="hero-description" variants={fadeUp} custom={0.6}>
                {t.hero.description}
              </motion.p>
              <motion.div className="hero-skills" variants={stagger} initial="hidden" animate="visible">
                {[t.hero.skills.web, t.hero.skills.crossmedia, t.hero.skills.ai].map((skill, i) => (
                  <motion.span key={skill} custom={i} variants={skillBadge}>
                    <Sparkles size={12} className="skill-icon" />
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="hero-photo"
              data-cursor-interactive
              variants={photoSlide}
              initial="hidden"
              animate="visible"
              style={{ y: photoY, rotate: photoRotate }}
            >
              <div className="hero-photo-frame">
                <div className="hero-photo-grain" aria-hidden="true" />
                <Image
                  src="https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/crossmedia-3.jpeg"
                  alt="Benedikt Schächner bei der Crossmedia-Preisverleihung im Bayerischen Rundfunk"
                  width={600}
                  height={800}
                  priority
                />
              </div>
              <motion.div
                className="hero-photo-badge"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                transition={{ delay: 1.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Trophy size={13} strokeWidth={1.5} /> {t.hero.badge}
              </motion.div>
              <motion.span
                className="hero-photo-arrow"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                ↗
              </motion.span>
              <span className="hero-photo-caption" aria-hidden="true">{t.hero.caption}</span>
            </motion.div>
          </div>
          <motion.div
            className="hero-bottom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <a href="#inhalt">
              {t.hero.cta} <span>↓</span>
            </a>
          </motion.div>
        </section>

        <div className="portfolio-content" id="inhalt">
          <motion.section
            className="home-selected"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            aria-labelledby="awards-heading"
          >
            <motion.div variants={fadeUp}>
              <div className="recognition-heading">
                <div className="section-heading-icon"><Trophy size={20} strokeWidth={1.5} /></div>
                <h2 id="awards-heading">{t.sections.awards.title}</h2>
              </div>
            </motion.div>
            <div className="home-awards-grid">
              {latestAwards.map((award, i) => (
                <motion.div key={award.date} variants={i === 0 ? awardCardLeft : awardCardRight}>
                  <Link href={`/projects/${award.projectSlug}`} className="home-award-card">
                    <div className="home-award-top">
                      <span className="home-award-date">{award.date}</span>
                      <ArrowUpRight size={16} />
                    </div>
                    <h3>{award.title}</h3>
                    <p>{award.subtitle}</p>
                    <span className="home-award-org">{award.organization}</span>
                    <span className="home-award-project">{award.project}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUp}>
              <Link className="home-all-work" href="/awards">
                {t.sections.awards.viewAll} <span>↗</span>
              </Link>
            </motion.div>
          </motion.section>

          <motion.section
            className="home-selected"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            aria-labelledby="projects-heading"
          >
            <motion.div variants={fadeUp}>
              <div className="recognition-heading">
                <div className="section-heading-icon"><Trophy size={20} strokeWidth={1.5} /></div>
                <h2 id="projects-heading">{t.sections.projects.title}</h2>
              </div>
            </motion.div>
            <div className="work-collection">
              {["notio", "meum-diarium"].map((slug, i) => {
                const project = projectData.find(p => p.slug === slug);
                  return project ? (
                  <motion.div key={slug} custom={i} variants={projectCardVariant}>
                    <ProjectCard project={project} headingLevel="h3" />
                  </motion.div>
                ) : null;
              })}
            </div>
            <motion.div variants={fadeUp}>
              <Link className="home-all-work" href="/projects">
                {t.sections.projects.viewAll} <span>↗</span>
              </Link>
            </motion.div>
          </motion.section>

          <motion.section
            className="portfolio-section"
            style={{ paddingTop: '100px', paddingBottom: '100px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            aria-labelledby="pages-heading"
          >
            <motion.div className="landing-section-header" variants={fadeUp}>
              <p className="eyebrow">{t.sections.pages.eyebrow}</p>
              <h2 id="pages-heading">{t.sections.pages.title}</h2>
            </motion.div>
            <motion.div className="landing-grid" variants={stagger}>
              {pagesData.map((page, i) => (
                <motion.div key={page.href} custom={i} variants={landingCardVariant}>
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
      </main>
      <Footer />
    </div>
  );
}
