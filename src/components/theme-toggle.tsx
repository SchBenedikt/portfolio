
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { useAchievements } from './providers/achievements-provider';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { unlockAchievement } = useAchievements();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      unlockAchievement('NIGHT_OWL');
    } else {
      unlockAchievement('EARLY_BIRD');
    }
  };

  if (!mounted) {
    return <Button variant="outline" size="icon" className="w-9 h-9" disabled />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-9 h-9"
      onClick={handleThemeChange}
      aria-label="Toggle theme"
      data-cursor-interactive
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
