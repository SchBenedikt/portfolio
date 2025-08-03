
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAchievements } from './providers/achievements-provider';
import { projectData } from '@/lib/projects';
import { blogData } from '@/lib/blog';
import { Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

type GameState = {
  type: 'none' | 'number_guesser' | 'typing_test';
  secretNumber?: number;
  attempts?: number;
  textToType?: string;
  startTime?: number;
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

export const Terminal = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { unlockAchievement } = useAchievements();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [gameState, setGameState] = useState<GameState>({ type: 'none' });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [usedCommands, setUsedCommands] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('terminalHistory');
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      
      const savedFullScreen = localStorage.getItem('terminalFullScreen');
      if (savedFullScreen) setIsFullScreen(JSON.parse(savedFullScreen));

      const savedCommands = localStorage.getItem('usedCommands');
      if(savedCommands) setUsedCommands(new Set(JSON.parse(savedCommands)));

    } catch (e) {
      console.error('Fehler beim Laden des Terminal-Zustands:', e);
      setHistory(initialHistory);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('terminalHistory', JSON.stringify(history));
      localStorage.setItem('terminalFullScreen', JSON.stringify(isFullScreen));
      localStorage.setItem('usedCommands', JSON.stringify(Array.from(usedCommands)));
    } catch (e) {
      console.error('Fehler beim Speichern des Terminal-Zustands:', e);
    }
  }, [history, isFullScreen, usedCommands]);

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
    let output = '';

    if (command.toLowerCase() === 'exit') {
        output = 'Das Spiel wurde beendet.';
        setGameState({ type: 'none' });
        setHistory([...newHistory, { type: 'output', content: output }]);
        return;
    }

    if (gameState.type === 'number_guesser') {
      const guess = parseInt(command, 10);
      if (isNaN(guess)) {
        output = "Das ist keine Zahl. Rate eine Zahl zwischen 1 und 100, oder tippe 'exit'.";
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
    
    setHistory([...newHistory, { type: 'output', content: output }]);
  }

  const handleCommand = (command: string) => {
    const newHistory: HistoryItem[] = [...history, { type: 'input', content: command }];
    const [cmd, ...args] = command.toLowerCase().split(' ');
    checkCommandAchievement(cmd);

    let output = '';

    switch (cmd) {
      case 'help':
        output = `Verfügbare Befehle:\n
  'ls'              - Zeigt verfügbare Bereiche an (projects, resume, blog).
  'ls <bereich>'    - Listet den Inhalt eines Bereichs auf.
  'cat resume'      - Zeigt den Lebenslauf an.
  'theme <name>'    - Ändere das Farbschema (dark, light).
  'whoami'          - Zeige eine kurze Biografie an.
  'socials'         - Zeige Social-Media-Links an.
  'game'            - Starte das Zahlenratespiel.
  'typing-test'     - Starte einen Schreibgeschwindigkeitstest.
  'date'            - Zeige das aktuelle Datum und die Uhrzeit an.
  'echo <text>'     - Gib den Text im Terminal aus.
  'matrix'          - Betritt die Matrix...
  'clear'           - Leere den Terminal-Verlauf.`;
        break;
      case 'whoami':
        output = 'Benedikt Schächner - Creative Developer & Designer, der einzigartige digitale Erlebnisse gestaltet.';
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
      case 'nav':
        output = "Befehl 'nav' ist veraltet. Benutze 'ls' und 'cat', um Inhalte anzuzeigen.";
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
      case 'socials':
        output = 'GitHub: github.com/user\nLinkedIn: linkedin.com/in/user\nTwitter: twitter.com/user\n(Hinweis: Dies sind Dummy-Links)';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'date':
        output = new Date().toLocaleString('de-DE');
        break;
      case 'echo':
        output = args.join(' ');
        break;
      case 'game':
        const numberToGuess = Math.floor(Math.random() * 100) + 1;
        setGameState({ type: 'number_guesser', secretNumber: numberToGuess, attempts: 0 });
        output = "Ich denke an eine Zahl zwischen 1 und 100. Versuche sie zu erraten! Tippe 'exit' zum Beenden.";
        break;
       case 'typing-test':
        const text = typingSentences[Math.floor(Math.random() * typingSentences.length)];
        setGameState({ type: 'typing_test', textToType: text, startTime: Date.now() });
        output = `Tippe den folgenden Satz so schnell wie möglich und drücke Enter:\n\n'${text}'`;
        break;
      case 'matrix':
        output = "Initialisiere...\n\nFolge dem weißen Kaninchen. 🐇";
        unlockAchievement('SECRET_FINDER');
        break;
      default:
        output = `Befehl nicht gefunden: ${command}. Tippe 'help' für eine Liste der Befehle.`;
    }

    setHistory([...newHistory, { type: 'output', content: output }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = input.trim();
    if (!command && gameState.type === 'none') return;
    
    if (gameState.type !== 'none') {
      handleGameInput(input); // use raw input for typing test
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
                  <span className="text-primary font-bold mr-2">{item.content ? '$' : ''}</span>
                  <span>{item.content}</span>
                </div>
              ) : (
                <span className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{item.content}</span>
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
