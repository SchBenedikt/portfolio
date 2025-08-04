
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
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, ArrowRight, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ProjectsPage() {
  const { unlockAchievement } = useAchievements();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    unlockAchievement('PROJECTS_EXPLORER');
  }, [unlockAchievement]);

  const filteredProjects = projectData.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-black text-center mb-8 uppercase tracking-tighter font-headline">
              Projekte
            </h1>
            <div className="relative mb-12 md:mb-16">
               <Input 
                  type="text"
                  placeholder="Projekte durchsuchen..."
                  className="w-full p-4 pl-12 text-lg rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6"/>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project) => {
                 const hasValidUrl = project.url && project.url !== '#';
                 const buttonIcon = hasValidUrl && !project.url.includes('github.com') ? <ExternalLink className="mr-3"/> : <Github className="mr-3"/>;
                 const buttonText = hasValidUrl ? (project.url.includes('github.com') ? 'Auf Github ansehen' : 'Projekt ansehen') : 'Nicht verfügbar';

                return (
                  <motion.div key={project.slug} variants={itemVariants} className="flex">
                    <Card className="rounded-3xl overflow-hidden border-border/50 flex flex-col w-full">
                       <CardHeader className="p-0">
                         <div className="aspect-video overflow-hidden border-b">
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={1200}
                                height={675}
                                className="object-cover w-full h-full object-top"
                            />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8 flex flex-col flex-grow">
                        <h2 className="text-4xl font-black uppercase tracking-tighter font-headline mb-4">
                          {project.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-sm rounded-lg">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-muted-foreground text-lg mb-6 flex-grow">
                          {project.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                          <Button asChild className="rounded-full" data-cursor-interactive>
                            <Link href={`/projects/${project.slug}`}>
                                Details ansehen <ArrowRight className="ml-2"/>
                            </Link>
                          </Button>
                           <Button asChild variant="outline" className="rounded-full" data-cursor-interactive disabled={!hasValidUrl}>
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
