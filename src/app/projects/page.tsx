'use client';
import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageHeading from '@/components/page-heading';
import ProjectCard from '@/components/project-card';
import { projectData } from '@/lib/projects';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useI18n } from '@/components/providers/i18n-provider';

export default function ProjectsPage() {
  const { unlockAchievement } = useAchievements();
  const { t } = useI18n();
  const [query,setQuery] = useState('');
  const [filter,setFilter] = useState('all');
  useEffect(() => { unlockAchievement('PROJECTS_EXPLORER'); },[unlockAchievement]);
  const projects = projectData.filter(p => (filter === 'all' || p.type === filter) && `${p.title} ${p.description} ${p.tags.join(' ')}`.toLocaleLowerCase('de').includes(query.trim().toLocaleLowerCase('de')));
  const filters = [['all', t.projects.allWork],['private', t.projects.private],['school', t.projects.school]];
  return <div className="portfolio-home"><Header/><main className="portfolio-subpage projects-page"><div className="container">
    <PageHeading title={t.projects.title} description={t.projects.description}/>
    <div className="work-toolbar"><div className="work-filters" aria-label={t.projects.searchLabel}>{filters.map(([value,label]) => <button key={value} aria-pressed={filter===value} onClick={() => setFilter(value)}>{label}<span>{projectData.filter(p => value==='all'||p.type===value).length}</span></button>)}</div><label className="work-search"><Search size={16}/><span className="sr-only">{t.projects.searchLabel}</span><input type="search" placeholder={t.projects.searchPlaceholder} value={query} onChange={e => setQuery(e.target.value)}/></label></div>
    <p className="work-result-count" role="status">{projects.length} {projects.length===1?t.projects.resultCountSingular:t.projects.resultCount}</p>
    <div className="work-collection">{projects.map(p => <ProjectCard project={p} key={p.slug}/>)}</div>
    {!projects.length && <div className="work-empty"><h2>{t.projects.emptyTitle}</h2><p>{t.projects.emptyText}</p><button onClick={() => {setQuery('');setFilter('all');}}><X size={15}/> {t.projects.resetFilters}</button></div>}
  </div></main><Footer/></div>;
}
