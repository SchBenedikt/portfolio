"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageHeading from '@/components/page-heading';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useI18n } from '@/components/providers/i18n-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { timelineEvents, certificates } from '@/lib/resume-data';
import { resumeOrgToSlug } from '@/lib/organizations';
import { Briefcase, GraduationCap, Code2, Globe, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const skills = [
  'IT-Management', 'Serververwaltung', 'Netzwerktechnik', 'Next.js', 'React', 'Docker', 'Linux', 'Nextcloud', 'WordPress', 'UI Motion', 'Ollama', 'GitOps', 'Digitale Bildung', 'Mediation', 'Jura/Strafrecht'
];

const languages = [
    { name: "Deutsch", levelKey: "native" as const },
    { name: "Englisch", levelKey: "b1certified" as const },
    { name: "Latein", levelKey: "latinum" as const },
]

type ResumeEntry = { date: string; title: string; organization: string; organizationSlug?: string; description?: string; projectSlug?: string; skills?: string[]; isCurrent?: boolean };
function ResumeRow({ item }: { item: ResumeEntry }) {
  const organizationSlug = item.organizationSlug || resumeOrgToSlug[item.organization];
  return <motion.article className="resume-row" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.35 }}><div><h3>{item.projectSlug ? <Link href={`/projects/${item.projectSlug}`}>{item.title} ↗</Link> : item.title}</h3><p className="resume-organization">{organizationSlug ? <Link href={`/organization/${organizationSlug}`}>{item.organization} ↗</Link> : item.organization}</p>{item.description && <p className="resume-description">{item.description}</p>}{item.skills && <div className="skill-line">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div>}</div><p className="resume-date">{item.date}</p></motion.article>;
}

export default function ResumePage() {
  const { unlockAchievement } = useAchievements();
  const { t } = useI18n();
  useEffect(() => { unlockAchievement('RESUME_VIEWER'); }, [unlockAchievement]);
  const current = [...timelineEvents, ...certificates].filter(item => (item as ResumeEntry).isCurrent);
  return <div className="min-h-screen flex flex-col"><Header/><main className="portfolio-subpage resume-page"><div className="container">
    <PageHeading title={t.resume.title} description={t.resume.description}/>
    <section className="resume-intro"><div><p className="eyebrow">{t.resume.aboutMe}</p><h2>Benedikt Schächner</h2><p>{t.resume.aboutDescription}</p></div><div className="resume-profile-links"><Link href="/projects">{t.resume.myProjects} <span>↗</span></Link><a href="https://de.linkedin.com/in/benedikt-schächner-a22632299/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://www.instagram.com/benedikt.schaechner/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a></div></section>
    <Tabs defaultValue="resume"><TabsList className="editorial-tabs"><TabsTrigger value="resume">{t.resume.fullResume}</TabsTrigger><TabsTrigger value="current">{t.resume.currentWork}</TabsTrigger></TabsList><TabsContent value="resume">
      <section className="resume-section"><div className="section-heading"><div className="section-heading-icon"><Briefcase size={20} strokeWidth={1.5}/></div><h2>{t.resume.career}</h2></div>{timelineEvents.map(item => <ResumeRow key={`${item.date}-${item.title}`} item={item}/>)}</section>
      <section className="resume-section"><div className="section-heading"><div className="section-heading-icon"><GraduationCap size={20} strokeWidth={1.5}/></div><h2>{t.resume.certificatesAndCerts}</h2></div>{certificates.map(item => <ResumeRow key={`${item.date}-${item.title}`} item={item}/>)}</section>
      <section className="resume-competencies"><div><div className="section-heading"><div className="section-heading-icon"><Code2 size={20} strokeWidth={1.5}/></div><h2>{t.resume.skillsSection}</h2></div><div className="skill-line">{skills.map(skill => <span key={skill}>{skill}</span>)}</div></div><div><div className="section-heading"><div className="section-heading-icon"><Globe size={20} strokeWidth={1.5}/></div><h2>{t.resume.languages}</h2></div><dl>{languages.map(lang => <div key={lang.name}><dt>{lang.name}</dt><dd>{t.resume[lang.levelKey]}</dd></div>)}</dl></div></section>
    </TabsContent><TabsContent value="current"><section className="resume-section"><div className="section-heading"><div className="section-heading-icon"><Clock size={20} strokeWidth={1.5}/></div><h2>{t.resume.currentWork}</h2></div>{current.map(item => <ResumeRow key={`${item.date}-${item.title}`} item={item}/>)}</section></TabsContent></Tabs>
  </div></main><Footer/></div>;
}
