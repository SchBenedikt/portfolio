
'use client';

import { projectData } from '@/lib/projects';
import { notFound, useParams } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, Calendar, Folder, Tags, Bot, Target, BrainCircuit, Link as LinkIcon, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';


export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = useMemo(() => projectData.find((p) => p.slug === slug), [slug]);
  const otherProjects = useMemo(() => projectData.filter((p) => p.slug !== slug), [slug]);
  
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    if (project) {
      unlockAchievement('PROJECT_INSPECTOR');
    }
  }, [project, unlockAchievement]);


  if (!project) {
    notFound();
  }

  const hasValidUrl = project.url && project.url !== '#';
  const buttonIcon = hasValidUrl && !project.url.includes('github.com') ? <ExternalLink className="mr-3"/> : <Github className="mr-3"/>;
  const buttonText = hasValidUrl ? (project.url.includes('github.com') ? 'Auf Github ansehen' : 'Projekt ansehen') : 'Nicht verfügbar';

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
                 <Dialog>
                  <DialogTrigger asChild>
                    <div className="aspect-video overflow-hidden rounded-3xl mb-8 cursor-pointer" data-cursor-interactive>
                       <Image
                          src={project.image}
                          alt={project.title}
                          width={1200}
                          height={675}
                          className="object-cover w-full h-full object-top"
                          data-ai-hint={project.aiHint}
                        />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-2 bg-transparent border-none">
                    <DialogHeader className="sr-only">
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription>
                        Vergrößerte Ansicht des Projektbildes für {project.title}.
                      </DialogDescription>
                    </DialogHeader>
                     <Image
                        src={project.image}
                        alt={project.title}
                        width={1920}
                        height={1080}
                        className="object-contain w-full h-full rounded-lg"
                      />
                  </DialogContent>
                </Dialog>

                <div className="prose prose-invert prose-lg max-w-none text-muted-foreground text-xl md:text-2xl space-y-6" dangerouslySetInnerHTML={{ __html: project.longDescription }}>
                </div>
              </div>
              <div className="md:col-span-2">
                 <div className="sticky top-32 bg-card/50 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-border/50">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold font-headline">Projekt-Infos</h3>
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
                        {hasValidUrl && (
                          <div className="flex items-start">
                              <LinkIcon className="mr-3 mt-1 text-primary"/>
                              <div>
                                  <h4 className="font-semibold">Website</h4>
                                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm md:text-base hover:text-primary transition-colors break-all">
                                    {project.url}
                                  </a>
                              </div>
                          </div>
                        )}
                        {project.details?.usage && (
                          <div className="flex items-start">
                              <Target className="mr-3 mt-1 text-primary"/>
                              <div>
                                  <h4 className="font-semibold">Einsatzbereich</h4>
                                  <p className="text-muted-foreground text-sm md:text-base">{project.details.usage}</p>
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
                     <Button asChild variant="outline" className="w-full rounded-full" data-cursor-interactive disabled={!hasValidUrl}>
                        <Link href={project.url} target="_blank" rel="noopener noreferrer">
                           {buttonIcon}
                           {buttonText}
                        </Link>
                    </Button>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-6 sm:px-8 mt-16 md:mt-24">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase tracking-tighter font-headline">
                Weitere Projekte
            </h2>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {otherProjects.map((proj) => (
                        <CarouselItem key={proj.slug} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="rounded-3xl shadow-lg overflow-hidden border-border/50 flex flex-col w-full h-full">
                                  <div className="aspect-video overflow-hidden border-b">
                                      <Image
                                          src={proj.image}
                                          alt={proj.title}
                                          width={800}
                                          height={450}
                                          className="object-cover w-full h-full object-top"
                                      />
                                  </div>
                                  <CardContent className="p-6 flex flex-col flex-grow">
                                      <h3 className="text-2xl font-bold font-headline mb-2">{proj.title}</h3>
                                      <p className="text-muted-foreground text-sm mb-4 flex-grow">{proj.description}</p>
                                      <Button asChild size="sm" className="rounded-full mt-auto self-start" data-cursor-interactive>
                                          <Link href={`/projects/${proj.slug}`}>
                                              Details ansehen <ArrowRight className="ml-2"/>
                                          </Link>
                                      </Button>
                                  </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex"/>
                <CarouselNext className="hidden md:flex"/>
            </Carousel>
        </div>
      </main>
      <Footer />
    </div>
  );
}
