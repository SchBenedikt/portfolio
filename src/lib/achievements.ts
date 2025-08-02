
export type AchievementID =
  | 'FIRST_STEP'
  | 'PROJECTS_EXPLORER'
  | 'PROJECT_INSPECTOR'
  | 'RESUME_VIEWER'
  | 'BLOG_EXPLORER'
  | 'BLOG_POST_READER'
  | 'NIGHT_OWL'
  | 'EARLY_BIRD'
  | 'GAMER'
  | 'VIEW_SWITCHER'
  | 'COMMAND_PRO'
  | 'SECRET_FINDER'
  | 'COMPLETIONIST';

export interface Achievement {
  id: AchievementID;
  name: string;
  description: string;
}

export const achievementsList: Achievement[] = [
  {
    id: 'FIRST_STEP',
    name: 'First Step',
    description: 'Landed on the homepage.',
  },
  {
    id: 'PROJECTS_EXPLORER',
    name: 'The Architect',
    description: 'Visited the projects page.',
  },
  {
    id: 'PROJECT_INSPECTOR',
    name: 'Deep Dive',
    description: 'Viewed the details of a project.',
  },
  {
    id: 'RESUME_VIEWER',
    name: 'The Historian',
    description: 'Checked out the resume.',
  },
  {
    id: 'BLOG_EXPLORER',
    name: 'The Reader',
    description: 'Visited the blog.',
  },
  {
    id: 'BLOG_POST_READER',
    name: 'Well Read',
    description: 'Read a blog post.',
  },
  {
    id: 'NIGHT_OWL',
    name: 'Night Owl',
    description: 'Switched to dark mode.',
  },
  {
    id: 'EARLY_BIRD',
    name: 'Early Bird',
    description: 'Switched to light mode.',
  },
  {
    id: 'GAMER',
    name: 'High Score',
    description: 'You beat the number guessing game.',
  },
  {
    id: 'VIEW_SWITCHER',
    name: 'Dual Perspective',
    description: 'Switched between UI and Terminal view.',
  },
  {
    id: 'COMMAND_PRO',
    name: 'Command Pro',
    description: "Used 5 different terminal commands.",
  },
  {
    id: 'SECRET_FINDER',
    name: 'Secret Finder',
    description: 'Found a secret command in the terminal.',
  },
];
