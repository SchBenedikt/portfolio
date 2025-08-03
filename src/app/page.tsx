
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { Terminal } from '@/components/terminal';
import { cn } from '@/lib/utils';

export default function Home() {
  const { unlockAchievement } = useAchievements();
  const [isTerminalView, setIsTerminalView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    unlockAchievement('FIRST_STEP');
    const savedView = localStorage.getItem('terminalView');
    if (savedView) {
      setIsTerminalView(JSON.parse(savedView));
    }
    setIsMounted(true);
  }, [unlockAchievement]);

  useEffect(() => {
    if(isMounted) {
      localStorage.setItem('terminalView', JSON.stringify(isTerminalView));
    }
  }, [isTerminalView, isMounted]);

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
    unlockAchievement('VIEW_SWITCHER');
  }
  
  if (!isMounted) {
    return null; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header>
        <Button
            variant="outline"
            size="icon"
            className="w-9 h-9"
            onClick={handleToggleView}
            aria-label="Ansicht wechseln"
            data-cursor-interactive
        >
            <User className={cn("h-[1.2rem] w-[1.2rem] transition-all", isTerminalView && "scale-0" )}/>
            <Bot className={cn("absolute h-[1.2rem] w-[1.2rem] transition-all", !isTerminalView && "scale-0")}/>
            <span className="sr-only">Ansicht wechseln</span>
        </Button>
      </Header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="container mx-auto px-6 sm:px-8 h-full flex items-center justify-center">
          {isTerminalView ? (
            <motion.div
              key="terminal"
              className="w-full h-full flex items-center justify-center"
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
              className="flex flex-col justify-center items-start text-left w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              <div className="text-left">
                <motion.h1
                  id="hero-title"
                  className="text-8xl md:text-9xl lg:text-10xl font-black uppercase tracking-tighter font-headline"
                  variants={itemVariants}
                >
                  Benedikt
                  <br />
                  Schächner
                </motion.h1>
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}
