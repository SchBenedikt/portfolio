'use client';
import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageHeading from '@/components/page-heading';
import ProjectCard from '@/components/project-card';
import { projectData } from '@/lib/projects';
import { useAchievements } from '@/components/providers/achievements-provider';

export default function ProjectsPage() {
  const { unlockAchievement } = useAchievements();
  const [query,setQuery] = useState('');
  const [filter,setFilter] = useState('all');
  useEffect(() => { unlockAchievement('PROJECTS_EXPLORER'); },[unlockAchievement]);
  const projects = projectData.filter(p => (filter === 'all' || p.type === filter) && `${p.title} ${p.description} ${p.tags.join(' ')}`.toLocaleLowerCase('de').includes(query.trim().toLocaleLowerCase('de')));
  return <div className="portfolio-home"><Header/><main className="portfolio-subpage projects-page"><div className="container">
    <PageHeading title="Projekte" description="Meine Projekte."/>
    <div className="work-toolbar"><div className="work-filters" aria-label="Projekte filtern">{[['all','Alle Arbeiten'],['private','Eigene Projekte'],['school','Schulprojekte']].map(([value,label]) => <button key={value} aria-pressed={filter===value} onClick={() => setFilter(value)}>{label}<span>{projectData.filter(p => value==='all'||p.type===value).length}</span></button>)}</div><label className="work-search"><Search size={16}/><span className="sr-only">Projekte durchsuchen</span><input type="search" placeholder="Projekt suchen …" value={query} onChange={e => setQuery(e.target.value)}/></label></div>
    <p className="work-result-count" role="status">{projects.length} {projects.length===1?'Projekt':'Projekte'}</p>
    <div className="work-collection">{projects.map(p => <ProjectCard project={p} key={p.slug}/>)}</div>
    {!projects.length && <div className="work-empty"><h2>Hier ist noch nichts dabei.</h2><p>Versuche einen anderen Suchbegriff oder zeige alle Projekte an.</p><button onClick={() => {setQuery('');setFilter('all');}}><X size={15}/> Filter zurücksetzen</button></div>}
  </div></main><Footer/></div>;
}
