
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

export const Terminal = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: "Welcome to Benedikt's interactive terminal." },
    { type: 'output', content: "Type 'help' to see the list of available commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

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
          'nav <page>'    - Navigate to a page (projects, resume, blog)\n
          'theme <name>'  - Change the color theme (dark, light, system)\n
          'whoami'        - Display a short bio\n
          'clear'         - Clear the terminal history\n
          'socials'       - Show social media links`;
        break;
      case 'whoami':
        output = 'Benedikt Schächner - Creative Developer & Designer.';
        break;
      case 'nav':
        const page = args[0];
        if (['projects', 'resume', 'blog'].includes(page)) {
          output = `Navigating to /${page}...`;
          router.push(`/${page}`);
        } else {
          output = `Error: Page '${page}' not found. Available pages: projects, resume, blog.`;
        }
        break;
      case 'theme':
        const newTheme = args[0];
         if (['dark', 'light', 'system'].includes(newTheme)) {
            setTheme(newTheme);
            output = `Theme changed to ${newTheme}.`;
        } else {
            output = `Error: Theme '${newTheme}' not found. Available themes: dark, light, system.`;
        }
        break;
      case 'socials':
        output = 'You can find me on GitHub, LinkedIn, and Twitter. (Note: These are dummy links for now)';
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
    <div 
        className="relative flex flex-col h-[70vh] max-w-4xl mx-auto mt-24 p-6 border rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden"
        onClick={handleTerminalClick}
    >
      <div className="absolute top-0 left-4 flex gap-2 p-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
       <div className="flex-grow overflow-y-auto pr-4 font-mono text-lg">
        {history.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="whitespace-pre-wrap"
          >
            {item.type === 'input' ? (
              <div className="flex">
                <span className="text-primary mr-2">$</span>
                <span>{item.content}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">{item.content}</span>
            )}
          </motion.div>
        ))}
         <div ref={endOfHistoryRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center font-mono text-lg mt-4">
        <span className="text-primary mr-2">$</span>
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
    </div>
  );
};
