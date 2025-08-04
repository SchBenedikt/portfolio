
'use client';

import { projectData } from '@/lib/projects';
import { notFound, useParams } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, Calendar, Folder, Tags, Bot, Target, Star, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect, useMemo } from 'react';
import { useChat } from '@/components/providers/chat-provider';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = useMemo(() => projectData.find((p) => p.slug === slug), [slug]);
  const { unlockAchievement } = useAchievements();
  const { openChat } = useChat();

  useEffect(() => {
    if (project) {
      unlockAchievement('PROJECT_INSPECTOR');
    }
  }, [project, unlockAchievement]);


  if (!project) {
    notFound();
  }

  const handleAskAI = () => {
    const context = `
      Projekttitel: ${project.title}
      Beschreibung: ${project.longDescription}
      Technologien: ${project.tags.join(', ')}
      Kategorie: ${project.category}
      Datum: ${project.date}
    `;
    openChat(context);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <Button asChild variant="outline" className="rounded-full" data-cursor-interactive>
                <Link href="/projects">
                  <ArrowLeft className="mr-2" />
                  Zurück zu den Projekten
                </Link>
              </Button>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter font-headline mb-8 md:mb-4">
              {project.title}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
              <div className="md:col-span-3">
                <div className="aspect-video overflow-hidden rounded-3xl mb-8">
                   <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={675}
                      className="object-cover w-full h-full"
                      data-ai-hint={project.aiHint}
                    />
                </div>
                <div className="prose prose-invert prose-lg max-w-none text-muted-foreground text-xl md:text-2xl space-y-6" dangerouslySetInnerHTML={{ __html: project.longDescription }}>
                </div>
              </div>
              <div className="md:col-span-2">
                 <div className="sticky top-32 bg-card/50 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-border/50">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold font-headline">Projekt-Infos</h3>
                      <Button variant="outline" size="icon" onClick={handleAskAI} data-cursor-interactive>
                        <Bot className="w-5 h-5"/>
                        <span className="sr-only">Frag die KI zu diesem Projekt</span>
                      </Button>
                    </div>
                     <p className="text-base md:text-lg text-muted-foreground mb-6">
                        {project.description}
                     </p>
                     <div className="space-y-4 mb-8">
                        <div className="flex items-start">
                            <Calendar className="mr-3 mt-1 text-primary"/>
                            <div>
                                <h4 className="font-semibold">Datum</h4>
                                <p className="text-muted-foreground text-sm md:text-base">{new Date(project.date).toLocaleDateString('de-DE')}</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <Folder className="mr-3 mt-1 text-primary"/>
                            <div>
                                <h4 className="font-semibold">Kategorie</h4>
                                <p className="text-muted-foreground text-sm md:text-base">{project.category}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Tags className="mr-3 mt-1 text-primary"/>
                            <div>
                                <h4 className="font-semibold">Technologien</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs md:text-sm rounded-md">
                                        {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {project.details?.usage && (
                          <div className="flex items-start">
                              <Target className="mr-3 mt-1 text-primary"/>
                              <div>
                                  <h4 className="font-semibold">Einsatzbereich</h4>
                                  <p className="text-muted-foreground text-sm md:text-base">{project.details.usage}</p>
                              </div>
                          </div>
                        )}
                        {project.details?.strengths && (
                           <div className="flex items-start">
                              <Star className="mr-3 mt-1 text-primary"/>
                              <div>
                                  <h4 className="font-semibold">Stärken</h4>
                                  <p className="text-muted-foreground text-sm md:text-base">{project.details.strengths}</p>
                              </div>
                          </div>
                        )}
                        {project.details?.potential && (
                           <div className="flex items-start">
                              <BrainCircuit className="mr-3 mt-1 text-primary"/>
                              <div>
                                  <h4 className="font-semibold">Verbesserungspotenzial</h4>
                                  <p className="text-muted-foreground text-sm md:text-base">{project.details.potential}</p>
                              </div>
                          </div>
                        )}
                     </div>
                     <Button asChild className="w-full rounded-full text-base md:text-lg py-6 md:py-8" data-cursor-interactive>
                        <Link href="#">
                           <Github className="mr-3"/>
                           Auf Github ansehen
                        </Link>
                    </Button>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
