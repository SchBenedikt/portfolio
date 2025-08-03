
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAchievements } from './providers/achievements-provider';
import { projectData } from '@/lib/projects';
import { blogData } from '@/lib/blog';
import { Maximize, Minimize, CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { achievementsList } from '@/lib/achievements';

interface HistoryItem {
  type: 'input' | 'output' | 'component';
  content: string | React.ReactNode;
}

type GameState = {
  type: 'none' | 'number_guesser' | 'typing_test' | 'tutorial';
  secretNumber?: number;
  attempts?: number;
  textToType?: string;
  startTime?: number;
  tutorialStep?: number;
};

const initialHistory: HistoryItem[] = [
  { type: 'output', content: "Willkommen bei Benedikts interaktivem Terminal." },
  { type: 'output', content: "Tippe 'help' ein, um eine Liste der verfügbaren Befehle zu sehen." },
];

const typingSentences = [
    "Der schnelle braune Fuchs springt über den faulen Hund.",
    "JavaScript ist eine vielseitige Skriptsprache für Web-Entwicklung.",
    "Kreativität ist Intelligenz, die Spaß hat.",
    "Ein guter Entwickler schreibt Code, den Menschen verstehen können.",
    "Next.js und React ermöglichen den Bau moderner Webanwendungen."
];

const tutorialSteps = [
    { 
        prompt: "Willkommen zum Terminal-Tutorial! Lass uns die Grundlagen lernen.\nZuerst: Jede Zeile, die mit '$' beginnt, ist eine Eingabe von dir. Der Rest ist die Ausgabe des Computers.\n\nTippe 'ls' ein und drücke Enter, um die verfügbaren Bereiche aufzulisten.", 
        expected: "ls" 
    },
    { 
        prompt: "Gut gemacht! 'ls' steht für 'list' und zeigt dir den Inhalt eines Verzeichnisses. Du siehst 'projects', 'blog' und 'resume'.\n\nLass uns nun mehr über mich erfahren. Tippe 'whoami' ein.", 
        expected: "whoami" 
    },
    { 
        prompt: "Exzellent! 'whoami' gibt normalerweise den aktuellen Benutzer aus. Hier ist es eine kleine Bio.\n\nJetzt wollen wir den Inhalt von 'resume' ansehen. Der Befehl dafür ist 'cat' (concatenate). Tippe 'cat resume'.", 
        expected: "cat resume" 
    },
    {
        prompt: "Perfekt! Du hast die Grundlagen gelernt. Mit 'clear' kannst du den Bildschirm leeren und mit 'help' alle Befehle sehen.\n\nTutorial abgeschlossen! Du hast einen neuen Erfolg freigeschaltet.",
        expected: "end"
    }
];

export const Terminal = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { unlockAchievement, unlockedAchievements } = useAchievements();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [gameState, setGameState] = useState<GameState>({ type: 'none' });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [usedCommands, setUsedCommands] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

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
  }, []);

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

  const handleGameInput = (command: string) => {
    const newHistory: HistoryItem[] = [...history, { type: 'input', content: command }];
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
    }

    if (gameState.type === 'typing_test') {
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
    }

    if(gameState.type === 'tutorial') {
        const step = gameState.tutorialStep!;
        if (command.toLowerCase() === tutorialSteps[step].expected) {
            const nextStep = step + 1;
            if (nextStep < tutorialSteps.length) {
                output = tutorialSteps[nextStep].prompt;
                setGameState(prev => ({ ...prev, tutorialStep: nextStep }));
            } else {
                 output = tutorialSteps[step].prompt; // Show final message
                 unlockAchievement('TERMINAL_TUTOR');
                 setGameState({ type: 'none' });
            }
        } else {
            output = `Das war nicht ganz richtig. Versuche es nochmal.\n\n${tutorialSteps[step].prompt}`;
        }
    }
    
    setHistory([...newHistory, { type: 'output', content: output }]);
  }

  const handleCommand = (command: string) => {
    let newHistory: HistoryItem[] = [...history, { type: 'input', content: command }];
    const [cmd, ...args] = command.toLowerCase().split(' ');
    checkCommandAchievement(cmd);

    let output: string | React.ReactNode = '';
    let isComponent = false;

    switch (cmd) {
      case 'help':
        output = `Verfügbare Befehle:\n
  Grundlagen & Lernen:
  'tutorial'        - Startet ein interaktives Tutorial, um die Grundlagen zu lernen.
  'ls'              - Zeigt verfügbare Bereiche an (projects, resume, blog).
  'cat resume'      - Zeigt den Inhalt eines Bereichs an (z.B. den Lebenslauf).
  'clear'           - Leert den Terminal-Verlauf.
  
  Interaktion & Info:
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
        
        output = `Benutzer: Gast\n`
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
        const section = args[0];
        if (!section) {
          output = "Bereiche: projects, blog, resume. \nBenutze 'ls <bereich>', um den Inhalt aufzulisten.";
        } else if (section === 'projects') {
            output = 'Projekte:\n\n' + projectData.map(p => `  - ${p.title}:\n    ${p.description}`).join('\n\n');
        } else if (section === 'blog') {
             output = 'Blog:\n\n' + blogData.map(p => `  - ${p.title}:\n    ${p.description}`).join('\n\n');
        } else {
            output = `Fehler: Bereich '${section}' nicht gefunden. Verfügbare Bereiche: projects, resume, blog.`;
        }
        break;
      case 'cat':
        if(args[0] === 'resume') {
            output = `Benedikt Schächner\n`
            + `Pleiskirchen / Altötting, Bayern\n\n`
            + `Kompetenzen:\n`
            + `  - LAMP Stacks, Docker, Supabase, Nextcloud\n`
            + `  - Ollama / llama3, Open WebUI\n`
            + `  - WebGL / D3, React, GitOps, UI Motion\n\n`
            + `Vision & Motivation:\n`
            + `  - Digitale Souveränität, Edu-Tech mit Storytelling, und Teamwork.`
        } else {
            output = `Fehler: 'cat' kann nur mit 'resume' verwendet werden.`;
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
        setGameState({ type: 'tutorial', tutorialStep: 0 });
        output = tutorialSteps[0].prompt;
        break;
      case 'matrix':
        output = "Initialisiere...\n\nFolge dem weißen Kaninchen. 🐇";
        unlockAchievement('SECRET_FINDER');
        break;
      default:
        output = `Befehl nicht gefunden: ${command}. Tippe 'help' für eine Liste der Befehle.`;
    }

    if (isComponent) {
        newHistory.push({ type: 'component', content: output });
    } else {
        newHistory.push({ type: 'output', content: output });
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
        setHistory([{ type: 'input', content: command }]);
        setInput('');
        return;
    }
    
    if (commandLower === 'exit') {
       let newHistory: HistoryItem[] = [...history, { type: 'input', content: command }];
      if (gameState.type !== 'none') {
        newHistory.push({ type: 'output', content: 'Das Spiel wurde beendet.' });
        setGameState({ type: 'none' });
      } else {
        newHistory.push({ type: 'output', content: "Es ist kein Spiel aktiv, das beendet werden kann." });
      }
      setHistory(newHistory);
      setInput('');
      return;
    }

    if (gameState.type !== 'none') {
      handleGameInput(input);
    } else {
      handleCommand(command);
    }

    setInput('');
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const promptSymbol = gameState.type !== 'none' ? '>' : '$';

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
              <div className="w-3.h-3.5 rounded-full bg-yellow-500"></div>
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
                  <span className="text-primary font-bold mr-2">{item.content ? '$' : ''}</span>
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
          <span className="text-primary font-bold mr-2">{promptSymbol}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 outline-none"
            autoFocus
            autoComplete="off"
          />
        </form>
      </motion.div>
    </>
  );
};
