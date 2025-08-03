
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Coffee, BookOpen, Timer, ArrowLeft } from 'lucide-react';
import { useAchievements } from '@/components/providers/achievements-provider';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';
type Tool = 'pomodoro' | null;

const timeSettings = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const availableTools = [
  { id: 'pomodoro', name: 'Pomodoro Timer', icon: <Timer className="w-8 h-8" /> },
];

const PomodoroTimer = () => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [time, setTime] = useState(timeSettings[mode]);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setTime(timeSettings[mode]);
    setIsActive(false);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsActive(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(timeSettings[mode]);
  };

  const selectMode = (newMode: TimerMode) => {
    setMode(newMode);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const progress = (time / timeSettings[mode]) * 100;

  return (
    <Card className="rounded-3xl shadow-lg w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-headline">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <div className="relative w-64 h-64">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-muted"
                    strokeWidth="7"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                />
                <motion.circle
                    className="text-primary"
                    strokeWidth="7"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100) }}
                    transition={{ duration: 1, ease: 'linear' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                 <h2 className="text-6xl font-bold font-mono">{formatTime(time)}</h2>
            </div>
        </div>
        <div className="flex gap-2">
          <Button variant={mode === 'pomodoro' ? 'default' : 'outline'} onClick={() => selectMode('pomodoro')} data-cursor-interactive>
            <BookOpen className="mr-2"/> Pomodoro
          </Button>
          <Button variant={mode === 'shortBreak' ? 'default' : 'outline'} onClick={() => selectMode('shortBreak')} data-cursor-interactive>
             <Coffee className="mr-2"/> Kurze Pause
          </Button>
          <Button variant={mode === 'longBreak' ? 'default' : 'outline'} onClick={() => selectMode('longBreak')} data-cursor-interactive>
             <Coffee className="mr-2"/> Lange Pause
          </Button>
        </div>
        <div className="flex gap-4">
          <Button onClick={toggleTimer} size="lg" className="rounded-full w-32 text-xl py-8" data-cursor-interactive>
            {isActive ? <Pause /> : <Play />}
            <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
          </Button>
          <Button onClick={resetTimer} size="lg" variant="secondary" className="rounded-full w-32 text-xl py-8" data-cursor-interactive>
            <RotateCcw />
            <span className="ml-2">Reset</span>
          </Button>
        </div>
      </CardContent>
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-clear-announce-tones-2861.mp3" />
    </Card>
  );
};


export default function ToolsPage() {
  const { unlockAchievement } = useAchievements();
  const [selectedTool, setSelectedTool] = useState<Tool>(null);

  useEffect(() => {
    unlockAchievement('TOOL_MASTER');
  }, [unlockAchievement]);

  const renderTool = () => {
    switch (selectedTool) {
      case 'pomodoro':
        return <PomodoroTimer />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-black text-center mb-12 md:mb-16 uppercase tracking-tighter font-headline">
              Tools
            </h1>
            
            {selectedTool ? (
              <motion.div
                key={selectedTool}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-8"
              >
                 <Button variant="outline" onClick={() => setSelectedTool(null)} className="self-start rounded-full" data-cursor-interactive>
                    <ArrowLeft className="mr-2"/> Zurück zur Auswahl
                 </Button>
                 {renderTool()}
              </motion.div>
            ) : (
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="grid grid-cols-1 gap-6"
              >
                {availableTools.map(tool => (
                  <Card 
                    key={tool.id} 
                    className="p-6 rounded-2xl text-center cursor-pointer hover:border-primary transition-all"
                    onClick={() => setSelectedTool(tool.id as Tool)}
                    data-cursor-interactive
                  >
                    <div className="flex flex-col items-center gap-4">
                      {tool.icon}
                      <h2 className="text-2xl font-bold font-headline">{tool.name}</h2>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}
            
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
