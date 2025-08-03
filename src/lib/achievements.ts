
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
  | 'KEYBOARD_VIRTUOSO'
  | 'TERMINAL_TUTOR'
  | 'COMPLETIONIST';

export interface Achievement {
  id: AchievementID;
  name: string;
  description: string;
}

export const achievementsList: Achievement[] = [
  {
    id: 'FIRST_STEP',
    name: 'Erster Schritt',
    description: 'Auf der Startseite gelandet.',
  },
  {
    id: 'PROJECTS_EXPLORER',
    name: 'Der Architekt',
    description: 'Die Projektseite besucht.',
  },
  {
    id: 'PROJECT_INSPECTOR',
    name: 'Tieftaucher',
    description: 'Die Details eines Projekts angesehen.',
  },
  {
    id: 'RESUME_VIEWER',
    name: 'Der Historiker',
    description: 'Den Lebenslauf angesehen.',
  },
  {
    id: 'BLOG_EXPLORER',
    name: 'Der Leser',
    description: 'Den Blog besucht.',
  },
  {
    id: 'BLOG_POST_READER',
    name: 'Belesen',
    description: 'Einen Blogbeitrag gelesen.',
  },
  {
    id: 'NIGHT_OWL',
    name: 'Nachteule',
    description: 'In den Dark-Mode gewechselt.',
  },
  {
    id: 'EARLY_BIRD',
    name: 'Früher Vogel',
    description: 'In den Light-Mode gewechselt.',
  },
  {
    id: 'GAMER',
    name: 'Highscore',
    description: 'Du hast das Zahlenratespiel gewonnen.',
  },
  {
    id: 'VIEW_SWITCHER',
    name: 'Doppelte Perspektive',
    description: 'Zwischen UI- und Terminal-Ansicht gewechselt.',
  },
  {
    id: 'COMMAND_PRO',
    name: 'Befehls-Profi',
    description: "5 verschiedene Terminal-Befehle benutzt.",
  },
  {
    id: 'SECRET_FINDER',
    name: 'Geheimnisfinder',
    description: 'Einen geheimen Befehl im Terminal gefunden.',
  },
  {
    id: 'KEYBOARD_VIRTUOSO',
    name: 'Tasten-Virtuose',
    description: 'Den Schreibgeschwindigkeitstest gemeistert.'
  },
  {
    id: 'TERMINAL_TUTOR',
    name: 'Terminal-Tutor',
    description: 'Das Terminal-Tutorial abgeschlossen.'
  }
];
