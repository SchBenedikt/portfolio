
'use client';

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { Terminal } from '@/components/terminal';
import { cn } from '@/lib/utils';

export default function Home() {
  const { unlockAchievement } = useAchievements();
  const [isTerminalView, setIsTerminalView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Start with header visible logic

  useEffect(() => {
    unlockAchievement('FIRST_STEP');
    const savedView = localStorage.getItem('terminalView');
    if (savedView) {
      setIsTerminalView(JSON.parse(savedView));
    }
    setIsMounted(true);
  }, [unlockAchievement]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('terminalView', JSON.stringify(isTerminalView));
    }
  }, [isTerminalView, isMounted]);

  const headerVariants = {
    hidden: { y: -150, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] } },
  };

  const handleToggleView = () => {
    unlockAchievement('VIEW_SWITCHER');
    setIsTerminalView((prev) => !prev);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
       <motion.div initial="hidden" animate={isHeaderVisible ? 'visible' : 'hidden'} variants={headerVariants}>
        <Header>
          <Button
            variant="outline"
            size="icon"
            className="w-9 h-9"
            onClick={handleToggleView}
            aria-label="Ansicht wechseln"
            data-cursor-interactive
          >
            <User className={cn('h-[1.2rem] w-[1.2rem] transition-all', isTerminalView && 'scale-0')} />
            <Bot className={cn('absolute h-[1.2rem] w-[1.2rem] transition-all', !isTerminalView && 'scale-0')} />
            <span className="sr-only">Ansicht wechseln</span>
          </Button>
        </Header>
      </motion.div>
      <main className="flex-grow flex flex-col items-center justify-center pt-20">
        <div
          className="container mx-auto px-6 sm:px-8 h-full flex items-center justify-center"
        >
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
              className="flex justify-center items-center text-left w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-16">
                <motion.div className="text-left">
                  <h1
                    id="hero-title"
                    className="text-8xl md:text-9xl lg:text-10xl font-black uppercase tracking-tighter font-headline"
                  >
                    Benedikt
                    <br />
                    Schächner
                  </h1>
                </motion.div>
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}
