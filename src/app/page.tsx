
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TerminalSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { Terminal } from '@/components/terminal';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export default function Home() {
  const { unlockAchievement } = useAchievements();
  const [isTerminalView, setIsTerminalView] = useState(false);

  useEffect(() => {
    unlockAchievement('FIRST_STEP');
  }, [unlockAchievement]);

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

  const handleToggleView = () => {
    setIsTerminalView(prev => !prev);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header>
        <div className="flex items-center space-x-4">
          <button onClick={handleToggleView} className={cn('flex items-center gap-2 text-lg transition-colors hover:text-primary', !isTerminalView && 'text-primary')}>
            <User />
            <span>UI</span>
          </button>
           <button onClick={handleToggleView} className={cn('flex items-center gap-2 text-lg transition-colors hover:text-primary', isTerminalView && 'text-primary')}>
            <TerminalSquare />
            <span>Terminal</span>
          </button>
        </div>
      </Header>
      <main className="flex-grow">
        <div className="container mx-auto px-6 sm:px-8 h-full">
          {isTerminalView ? (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Terminal />
            </motion.div>
          ) : (
            <motion.section
              key="ui"
              className="flex flex-col justify-center items-center text-center h-full min-h-screen"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
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
          )}
        </div>
      </main>
    </div>
  );
}
