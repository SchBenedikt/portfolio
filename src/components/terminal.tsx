
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useAchievements } from './providers/achievements-provider';
import { Maximize, Minimize, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useThemeColor } from '@/hooks/use-theme-color';
import { articlesData } from '@/lib/articles';

interface TerminalProps {
  onExit: () => void;
}

interface HistoryItem {
  type: 'input' | 'output';
  content: string;
  path: string;
}

type FileSystemNode = {
    type: 'file';
    content: string;
} | {
    type: 'dir';
    children: { [key: string]: FileSystemNode };
};


type GameType = 'none' | 'number_guesser' | 'typing_test' | 'matrix';
type LoginState = 'prompting' | 'logging_in' | 'loggedin';

const initialFileSystem: { [key: string]: FileSystemNode } = {
    'README.md': { 
        type: 'file', 
        content: "Willkommen!\n\nDies ist ein interaktives Terminal. Tippe 'help', um mehr zu erfahren.\nDu kannst Dateien und Ordner erstellen und bearbeiten.\n\nProbiere: 'ls', 'cd presse', 'ls', 'cat <artikelname>', 'cd ..'" 
    },
    'projekte': {
        type: 'dir',
        children: {
            'notio.txt': { type: 'file', content: 'Notio - Webbasierte App zur Verwaltung schulischer Leistungsdaten. Mehr unter /projects/notio' },
            'meum-diarium.txt': { type: 'file', content: 'Meum Diarium - Preisgekröntes Crossmedia-Projekt. Mehr unter /projects/meum-diarium' }
        }
    },
    'presse': {
        type: 'dir',
        children: articlesData.reduce((acc, article) => {
            const fileName = article.title.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 50) + '.txt';
            const fileContent = `Titel: ${article.title}\nQuelle: ${article.source}\nDatum: ${article.date}\nLink: ${article.url}\n\n${article.description}`;
            acc[fileName] = { type: 'file', content: fileContent };
            return acc;
        }, {} as { [key: string]: FileSystemNode })
    }
};

const typingSentences = [
    "Der schnelle braune Fuchs springt über den faulen Hund.",
    "JavaScript ist eine vielseitige Skriptsprache für Web-Entwicklung.",
    "Kreativität ist Intelligenz, die Spaß hat.",
    "Ein guter Entwickler schreibt Code, den Menschen verstehen können.",
    "Next.js und React ermöglichen den Bau moderner Webanwendungen."
];

export const Terminal = ({ onExit }: TerminalProps) => {
  const { setTheme } = useTheme();
  const { unlockAchievement } = useAchievements();
  const { setThemeColor } = useThemeColor();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [gameState, setGameState] = useState<GameType>('none');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [usedCommands, setUsedCommands] = useState<Set<string>>(new Set());
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [fileSystem, setFileSystem] = useState<{ [key: string]: FileSystemNode }>(initialFileSystem);
  
  const [isNanoMode, setIsNanoMode] = useState(false);
  const [nanoFile, setNanoFile] = useState<{ path: string[], content: string }>({ path: [], content: '' });

  const [loginState, setLoginState] = useState<LoginState>('prompting');
  const [username, setUsername] = useState<string | null>(null);

  const [terminalTheme, setTerminalTheme] = useState({
    user: 'text-green-400',
    path: 'text-blue-400',
  });


  // Game State
  const [secretNumber, setSecretNumber] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [textToType, setTextToType] = useState('');
  const [typingStartTime, setTypingStartTime] = useState(0);


  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const nanoTextareaRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    try {
        const savedFileSystem = localStorage.getItem('terminalFileSystem');
        if (savedFileSystem) {
            // Merge saved FS with initial FS to get new articles
            const parsedFS = JSON.parse(savedFileSystem);
            // a bit complex merge, for now just override
            // A better approach would be to only store user-created files
            // and merge them with a static initial file system.
            // For now, let's just use the initial one if new articles are present.
            if (!parsedFS.presse) {
                 setFileSystem({...parsedFS, ...initialFileSystem});
            } else {
                 setFileSystem(parsedFS);
            }
        } else {
            setFileSystem(initialFileSystem);
        }

        const savedUsername = localStorage.getItem('terminalUsername');
        if (savedUsername) {
            setUsername(savedUsername);
            setHistory([
                { type: 'output', content: `Willkommen zurück, ${savedUsername}!`, path: '~' },
                { type: 'output', content: "Tippe 'help' für eine Liste der Befehle.", path: '~' }
            ]);
            setLoginState('loggedin');
        } else {
            setHistory([{ type: 'output', content: "Bitte gib deinen Namen ein:", path: '~' }]);
        }
    } catch (e) {
        console.error("Could not load from local storage", e)
        setFileSystem(initialFileSystem);
        setHistory([{ type: 'output', content: "Bitte gib deinen Namen ein:", path: '~' }]);
    }
  }, []);

  const saveFileSystem = useCallback((fs: { [key: string]: FileSystemNode }) => {
      try {
        localStorage.setItem('terminalFileSystem', JSON.stringify(fs));
      } catch (e) {
        console.error("Could not save filesystem to local storage", e);
      }
  }, []);

  useEffect(() => {
    if (isNanoMode) {
      nanoTextareaRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [isNanoMode]);

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

  const resolvePath = (path: string): string[] => {
    const segments = path.split('/').filter(p => p && p !== '.');
    let newPath = path.startsWith('/') ? [] : [...currentPath];

    for (const segment of segments) {
        if (segment === '..') {
            if (newPath.length > 0) {
              newPath.pop();
            }
        } else {
            newPath.push(segment);
        }
    }
    return newPath;
  };

  const getNodeByPath = (path: string[]): FileSystemNode | null => {
      let current: FileSystemNode = { type: 'dir', children: fileSystem };
      for (const part of path) {
          if (current.type === 'dir' && current.children[part]) {
              current = current.children[part];
          } else {
              return null;
          }
      }
      return current;
  };
  
  const handleGameInput = (command: string) => {
    let newHistory = [...history, { type: 'input', content: command, path: `~/${currentPath.join('/')}` } as HistoryItem];
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
    
    setHistory([...newHistory, { type: 'output', content: output, path: `~/${currentPath.join('/')}` }]);
  }
  
  const handleCommand = (command: string) => {
    let newHistory = [...history, { type: 'input', content: command, path: `~/${currentPath.join('/')}` } as HistoryItem];
    const [cmd, ...args] = command.split(' ');
    checkCommandAchievement(cmd);

    let output = '';

    switch (cmd.toLowerCase()) {
      case 'help':
        output = `Verfügbare Befehle:

  Allgemein
  --------------------
  help              - Zeigt diese Hilfe an
  clear             - Leert den Terminalverlauf
  exit              - Beendet ein laufendes Spiel/Modus
  logout            - Setzt den Benutzernamen zurück
  reset             - Setzt ALLE Einstellungen und Daten zurück

  System
  --------------------
  whoami            - Zeigt den aktuellen Benutzer an
  date              - Zeigt das aktuelle Datum und die Uhrzeit an
  echo <text>       - Gibt den angegebenen Text aus
  theme <color>     - Ändert die Akzentfarbe der Seite (z.B. red, blue, green)
  mode <dark|light>   - Ändert das Farbschema des Portfolios

  Dateisystem
  --------------------
  ls [pfad]         - Listet Dateien und Ordner auf
  cd <pfad>         - Wechselt das Verzeichnis
  cat <datei>       - Zeigt den Inhalt einer Datei an
  touch <datei>     - Erstellt eine leere Datei
  mkdir <ordner>    - Erstellt einen neuen Ordner
  rm <datei>        - Löscht eine Datei oder einen leeren Ordner
  nano <datei>      - Öffnet einen einfachen Texteditor
  view <datei>      - Öffnet die Datei in einem neuen Tab

  Spiele & Spaß
  --------------------
  matrix            - Startet einen geheimen Modus
  game              - Startet das Zahlenratespiel
  typing-test       - Startet den Schreibgeschwindigkeitstest`;
        break;
      case 'reset':
        output = "Alle Einstellungen werden zurückgesetzt. Das Terminal wird neu gestartet...";
        setHistory([...newHistory, { type: 'output', content: output, path: `~/${currentPath.join('/')}` }]);
        try {
            localStorage.removeItem('terminalUsername');
            localStorage.removeItem('terminalFileSystem');
            localStorage.removeItem('unlockedAchievements');
            localStorage.removeItem('theme-color');
            localStorage.removeItem('cookie-consent');
        } catch (e) {
            console.error("Could not clear local storage", e);
        }
        setTimeout(() => window.location.reload(), 1500);
        return;
      case 'whoami':
        output = `${username}@benedikt.dev`;
        break;
      case 'logout':
        localStorage.removeItem('terminalUsername');
        setUsername(null);
        setLoginState('prompting');
        setHistory([{ type: 'output', content: 'Erfolgreich abgemeldet.', path: '~' }, { type: 'output', content: "Bitte gib deinen Namen ein:", path: '~' }]);
        return;
      case 'mode':
        const newMode = args[0];
        if (['dark', 'light'].includes(newMode)) {
          setTheme(newMode);
          output = `Theme zu ${newMode} geändert.`;
        } else {
          output = `Fehler: Mode '${newMode}' nicht gefunden. Verfügbare Modes: dark, light.`;
        }
        break;
      case 'theme':
        const color = args[0];
        if (['red', 'blue', 'green'].includes(color)) {
          setThemeColor(color as 'red' | 'blue' | 'green');
          output = `Akzentfarbe zu ${color} geändert.`;
        } else {
          output = `Fehler: Farbe '${color}' nicht erkannt. Verfügbar: red, blue, green.`;
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
      case 'ls':
        const targetPathLs = args[0] ? resolvePath(args[0]) : currentPath;
        const nodeLs = getNodeByPath(targetPathLs);
        if (nodeLs && nodeLs.type === 'dir') {
            output = Object.keys(nodeLs.children).map(name => {
                return nodeLs.children[name].type === 'dir' ? `${name}/` : name;
            }).join('  ');
            if (!output) output = "Leerer Ordner";
        } else {
            output = `ls: '${args[0] || '.'}': Kein solcher Ordner`;
        }
        break;
      case 'cd':
        if (!args[0] || args[0] === '~' || args[0] === '~/') {
            setCurrentPath([]);
            break;
        }
        const targetPathCd = resolvePath(args[0]);
        const nodeCd = getNodeByPath(targetPathCd);
        if (nodeCd && nodeCd.type === 'dir') {
            setCurrentPath(targetPathCd);
        } else {
            output = `cd: ${args[0]}: Kein solcher Ordner`;
        }
        break;
      case 'cat':
        if (!args[0]) {
            output = "cat: Bitte gib eine Datei an.";
            break;
        }
        const targetPathCat = resolvePath(args[0]);
        const nodeCat = getNodeByPath(targetPathCat);
        if (nodeCat && nodeCat.type === 'file') {
            output = nodeCat.content;
        } else {
            output = `cat: ${args[0]}: Keine solche Datei oder ist ein Ordner.`;
        }
        break;
      case 'touch':
      case 'mkdir':
      case 'rm':
      case 'nano':
      case 'view':
        const pathArg = args[0];
        if (!pathArg) {
            output = `${cmd}: Bitte gib einen Pfad an.`;
            break;
        }

        // Create deep copy to modify
        const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
        const resolvedPath = resolvePath(pathArg);
        const itemName = resolvedPath[resolvedPath.length - 1];
        const parentPath = resolvedPath.slice(0, -1);
        
        let parentRef: { [key: string]: FileSystemNode } = newFileSystem;
        let parentNode: FileSystemNode | null = { type: 'dir', children: newFileSystem };

        for (const part of parentPath) {
            const current = parentRef[part];
            if (current && current.type === 'dir') {
                parentRef = current.children;
                parentNode = current;
            } else {
                parentNode = null;
                break;
            }
        }
        
        if (!parentNode || parentNode.type !== 'dir') {
            output = `${cmd}: ${pathArg}: Pfad nicht gefunden.`;
            break;
        }

        const targetRef = parentNode.children;

        switch(cmd) {
            case 'touch':
                if (targetRef[itemName]) {
                    output = `touch: '${pathArg}' existiert bereits.`;
                } else {
                    targetRef[itemName] = { type: 'file', content: '' };
                    setFileSystem(newFileSystem);
                    saveFileSystem(newFileSystem);
                }
                break;
            case 'mkdir':
                if (targetRef[itemName]) {
                    output = `mkdir: '${pathArg}' existiert bereits.`;
                } else {
                    targetRef[itemName] = { type: 'dir', children: {} };
                    setFileSystem(newFileSystem);
                    saveFileSystem(newFileSystem);
                }
                break;
            case 'rm':
                const itemToRemove = targetRef[itemName];
                if (!itemToRemove) {
                    output = `rm: '${pathArg}': Keine solche Datei oder Ordner`;
                } else if (itemToRemove.type === 'dir' && Object.keys(itemToRemove.children).length > 0) {
                     output = `rm: '${pathArg}': Ordner ist nicht leer.`;
                }
                else {
                    delete targetRef[itemName];
                    setFileSystem(newFileSystem);
                    saveFileSystem(newFileSystem);
                }
                break;
            case 'nano':
                const nodeToEdit = targetRef[itemName];
                if (nodeToEdit && nodeToEdit.type === 'dir') {
                    output = `nano: ${pathArg}: Ist ein Ordner.`;
                } else {
                    const content = nodeToEdit ? nodeToEdit.content : '';
                    setNanoFile({ path: resolvedPath, content: content });
                    setIsNanoMode(true);
                }
                break;
            case 'view':
                 const nodeToView = getNodeByPath(resolvedPath);
                 if (nodeToView && nodeToView.type === 'file') {
                    window.open(`/view/${resolvedPath.join('/')}`, '_blank');
                    output = `Datei wird in neuem Tab geöffnet...`;
                 } else {
                    output = `view: ${pathArg}: Datei nicht gefunden oder ist ein Ordner.`
                 }
                 break;
        }
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
    
    if (output) {
      setHistory([...newHistory, { type: 'output', content: output, path: `~/${currentPath.join('/')}` }]);
    } else {
      setHistory(newHistory);
    }
  };

  const handleNanoSave = () => {
    const { path, content } = nanoFile;
    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));

    let currentRef: any = { children: newFileSystem };
    for (let i = 0; i < path.length - 1; i++) {
        const part = path[i];
        if (!currentRef.children[part] || currentRef.children[part].type !== 'dir') {
             // This case should ideally not be hit if nano is called on valid paths
            currentRef.children[part] = { type: 'dir', children: {} };
        }
        currentRef = currentRef.children[part];
    }
    
    const itemName = path[path.length - 1];
    currentRef.children[itemName] = { type: 'file', content: content };
    
    setFileSystem(newFileSystem);
    saveFileSystem(newFileSystem);
    setIsNanoMode(false);
    setHistory([...history, { type: 'output', content: `Datei '${path.join('/')}' gespeichert.`, path: `~/${currentPath.join('/')}` }]);
  };

  const handleNanoCancel = () => {
    setIsNanoMode(false);
  };
  
  const handleLogin = (name: string) => {
    setHistory(prev => [...prev, { type: 'input', content: name, path: '~' }]);
    setUsername(name);
    try {
        localStorage.setItem('terminalUsername', name);
    } catch(e) {
        console.error("Could not save username to local storage", e);
    }
    setLoginState('logging_in');
  
    let tempHistory = [...history, { type: 'input', content: name, path: '~' }];
    
    const showMessage = (text: string, delay: number) => {
        return new Promise(resolve => {
            setTimeout(() => {
                tempHistory.push({ type: 'output', content: text, path: '~' });
                setHistory([...tempHistory]);
                resolve(null);
            }, delay);
        });
    };

    async function runLoginSequence() {
        await showMessage('Authentifiziere...', 500);
        await showMessage('Prüfe Anmeldeinformationen...', 1000);
        await showMessage(`Zugriff gewährt.`, 500);
        await showMessage(`Willkommen, ${name}!`, 500);
        await showMessage("Tippe 'help' für eine Liste der Befehle.", 500);
        setLoginState('loggedin');
    }
    
    runLoginSequence();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = input.trim();
    
    if (loginState !== 'loggedin') {
        if (command) handleLogin(command);
        setInput('');
        return;
    }

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
    if(!isNanoMode) {
      inputRef.current?.focus();
    }
  };

  const promptUser = username ? `${username}@benedikt.dev:` : 'gast@benedikt.dev:';
  const promptPath = `~/${currentPath.join('/')}`;

  if (isNanoMode) {
    return (
        <motion.div
            layout
            className="flex flex-col bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden relative h-[85vh] w-full max-w-5xl rounded-2xl border md:h-[75vh]"
        >
            <div className="p-2 border-b text-center text-sm text-muted-foreground bg-card/80">
                Nano Editor - {nanoFile.path.join('/')}
            </div>
            <textarea
                ref={nanoTextareaRef}
                value={nanoFile.content}
                onChange={(e) => setNanoFile({ ...nanoFile, content: e.target.value })}
                className="w-full h-full bg-background/50 text-foreground font-mono p-4 text-base md:text-lg focus:outline-none resize-none"
            />
            <div className="flex justify-end gap-2 p-2 border-t bg-card/80">
                <Button onClick={handleNanoSave} size="sm" data-cursor-interactive>Speichern & Schließen</Button>
                <Button onClick={handleNanoCancel} variant="outline" size="sm" data-cursor-interactive>Abbrechen</Button>
            </div>
        </motion.div>
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
            : 'relative h-[85vh] w-full max-w-5xl rounded-2xl border md:h-[75vh]'
        )}
        onClick={handleTerminalClick}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-card/80 z-10 border-b">
          <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600" onClick={(e) => { e.stopPropagation(); onExit(); }} data-cursor-interactive></Button>
              <Button variant="ghost" size="icon" className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600" onClick={(e) => e.stopPropagation()} data-cursor-interactive></Button>
              <Button variant="ghost" size="icon" className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600" onClick={(e) => { e.stopPropagation(); setIsFullScreen(prev => !prev);}} data-cursor-interactive></Button>
          </div>
          <p className="text-center flex-1 text-muted-foreground text-sm font-mono select-none">/bin/bash - benedikt.dev</p>
          <div className="w-20" />
        </div>
        
        {gameState === 'matrix' ? (
             <canvas ref={matrixCanvasRef} className="absolute inset-0 w-full h-full z-0" />
        ) : (
            <div className="flex-grow overflow-y-auto pr-4 pt-4 p-4 md:p-6 font-mono text-base md:text-lg">
                {history.map((item, index) => (
                    <div key={index} className="mb-2">
                    {item.type === 'input' ? (
                        <div>
                        <span className="flex-shrink-0">
                            <span className={terminalTheme.user}>{item.path === '~' && loginState !== 'loggedin' ? 'name:' : promptUser}</span>
                            {loginState === 'loggedin' && <span className={terminalTheme.path}>{item.path}</span>}
                            <span className="text-foreground"> $ </span>
                        </span>
                        <span className="text-foreground break-words">{item.content}</span>
                        </div>
                    ) : (
                        <span className="text-muted-foreground whitespace-pre-wrap break-words">{item.content}</span>
                    )}
                    </div>
                ))}
                 {loginState === 'logging_in' && <span className="text-muted-foreground animate-pulse">_</span>}
                 <div ref={endOfHistoryRef} />
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-center p-4 font-mono text-base md:text-lg border-t border-border/50 bg-card/80 z-10">
          {loginState !== 'logging_in' && (
            <>
              <div className="flex-shrink-0">
                {loginState === 'loggedin' ? (
                   <>
                    <span className={terminalTheme.user}>{promptUser}</span>
                    <span className={terminalTheme.path}>{promptPath}</span>
                   </>
                ) : (
                   <span className={terminalTheme.user}>name:</span> 
                )}
                <span className="text-foreground">$ </span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 outline-none text-foreground pl-2"
                autoFocus
                autoComplete="off"
                disabled={gameState === 'matrix' || loginState === 'logging_in'}
              />
            </>
          )}
        </form>
      </motion.div>
    </>
  );
};
