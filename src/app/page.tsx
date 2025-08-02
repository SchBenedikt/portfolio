'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function Home() {
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
                  <Link href="/projects">
                    View My Work <ArrowRight className="ml-3 h-7 w-7" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
