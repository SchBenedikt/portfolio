
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useAchievements } from './providers/achievements-provider';
import { Maximize, Minimize, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface TerminalProps {
  onExit: () => void;
}

interface HistoryItem {
  type: 'input' | 'output';
  content: string;
  path: string;
}

type GameType = 'none' | 'number_guesser' | 'typing_test' | 'matrix';

const initialHistory: HistoryItem[] = [
  { type: 'output', content: "Willkommen bei Benedikts interaktivem Terminal.", path: '~' },
  { type: 'output', content: "Tippe 'help' ein, um eine Liste der verfügbaren Befehle zu sehen.", path: '~' },
];

const typingSentences = [
    "Der schnelle braune Fuchs springt über den faulen Hund.",
    "JavaScript ist eine vielseitige Skriptsprache für Web-Entwicklung.",
    "Kreativität ist Intelligenz, die Spaß hat.",
    "Ein guter Entwickler schreibt Code, den Menschen verstehen können.",
    "Next.js und React ermöglichen den Bau moderner Webanwendungen."
];


export const Terminal = ({ onExit }: TerminalProps) => {
  const { theme, setTheme } = useTheme();
  const { unlockAchievement } = useAchievements();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [gameState, setGameState] = useState<GameType>('none');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [usedCommands, setUsedCommands] = useState<Set<string>>(new Set());

  // Game State
  const [secretNumber, setSecretNumber] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [textToType, setTextToType] = useState('');
  const [typingStartTime, setTypingStartTime] = useState(0);


  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (gameState === 'matrix' && matrixCanvasRef.current) {
        const canvas = matrixCanvasRef.current;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array.from({ length: columns }).map(() => Math.floor(Math.random() * canvas.height));

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0'; 
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const animate = () => {
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }
  }, [gameState]);


  const checkCommandAchievement = (newCommand: string) => {
    const newCommands = new Set(usedCommands);
    newCommands.add(newCommand);
    setUsedCommands(newCommands);
    if (newCommands.size >= 5) {
      unlockAchievement('COMMAND_PRO');
    }
  };

  const handleGameInput = (command: string) => {
    let newHistory = [...history, { type: 'input', content: command, path: '~' } as HistoryItem];
    let output = '';

    if (gameState === 'number_guesser') {
      const guess = parseInt(command, 10);
      if (isNaN(guess)) {
        output = "Das ist keine Zahl. Rate eine Zahl zwischen 1 und 100.";
      } else if (guess < secretNumber) {
        output = 'Höher...';
        setAttempts(prev => prev + 1);
      } else if (guess > secretNumber) {
        output = 'Niedriger...';
        setAttempts(prev => prev + 1);
      } else {
        output = `Du hast es in ${attempts + 1} Versuchen erraten! Die Zahl war ${secretNumber}.`;
        unlockAchievement('GAMER');
        setGameState('none');
      }
    } else if (gameState === 'typing_test') {
        const endTime = Date.now();
        const timeTaken = (endTime - typingStartTime) / 1000; // in seconds
        const wordsTyped = textToType.split(' ').length;
        const wpm = Math.round((wordsTyped / timeTaken) * 60);

        let correctChars = 0;
        for (let i = 0; i < command.length; i++) {
            if (command[i] === textToType[i]) {
                correctChars++;
            }
        }
        const accuracy = ((correctChars / textToType.length) * 100).toFixed(2);
        
        output = `Test beendet!\n\n`
               + `  Geschwindigkeit: ${wpm} WPM\n`
               + `  Genauigkeit: ${accuracy}%\n`;
        
        if (parseFloat(accuracy) > 90 && wpm > 30) {
            output += `\nGut gemacht!`;
            unlockAchievement('KEYBOARD_VIRTUOSO');
        } else {
             output += `\nVersuch es nochmal, um den Erfolg freizuschalten! (WPM > 30, Genauigkeit > 90%)`;
        }
        setGameState('none');
    }
    
    setHistory([...newHistory, { type: 'output', content: output, path: '~' }]);
  }

  const handleCommand = (command: string) => {
    let newHistory = [...history, { type: 'input', content: command, path: '~' } as HistoryItem];
    const [cmd, ...args] = command.split(' ');
    checkCommandAchievement(cmd);

    let output = '';

    switch (cmd.toLowerCase()) {
      case 'help':
        output = "Verfügbare Befehle: 'clear', 'achievements', 'theme <name>', 'whoami', 'date', 'echo <text>', 'matrix', 'game', 'typing-test', 'exit'";
        break;
      case 'whoami':
        output = 'Du bist ein neugieriger Besucher auf meinem Portfolio. Willkommen!';
        break;
      case 'achievements':
        output = 'Erfolge werden bald hier angezeigt. Besuche den Footer, um sie jetzt zu sehen!';
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
      case 'matrix':
        setGameState('matrix');
        unlockAchievement('SECRET_FINDER');
        output = "Initialisiere...";
        break;
      case 'game':
        const numberToGuess = Math.floor(Math.random() * 100) + 1;
        setSecretNumber(numberToGuess);
        setAttempts(0);
        setGameState('number_guesser');
        output = "Ich denke an eine Zahl zwischen 1 und 100. Versuche sie zu erraten!";
        break;
      case 'typing-test':
        const text = typingSentences[Math.floor(Math.random() * typingSentences.length)];
        setTextToType(text);
        setTypingStartTime(Date.now());
        setGameState('typing_test');
        output = `Tippe den folgenden Satz so schnell wie möglich und drücke Enter:\n\n'${text}'`;
        break;
      case 'exit':
         if (gameState !== 'none') {
           setGameState('none');
           output = 'Spiel/Modus beendet.';
         } else {
           output = 'Es läuft gerade kein Spiel, das beendet werden kann.';
         }
         break;
      default:
        if (cmd) {
            output = `Befehl nicht gefunden: ${command}. Tippe 'help' für eine Liste der Befehle.`;
        }
    }

    setHistory([...newHistory, { type: 'output', content: output, path: '~' }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = input.trim();
    if (!command && gameState !== 'typing_test') return;
    
    const commandLower = command.toLowerCase();

    if (commandLower === 'clear') {
        setHistory([]);
        setInput('');
        return;
    }

    if (gameState !== 'none' && gameState !== 'matrix') {
      handleGameInput(command);
    } else {
      handleCommand(command);
    }

    setInput('');
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const promptSymbol = '>';
  const promptUser = 'guest@benedikt.dev:';
  const promptPath = '~';

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
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-card/80 z-10 border-b">
          <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600" onClick={(e) => { e.stopPropagation(); onExit(); }} data-cursor-interactive><X className="w-2 h-2"/></Button>
              <Button variant="ghost" size="icon" className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600" onClick={(e) => e.stopPropagation()} data-cursor-interactive></Button>
              <Button variant="ghost" size="icon" className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600" onClick={(e) => { e.stopPropagation(); setIsFullScreen(prev => !prev);}} data-cursor-interactive>
                 {isFullScreen ? <Minimize className="w-2 h-2"/> : <Maximize className="w-2 h-2"/>}
              </Button>
          </div>
          <p className="text-center flex-1 text-muted-foreground text-sm font-mono select-none">/bin/bash - benedikt.dev</p>
          <div className="w-20" />
        </div>
        
        {gameState === 'matrix' ? (
             <canvas ref={matrixCanvasRef} className="absolute inset-0 w-full h-full z-0" />
        ) : (
            <div className="flex-grow overflow-y-auto pr-4 pt-4 p-6 font-mono text-lg">
                {history.map((item, index) => (
                    <div key={index} className="mb-2">
                    {item.type === 'input' ? (
                        <div>
                        <span>
                            <span className="text-green-400">{promptUser}</span>
                            <span className="text-blue-400">{item.path}</span>
                            <span className="text-foreground">{promptSymbol} </span>
                        </span>
                        <span className="text-foreground">{item.content}</span>
                        </div>
                    ) : (
                        <span className="text-muted-foreground whitespace-pre-wrap">{item.content}</span>
                    )}
                    </div>
                ))}
                 <div ref={endOfHistoryRef} />
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-center p-4 font-mono text-lg border-t border-border/50 bg-card/80 z-10">
          <div className="flex-shrink-0">
            <span className="text-green-400">{promptUser}</span>
            <span className="text-blue-400">{promptPath}</span>
            <span className="text-foreground">{promptSymbol} </span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 outline-none text-foreground pl-2"
            autoFocus
            autoComplete="off"
            disabled={gameState === 'matrix'}
          />
        </form>
      </motion.div>
    </>
  );
};
