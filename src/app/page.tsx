"use client";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useEffect } from 'react';
import { useAchievements } from '@/components/providers/achievements-provider';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/project-card';
import { projectData } from '@/lib/projects';
import { Trophy, ArrowUpRight } from 'lucide-react';

const pages = [
  { name: 'Lebenslauf', href: '/resume', eyebrow: '01', desc: 'Stationen & Erfahrungen' },
  { name: 'Projekte', href: '/projects', eyebrow: '02', desc: 'Ausgewählte Arbeiten' },
  { name: 'Blog', href: '/blog', eyebrow: '03', desc: 'Artikel & Gedanken' },
  { name: 'Auszeichnungen', href: '/awards', eyebrow: '04', desc: 'Preise & Zertifikate' },
  { name: 'Galerie', href: '/gallery', eyebrow: '05', desc: 'Bilder & Eindrücke' },
  { name: 'Presse', href: '/press', eyebrow: '06', desc: 'Medienberichte' },
  { name: 'Links & Kontakt', href: '/links', eyebrow: '07', desc: 'Profile & Erreichbarkeit' },
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

export default function Home() {
  const { unlockAchievement } = useAchievements();
  useEffect(() => { unlockAchievement('FIRST_STEP'); }, [unlockAchievement]);
  return <div className="portfolio-home"><Header/><main id="main-content">
    <section className="portfolio-hero" aria-labelledby="hero-title">
      <div className="hero-layout"><div className="hero-copy-block"><p className="eyebrow">Mein persönliches Portfolio</p><h1 id="hero-title">Benedikt Schächner<span>.</span></h1><p className="hero-description">Ich entwickle Webanwendungen, gestalte digitale Projekte und interessiere mich für Crossmedia und künstliche Intelligenz. Einiges davon ist hier zu sehen.</p><div className="hero-skills"><span>Webentwicklung</span><span>Crossmedia</span><span>Künstliche Intelligenz</span></div></div><div className="hero-photo" data-cursor-interactive>
        <div className="hero-photo-frame"><div className="hero-photo-grain" aria-hidden="true"/><Image src="https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/crossmedia-3.jpeg" alt="Benedikt Schächner bei der Crossmedia-Preisverleihung im Bayerischen Rundfunk" width={600} height={800} priority/></div>
        <div className="hero-photo-badge" aria-hidden="true"><Trophy size={13} strokeWidth={1.5}/> Crossmedia 2025</div>
        <span className="hero-photo-arrow" aria-hidden="true">↗</span>
        <span className="hero-photo-caption" aria-hidden="true">BR München · Nov. 2025</span>
      </div></div>
      <div className="hero-bottom"><a href="#inhalt">Zur Übersicht <span>↓</span></a></div>
    </section>
    <div className="portfolio-content" id="inhalt">
    <section className="home-selected"><div className="recognition-heading"><div className="section-heading-icon"><Trophy size={20} strokeWidth={1.5}/></div><h2>Auszeichnungen.</h2></div><div className="home-awards-grid">{latestAwards.map((award) => <Link key={award.date} href={`/projects/${award.projectSlug}`} className="home-award-card"><div className="home-award-top"><span className="home-award-date">{award.date}</span><ArrowUpRight size={16}/></div><h3>{award.title}</h3><p>{award.subtitle}</p><span className="home-award-org">{award.organization}</span><span className="home-award-project">{award.project}</span></Link>)}</div><Link className="home-all-work" href="/awards">Alle Auszeichnungen <span>↗</span></Link></section>
    <section className="home-selected"><div className="recognition-heading"><div className="section-heading-icon"><Trophy size={20} strokeWidth={1.5}/></div><h2>Ausgewählte Arbeiten.</h2></div><div className="work-collection">{["notio", "meum-diarium"].map(slug => { const project = projectData.find(p => p.slug === slug); return project ? <ProjectCard key={slug} project={project}/> : null; })}</div><Link className="home-all-work" href="/projects">Alle Projekte ansehen <span>↗</span></Link></section>
    <section className="portfolio-section" style={{paddingTop: '100px', paddingBottom: '100px'}}>
      <div className="landing-section-header"><p className="eyebrow">SEITEN</p><h2>Alle Bereiche.</h2></div>
      <div className="landing-grid">
        {pages.map((page) => (
          <Link key={page.href} href={page.href} className="landing-card">
            <span className="landing-card-number">{page.eyebrow}</span>
            <div className="landing-card-content">
              <span className="landing-card-name">{page.name}</span>
              <span className="landing-card-desc">{page.desc}</span>
            </div>
            <span className="landing-card-arrow">↗</span>
          </Link>
        ))}
      </div>
    </section>
    </div>
  </main><Footer/></div>;
}
