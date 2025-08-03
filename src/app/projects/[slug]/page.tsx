
'use client';

import { projectData } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect } from 'react';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectData.find((p) => p.slug === params.slug);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    if (project) {
      unlockAchievement('PROJECT_INSPECTOR');
    }
  }, [project, unlockAchievement]);


  if (!project) {
    notFound();
  }

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
            <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter font-headline mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-md rounded-lg">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
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
                <div className="prose prose-invert prose-lg max-w-none text-muted-foreground text-2xl space-y-6">
                  <p>{project.longDescription}</p>
                </div>
              </div>
              <div className="md:col-span-2">
                 <div className="sticky top-32 bg-card/50 backdrop-blur-lg p-8 rounded-3xl border border-border/50">
                    <h3 className="text-3xl font-bold font-headline mb-6">Projektübersicht</h3>
                     <p className="text-lg text-muted-foreground mb-6">
                        {project.description}
                     </p>
                     <Button asChild className="w-full rounded-full text-lg py-8" data-cursor-interactive>
                        <Link href={`/projects/${project.slug}`}>
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
