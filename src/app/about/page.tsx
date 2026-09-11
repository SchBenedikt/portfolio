"use client";
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageHeading from '@/components/page-heading';
import { useI18n } from '@/components/providers/i18n-provider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Code, Lightbulb, Layers, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const pillars = [
  { key: 'development', icon: Code },
  { key: 'research', icon: Lightbulb },
  { key: 'design', icon: Layers },
  { key: 'ai', icon: Zap },
];

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="portfolio-home">
      <Header />
      <main id="main-content" className="portfolio-subpage">
        <div className="container">
          <PageHeading
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            description={t.about.description}
          />

          <section className="about-content" aria-labelledby="about-intro">
            <motion.div
              className="about-intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <h2 id="about-intro" className="about-statement">
                {t.about.statement}
              </h2>
            </motion.div>

            <motion.div
              className="about-text-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              <motion.p variants={fadeUp}>{t.about.paragraph1}</motion.p>
              <motion.p variants={fadeUp}>{t.about.paragraph2}</motion.p>
              <motion.p variants={fadeUp}>{t.about.paragraph3}</motion.p>
            </motion.div>

            <motion.section
              className="about-pillars"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              aria-labelledby="pillars-heading"
            >
              <motion.div variants={fadeUp}>
                <p className="eyebrow" id="pillars-heading">{t.about.pillarsEyebrow}</p>
              </motion.div>
              <div className="about-pillars-grid">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div key={pillar.key} className="about-pillar" variants={fadeUp}>
                      <div className="about-pillar-icon">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <h3>{t.about.pillars[pillar.key].title}</h3>
                      <p>{t.about.pillars[pillar.key].description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            <motion.div
              className="about-cta-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <p className="eyebrow">{t.about.ctaEyebrow}</p>
              </motion.div>
              <motion.div className="about-cta-grid" variants={stagger}>
                <Link href="/projects" className="about-cta-card">
                  <span className="about-cta-label">{t.about.ctaProjects}</span>
                  <ArrowUpRight size={18} />
                </Link>
                <Link href="/resume" className="about-cta-card">
                  <span className="about-cta-label">{t.about.ctaResume}</span>
                  <ArrowUpRight size={18} />
                </Link>
                <Link href="/blog" className="about-cta-card">
                  <span className="about-cta-label">{t.about.ctaBlog}</span>
                  <ArrowUpRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
