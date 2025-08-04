export type AchievementID =
  | 'FIRST_STEP'
  | 'PROJECTS_EXPLORER'
  | 'PROJECT_INSPECTOR'
  | 'RESUME_VIEWER'
  | 'NIGHT_OWL'
  | 'EARLY_BIRD'
  | 'GAMER'
  | 'VIEW_SWITCHER'
  | 'COMMAND_PRO'
  | 'SECRET_FINDER'
  | 'KEYBOARD_VIRTUOSO'
  | 'TOOL_MASTER'
  | 'SECRET_AGENT'
  | 'COLOR_ARTIST'
  | 'TIME_STOPPER'
  | 'DIMENSION_MASTER'
  | 'WORD_SMITH'
  | 'TASK_MANAGER';

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
    id: 'TOOL_MASTER',
    name: 'Werkzeugmeister',
    description: 'Die Tools-Seite entdeckt.'
  },
  {
    id: 'SECRET_AGENT',
    name: 'Geheimagent',
    description: 'Ein sicheres Passwort generiert.'
  },
  {
    id: 'COLOR_ARTIST',
    name: 'Farbkünstler',
    description: 'Eine Farbpalette generiert.'
  },
  {
    id: 'TIME_STOPPER',
    name: 'Zeitstopper',
    description: 'Die Stoppuhr verwendet.'
  },
  {
    id: 'DIMENSION_MASTER',
    name: 'Meister der Maße',
    description: 'Den Einheitenumrechner verwendet.'
  },
  {
    id: 'WORD_SMITH',
    name: 'Wortschöpfer',
    description: 'Den KI-Textgenerator verwendet.'
  },
  {
    id: 'TASK_MANAGER',
    name: 'Task-Manager',
    description: 'Eine Aufgabe zur Todo-Liste hinzugefügt.'
  }
];

    
