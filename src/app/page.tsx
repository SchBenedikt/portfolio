'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { projectData } from '@/lib/projects';
import Link from 'next/link';

const MotionCard = motion(Card);

export default function Home() {
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
      <main className="relative z-10 flex-grow">
        <div className="container mx-auto px-6 sm:px-8">
          <section
            id="hero"
            className="min-h-screen flex flex-col justify-center items-start text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-8xl md:text-9xl lg:text-10xl font-black uppercase tracking-tighter font-headline">
                Benedikt
                <br />
                Schächner
              </h1>
              <p className="mt-6 text-2xl md:text-3xl max-w-3xl text-muted-foreground">
                Creative Developer & Designer shaping digital experiences with a
                focus on motion, 3D graphics, and AI-driven interactions.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-10"
              >
                <Button size="lg" asChild className="rounded-full text-xl py-10 px-12">
                  <a href="#projects">
                    View My Work <ArrowRight className="ml-3 h-7 w-7" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </section>

          <motion.section
            id="projects"
            className="py-24 md:py-40"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-7xl md:text-8xl font-black text-center mb-16 uppercase tracking-tighter font-headline">
              Selected Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projectData.map((project, index) => (
                <Link href={`/projects/${project.slug}`} key={project.slug}>
                  <MotionCard
                    className="flex flex-col overflow-hidden transition-all duration-300 group rounded-3xl h-full shadow-lg hover:shadow-2xl hover:-translate-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
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

          <motion.section
            id="about"
            className="py-24 md:py-40 max-w-4xl mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-7xl md:text-8xl font-black text-center mb-16 uppercase tracking-tighter font-headline">
              About Me
            </h2>
            <div className="text-2xl text-center text-muted-foreground space-y-8">
              <p>
                I am a passionate developer and designer with a knack for
                blending technology and art. My work explores the frontiers of
                web development, focusing on creating memorable and engaging user
                experiences through 3D graphics, intricate animations, and
                intelligent systems.
              </p>
              <p>
                With a background in both computer science and visual design, I
                strive to write code that is not only functional and efficient
                but also elegant and beautiful. I believe that the best digital
                products are those that feel alive and responsive to user interaction.
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-12">
              <Button variant="outline" size="icon" className="rounded-full w-16 h-16" asChild>
                <a href="#" aria-label="Github">
                  <Github className="w-8 h-8"/>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-16 h-16" asChild>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin className="w-8 h-8"/>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-16 h-16" asChild>
                <a href="#" aria-label="Email">
                  <Mail className="w-8 h-8"/>
                </a>
              </Button>
            </div>
          </motion.section>

          <motion.section
            id="contact"
            className="py-24 md:py-40 max-w-2xl mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-7xl md:text-8xl font-black text-center mb-16 uppercase tracking-tighter font-headline">
              Get In Touch
            </h2>
            <form className="space-y-8">
              <Input type="text" placeholder="Your Name" required className="h-16 text-xl rounded-2xl"/>
              <Input type="email" placeholder="Your Email" required className="h-16 text-xl rounded-2xl"/>
              <Textarea placeholder="Your Message" rows={6} required className="text-xl rounded-2xl"/>
              <Button type="submit" className="w-full rounded-full text-xl py-10">
                Send Message
              </Button>
            </form>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
