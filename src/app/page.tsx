'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <main className="relative z-10 flex-grow">
        <div className="container mx-auto px-6 sm:px-8 h-full">
          <section
            id="hero"
            className="h-full flex flex-col justify-center items-start text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 id="hero-title" className="text-8xl md:text-9xl lg:text-10xl font-black uppercase tracking-tighter font-headline">
                Benedikt
                <br />
                Schächner
              </h1>
              <p id="hero-subtitle" className="mt-6 text-2xl md:text-3xl max-w-3xl text-muted-foreground flex items-center">
                Creative Developer & Designer shaping digital experiences 
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand%20Light%20Skin%20Tone.png" alt="Waving Hand Light Skin Tone" width="35" height="35" className="ml-3" />
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-10"
              >
                <Button id="hero-button" size="lg" asChild className="rounded-full text-xl py-10 px-12">
                  <Link href="/projects">
                    View My Work <ArrowRight className="ml-3 h-7 w-7" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}
