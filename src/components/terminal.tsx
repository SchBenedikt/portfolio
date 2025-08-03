
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useAchievements } from './providers/achievements-provider';
import { Maximize, Minimize, CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { achievementsList, AchievementID } from '@/lib/achievements';
import { Textarea } from './ui/textarea';

interface HistoryItem {
  type: 'input' | 'output' | 'component';
  content: string | React.ReactNode;
  path?: string;
}

type GameType = 'none' | 'number_guesser' | 'typing_test' | 'tutorial' | 'nano';

type MissionStep = {
    prompt: string | (() => string);
    expected: string | string[] | ((input: string) => boolean);
    feedback?: string;
    onSuccess?: (input?: string) => void;
};

type Mission = {
    id: string;
    title: string;
    description: string;
    steps: MissionStep[];
    achievementId?: AchievementID;
};

const initialFileSystem = {
    'documents': {
        type: 'dir',
        children: {
            'about_me.txt': { type: 'file', content: 'Dies ist ein Portfolio von Benedikt Schächner, einem kreativen Entwickler.' },
        }
    },
    'projects.txt': { type: 'file', content: 'Projekt 1: Meum Diarium...\nProjekt 2: Technik-Blog...\nProjekt 3: Schulplattformen...' },
    'blog.txt': { type: 'file', content: 'Blog 1: Eigene KI hosten...\nBlog 2: Open WebUI installieren...' },
    'resume.txt': { type: 'file', content: 'Benedikt Schächner\nKompetenzen: LAMP, Docker, Next.js...' },
};

type GameState = {
  type: GameType;
  secretNumber?: number;
  attempts?: number;
  textToType?: string;
  startTime?: number;
  
  // Tutorial State
  missionId?: string;
  stepIndex?: number;

  // Nano State
  nanoFile?: string;
  nanoFilePath?: string[];
  nanoInitialContent?: string;
};

const initialHistory: HistoryItem[] = [
  { type: 'output', content: "Willkommen bei Benedikts interaktivem Terminal." },
  { type: 'output', content: "Tippe 'help' ein, um eine Liste der verfügbaren Befehle zu sehen, oder 'missions' für eine Liste der Lern-Missionen." },
];

const typingSentences = [
    "Der schnelle braune Fuchs springt über den faulen Hund.",
    "JavaScript ist eine vielseitige Skriptsprache für Web-Entwicklung.",
    "Kreativität ist Intelligenz, die Spaß hat.",
    "Ein guter Entwickler schreibt Code, den Menschen verstehen können.",
    "Next.js und React ermöglichen den Bau moderner Webanwendungen."
];

export const Terminal = () => {
  const { theme, setTheme } = useTheme();
  const { unlockAchievement, unlockedAchievements } = useAchievements();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [gameState, setGameState] = useState<GameState>({ type: 'none' });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [usedCommands, setUsedCommands] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  const [nanoContent, setNanoContent] = useState('');

  // --- File System State ---
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [currentPath, setCurrentPath] = useState<string[]>([]);


  // --- Missions Definition ---
  const missions: Mission[] = [
    {
        id: 'basics',
        title: 'Terminal Grundlagen',
        description: 'Lerne die grundlegendsten Befehle, um dich in einem Terminal zurechtzufinden.',
        achievementId: 'TERMINAL_TUTOR',
        steps: [
            {
                prompt: "Willkommen zur ersten Mission! Lass uns die Grundlagen lernen.\nTippe 'ls' ein, um die verfügbaren Bereiche aufzulisten.",
                expected: 'ls'
            },
            {
                prompt: "Gut gemacht! 'ls' (list) zeigt dir den Inhalt. Du siehst 'projects.txt', 'blog.txt' und 'resume.txt'.\nNun, wer bin ich überhaupt? Tippe 'whoami' ein.",
                expected: 'whoami'
            },
            {
                prompt: "Exzellent! 'whoami' gibt Infos über den Benutzer. Lass uns nun den Inhalt von 'resume.txt' ansehen. Tippe 'cat resume.txt'.",
                expected: 'cat resume.txt'
            },
            {
                prompt: "Perfekt! Du hast die Grundlagen gemeistert. Mit 'clear' leerst du den Bildschirm und mit 'help' siehst du alle Befehle.",
                expected: 'end'
            }
        ]
    },
    {
        id: 'processes',
        title: 'Prozess-Management',
        description: 'Lerne, wie man laufende Prozesse anzeigt und beendet. (Minispiel)',
        achievementId: 'SYSTEM_ADMIN',
        steps: [
            {
                prompt: () => {
                    const processes = [
                        { pid: 101, name: 'system-kernel' },
                        { pid: 234, name: 'music-player' },
                        { pid: 556, name: 'virus.exe' },
                        { pid: 782, name: 'text-editor' }
                    ].sort(() => Math.random() - 0.5);
                    setGameState(prev => ({ ...prev, missionData: { processes, virusPid: 556 } }));
                    return "Einige Prozesse laufen. Einer davon sieht verdächtig aus! Finde ihn und beende ihn.\nTippe 'ps' um die Prozessliste anzuzeigen.";
                },
                expected: 'ps'
            },
            {
                prompt: (input) => {
                    const { processes } = (gameState as any).missionData;
                    let processList = "PID\tProzess\n---\t-------\n";
                    processList += processes.map((p: any) => `${p.pid}\t${p.name}`).join('\n');
                    return `${processList}\n\nEin Prozess scheint schädlich zu sein. Beende ihn mit 'kill <PID>'.`;
                },
                expected: (input) => {
                    const { virusPid } = (gameState as any).missionData;
                    return input.trim() === `kill ${virusPid}`;
                },
                feedback: "Das war der falsche Prozess! Versuche es erneut."
            },
            {
                prompt: "Gute Arbeit, Agent! Du hast den Virus gestoppt und das System gerettet.",
                expected: 'end'
            }
        ]
    },
    {
        id: 'git',
        title: 'Open Source & Git',
        description: 'Verstehe die Grundlagen von Git und Open Source, indem du ein Projekt klonst.',
        achievementId: 'GIT_INITIATE',
        steps: [
            {
                prompt: "Open Source Software treibt die moderne Welt an. Git ist das wichtigste Werkzeug dafür.\nEin 'Repository' ist wie ein Ordner für ein Projekt. Lass uns eins 'klonen' (herunterladen).\nTippe: 'git clone my-first-repo'",
                expected: 'git clone my-first-repo',
                onSuccess: () => {
                   setGameState(prev => ({ ...prev, missionData: { ...prev.missionData, cloned: true } }));
                }
            },
            {
                prompt: "Erfolgreich geklont! Jetzt existiert ein neuer Ordner. \nBenutze 'ls', um den Inhalt des aktuellen Verzeichnisses anzuzeigen und den neuen Ordner zu finden.",
                expected: 'ls'
            },
             {
                prompt: (input) => {
                    return "Du siehst den Ordner 'my-first-repo'. Super!\nDu hast gelernt, wie man Code von anderen herunterlädt. Das ist die Basis von Open Source Kollaboration."
                },
                expected: 'end'
            }
        ]
    }
  ];

  useEffect(() => {
    try {
      const savedFullScreen = localStorage.getItem('terminalFullScreen');
      if (savedFullScreen) setIsFullScreen(JSON.parse(savedFullScreen));

      const savedCommands = localStorage.getItem('usedCommands');
      if(savedCommands) setUsedCommands(new Set(JSON.parse(savedCommands)));

    } catch (e) {
      console.error('Fehler beim Laden des Terminal-Zustands:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('terminalFullScreen', JSON.stringify(isFullScreen));
      localStorage.setItem('usedCommands', JSON.stringify(Array.from(usedCommands)));
    } catch (e) {
      console.error('Fehler beim Speichern des Terminal-Zustands:', e);
    }
  }, [isFullScreen, usedCommands]);


  useEffect(() => {
    inputRef.current?.focus();
  }, [gameState.type]);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);


  const checkCommandAchievement = (newCommand: string) => {
    const newCommands = new Set(usedCommands);
    newCommands.add(newCommand);
    setUsedCommands(newCommands);
    if (newCommands.size >= 5) {
      unlockAchievement('COMMAND_PRO');
    }
  };

  const resolvePath = (path: string) => {
    const segments = path.split('/').filter(p => p !== '');
    let newPath: string[] = [];

    if (path.startsWith('/')) {
        newPath = [];
    } else {
        newPath = [...currentPath];
    }
    
    for (const segment of segments) {
        if (segment === '..') {
            if (newPath.length > 0) newPath.pop();
        } else if (segment !== '.') {
            newPath.push(segment);
        }
    }
    return newPath;
  };

  const getDirectoryContents = (path: string[]) => {
      let current = fileSystem;
      for (const part of path) {
          if (current[part] && current[part].type === 'dir') {
              current = current[part].children as any;
          } else {
              return null; // Path does not exist or is not a directory
          }
      }
      return current;
  };

  const handleGameInput = (command: string) => {
    let newHistory: HistoryItem[] = [...history, { type: 'input', content: command, path: getPathString() }];
    let output: string | React.ReactNode = '';

    if (gameState.type === 'number_guesser') {
      const guess = parseInt(command, 10);
      if (isNaN(guess)) {
        output = "Das ist keine Zahl. Rate eine Zahl zwischen 1 und 100.";
      } else if (guess < gameState.secretNumber!) {
        output = 'Höher...';
        setGameState(prev => ({ ...prev, attempts: prev.attempts! + 1 }));
      } else if (guess > gameState.secretNumber!) {
        output = 'Niedriger...';
        setGameState(prev => ({ ...prev, attempts: prev.attempts! + 1 }));
      } else {
        output = `Du hast es in ${gameState.attempts! + 1} Versuchen erraten! Die Zahl war ${gameState.secretNumber}.`;
        unlockAchievement('GAMER');
        setGameState({ type: 'none' });
      }
    } else if (gameState.type === 'typing_test') {
        const endTime = Date.now();
        const timeTaken = (endTime - gameState.startTime!) / 1000; // in seconds
        const wordsTyped = gameState.textToType!.split(' ').length;
        const wpm = Math.round((wordsTyped / timeTaken) * 60);

        let correctChars = 0;
        for (let i = 0; i < command.length; i++) {
            if (command[i] === gameState.textToType![i]) {
                correctChars++;
            }
        }
        const accuracy = ((correctChars / gameState.textToType!.length) * 100).toFixed(2);
        
        output = `Test beendet!\n\n`
               + `  Geschwindigkeit: ${wpm} WPM\n`
               + `  Genauigkeit: ${accuracy}%\n`;
        
        if (parseFloat(accuracy) > 90 && wpm > 30) {
            output += `\nGut gemacht!`;
            unlockAchievement('KEYBOARD_VIRTUOSO');
        } else {
             output += `\nVersuch es nochmal, um den Erfolg freizuschalten! (WPM > 30, Genauigkeit > 90%)`;
        }
        setGameState({ type: 'none' });
    } else if(gameState.type === 'tutorial') {
        const mission = missions.find(m => m.id === gameState.missionId);
        if (!mission) {
            setGameState({ type: 'none' });
            return;
        }

        const step = mission.steps[gameState.stepIndex!];
        let isCorrect = false;

        if (typeof step.expected === 'string') {
            isCorrect = command.toLowerCase().trim() === step.expected;
        } else if (Array.isArray(step.expected)) {
            isCorrect = step.expected.includes(command.toLowerCase().trim());
        } else if (typeof step.expected === 'function') {
            isCorrect = step.expected(command.toLowerCase().trim());
        }

        if (isCorrect) {
            if (step.onSuccess) step.onSuccess(command);

            const nextStepIndex = gameState.stepIndex! + 1;
            if (nextStepIndex < mission.steps.length) {
                const nextStep = mission.steps[nextStepIndex];
                let prompt = typeof nextStep.prompt === 'function' ? nextStep.prompt(command) : nextStep.prompt;
                if (nextStep.expected === 'ps') { 
                     const { processes } = (gameState as any).missionData;
                    let processList = "PID\tProzess\n---\t-------\n";
                    processList += processes.map((p: any) => `${p.pid}\t${p.name}`).join('\n');
                    prompt = `${processList}\n\nEin Prozess scheint schädlich zu sein. Beende ihn mit 'kill <PID>'.`;
                }

                output = prompt;
                setGameState(prev => ({ ...prev, stepIndex: nextStepIndex }));

            } else {
                 output = `${mission.steps[mission.steps.length-1].prompt}\n\nMission '${mission.title}' abgeschlossen!`;
                 if (mission.achievementId) {
                    unlockAchievement(mission.achievementId);
                    output += `\nNeuer Erfolg freigeschaltet!`;
                 }
                 setGameState({ type: 'none' });
            }
        } else {
            output = `${step.feedback || 'Das war nicht ganz richtig. Versuche es nochmal.'}\n\n${typeof step.prompt === 'function' ? step.prompt(command) : step.prompt}`;
        }
    }
    
    setHistory([...newHistory, { type: 'output', content: output }]);
  }

  const handleCommand = (command: string) => {
    let newHistory: HistoryItem[] = [...history, { type: 'input', content: command, path: getPathString() }];
    const [cmd, ...args] = command.toLowerCase().split(' ');
    checkCommandAchievement(cmd);

    let output: string | React.ReactNode = '';
    let isComponent = false;

    switch (cmd) {
      case 'help':
        output = `Verfügbare Befehle:\n
  Lernen & Missionen:
  'missions'        - Zeigt alle verfügbaren Lern-Missionen an.
  'start <mission>' - Startet eine spezifische Mission (z.B. 'start basics').
  'tutorial'        - Startet die erste Mission ('basics').
  'exit'            - Bricht eine laufende Mission oder ein Spiel ab.

  Dateisystem:
  'ls'              - Zeigt den Inhalt des aktuellen Verzeichnisses an.
  'cd <verzeichnis>'- Wechselt in ein Verzeichnis (benutze '..' für übergeordnet).
  'pwd'             - Zeigt den aktuellen Pfad an.
  'cat <datei>'     - Zeigt den Inhalt einer Textdatei an.
  'nano <datei>'    - Öffnet einen einfachen Texteditor für eine Datei.

  Grundlagen:
  'clear'           - Leert den Terminal-Verlauf.
  'achievements'    - Zeigt deine freigeschalteten Erfolge.
  'theme <name>'    - Ändert Farbschema (dark, light).
  'whoami'          - Zeigt eine kurze Biografie und Systeminformationen an.
  'date'            - Zeigt das aktuelle Datum und die Uhrzeit an.
  'echo <text>'     - Gibt den Text im Terminal aus.
  'matrix'          - Betritt die Matrix...

  Spiele:
  'game'            - Startet das Zahlenratespiel.
  'typing-test'     - Startet einen Schreibgeschwindigkeitstest.
`;
        break;
      case 'whoami':
        const userAgent = navigator.userAgent;
        let os = "Unbekanntes OS";
        if (userAgent.indexOf("Win") != -1) os = "Windows";
        if (userAgent.indexOf("Mac") != -1) os = "Macintosh";
        if (userAgent.indexOf("Linux") != -1) os = "Linux";
        if (userAgent.indexOf("Android") != -1) os = "Android";
        if (userAgent.indexOf("like Mac") != -1) os = "iOS";
        
        output = `Benutzer: guest\n`
               + `Hostname: benedikt.dev\n`
               + `IP-Adresse: [Lokal]\n`
               + `OS: ${os}\n`
               + `Browser: ${userAgent.match(/(Firefox|Chrome|Safari|Opera|Edge)\/[\d\.]+/)?.[0] || 'Unbekannt'}\n`
               + `Sprache: ${navigator.language}\n`
               + `Auflösung: ${window.screen.width}x${window.screen.height}\n`
               + `Online: ${navigator.onLine ? 'Ja' : 'Nein'}\n`
               + `Standort: [Wird abgerufen...]`;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setHistory(prev => {
                    const lastOutput = prev[prev.length - 1];
                    if (lastOutput && typeof lastOutput.content === 'string' && lastOutput.content.includes('Standort: [Wird abgerufen...]')) {
                        const updatedContent = (lastOutput.content as string).replace('Standort: [Wird abgerufen...]', `Standort: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                        const updatedHistory = [...prev.slice(0, -1), { ...lastOutput, content: updatedContent }];
                        return updatedHistory;
                    }
                    return prev;
                });
            },
            (error) => {
                 setHistory(prev => {
                    const lastOutput = prev[prev.length - 1];
                    if (lastOutput && typeof lastOutput.content === 'string' && lastOutput.content.includes('Standort: [Wird abgerufen...]')) {
                        const updatedContent = (lastOutput.content as string).replace('Standort: [Wird abgerufen...]', `Standort: [Zugriff verweigert]`);
                         const updatedHistory = [...prev.slice(0, -1), { ...lastOutput, content: updatedContent }];
                        return updatedHistory;
                    }
                    return prev;
                });
            },
            { timeout: 5000 }
        );
        break;
      case 'ls':
        const dirContents = getDirectoryContents(currentPath);
        if (dirContents) {
            output = Object.keys(dirContents).map(key => {
                return dirContents[key].type === 'dir' ? `${key}/` : key;
            }).join('  ');
        } else {
            output = 'ls: Fehler beim Lesen des Verzeichnisses.';
        }
        if ((gameState as any)?.missionData?.cloned) {
             output += "\nmy-first-repo/"
        }
        break;
      case 'cd':
        const targetDir = args[0] || '';
        if (targetDir === '') {
            setCurrentPath([]); // cd to home
        } else if (targetDir === '..') {
            if (currentPath.length > 0) {
                setCurrentPath(prev => prev.slice(0, -1));
            }
        } else {
            const newPath = resolvePath(targetDir);
            const dir = getDirectoryContents(newPath);
            if (dir) {
                setCurrentPath(newPath);
                 if(newPath.length > 1) {
                    unlockAchievement('DEEP_DIVER');
                }
            } else {
                output = `cd: Verzeichnis nicht gefunden: ${targetDir}`;
            }
        }
        break;
       case 'pwd':
         output = `/${currentPath.join('/')}`;
         break;
       case 'cat':
        const catFile = args[0];
        if (!catFile) {
            output = 'cat: Dateiname fehlt.';
        } else {
            const dir = getDirectoryContents(currentPath);
            if (dir && dir[catFile] && dir[catFile].type === 'file') {
                output = (dir[catFile] as any).content;
            } else {
                output = `cat: Datei nicht gefunden: ${catFile}`;
            }
        }
        break;
       case 'nano':
         const nanoFile = args[0];
         if (!nanoFile) {
             output = 'nano: Dateiname fehlt.';
         } else {
             const dir = getDirectoryContents(currentPath);
             if (dir && dir[nanoFile] && dir[nanoFile].type === 'file') {
                const fileContent = (dir[nanoFile] as any).content;
                 setGameState({
                     type: 'nano',
                     nanoFile: nanoFile,
                     nanoFilePath: [...currentPath],
                     nanoInitialContent: fileContent,
                 });
                 setNanoContent(fileContent);
             } else if (dir) { // Create new file
                setGameState({
                     type: 'nano',
                     nanoFile: nanoFile,
                     nanoFilePath: [...currentPath],
                     nanoInitialContent: '',
                 });
                 setNanoContent('');
             } else {
                 output = `nano: Ungültiger Pfad.`;
             }
         }
         break;
      case 'achievements':
        isComponent = true;
        output = (
            <div className="space-y-2">
                <p>Freigeschaltete Erfolge ({unlockedAchievements.size}/{achievementsList.length}):</p>
                {achievementsList.map(ach => {
                    const isUnlocked = unlockedAchievements.has(ach.id);
                    return (
                        <div key={ach.id} className="flex items-center gap-2">
                            {isUnlocked ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                            <span className={cn(isUnlocked ? 'text-foreground' : 'text-muted-foreground')}>{ach.name}</span>
                        </div>
                    )
                })}
            </div>
        )
        break;
      case 'theme':
        const newTheme = args[0];
        if (['dark', 'light'].includes(newTheme)) {
          setTheme(newTheme);
          output = `Theme zu ${newTheme} geändert.`;
        } else {
          output = `Fehler: Theme '${newTheme}' nicht gefunden. Verfügbare Themes: dark, light.`;
        }
        break;
      case 'date':
        output = new Date().toLocaleString('de-DE');
        break;
      case 'echo':
        output = args.join(' ');
        break;
      case 'game':
        const numberToGuess = Math.floor(Math.random() * 100) + 1;
        setGameState({ type: 'number_guesser', secretNumber: numberToGuess, attempts: 0 });
        output = "Ich denke an eine Zahl zwischen 1 und 100. Versuche sie zu erraten!";
        break;
      case 'typing-test':
        const text = typingSentences[Math.floor(Math.random() * typingSentences.length)];
        setGameState({ type: 'typing_test', textToType: text, startTime: Date.now() });
        output = `Tippe den folgenden Satz so schnell wie möglich und drücke Enter:\n\n'${text}'`;
        break;
      case 'tutorial':
        const firstMission = missions[0];
        setGameState({ type: 'tutorial', missionId: firstMission.id, stepIndex: 0 });
        output = typeof firstMission.steps[0].prompt === 'function' ? firstMission.steps[0].prompt() : firstMission.steps[0].prompt;
        break;
      case 'missions':
        output = 'Verfügbare Missionen:\n\n' + missions.map(m => `  - ${m.id}: ${m.title}\n    ${m.description}`).join('\n\n') + "\n\nBenutze 'start <missions-name>', um eine zu beginnen.";
        break;
      case 'start':
        const missionId = args[0];
        const missionToStart = missions.find(m => m.id === missionId);
        if (missionToStart) {
            setGameState({ type: 'tutorial', missionId: missionToStart.id, stepIndex: 0, missionData: {} });
            const firstStep = missionToStart.steps[0];
            output = typeof firstStep.prompt === 'function' ? firstStep.prompt() : firstStep.prompt;
        } else {
            output = `Mission '${missionId}' nicht gefunden. Tippe 'missions', um alle verfügbaren Missionen zu sehen.`
        }
        break;
      case 'matrix':
        output = "Initialisiere...\n\nFolge dem weißen Kaninchen. 🐇";
        unlockAchievement('SECRET_FINDER');
        break;
       case 'ps':
         if (gameState.type === 'tutorial' && gameState.missionId === 'processes') {
            const { processes } = (gameState as any).missionData;
            let processList = "PID\tProzess\n---\t-------\n";
            processList += processes.map((p: any) => `${p.pid}\t${p.name}`).join('\n');
            output = `${processList}\n\nEin Prozess scheint schädlich zu sein. Beende ihn mit 'kill <PID>'.`;
         } else {
            output = "Dieser Befehl ist nur in der 'processes' Mission verfügbar.";
         }
         break;
      default:
        output = `Befehl nicht gefunden: ${command}. Tippe 'help' für eine Liste der Befehle.`;
    }

    if (output) {
        if (isComponent) {
            newHistory.push({ type: 'component', content: output });
        } else {
            newHistory.push({ type: 'output', content: output });
        }
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = input.trim();
    if (!command) return;
    
    const commandLower = command.toLowerCase();

    // Global commands that work in any state
    if (commandLower === 'clear') {
        setHistory([]);
        setInput('');
        return;
    }
    
    if (commandLower === 'exit') {
       let newHistory: HistoryItem[] = [...history, { type: 'input', content: command, path: getPathString() }];
      if (gameState.type !== 'none') {
        newHistory.push({ type: 'output', content: `Aktion '${gameState.type}' wurde abgebrochen.` });
        setGameState({ type: 'none' });
      } else {
        newHistory.push({ type: 'output', content: "Es ist keine Aktion aktiv, die beendet werden kann." });
      }
      setHistory(newHistory);
      setInput('');
      return;
    }

    if (gameState.type !== 'none') {
      handleGameInput(command);
    } else {
      handleCommand(command);
    }

    setInput('');
  };

  const handleTerminalClick = () => {
    if (gameState.type !== 'nano') {
        inputRef.current?.focus();
    }
  };

  const handleNanoExit = (save: boolean) => {
    let newHistory = [...history];
    if (save) {
        // This is a simplified way to update the file system state.
        // For a more robust solution, you'd use a deep copy and update utility.
        const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
        let current = newFileSystem;
        for (const part of gameState.nanoFilePath!) {
            current = current[part].children;
        }
        if (current[gameState.nanoFile!]) {
            current[gameState.nanoFile!].content = nanoContent;
        } else {
            // create new file
            current[gameState.nanoFile!] = { type: 'file', content: nanoContent };
        }

        setFileSystem(newFileSystem);
        newHistory.push({ type: 'output', content: `Datei '${gameState.nanoFile}' gespeichert.` });

        if(gameState.nanoInitialContent !== nanoContent){
            unlockAchievement('EDITOR_PRO');
        }
    } else {
        newHistory.push({ type: 'output', content: 'Änderungen verworfen.' });
    }
    
    setHistory(newHistory);
    setGameState({ type: 'none' });
  };


  const getPathString = () => `~/${currentPath.join('/')}`;
  const promptSymbol = gameState.type !== 'none' ? '>' : '$';
  const promptUser = 'guest@benedikt.dev';
  const promptPath = getPathString();

  if (gameState.type === 'nano') {
      return (
         <div className="fixed inset-0 bg-black text-white font-mono z-[100] flex flex-col p-2">
            <div className="bg-blue-700 text-center text-sm mb-1">
                Nano Editor - {gameState.nanoFile}
            </div>
            <Textarea
                value={nanoContent}
                onChange={(e) => setNanoContent(e.target.value)}
                className="flex-grow bg-black text-white border-none focus:ring-0 whitespace-pre-wrap"
                autoFocus
            />
            <div className="bg-blue-700 text-sm mt-1 flex justify-center gap-4">
                <span onClick={() => handleNanoExit(true)} className="cursor-pointer">^X Speichern & Schließen</span>
                <span onClick={() => handleNanoExit(false)} className="cursor-pointer">^C Abbrechen</span>
            </div>
         </div>
      );
  }


  return (
    <>
      {isFullScreen && <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-40" />}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          "flex flex-col bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden transition-all duration-300",
          isFullScreen
            ? 'fixed inset-0 z-50 w-screen h-screen rounded-none border-none'
            : 'relative h-[75vh] w-full max-w-5xl rounded-2xl border'
        )}
        onClick={handleTerminalClick}
      >
        <div className="absolute top-0 left-0 w-full flex items-center justify-between gap-2 p-4 bg-card/80 z-10">
          <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
          </div>
          <p className="text-center flex-1 text-muted-foreground text-sm font-mono select-none">/bin/bash - benedikt.dev</p>
          <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8" 
              onClick={(e) => {
                  e.stopPropagation();
                  setIsFullScreen(prev => !prev);
                }
              }
              data-cursor-interactive
          >
              {isFullScreen ? <Minimize className="w-4 h-4"/> : <Maximize className="w-4 h-4"/>}
              <span className="sr-only">Vollbild umschalten</span>
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto pr-4 pt-16 p-6 font-mono text-lg">
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === 'input' ? (
                <div className="flex">
                    <span className="text-green-400">{promptUser}:</span>
                    <span className="text-blue-400 mx-1">{item.path}</span>
                    <span className="text-primary font-bold mr-2">{promptSymbol}</span>
                    <span>{item.content as string}</span>
                </div>
              ) : item.type === 'output' ? (
                <span className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{item.content as string}</span>
              ) : (
                <div>{item.content}</div>
              )}
            </div>
          ))}
          <div ref={endOfHistoryRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex items-center font-mono text-lg p-6 border-t border-border/50 bg-card/80">
          <span className="text-green-400">{promptUser}:</span>
          <span className="text-blue-400 mx-1">{promptPath}</span>
          <span className="text-primary font-bold mr-2">{promptSymbol}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 outline-none"
            autoFocus
            autoComplete="off"
            disabled={gameState.type !== 'none'}
          />
        </form>
      </motion.div>
    </>
  );
};
