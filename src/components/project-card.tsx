'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/projects';
import ProjectArtwork from './project-artwork';
import { useI18n } from '@/components/providers/i18n-provider';

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  return <article className="work-tile">
    <Link href={`/projects/${project.slug}`} className="work-visual-link" aria-label={`${project.title} ${t.projectCard.discover}`}><ProjectArtwork slug={project.slug}/><span className="work-open"><ArrowUpRight size={20}/></span></Link>
    <div className="work-meta"><span>{project.category}</span><span>{project.date.slice(0,4)}</span></div>
    <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
    <p className="work-summary">{project.description}</p>
    <div className="work-bottom"><span>{project.tags.slice(0,2).join(' / ') || 'Latein / Redaktion'}</span>{project.url && project.url !== '#' && <a href={project.url} target="_blank" rel="noreferrer">{project.url.startsWith('/') ? t.projectCard.document : t.projectCard.website} <ArrowUpRight size={13}/></a>}</div>
  </article>;
}
