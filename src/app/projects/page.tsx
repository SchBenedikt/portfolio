
'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { projectData } from '@/lib/projects';
import Link from 'next/link';
import Image from 'next/image';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, ArrowRight, Link as LinkIcon } from 'lucide-react';

const MotionCard = motion(Card);

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(projectData[0]);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    unlockAchievement('PROJECTS_EXPLORER');
  }, [unlockAchievement]);

  const handleSelectProject = (slug: string) => {
    const project = projectData.find((p) => p.slug === slug);
    if (project) {
      setSelectedProject(project);
    }
  };
  
  const hasValidUrl = selectedProject.url && selectedProject.url !== '#';
  const buttonIcon = hasValidUrl && !selectedProject.url.includes('github.com') ? <LinkIcon className="mr-3"/> : <Github className="mr-3"/>;
  const buttonText = hasValidUrl ? (selectedProject.url.includes('github.com') ? 'Auf Github ansehen' : 'Projekt ansehen') : 'Nicht verfügbar';


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-black text-center mb-12 md:mb-16 uppercase tracking-tighter font-headline">
              Projekte & Tools
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="md:col-span-1">
                <div className="md:sticky md:top-32 space-y-4">
                  {projectData.map((project) => (
                    <Card
                      key={project.slug}
                      className={`cursor-pointer rounded-2xl transition-all ${
                        selectedProject.slug === project.slug
                          ? 'border-primary shadow-2xl'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleSelectProject(project.slug)}
                      data-cursor-interactive
                    >
                      <CardHeader>
                        <CardTitle className="text-xl md:text-2xl font-bold font-headline">{project.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                {selectedProject && (
                  <motion.div
                    key={selectedProject.slug}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:sticky md:top-32"
                  >
                    <Card className="rounded-3xl shadow-lg">
                       <CardHeader className="p-0">
                         <div className="aspect-video overflow-hidden rounded-t-3xl border-b">
                            <Image
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                width={1200}
                                height={675}
                                className="object-cover w-full h-full"
                                data-ai-hint={selectedProject.aiHint}
                            />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter font-headline mb-4">
                          {selectedProject.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProject.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-sm md:text-md rounded-lg">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-muted-foreground text-lg md:text-xl mb-6">
                          {selectedProject.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button asChild className="rounded-full text-lg py-6" data-cursor-interactive>
                            <Link href={`/projects/${selectedProject.slug}`}>
                                Details ansehen <ArrowRight className="ml-2"/>
                            </Link>
                          </Button>
                           <Button asChild variant="outline" className="rounded-full text-lg py-6" data-cursor-interactive disabled={!hasValidUrl}>
                                <a href={selectedProject.url} target="_blank" rel="noopener noreferrer">
                                    {buttonIcon}
                                    {buttonText}
                                </a>
                           </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
