
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAchievements } from './providers/achievements-provider';

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
  { type: 'output', content: "Welcome to Benedikt's interactive terminal." },
  { type: 'output', content: "Type 'help' to see the list of available commands." },
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
      console.error('Failed to load terminal history:', e);
      setHistory(initialHistory);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('terminalHistory', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save terminal history:', e);
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleGameInput = (command: string) => {
    const guess = parseInt(command, 10);
    let output = '';

    if (command.toLowerCase() === 'exit') {
      output = 'Exited the game.';
      setGameState({ isActive: false, secretNumber: 0, attempts: 0 });
    } else if (isNaN(guess)) {
      output = "That's not a number. Guess a number between 1 and 100, or type 'exit'.";
    } else if (guess < gameState.secretNumber) {
      output = 'Higher...';
      setGameState(prev => ({ ...prev, attempts: prev.attempts + 1 }));
    } else if (guess > gameState.secretNumber) {
      output = 'Lower...';
      setGameState(prev => ({ ...prev, attempts: prev.attempts + 1 }));
    } else {
      output = `You guessed it in ${gameState.attempts + 1} attempts! The number was ${gameState.secretNumber}.`;
      unlockAchievement('GAMER');
      setGameState({ isActive: false, secretNumber: 0, attempts: 0 });
    }
    
    setHistory(prev => [...prev, { type: 'input', content: command }, { type: 'output', content: output }]);
  }

  const handleCommand = (command: string) => {
    const newHistory: HistoryItem[] = [...history, { type: 'input', content: command }];
    const [cmd, ...args] = command.toLowerCase().split(' ');

    let output = '';

    switch (cmd) {
      case 'help':
        output = `Available commands:\n
  'nav <page>'    - Navigate to a page (projects, resume, blog)
  'theme <name>'  - Change the color theme (dark, light)
  'whoami'        - Display a short bio
  'socials'       - Show social media links
  'game'          - Start the number guessing game
  'date'          - Show the current date and time
  'echo <text>'   - Print text to the terminal
  'matrix'        - Enter the matrix...
  'clear'         - Clear the terminal history`;
        break;
      case 'whoami':
        output = 'Benedikt Schächner - Creative Developer & Designer shaping unique digital experiences.';
        break;
      case 'nav':
        const page = args[0];
        if (['projects', 'resume', 'blog', ''].includes(page) || page === undefined) {
          router.push(`/${page || ''}`);
          output = `Navigating to /${page || ''}...`;
        } else {
          output = `Error: Page '${page}' not found. Available pages: projects, resume, blog.`;
        }
        break;
      case 'theme':
        const newTheme = args[0];
        if (['dark', 'light'].includes(newTheme)) {
          setTheme(newTheme);
          output = `Theme changed to ${newTheme}.`;
        } else {
          output = `Error: Theme '${newTheme}' not found. Available themes: dark, light.`;
        }
        break;
      case 'socials':
        output = 'GitHub: github.com/user\nLinkedIn: linkedin.com/in/user\nTwitter: twitter.com/user\n(Note: These are dummy links)';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'date':
        output = new Date().toLocaleString();
        break;
      case 'echo':
        output = args.join(' ');
        break;
      case 'game':
        const numberToGuess = Math.floor(Math.random() * 100) + 1;
        setGameState({ isActive: true, secretNumber: numberToGuess, attempts: 0 });
        output = "I'm thinking of a number between 1 and 100. Try to guess it! Type 'exit' to quit.";
        break;
      case 'matrix':
        output = "Initializing...\n\nFollow the white rabbit. 🐇";
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for a list of commands.`;
    }

    setHistory([...newHistory, { type: 'output', content: output }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (gameState.isActive) {
      handleGameInput(input.trim());
    } else {
      handleCommand(input.trim());
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
                <span className="text-primary font-bold mr-2">{item.content.startsWith('>') ? '>' : '$'}</span>
                <span className="flex-1">{item.content.substring(item.content.startsWith('>') ? 2 : 0)}</span>
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
