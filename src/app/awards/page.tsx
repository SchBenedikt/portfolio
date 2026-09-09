import Header from '@/components/header';
import Footer from '@/components/footer';
import PageHeading from '@/components/page-heading';
import Link from 'next/link';
import { ArrowUpRight, Award, Trophy, Medal, FileCheck } from 'lucide-react';
import { certificates } from '@/lib/resume-data';
import { resumeOrgToSlug } from '@/lib/organizations';

const awards = [
  {
    date: "20. Nov. 2025",
    title: "Crossmedia-Preis",
    subtitle: "Sparte Interactive",
    organization: "Bayerischer Rundfunk",
    project: "Notio",
    projectSlug: "notio",
    highlight: true,
  },
  {
    date: "22. Nov. 2024",
    title: "Hauptpreis",
    subtitle: "Deutscher Multimediapreis mb21",
    organization: "Deutscher Multimediapreis mb21",
    project: "Meum Diarium",
    projectSlug: "meum-diarium",
    highlight: true,
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

export default function AwardsPage() {
  return <div className="portfolio-home"><Header/><main className="portfolio-subpage recognition-page"><div className="container">
    <PageHeading title="Auszeichnungen & Zertifikate." description="Anerkennung für kreative Arbeit und persönliches Engagement."/>
    <section aria-labelledby="selected-awards"><div className="recognition-heading"><div className="section-heading-icon"><Trophy size={20} strokeWidth={1.5}/></div><h2 id="selected-awards">Höhepunkte.</h2></div>
    <div className="recognition-grid">{awards.filter(a => a.highlight).map((award,i) => <article className={`recognition-card recognition-${i}`} key={award.date}><div className="recognition-top"><span>{award.date}</span><Award size={22} strokeWidth={1}/></div><div className="recognition-mark" aria-hidden="true">{i===0 ? <span>cross<br/><em>media</em></span> : <span>mb<span className="mark-number">21</span></span>}</div><div className="recognition-copy"><p>{award.organization}</p><h3>{award.title}</h3><span>{award.subtitle}</span></div><Link href={`/projects/${award.projectSlug}`} className="recognition-link"><span>Ausgezeichnetes Projekt<strong>{award.project}</strong></span><ArrowUpRight size={23}/></Link></article>)}</div></section>
    <section className="recognition-section" aria-labelledby="more-awards"><div className="recognition-heading"><div className="section-heading-icon"><Medal size={20} strokeWidth={1.5}/></div><h2 id="more-awards">Weitere Auszeichnungen.</h2></div><div className="recognition-list">{awards.filter(a => !a.highlight).map(a => <article key={a.date} className="recognition-list-item"><div className="recognition-list-content"><h3>{a.title} · {a.subtitle}</h3><p>{a.organization}</p><time>{a.date}</time></div>{a.projectSlug ? <Link href={`/projects/${a.projectSlug}`} className="recognition-list-link">{a.project}<ArrowUpRight size={16}/></Link> : <span className="recognition-list-project">{a.project}</span>}</article>)}</div></section>
    <section className="recognition-section" aria-labelledby="upcoming-award"><div className="recognition-heading"><div className="section-heading-icon"><Award size={20} strokeWidth={1.5}/></div><h2 id="upcoming-award">Bald.</h2></div><div className="recognition-upcoming"><div className="recognition-upcoming-top"><time>20.09.2026</time><span className="recognition-upcoming-badge">🤫 Noch geheim</span></div><h3>Eine Auszeichnung steht bevor.</h3><p>Am 20. September 2026 gibt es eine neue Auszeichnung. Mehr dazu an diesem Tag – bis dahin bleibt es eine Überraschung.</p></div></section>
    <section className="recognition-section" aria-labelledby="certificates"><div className="recognition-heading"><div className="section-heading-icon"><FileCheck size={20} strokeWidth={1.5}/></div><h2 id="certificates">Qualifikationen.</h2></div><div className="certificate-list">{certificates.map(cert => <details key={`${cert.date}-${cert.title}`}><summary><span><strong>{cert.title}</strong><small>{cert.organization}</small></span><span className="certificate-date">{cert.date}</span><span className="certificate-expand" aria-hidden="true">+</span></summary><div className="certificate-detail">{cert.description && <p>{cert.description}</p>}<div className="certificate-skills">{cert.skills.map(skill => <span key={skill}>{skill}</span>)}</div>{resumeOrgToSlug[cert.organization] && <Link href={`/organization/${resumeOrgToSlug[cert.organization]}`}>Zur Organisation <ArrowUpRight size={14}/></Link>}</div></details>)}</div></section>
    <div className="recognition-end"><p>Weitere Stationen im Lebenslauf.</p><Link href="/resume">Zum Lebenslauf <ArrowUpRight size={17}/></Link></div>
  </div></main><Footer/></div>;
}
