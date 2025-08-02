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

const MotionCard = motion(Card);

export default function ProjectsPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.section
            id="projects"
            className="py-12"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-7xl md:text-8xl font-black text-center mb-16 uppercase tracking-tighter font-headline">
              Selected Work
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projectData.map((project, index) => (
                <Link href={`/projects/${project.slug}`} key={project.slug}>
                  <MotionCard
                    className="flex flex-col overflow-hidden transition-all duration-300 group rounded-3xl h-full shadow-lg hover:shadow-2xl hover:-translate-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CardHeader className="p-0">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={project.aiHint}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-6 space-y-4">
                      <CardTitle className="text-4xl font-bold font-headline">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-lg">{project.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-md rounded-lg">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </MotionCard>
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
