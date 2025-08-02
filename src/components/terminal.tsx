
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

const initialHistory: HistoryItem[] = [
  { type: 'output', content: "Welcome to Benedikt's interactive terminal." },
  { type: 'output', content: "Type 'help' to see the list of available commands." },
];

export const Terminal = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('terminalHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to load terminal history:", e);
      setHistory(initialHistory);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('terminalHistory', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save terminal history:", e);
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

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
      default:
        output = `Command not found: ${command}. Type 'help' for a list of commands.`;
    }
    
    setHistory([...newHistory, { type: 'output', content: output }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

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
                <span className="text-primary font-bold mr-2">$</span>
                <span className="flex-1">{item.content}</span>
              </div>
            ) : (
              <span className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{item.content}</span>
            )}
          </div>
        ))}
         <div ref={endOfHistoryRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center font-mono text-lg p-6 border-t border-border/50 bg-card/80">
        <span className="text-primary font-bold mr-2">$</span>
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
