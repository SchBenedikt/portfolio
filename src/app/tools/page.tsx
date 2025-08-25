
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Coffee, BookOpen, Timer as TimerIcon, ArrowLeft, KeyRound, Check, Copy, Flag, Palette, RefreshCw, Scale, Clock, Search, Wand2, Thermometer, Weight, Ruler, ListTodo, Trash2, QrCode, Notebook, Download, Plus, Trash, Edit, Save, Link as LinkIcon, CalendarIcon } from 'lucide-react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const initialTools = [
  { id: 'password', name: 'Passwort-Generator', icon: <KeyRound className="w-8 h-8" />, component: PasswordGenerator },
  { id: 'palette', name: 'Farbpalette', icon: <Palette className="w-8 h-8" />, component: ColorPaletteGenerator },
  { id: 'converter', name: 'Einheitenumrechner', icon: <Scale className="w-8 h-8" />, component: UnitConverter },
  { id: 'todo', name: 'Todo Liste', icon: <ListTodo className="w-8 h-8" />, component: Todo },
  { id: 'notes', name: 'Notizblock', icon: <Notebook className="w-8 h-8" />, component: Notes },
  { id: 'qr-code', name: 'QR-Code Generator', icon: <QrCode className="w-8 h-8" />, component: QrCodeGenerator },
];

type Tool = typeof initialTools[number];
type ToolId = Tool['id'] | null;


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
        <Card className="rounded-3xl w-full">
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
        <Card className="rounded-3xl w-full">
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
        time: { s: 1, min: 60, h: 3600, d: 86400, week: 604800 }
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
        <Card className="rounded-3xl w-full">
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

type Note = { id: string; title: string; content: string; createdAt: number; };

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

function Todo() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');
    const { unlockAchievement } = useAchievements();

    useEffect(() => {
        try {
            const storedTasks = localStorage.getItem('todo-tasks');
            if (storedTasks) setTasks(JSON.parse(storedTasks));
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
        const newTask: Task = { id: Date.now().toString(), text: input, completed: false };
        setTasks([newTask, ...tasks]);
        setInput('');
        unlockAchievement('TASK_MANAGER');
    };

    const handleToggleTask = (id: string) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };
    
    return (
        <Card className="rounded-3xl w-full min-h-[550px]">
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
                <ScrollArea className="h-96 w-full pr-4">
                    <div className="space-y-2">
                        {tasks.map(task => (
                            <div key={task.id} className={cn("flex items-center gap-2 p-2 rounded-lg transition-colors", task.completed ? "bg-muted/50" : "bg-muted")}>
                                <Checkbox 
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onCheckedChange={() => handleToggleTask(task.id)}
                                />
                                <Label htmlFor={`task-${task.id}`} className={cn("flex-grow cursor-pointer", task.completed && "line-through text-muted-foreground")}>
                                    {task.text}
                                </Label>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)} data-cursor-interactive>
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

function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);

    // Load from localStorage
    useEffect(() => {
        try {
            const savedNotes = localStorage.getItem('user-notes');
            if (savedNotes) {
                const parsedNotes: Note[] = JSON.parse(savedNotes);
                const sortedNotes = parsedNotes.sort((a, b) => b.createdAt - a.createdAt);
                setNotes(sortedNotes);
                if (sortedNotes.length > 0 && !activeNoteId) {
                    setActiveNoteId(sortedNotes[0].id);
                }
            }
        } catch (error) {
            console.error("Error loading notes:", error);
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('user-notes', JSON.stringify(notes));
        } catch (error) {
            console.error("Error saving notes:", error);
        }
    }, [notes]);

    useEffect(() => {
        if(activeNoteId) {
            titleInputRef.current?.focus();
        }
    }, [activeNoteId]);

    const handleAddNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: 'Neue Notiz',
            content: '',
            createdAt: Date.now()
        };
        const newNotes = [newNote, ...notes];
        setNotes(newNotes);
        setActiveNoteId(newNote.id);
    };

    const handleDeleteNote = (id: string) => {
        const newNotes = notes.filter(n => n.id !== id);
        setNotes(newNotes);
        if (activeNoteId === id) {
            setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null);
        }
    };

    const handleNoteChange = (id: string, field: 'title' | 'content', value: string) => {
        setNotes(notes.map(n => n.id === id ? { ...n, [field]: value } : n));
    };

    const activeNote = notes.find(n => n.id === activeNoteId);

    return (
        <Card className="rounded-3xl w-full min-h-[550px]">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-headline">Notizblock</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4 h-full">
                <div className="w-full md:w-1/3 border-r-0 md:border-r pr-0 md:pr-4">
                     <Button onClick={handleAddNote} className="w-full mb-4">
                        <Plus className="mr-2" /> Neue Notiz
                    </Button>
                    <ScrollArea className="h-96">
                        {notes.map(note => (
                            <div
                                key={note.id}
                                className={cn(
                                    "p-2 rounded-lg cursor-pointer flex justify-between items-center my-1",
                                    activeNoteId === note.id ? "bg-muted" : "hover:bg-muted/50"
                                )}
                                onClick={() => setActiveNoteId(note.id)}
                            >
                                <span className="truncate pr-2">{note.title}</span>
                                 <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id)}}>
                                    <Trash className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                        {notes.length === 0 && (
                             <p className="text-center text-muted-foreground py-8">Keine Notizen.</p>
                        )}
                    </ScrollArea>
                </div>
                <div className="w-full md:w-2/3">
                    {activeNote ? (
                        <div className="space-y-4">
                             <Input 
                                ref={titleInputRef}
                                value={activeNote.title}
                                onChange={e => handleNoteChange(activeNote.id, 'title', e.target.value)}
                                className="text-lg font-bold"
                            />
                            <Textarea
                                value={activeNote.content}
                                onChange={e => handleNoteChange(activeNote.id, 'content', e.target.value)}
                                placeholder="Schreib hier deine Gedanken auf..."
                                className="min-h-[350px] text-base"
                            />
                        </div>
                    ) : (
                         <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p>Wähle eine Notiz aus oder erstelle eine neue.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function QrCodeGenerator() {
    const [qrData, setQrData] = useState('https://benedikt.xn--schchner-2za.de');
    const [qrColor, setQrColor] = useState('000000');
    const [qrBgColor, setQrBgColor] = useState('ffffff');
    const [qrMargin, setQrMargin] = useState(1);
    const [qrEcc, setQrEcc] = useState('L');

    const getBaseUrl = (format = 'png') => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&color=${qrColor}&bgcolor=${qrBgColor}&margin=${qrMargin}&ecc=${qrEcc}&format=${format}`;
    };
    
    const exportFormats = ['png', 'jpg', 'svg', 'pdf'];

    return (
        <Card className="rounded-3xl w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-headline">QR-Code Generator</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                 {qrData && (
                    <div className="p-4 bg-white rounded-lg">
                        <Image
                            src={getBaseUrl()}
                            alt="Generated QR Code"
                            width={200}
                            height={200}
                            priority
                        />
                    </div>
                )}
                <div className="w-full space-y-4">
                    <div>
                        <Label htmlFor="qr-data">Daten (URL oder Text)</Label>
                        <Input
                            id="qr-data"
                            value={qrData}
                            onChange={(e) => setQrData(e.target.value)}
                            placeholder="z.B. https://example.com"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <Label htmlFor="qr-color">Vordergrund</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="color"
                                    value={`#${qrColor}`}
                                    onChange={(e) => setQrColor(e.target.value.substring(1))}
                                    className="p-1 h-10 w-12"
                                />
                                <Input
                                    id="qr-color"
                                    value={qrColor}
                                    onChange={(e) => setQrColor(e.target.value.replace(/#/g, ''))}
                                    className="font-mono"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="qr-bgcolor">Hintergrund</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="color"
                                    value={`#${qrBgColor}`}
                                    onChange={(e) => setQrBgColor(e.target.value.substring(1))}
                                    className="p-1 h-10 w-12"
                                />
                                <Input
                                    id="qr-bgcolor"
                                    value={qrBgColor}
                                    onChange={(e) => setQrBgColor(e.target.value.replace(/#/g, ''))}
                                    className="font-mono"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Fehlerkorrektur</Label>
                            <Select value={qrEcc} onValueChange={setQrEcc}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">Niedrig (L)</SelectItem>
                                    <SelectItem value="M">Mittel (M)</SelectItem>
                                    <SelectItem value="Q">Quartil (Q)</SelectItem>
                                    <SelectItem value="H">Hoch (H)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div>
                            <Label>Rand (Quiet Zone): {qrMargin}px</Label>
                            <Slider value={[qrMargin]} onValueChange={(v) => setQrMargin(v[0])} min={0} max={20} step={1}/>
                        </div>
                    </div>
                     <div>
                        <Label>Exportieren</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {exportFormats.map(format => (
                                <Button asChild key={format} variant="outline" size="sm">
                                    <a href={getBaseUrl(format)} download={`qr-code.${format}`}>
                                        <Download className="mr-2 h-4 w-4" />
                                        {format.toUpperCase()}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}


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

  const renderTool = () => {
    if (!selectedTool) return null;
    return React.createElement(selectedTool.component);
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-16 md:pt-32 pb-24 md:pb-16">
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
                 {renderTool()}
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

