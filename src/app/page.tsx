'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      <main className="flex-grow">
        <div className="container mx-auto px-6 sm:px-8 h-full">
          <motion.section
            className="flex flex-col justify-center items-center text-center h-full min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center">
              <motion.h1
                id="hero-title"
                className="text-8xl md:text-9xl lg:text-10xl font-black uppercase tracking-tighter font-headline"
                variants={itemVariants}
              >
                Benedikt
                <br />
                Schächner
              </motion.h1>
              <motion.p
                id="hero-subtitle"
                className="mt-6 text-2xl md:text-3xl max-w-xl mx-auto text-muted-foreground"
                variants={itemVariants}
              >
                Creative Developer & Designer shaping unique digital experiences.
              </motion.p>
              <motion.div
                className="mt-10"
                variants={itemVariants}
              >
                <Button
                  id="hero-button"
                  size="lg"
                  asChild
                  className="rounded-full text-xl py-10 px-12 group"
                >
                  <Link href="/projects">
                    View My Work{' '}
                    <ArrowRight className="ml-3 h-7 w-7 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
