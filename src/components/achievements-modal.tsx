
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { achievementsList } from '@/lib/achievements';
import { useAchievements } from './providers/achievements-provider';
import { CheckCircle, Lock, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal = ({ isOpen, onClose }: AchievementsModalProps) => {
  const { unlockedAchievements, allAchievementsUnlocked } = useAchievements();

  const completionistAchievement = {
    id: 'COMPLETIONIST',
    name: 'Perfektionist',
    description: 'Schalte alle anderen Erfolge frei.',
  };

  const regularAchievements = useMemo(() => achievementsList.filter(a => a.id !== 'COMPLETIONIST'), []);
  const completionistUnlocked = allAchievementsUnlocked();
  
  const unlockedCount = useMemo(() => {
    // Count only regular achievements for the progress bar
    const unlockedRegular = regularAchievements.filter(ach => unlockedAchievements.has(ach.id)).length;
    return completionistUnlocked ? unlockedRegular + 1 : unlockedRegular;
  }, [unlockedAchievements, regularAchievements, completionistUnlocked]);

  const totalAchievements = regularAchievements.length + 1; // +1 for completionist

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="text-primary" />
            Erfolge
          </DialogTitle>
          <DialogDescription>
            Du hast {unlockedCount} von {totalAchievements} Erfolgen freigeschaltet.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 pr-4">
          <div className="space-y-4">
            {regularAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={cn(
                  'flex items-start gap-4 rounded-lg border p-4 transition-colors',
                  unlockedAchievements.has(achievement.id)
                    ? 'border-primary/50 bg-primary/10'
                    : 'bg-muted/50'
                )}
              >
                <div className="mt-1">
                  {unlockedAchievements.has(achievement.id) ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
            {/* Completionist special case */}
             <div
                className={cn(
                  'flex items-start gap-4 rounded-lg border p-4 transition-colors',
                  completionistUnlocked
                    ? 'border-yellow-500/50 bg-yellow-500/10' // Special styling for the ultimate achievement
                    : 'bg-muted/50'
                )}
              >
                <div className="mt-1">
                  {completionistUnlocked ? (
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{completionistAchievement.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {completionistAchievement.description}
                  </p>
                </div>
              </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

    