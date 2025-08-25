
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
      console.error('Fehler beim Laden der Erfolge aus dem localStorage', error);
    }
  }, []);

  const saveAchievements = (achievements: Set<AchievementID>) => {
    try {
      localStorage.setItem('unlockedAchievements', JSON.stringify(Array.from(achievements)));
    } catch (error) {
      console.error('Fehler beim Speichern der Erfolge im localStorage', error);
    }
  };

  const allAchievementsUnlocked = useCallback(() => {
     // Exclude COMPLETIONIST from the list to check against
     const regularAchievements = achievementsList.filter(a => a.id !== 'COMPLETIONIST');
     return regularAchievements.every((ach) => unlockedAchievements.has(ach.id));
  }, [unlockedAchievements]);


  const unlockAchievement = useCallback((id: AchievementID) => {
    if (!unlockedAchievements.has(id)) {
      const newAchievements = new Set(unlockedAchievements);
      newAchievements.add(id);
      setUnlockedAchievements(newAchievements);
      saveAchievements(newAchievements);

      const achievement = achievementsList.find((a) => a.id === id);
      if (achievement) {
        toast.success('Erfolg freigeschaltet!', {
          description: achievement.name,
          icon: <CheckCircle className="h-5 w-5 text-primary" />,
        });
      }

      // Check for completionist achievement
      const regularAchievements = achievementsList.filter(a => a.id !== 'COMPLETIONIST');
      const allUnlocked = regularAchievements.every((ach) => newAchievements.has(ach.id));

      if(allUnlocked && !newAchievements.has('COMPLETIONIST')){
         const completionistAchievement = achievementsList.find((a) => a.id === 'COMPLETIONIST');
         if(completionistAchievement){
            const finalAchievements = new Set(newAchievements);
            finalAchievements.add('COMPLETIONIST');
            setUnlockedAchievements(finalAchievements);
            saveAchievements(finalAchievements);
            toast.success('Erfolg freigeschaltet!', {
                description: "Perfektionist",
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
    throw new Error('useAchievements muss innerhalb eines AchievementsProvider verwendet werden');
  }
  return context;
};

    