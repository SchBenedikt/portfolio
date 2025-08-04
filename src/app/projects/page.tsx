
'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { projectData } from '@/lib/projects';
import Link from 'next/link';
import Image from 'next/image';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Github, ArrowRight, ExternalLink } from 'lucide-react';

export default function ProjectsPage() {
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    unlockAchievement('PROJECTS_EXPLORER');
  }, [unlockAchievement]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
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
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-black text-center mb-12 md:mb-16 uppercase tracking-tighter font-headline">
              Projekte & Tools
            </h1>
            <motion.div 
              className="flex flex-col gap-12 md:gap-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {projectData.map((project) => {
                 const hasValidUrl = project.url && project.url !== '#';
                 const buttonIcon = hasValidUrl && !project.url.includes('github.com') ? <ExternalLink className="mr-3"/> : <Github className="mr-3"/>;
                 const buttonText = hasValidUrl ? (project.url.includes('github.com') ? 'Auf Github ansehen' : 'Projekt ansehen') : 'Nicht verfügbar';

                return (
                  <motion.div key={project.slug} variants={itemVariants}>
                    <Card className="rounded-3xl shadow-lg overflow-hidden border-border/50">
                       <CardHeader className="p-0">
                         <div className="aspect-video overflow-hidden border-b">
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={1200}
                                height={675}
                                className="object-cover w-full h-full object-top"
                                data-ai-hint={project.aiHint}
                            />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter font-headline mb-4">
                          {project.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-sm md:text-md rounded-lg">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-muted-foreground text-lg md:text-xl mb-6">
                          {project.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button asChild className="rounded-full text-lg py-6" data-cursor-interactive>
                            <Link href={`/projects/${project.slug}`}>
                                Details ansehen <ArrowRight className="ml-2"/>
                            </Link>
                          </Button>
                           <Button asChild variant="outline" className="rounded-full text-lg py-6" data-cursor-interactive disabled={!hasValidUrl}>
                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                    {buttonIcon}
                                    {buttonText}
                                </a>
                           </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
