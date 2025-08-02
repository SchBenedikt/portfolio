
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

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal = ({ isOpen, onClose }: AchievementsModalProps) => {
  const { unlockedAchievements, allAchievementsUnlocked } = useAchievements();

  const completionistUnlocked = allAchievementsUnlocked();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="text-primary" />
            Achievements
          </DialogTitle>
          <DialogDescription>
            You have unlocked {unlockedAchievements.size} of {achievementsList.length} achievements.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 pr-4">
          <div className="space-y-4">
            {achievementsList.map((achievement) => (
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
                    ? 'border-primary/50 bg-primary/10'
                    : 'bg-muted/50'
                )}
              >
                <div className="mt-1">
                  {completionistUnlocked ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">Completionist</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock all other achievements.
                  </p>
                </div>
              </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
