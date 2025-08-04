
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Coffee, BookOpen, Timer as TimerIcon, ArrowLeft, KeyRound, Check, Copy, Flag, Palette, RefreshCw, Scale, Clock, Search, Wand2, Thermometer, Weight, Ruler, ListTodo, Trash2 } from 'lucide-react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateText } from '@/ai/flows/textGeneratorFlow';
import { GenerateTextInput } from '@/ai/flows/types';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const initialTools = [
  { id: 'pomodoro', name: 'Pomodoro Timer', icon: <BookOpen className="w-8 h-8" />, component: PomodoroTimer },
  { id: 'timer', name: 'Timer', icon: <TimerIcon className="w-8 h-8" />, component: SimpleTimer },
  { id: 'stopwatch', name: 'Stoppuhr', icon: <Clock className="w-8 h-8" />, component: Stopwatch },
  { id: 'converter', name: 'Einheitenumrechner', icon: <Scale className="w-8 h-8" />, component: UnitConverter },
  { id: 'password', name: 'Passwort-Generator', icon: <KeyRound className="w-8 h-8" />, component: PasswordGenerator },
  { id: 'palette', name: 'Farbpalette', icon: <Palette className="w-8 h-8" />, component: ColorPaletteGenerator },
  { id: 'text-generator', name: 'KI-Textgenerator', icon: <Wand2 className="w-8 h-8" />, component: TextGenerator },
  { id: 'todo', name: 'Todo Liste', icon: <ListTodo className="w-8 h-8" />, component: Todo },
];

type Tool = typeof initialTools[number];
type ToolId = Tool['id'] | null;


const timeSettings = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [time, setTime] = useState(timeSettings[mode]);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setTime(timeSettings[mode]);
    setIsActive(false);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsActive(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(timeSettings[mode]);
  };

  const selectMode = (newMode: TimerMode) => {
    setMode(newMode);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const progress = (time / timeSettings[mode]) * 100;

  return (
    <Card className="rounded-3xl shadow-lg w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-headline">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <div className="relative w-64 h-64">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-muted"
                    strokeWidth="7"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                />
                <motion.circle
                    className="text-primary"
                    strokeWidth="7"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100) }}
                    transition={{ duration: 1, ease: 'linear' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                 <h2 className="text-6xl font-bold font-mono">{formatTime(time)}</h2>
            </div>
        </div>
        <div className="flex gap-2">
          <Button variant={mode === 'pomodoro' ? 'default' : 'outline'} onClick={() => selectMode('pomodoro')} data-cursor-interactive>
            <BookOpen className="mr-2"/> Pomodoro
          </Button>
          <Button variant={mode === 'shortBreak' ? 'default' : 'outline'} onClick={() => selectMode('shortBreak')} data-cursor-interactive>
             <Coffee className="mr-2"/> Kurze Pause
          </Button>
          <Button variant={mode === 'longBreak' ? 'default' : 'outline'} onClick={() => selectMode('longBreak')} data-cursor-interactive>
             <Coffee className="mr-2"/> Lange Pause
          </Button>
        </div>
        <div className="flex gap-4">
          <Button onClick={toggleTimer} size="lg" className="rounded-full w-32 text-xl py-8" data-cursor-interactive>
            {isActive ? <Pause /> : <Play />}
            <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
          </Button>
          <Button onClick={resetTimer} size="lg" variant="secondary" className="rounded-full w-32 text-xl py-8" data-cursor-interactive>
            <RotateCcw />
            <span className="ml-2">Reset</span>
          </Button>
        </div>
      </CardContent>
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-clear-announce-tones-2861.mp3" />
    </Card>
  );
};

function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const { unlockAchievement } = useAchievements();

    const generatePassword = useCallback(() => {
        let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        
        let newPassword = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            newPassword += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(newPassword);
        unlockAchievement('SECRET_AGENT');
    }, [length, includeNumbers, includeSymbols, unlockAchievement]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        toast.success("Passwort in die Zwischenablage kopiert!");
    };

    return (
        <Card className="rounded-3xl shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-headline">Passwort-Generator</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <div className="w-full p-4 bg-muted rounded-lg flex justify-between items-center gap-4">
                    <span className="font-mono text-xl break-all">{password}</span>
                    <Button variant="ghost" size="icon" onClick={handleCopy} data-cursor-interactive><Copy /></Button>
                </div>
                <div className="w-full space-y-6">
                    <div className="space-y-2">
                        <Label>Länge: {length}</Label>
                        <Slider value={[length]} onValueChange={(val) => setLength(val[0])} min={8} max={64} step={1} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Checkbox id="includeNumbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(!!checked)} />
                        <Label htmlFor="includeNumbers">Zahlen (0-9)</Label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Checkbox id="includeSymbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(!!checked)} />
                        <Label htmlFor="includeSymbols">Sonderzeichen (!@#...)</Label>
                    </div>
                </div>
                <Button onClick={generatePassword} className="rounded-full" data-cursor-interactive>
                    <RefreshCw className="mr-2" /> Neu generieren
                </Button>
            </CardContent>
        </Card>
    );
};

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const { unlockAchievement } = useAchievements();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        return `${minutes}:${seconds}.${milliseconds}`;
    };

    const handleToggle = () => {
        setIsActive(!isActive);
        if (!isActive) unlockAchievement('TIME_STOPPER');
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps([time, ...laps]);
    };

    return (
        <Card className="rounded-3xl shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-headline">Stoppuhr</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <h2 className="text-7xl font-bold font-mono">{formatTime(time)}</h2>
                <div className="flex gap-4">
                    <Button onClick={handleToggle} size="lg" className="rounded-full w-32 text-xl py-8" data-cursor-interactive>
                        {isActive ? <Pause /> : <Play />}
                        <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
                    </Button>
                    <Button onClick={handleReset} size="lg" variant="secondary" className="rounded-full w-32 text-xl py-8" data-cursor-interactive>
                        <RotateCcw /> <span className="ml-2">Reset</span>
                    </Button>
                    <Button onClick={handleLap} size="lg" variant="outline" className="rounded-full w-32 text-xl py-8" disabled={!isActive} data-cursor-interactive>
                        <Flag /> <span className="ml-2">Runde</span>
                    </Button>
                </div>
                <div className="w-full max-h-48 overflow-y-auto space-y-2">
                    {laps.map((lap, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                            <span className="text-muted-foreground">Runde {laps.length - index}</span>
                            <span className="font-mono">{formatTime(lap - (laps[index + 1] || 0))}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

function ColorPaletteGenerator() {
    type PaletteType = 'vibrant' | 'pastel';
    const [palette, setPalette] = useState<string[]>([]);
    const [colorCount, setColorCount] = useState(5);
    const [baseColor, setBaseColor] = useState('#ff0000');
    const [paletteType, setPaletteType] = useState<PaletteType>('vibrant');
    const { unlockAchievement } = useAchievements();

    const generatePalette = useCallback((useRandomBase = false) => {
        let startColor = baseColor;
        if (useRandomBase) {
            startColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
            setBaseColor(startColor);
        }
        
        const newPalette: string[] = [];
        const baseHsl = hexToHsl(startColor);

        for (let i = 0; i < colorCount; i++) {
            const newHue = (baseHsl[0] + (i * (360 / (colorCount)))) % 360;
            const saturation = paletteType === 'pastel' ? 45 + Math.random() * 10 : 70 + Math.random() * 10;
            const lightness = paletteType === 'pastel' ? 80 + Math.random() * 5 : 60 + Math.random() * 5;
            newPalette.push(hslToHex(newHue, saturation, lightness));
        }
        
        setPalette(newPalette);
        unlockAchievement('COLOR_ARTIST');
    }, [colorCount, baseColor, paletteType, unlockAchievement]);

    useEffect(() => {
        generatePalette(true);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCopy = (color: string) => {
        navigator.clipboard.writeText(color);
        toast.success(`Farbe ${color} kopiert!`);
    };

    function hexToHsl(hex: string): [number, number, number] {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return [0, 0, 0];
        let r = parseInt(result[1], 16) / 255;
        let g = parseInt(result[2], 16) / 255;
        let b = parseInt(result[3], 16) / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h=0, s=0, l = (max + min) / 2;
        if (max !== min) {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h * 360, s * 100, l * 100];
    }
    
    function hslToHex(h: number, s: number, l: number): string {
        s /= 100; l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0, g = 0, b = 0;
        if (0 <= h && h < 60) { r = c; g = x; b = 0; } 
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; } 
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; } 
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; } 
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; } 
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
        let hex = "#" + [r,g,b].map(v => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('');
        return hex;
    }

    return (
        <Card className="rounded-3xl shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-headline">Farbpaletten-Generator</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                 <div className="w-full flex flex-col sm:flex-row gap-4">
                    {palette.map((color, index) => (
                        <div key={index} className="flex-1 h-32 rounded-lg flex items-end justify-center p-2 cursor-pointer" style={{ backgroundColor: color }} onClick={() => handleCopy(color)}>
                            <span className="font-mono bg-background/50 text-foreground px-2 py-1 rounded">{color}</span>
                        </div>
                    ))}
                </div>

                <div className="w-full space-y-6">
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <div className="space-y-2 flex-1">
                            <Label>Basisfarbe</Label>
                            <div className="flex items-center gap-2">
                                <Input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="p-1 h-10"/>
                                <Input type="text" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="font-mono"/>
                            </div>
                        </div>
                         <div className="space-y-2 flex-1">
                            <Label>Paletten-Typ</Label>
                            <Select value={paletteType} onValueChange={(value) => setPaletteType(value as PaletteType)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Typ auswählen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vibrant">Lebhaft</SelectItem>
                                    <SelectItem value="pastel">Pastell</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 flex-1">
                            <Label>Anzahl Farben: {colorCount}</Label>
                            <Slider value={[colorCount]} onValueChange={(val) => setColorCount(val[0])} min={2} max={8} step={1} />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button onClick={() => generatePalette()} className="rounded-full" data-cursor-interactive>
                        <Palette className="mr-2" /> Palette von Basisfarbe ableiten
                    </Button>
                    <Button onClick={() => generatePalette(true)} variant="outline" className="rounded-full" data-cursor-interactive>
                        <RefreshCw className="mr-2" /> Zufällige Palette
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

function SimpleTimer() {
    const [initialTime, setInitialTime] = useState(300); // 5 minutes
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            if (audioRef.current) {
                audioRef.current.play();
            }
            setIsActive(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, time]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinutes = parseInt(e.target.value, 10) || 0;
        const currentSeconds = initialTime % 60;
        const newTotalSeconds = newMinutes * 60 + currentSeconds;
        setInitialTime(newTotalSeconds);
        if (!isActive) setTime(newTotalSeconds);
    };

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSeconds = parseInt(e.target.value, 10) || 0;
        const currentMinutes = Math.floor(initialTime / 60);
        const newTotalSeconds = currentMinutes * 60 + newSeconds;
        setInitialTime(newTotalSeconds);
        if (!isActive) setTime(newTotalSeconds);
    };

    return (
        <Card className="rounded-3xl shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-headline">Timer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <h2 className="text-8xl font-bold font-mono">{formatTime(time)}</h2>
                <div className="flex items-center gap-4 text-xl">
                    <Input type="number" min="0" max="99" value={Math.floor(initialTime / 60)} onChange={handleMinutesChange} className="w-24 text-center" disabled={isActive}/>
                    <span>:</span>
                    <Input type="number" min="0" max="59" value={initialTime % 60} onChange={handleSecondsChange} className="w-24 text-center" disabled={isActive}/>
                </div>
                <div className="flex gap-4">
                    <Button onClick={() => setIsActive(!isActive)} size="lg" className="rounded-full w-32 text-xl py-8" data-cursor-interactive>
                        {isActive ? <Pause /> : <Play />} <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
                    </Button>
                    <Button onClick={() => { setIsActive(false); setTime(initialTime); }} size="lg" variant="secondary" className="rounded-full w-32 text-xl py-8" data-cursor-interactive>
                        <RotateCcw /> <span className="ml-2">Reset</span>
                    </Button>
                </div>
            </CardContent>
            <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-clear-announce-tones-2861.mp3" />
        </Card>
    );
};

function UnitConverter() {
    const { unlockAchievement } = useAchievements();
    const [inputValue, setInputValue] = useState('1');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');
    const [result, setResult] = useState('');
    const [currentTab, setCurrentTab] = useState('length');

    const conversionFactors: { [key: string]: { [key: string]: number } } = {
        length: { m: 1, cm: 0.01, mm: 0.001, km: 1000, mile: 1609.34, yard: 0.9144, ft: 0.3048, in: 0.0254 },
        mass: { kg: 1, g: 0.001, mg: 0.000001, t: 1000, lb: 0.453592, oz: 0.0283495 },
        speed: { 'm/s': 1, 'km/h': 0.277778, mph: 0.44704, knot: 0.514444 },
        time: { s: 1, min: 60, h: 3600, d: 86400, week: 604800 },
        temperature: {}
    };

    const units: { [key: string]: string[] } = {
        length: ['m', 'cm', 'mm', 'km', 'mile', 'yard', 'ft', 'in'],
        mass: ['kg', 'g', 'mg', 't', 'lb', 'oz'],
        speed: ['m/s', 'km/h', 'mph', 'knot'],
        time: ['s', 'min', 'h', 'd', 'week']
    };

    const convert = useCallback(() => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) {
            setResult('');
            return;
        }

        let conversionResult;
        if (currentTab === 'temperature') {
            if (fromUnit === toUnit) {
                conversionResult = value;
            } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                conversionResult = (value * 9/5) + 32;
            } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                conversionResult = (value - 32) * 5/9;
            } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
                conversionResult = value + 273.15;
            } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
                conversionResult = value - 273.15;
            } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
                conversionResult = (value - 32) * 5/9 + 273.15;
            } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
                conversionResult = (value - 273.15) * 9/5 + 32;
            }
        } else {
            const factors = conversionFactors[currentTab];
            const valueInBase = value * factors[fromUnit];
            conversionResult = valueInBase / factors[toUnit];
        }

        setResult(conversionResult.toFixed(4));
        unlockAchievement('DIMENSION_MASTER');
    }, [inputValue, fromUnit, toUnit, currentTab, unlockAchievement]);

    useEffect(() => {
        convert();
    }, [convert]);
    
    useEffect(() => {
        if(currentTab === 'temperature') {
            setFromUnit('celsius');
            setToUnit('fahrenheit');
        } else {
            setFromUnit(units[currentTab][0]);
            setToUnit(units[currentTab][1]);
        }
    }, [currentTab]);

    return (
        <Card className="rounded-3xl shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-headline">Einheitenumrechner</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="length">Länge</TabsTrigger>
                        <TabsTrigger value="mass">Masse</TabsTrigger>
                        <TabsTrigger value="temperature">Temperatur</TabsTrigger>
                        <TabsTrigger value="speed">Geschwindigkeit</TabsTrigger>
                        <TabsTrigger value="time">Zeit</TabsTrigger>
                    </TabsList>
                    <div className="pt-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <Input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} className="text-lg"/>
                            <Select value={fromUnit} onValueChange={setFromUnit}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    {(currentTab === 'temperature' ? ['celsius', 'fahrenheit', 'kelvin'] : units[currentTab]).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="text-2xl font-bold">=</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Input value={result} readOnly className="text-lg font-bold bg-muted"/>
                             <Select value={toUnit} onValueChange={setToUnit}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                     {(currentTab === 'temperature' ? ['celsius', 'fahrenheit', 'kelvin'] : units[currentTab]).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
};

function TextGenerator() {
    const { unlockAchievement } = useAchievements();
    const [topic, setTopic] = useState('');
    const [type, setType] = useState('Blog-Idee');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic) {
            toast.warning('Bitte gib ein Thema ein.');
            return;
        }
        setIsLoading(true);
        setResult('');
        try {
            const generatedText = await generateText({ topic, type });
            setResult(generatedText);
            unlockAchievement('WORD_SMITH');
        } catch (error) {
            toast.error('Fehler beim Generieren des Textes.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Card className="rounded-3xl shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-headline">KI-Textgenerator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="md:col-span-2">
                         <Label htmlFor="topic">Thema / Stichwort</Label>
                         <Input id="topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder="z.B. Die Zukunft von KI"/>
                    </div>
                    <div>
                        <Label htmlFor="type">Text-Art</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger id="type"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Blog-Idee">Blog-Idee</SelectItem>
                                <SelectItem value="Tweet">Tweet</SelectItem>
                                <SelectItem value="Gedicht">Gedicht</SelectItem>
                                <SelectItem value="Marketing-Slogan">Marketing-Slogan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button onClick={handleGenerate} disabled={isLoading} className="w-full rounded-full">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2" />}
                    Text generieren
                </Button>
                {result && (
                     <div className="p-4 bg-muted rounded-lg space-y-2">
                        <Label>Ergebnis</Label>
                        <Textarea value={result} readOnly className="w-full bg-transparent p-0 border-none focus:ring-0" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function Todo() {
    type Task = { id: number; text: string; completed: boolean };
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');
    const { unlockAchievement } = useAchievements();

    useEffect(() => {
        try {
            const storedTasks = localStorage.getItem('todo-tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error("Fehler beim Laden der Aufgaben:", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('todo-tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error("Fehler beim Speichern der Aufgaben:", error);
        }
    }, [tasks]);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;
        const newTask: Task = { id: Date.now(), text: input, completed: false };
        setTasks([...tasks, newTask]);
        setInput('');
        unlockAchievement('TASK_MANAGER');
    };

    const handleToggleTask = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <Card className="rounded-3xl shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-headline">Todo Liste</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <form onSubmit={handleAddTask} className="flex gap-2">
                    <Input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Neue Aufgabe hinzufügen..."
                    />
                    <Button type="submit">Hinzufügen</Button>
                </form>
                <ScrollArea className="h-72 w-full pr-4">
                    <div className="space-y-2">
                        {tasks.map(task => (
                            <div key={task.id} className={cn(
                                "flex items-center gap-2 p-2 rounded-lg transition-colors",
                                task.completed ? "bg-muted/50" : "bg-muted"
                            )}>
                                <Checkbox 
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onCheckedChange={() => handleToggleTask(task.id)}
                                />
                                <Label htmlFor={`task-${task.id}`} className={cn(
                                    "flex-grow cursor-pointer",
                                    task.completed && "line-through text-muted-foreground"
                                )}>
                                    {task.text}
                                </Label>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                         {tasks.length === 0 && (
                            <p className="text-center text-muted-foreground py-8">Noch keine Aufgaben vorhanden.</p>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};


export default function ToolsPage() {
  const { unlockAchievement } = useAchievements();
  const [selectedToolId, setSelectedToolId] = useState<ToolId>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    unlockAchievement('TOOL_MASTER');
  }, [unlockAchievement]);
  
  const selectedTool = initialTools.find(tool => tool.id === selectedToolId);

  const filteredTools = initialTools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-black text-center mb-4 md:mb-8 uppercase tracking-tighter font-headline">
              Tools
            </h1>
            
            {selectedTool ? (
              <motion.div
                key={selectedTool.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-8"
              >
                 <Button variant="outline" onClick={() => setSelectedToolId(null)} className="self-start rounded-full" data-cursor-interactive>
                    <ArrowLeft className="mr-2"/> Zurück zur Auswahl
                 </Button>
                 {React.createElement(selectedTool.component)}
              </motion.div>
            ) : (
              <>
                <div className="relative mb-8 md:mb-12">
                   <Input 
                      type="text"
                      placeholder="Tool suchen..."
                      className="w-full p-4 pl-12 text-lg rounded-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6"/>
                </div>
                 <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {filteredTools.length > 0 ? filteredTools.map(tool => (
                    <motion.div key={tool.id}>
                        <Card 
                          className="h-full p-6 rounded-2xl text-center cursor-pointer hover:border-primary transition-all group"
                          onClick={() => setSelectedToolId(tool.id)}
                          data-cursor-interactive
                        >
                          <div className="flex flex-col items-center gap-4 text-muted-foreground group-hover:text-primary transition-colors h-full justify-center">
                            {React.cloneElement(tool.icon, { className: "w-10 h-10"})}
                            <h2 className="text-2xl font-bold font-headline text-foreground">{tool.name}</h2>
                          </div>
                        </Card>
                    </motion.div>
                  )) : (
                     <p className="text-center text-muted-foreground col-span-full">Keine Tools gefunden.</p>
                  )}
                </div>
              </>
            )}
            
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
