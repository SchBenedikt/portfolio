
'use client';

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { Terminal } from '@/components/terminal';
import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

export default function Home() {
  const { unlockAchievement } = useAchievements();
  const [isTerminalView, setIsTerminalView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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

  const handleToggleView = (forceUiView?: boolean) => {
    if (typeof forceUiView === 'boolean') {
      setIsTerminalView(!forceUiView);
      return;
    }
  
    // Toggle view first
    setIsTerminalView((prev) => !prev);
  
    // Unlock achievement after a short delay to prevent UI blocking
    setTimeout(() => {
      unlockAchievement('VIEW_SWITCHER');
    }, 100);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
       <motion.div initial="hidden" animate={isHeaderVisible ? 'visible' : 'hidden'} variants={headerVariants}>
        <Header>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => handleToggleView()}
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
              <Terminal onExit={() => handleToggleView(true)} />
            </motion.div>
          ) : (
            <motion.section
              key="ui"
              className="flex justify-center items-center text-left w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter font-headline">
                    <div className="flex items-center justify-between">
                      <Image
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Technologist%20Medium-Light%20Skin%20Tone.png"
                        alt="Technologist Medium-Light Skin Tone"
                        width={100}
                        height={100}
                        className="inline-block w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
                      />
                      <span className="text-right">Benedikt</span>
                    </div>
                    <div className="text-right">Schächner</div>
                  </h1>
              </motion.div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}
