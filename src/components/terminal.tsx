
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAchievements } from './providers/achievements-provider';
import { projectData } from '@/lib/projects';
import { blogData } from '@/lib/blog';

interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

type GameState = {
  isActive: boolean;
  secretNumber: number;
  attempts: number;
};

const initialHistory: HistoryItem[] = [
  { type: 'output', content: "Willkommen bei Benedikts interaktivem Terminal." },
  { type: 'output', content: "Tippe 'help' ein, um eine Liste der verfügbaren Befehle zu sehen." },
];

export const Terminal = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { unlockAchievement } = useAchievements();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [gameState, setGameState] = useState<GameState>({ isActive: false, secretNumber: 0, attempts: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('terminalHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Fehler beim Laden des Terminal-Verlaufs:', e);
      setHistory(initialHistory);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('terminalHistory', JSON.stringify(history));
    } catch (e) {
      console.error('Fehler beim Speichern des Terminal-Verlaufs:', e);
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleGameInput = (command: string) => {
    const newHistory: HistoryItem[] = [...history, { type: 'input', content: command }];
    const guess = parseInt(command, 10);
    let output = '';

    if (command.toLowerCase() === 'exit') {
      output = 'Das Spiel wurde beendet.';
      setGameState({ isActive: false, secretNumber: 0, attempts: 0 });
    } else if (isNaN(guess)) {
      output = "Das ist keine Zahl. Rate eine Zahl zwischen 1 und 100, oder tippe 'exit'.";
    } else if (guess < gameState.secretNumber) {
      output = 'Höher...';
      setGameState(prev => ({ ...prev, attempts: prev.attempts + 1 }));
    } else if (guess > gameState.secretNumber) {
      output = 'Niedriger...';
      setGameState(prev => ({ ...prev, attempts: prev.attempts + 1 }));
    } else {
      output = `Du hast es in ${gameState.attempts + 1} Versuchen erraten! Die Zahl war ${gameState.secretNumber}.`;
      unlockAchievement('GAMER');
      setGameState({ isActive: false, secretNumber: 0, attempts: 0 });
    }
    
    setHistory([...newHistory, { type: 'output', content: output }]);
  }

  const handleCommand = (command: string) => {
    const newHistory: HistoryItem[] = [...history, { type: 'input', content: command }];
    const [cmd, ...args] = command.toLowerCase().split(' ');

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
        setGameState({ isActive: true, secretNumber: numberToGuess, attempts: 0 });
        output = "Ich denke an eine Zahl zwischen 1 und 100. Versuche sie zu erraten! Tippe 'exit' zum Beenden.";
        break;
      case 'matrix':
        output = "Initialisiere...\n\nFolge dem weißen Kaninchen. 🐇";
        break;
      default:
        output = `Befehl nicht gefunden: ${command}. Tippe 'help' für eine Liste der Befehle.`;
    }

    setHistory([...newHistory, { type: 'output', content: output }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = input.trim();
    if (!command) return;
    
    if (gameState.isActive) {
      handleGameInput(command);
    } else {
      handleCommand(command);
    }

    setInput('');
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const promptSymbol = gameState.isActive ? '>' : '$';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative flex flex-col h-[75vh] max-w-5xl mx-auto mt-24 border rounded-2xl bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden"
      onClick={handleTerminalClick}
    >
      <div className="absolute top-0 left-0 w-full flex items-center gap-2 p-4 bg-card/80">
        <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
        <p className="text-center flex-1 text-muted-foreground text-sm font-mono">/bin/bash - benedikt.dev</p>
      </div>
      <div className="flex-grow overflow-y-auto pr-4 pt-16 p-6 font-mono text-lg">
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {item.type === 'input' ? (
              <div className="flex">
                <span className="text-primary font-bold mr-2">{promptSymbol}</span>
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
  );
};
