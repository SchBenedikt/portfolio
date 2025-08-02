
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';
import { achievementsList, AchievementID } from '@/lib/achievements';
import { CheckCircle } from 'lucide-react';

interface AchievementsContextType {
  unlockedAchievements: Set<AchievementID>;
  unlockAchievement: (id: AchievementID) => void;
  allAchievementsUnlocked: () => boolean;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<AchievementID>>(new Set());

  useEffect(() => {
    try {
      const storedAchievements = localStorage.getItem('unlockedAchievements');
      if (storedAchievements) {
        setUnlockedAchievements(new Set(JSON.parse(storedAchievements)));
      }
    } catch (error) {
      console.error('Failed to load achievements from localStorage', error);
    }
  }, []);

  const saveAchievements = (achievements: Set<AchievementID>) => {
    try {
      localStorage.setItem('unlockedAchievements', JSON.stringify(Array.from(achievements)));
    } catch (error) {
      console.error('Failed to save achievements to localStorage', error);
    }
  };

  const allAchievementsUnlocked = useCallback(() => {
     return achievementsList.every((ach) => unlockedAchievements.has(ach.id));
  }, [unlockedAchievements]);


  const unlockAchievement = useCallback((id: AchievementID) => {
    // This function is defined here and will be passed to the context.
    // It depends on `unlockedAchievements`.
    if (!unlockedAchievements.has(id)) {
      const newAchievements = new Set(unlockedAchievements);
      newAchievements.add(id);
      setUnlockedAchievements(newAchievements);
      saveAchievements(newAchievements);

      const achievement = achievementsList.find((a) => a.id === id);
      if (achievement) {
        toast.success('Achievement Unlocked!', {
          description: achievement.name,
          icon: <CheckCircle className="h-5 w-5 text-primary" />,
        });
      }

      // Check for completionist after a new achievement is added.
      // This is a separate check and can be part of the same useCallback.
      const allUnlocked = achievementsList.every((ach) => newAchievements.has(ach.id));
      if(allUnlocked && !newAchievements.has('COMPLETIONIST')){
         // Directly call the logic again for the 'COMPLETIONIST' achievement
         // to avoid circular dependency.
         const completionistAchievement = achievementsList.find((a) => a.id === 'COMPLETIONIST');
         if(completionistAchievement && !newAchievements.has('COMPLETIONIST')){
            const finalAchievements = new Set(newAchievements);
            finalAchievements.add('COMPLETIONIST');
            setUnlockedAchievements(finalAchievements);
            saveAchievements(finalAchievements);
            toast.success('Achievement Unlocked!', {
                description: "Completionist",
                icon: <CheckCircle className="h-5 w-5 text-primary" />,
            });
         }
      }
    }
  }, [unlockedAchievements]);

  return (
    <AchievementsContext.Provider value={{ unlockedAchievements, unlockAchievement, allAchievementsUnlocked }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementsProvider');
  }
  return context;
};
