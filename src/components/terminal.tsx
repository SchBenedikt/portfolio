
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useAchievements } from './providers/achievements-provider';
import { Maximize, Minimize, CheckCircle, Lock, X } from 'lucide-react';
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
    'projects': {
        type: 'dir',
        children: {
           'meum_diarium.txt': { type: 'file', content: 'Ein kreatives Crossmedia-Projekt, das Julius Cäsars Feldherr-Geschichte im Stil eines modernen Influencer-Blogs erzählt.' },
           'technik-blog.txt': { type: 'file', content: 'Ein Self-Hosting Blog mit Anleitungen zum lokalen Betrieb von KI-Modellen wie Llama3 mit Ollama und Docker.' }
        }
    },
    'README.md': { type: 'file', content: "Willkommen im Dateisystem! Benutze 'ls', 'cd' und 'cat', um dich umzusehen." },
};

type FileSystemNode = {
    type: 'file';
    content: string;
} | {
    type: 'dir';
    children: { [key: string]: FileSystemNode };
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
  missionData?: any;

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
  const [isMounted, setIsMounted] = useState(false);

  // --- File System State ---
  const [fileSystem, setFileSystem] = useState<{ [key: string]: FileSystemNode }>(initialFileSystem);
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
                prompt: "Gut gemacht! 'ls' (list) zeigt dir den Inhalt. \nWechsle mit 'cd documents' in den Ordner 'documents'.",
                expected: 'cd documents'
            },
            {
                prompt: "Exzellent! Du bist jetzt in 'documents'. Sieh dir den Inhalt mit 'ls' an.",
                expected: 'ls'
            },
            {
                prompt: "Super! Nun lies den Inhalt von 'about_me.txt' mit 'cat about_me.txt'.",
                expected: 'cat about_me.txt'
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
                    setFileSystem(prevFs => {
                        const newFs = { ...prevFs };
                        newFs['my-first-repo'] = { type: 'dir', children: { 'README.md': { type: 'file', content: 'Dies ist ein geklontes Repo!' } } };
                        return newFs;
                    });
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
      
      const savedFileSystem = localStorage.getItem('terminalFileSystem');
      if (savedFileSystem) {
        setFileSystem(JSON.parse(savedFileSystem));
      }

    } catch (e) {
      console.error('Fehler beim Laden des Terminal-Zustands:', e);
      // Bei Fehler auf initialen Zustand zurückfallen
      setFileSystem(initialFileSystem);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if(!isMounted) return;
    try {
      localStorage.setItem('terminalFullScreen', JSON.stringify(isFullScreen));
      localStorage.setItem('usedCommands', JSON.stringify(Array.from(usedCommands)));
      localStorage.setItem('terminalFileSystem', JSON.stringify(fileSystem));
    } catch (e) {
      console.error('Fehler beim Speichern des Terminal-Zustands:', e);
    }
  }, [isFullScreen, usedCommands, fileSystem, isMounted]);


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

  const getDirectoryByPath = (startNode: any, path: string[]) => {
    let current = startNode;
    for (const part of path) {
      if (current && current.type === 'dir' && current.children[part]) {
        current = current.children[part];
      } else {
        return null; // Path does not exist or is not a directory
      }
    }
    return current;
  };

  const getDirectoryContents = (path: string[]) => {
    if (path.length === 0) {
      return fileSystem;
    }
    const dir = getDirectoryByPath({ type: 'dir', children: fileSystem }, path);
    return dir && dir.type === 'dir' ? dir.children : null;
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
        const commandLower = command.toLowerCase().trim();

        if (typeof step.expected === 'string') {
            isCorrect = commandLower === step.expected;
        } else if (Array.isArray(step.expected)) {
            isCorrect = step.expected.includes(commandLower);
        } else if (typeof step.expected === 'function') {
            isCorrect = step.expected(commandLower);
        }

        if (isCorrect) {
            if (step.onSuccess) step.onSuccess(command);

            // Handle actual command execution within tutorial
            if (commandLower.startsWith('cd ')) {
                handleCommand(command, true);
                 output = ''; // Prevent double output
            } else if(commandLower.startsWith('ls')) {
                 handleCommand(command, true);
                 output = ''; // Prevent double output
            } else if(commandLower.startsWith('cat')) {
                 handleCommand(command, true);
                 output = ''; // Prevent double output
            }

            const nextStepIndex = gameState.stepIndex! + 1;
            if (nextStepIndex < mission.steps.length) {
                const nextStep = mission.steps[nextStepIndex];
                let prompt = typeof nextStep.prompt === 'function' ? nextStep.prompt(command) : nextStep.prompt;
                if(output === '') {
                    output = prompt;
                } else {
                    newHistory.push({ type: 'output', content: output });
                    output = prompt;
                }
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
            let promptText = typeof step.prompt === 'function' ? step.prompt(command) : step.prompt;
            output = `${step.feedback || 'Das war nicht ganz richtig. Versuche es nochmal.'}\n\n${promptText}`;
        }
    }
    
    setHistory([...newHistory, { type: 'output', content: output }]);
  }

  const handleCommand = (command: string, fromTutorial = false) => {
    let newHistory = fromTutorial ? [...history] : [...history, { type: 'input', content: command, path: getPathString() }];
    const [cmd, ...args] = command.trim().split(' ');
    const cmdLower = cmd.toLowerCase();

    if(!fromTutorial) checkCommandAchievement(cmdLower);

    let output: string | React.ReactNode = '';
    let isComponent = false;

    switch (cmdLower) {
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
  'mkdir <ordner>'  - Erstellt ein neues Verzeichnis.
  'touch <datei>'   - Erstellt eine neue, leere Datei.
  'rm <datei>'      - Löscht eine Datei.
  'view <datei>'    - Öffnet eine erstellte Datei in einem neuen Tab.

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
            output = Object.entries(dirContents).map(([key, value]) => {
                return value.type === 'dir' ? `${key}/` : key;
            }).join('  ');
             if(output === '') output = 'Verzeichnis ist leer.';
        } else {
            output = `ls: Fehler beim Lesen des Verzeichnisses: /${currentPath.join('/')}`;
        }
        break;
      case 'cd':
        const targetDir = args[0] || '';
        if (targetDir === '') {
            setCurrentPath([]);
        } else if (targetDir === '..') {
            if (currentPath.length > 0) {
                setCurrentPath(prev => prev.slice(0, -1));
            }
        } else {
            const currentDirContents = getDirectoryContents(currentPath);
            if (currentDirContents && currentDirContents[targetDir] && currentDirContents[targetDir].type === 'dir') {
                 setCurrentPath(prev => [...prev, targetDir]);
                 if(currentPath.length >= 1) { // Achievement for going at least one level deep
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
                output = (dir[catFile] as any).content || 'Datei ist leer.';
            } else if (dir && dir[catFile] && dir[catFile].type === 'dir') {
                 output = `cat: '${catFile}' ist ein Verzeichnis.`;
            }
            else {
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
             const file = dir ? dir[nanoFile] : null;

             if(file && file.type === 'dir') {
                output = `nano: '${nanoFile}' ist ein Verzeichnis.`;
             } else {
                const fileContent = file ? (file as any).content : '';
                 setGameState({
                     type: 'nano',
                     nanoFile: nanoFile,
                     nanoFilePath: [...currentPath],
                     nanoInitialContent: fileContent,
                 });
                 setNanoContent(fileContent);
                 output = ''; // Prevent default output
             }
         }
         break;
      case 'mkdir':
        const dirName = args[0];
        if (!dirName) {
            output = 'mkdir: Name für Verzeichnis fehlt.';
        } else {
            const newFs = JSON.parse(JSON.stringify(fileSystem));
            let current = { children: newFs };
            for(const part of currentPath) {
                current = current.children[part];
            }
            if(current.children[dirName]) {
                output = `mkdir: '${dirName}' existiert bereits.`;
            } else {
                current.children[dirName] = { type: 'dir', children: {} };
                setFileSystem(newFs);
            }
        }
        break;
      case 'touch':
        const touchFile = args[0];
        if (!touchFile) {
            output = 'touch: Dateiname fehlt.';
        } else {
            const newFs = JSON.parse(JSON.stringify(fileSystem));
             let current = { children: newFs };
             for(const part of currentPath) {
                 current = current.children[part];
             }
            if(!current.children[touchFile]) {
                current.children[touchFile] = { type: 'file', content: '' };
                setFileSystem(newFs);
            }
        }
        break;
      case 'rm':
        const rmFile = args[0];
        if (!rmFile) {
            output = 'rm: Dateiname fehlt.';
        } else {
            const newFs = JSON.parse(JSON.stringify(fileSystem));
             let current = { children: newFs };
             for(const part of currentPath) {
                 current = current.children[part];
             }
            if (current.children[rmFile] && current.children[rmFile].type === 'file') {
                delete current.children[rmFile];
                setFileSystem(newFs);
            } else if (current.children[rmFile] && current.children[rmFile].type === 'dir') {
                output = `rm: '${rmFile}' ist ein Verzeichnis. (Nicht unterstützt)`;
            } else {
                output = `rm: Datei nicht gefunden: ${rmFile}`;
            }
        }
        break;
      case 'view':
        const viewFile = args[0];
        if(!viewFile) {
            output = 'view: Dateiname fehlt.';
        } else {
            const dir = getDirectoryContents(currentPath);
            if (dir && dir[viewFile] && dir[viewFile].type === 'file') {
                const path = [...currentPath, viewFile].join('/');
                window.open(`/view/${path}`, '_blank');
                output = `Öffne '${viewFile}' in einem neuen Tab...`;
            } else {
                 output = `view: Datei nicht gefunden oder ist ein Verzeichnis: ${viewFile}`;
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
                            {isUnlocked ? <CheckCircle className="h-4 w-4 text-primary" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
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
      case 'start':
        const missionId = cmdLower === 'tutorial' ? 'basics' : args[0];
        const missionToStart = missions.find(m => m.id === missionId);
        if (missionToStart) {
            setGameState({ type: 'tutorial', missionId: missionToStart.id, stepIndex: 0, missionData: {} });
            const firstStep = missionToStart.steps[0];
            output = typeof firstStep.prompt === 'function' ? firstStep.prompt() : firstStep.prompt;
        } else {
            output = `Mission '${missionId}' nicht gefunden. Tippe 'missions', um alle verfügbaren Missionen zu sehen.`
        }
        break;
      case 'missions':
        output = 'Verfügbare Missionen:\n\n' + missions.map(m => `  - ${m.id}: ${m.title}\n    ${m.description}`).join('\n\n') + "\n\nBenutze 'start <missions-name>', um eine zu beginnen.";
        break;
      case 'matrix':
        output = "Initialisiere...\n\nFolge dem weißen Kaninchen. 🐇";
        unlockAchievement('SECRET_FINDER');
        break;
       case 'ps':
         if (gameState.type === 'tutorial' && gameState.missionId === 'processes') {
            handleGameInput(command);
            return;
         } else {
            output = "Dieser Befehl ist nur in der 'processes' Mission verfügbar.";
         }
         break;
       case 'git':
        if(gameState.type === 'tutorial' && gameState.missionId === 'git' && command.toLowerCase().includes('clone')) {
            handleGameInput(command);
            return;
        } else {
             output = `Befehl nicht gefunden: ${command}. Tippe 'help' für eine Liste der Befehle.`;
        }
        break;
      case 'exit':
        let exitMessage = '';
         if (gameState.type !== 'none' && gameState.type !== 'tutorial') {
           exitMessage = `Aktion '${gameState.type}' wurde abgebrochen.`
           setGameState({ type: 'none' });
         } else if (gameState.type === 'tutorial') {
           exitMessage = `Mission '${gameState.missionId}' wurde abgebrochen.`;
           setGameState({ type: 'none' });
         } else {
           exitMessage = "Es ist keine Aktion aktiv, die beendet werden kann.";
         }
         output = exitMessage;
         break;
      default:
        if (cmd) {
            output = `Befehl nicht gefunden: ${command}. Tippe 'help' für eine Liste der Befehle.`;
        }
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
    if (!command && gameState.type !== 'typing_test') return;
    
    const commandLower = command.toLowerCase();

    if (commandLower === 'clear') {
        setHistory([]);
        setInput('');
        return;
    }

    if (gameState.type !== 'none' && gameState.type !== 'nano') {
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
    if (save && gameState.nanoFile) {
        const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
        
        let currentLevel = newFileSystem;
        if (gameState.nanoFilePath && gameState.nanoFilePath.length > 0) {
            let current = { children: newFileSystem };
             for (const part of gameState.nanoFilePath) {
                 current = current.children[part];
             }
            currentLevel = current.children;
        }

        if (currentLevel[gameState.nanoFile]) {
            (currentLevel[gameState.nanoFile] as FileSystemNode & { content: string }).content = nanoContent;
        } else {
            currentLevel[gameState.nanoFile] = { type: 'file', content: nanoContent };
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
    setTimeout(() => inputRef.current?.focus(), 0);
  };


  const getPathString = () => `~${currentPath.length > 0 ? '/' : ''}${currentPath.join('/')}`;
  const promptSymbol = '$';
  const promptUser = 'guest@benedikt.dev';
  const promptPath = getPathString();

  if (!isMounted) {
    return <div className="h-[75vh] w-full max-w-5xl rounded-2xl bg-card animate-pulse" />;
  }
  
  if (gameState.type === 'nano') {
      return (
         <div className={cn(
            "fixed inset-0 bg-background/90 backdrop-blur-sm z-[100] p-4 flex items-center justify-center",
            isFullScreen ? 'p-4' : 'p-8'
         )}>
             <motion.div 
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              className="flex flex-col bg-card shadow-2xl shadow-primary/10 overflow-hidden rounded-lg border w-full h-full max-w-6xl">
                <div className="bg-primary/80 text-primary-foreground text-center py-2 text-sm font-semibold">
                    Nano Editor - {gameState.nanoFile}
                </div>
                <Textarea
                    value={nanoContent}
                    onChange={(e) => setNanoContent(e.target.value)}
                    className="flex-grow bg-background text-foreground border-none focus:ring-0 whitespace-pre-wrap rounded-none font-mono text-base"
                    autoFocus
                />
                <div className="bg-card border-t border-border/50 p-2 flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => handleNanoExit(false)} data-cursor-interactive>Abbrechen</Button>
                    <Button onClick={() => handleNanoExit(true)} data-cursor-interactive>Speichern & Schließen</Button>
                </div>
             </motion.div>
         </div>
      );
  }


  return (
    <>
      <motion.div
        layout
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
        <div className="flex items-center justify-between gap-2 px-4 py-3 bg-card/80 z-10 border-b">
          <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-600" onClick={(e) => e.stopPropagation()} data-cursor-interactive><X className="w-3 h-3"/></Button>
              <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
              <div className="w-6 h-6 rounded-full bg-green-500"></div>
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
        <div className="flex-grow overflow-y-auto pr-4 pt-4 p-6 font-mono text-lg">
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === 'input' ? (
                <div className="flex flex-wrap">
                    <span className="text-primary">{promptUser}</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-cyan-400">{item.path}</span>
                    <span className="text-foreground font-bold mr-2 ml-1">{promptSymbol}</span>
                    <span className="text-foreground break-all">{item.content as string}</span>
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
        <form onSubmit={handleSubmit} className="flex items-center font-mono text-lg p-4 border-t border-border/50 bg-card/80">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-primary">{promptUser}</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-cyan-400">{promptPath}</span>
            <span className="text-foreground font-bold mr-2 ml-1">{promptSymbol}</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 outline-none text-foreground pl-2"
            autoFocus
            autoComplete="off"
            disabled={gameState.type !== 'none' && gameState.type !== 'tutorial'}
          />
        </form>
      </motion.div>
    </>
  );
};
