
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Award, Briefcase, Lightbulb, Users, Code, ChevronDown, Rocket, GitBranch, Terminal as TerminalIcon } from 'lucide-react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect } from 'react';

const timelineEvents = [
    {
        icon: <Award className="h-5 w-5 text-background" />,
        iconBg: 'bg-yellow-500',
        date: "Nov 2024",
        title: "Hauptpreis, Deutscher Multimedia-Preis mb21",
        organization: "Kategorie „textbased“",
        description: "Auszeichnung für das Projekt „Meum Diarium – Ein Feldherr als Influencer“ in der Altersgruppe 11–15 Jahre."
    },
     {
        icon: <Award className="h-5 w-5 text-background" />,
        iconBg: 'bg-yellow-500',
        date: "Nov 2024",
        title: "Nominierung, Crossmedia-Wettbewerb",
        organization: "Bayerischer Rundfunk",
        description: "„Meum Diarium“ wurde in der Sparte „textbased“ als herausragender Beitrag nominiert."
    },
    {
        icon: <Users className="h-5 w-5 text-background" />,
        iconBg: 'bg-blue-500',
        date: "Sep 2024",
        title: "Lightning Talk, Nextcloud Conference",
        organization: "Berlin",
        description: "Vortrag über Nextcloud-Security, Selfhosting und den Schutz sensibler Daten vor einer internationalen Community."
    },
     {
        icon: <TerminalIcon className="h-5 w-5 text-background" />,
        iconBg: 'bg-green-500',
        date: "Seit 2023",
        title: "Mitgründer der MedienScouts",
        organization: "König-Karlmann-Gymnasium",
        description: "Technische und didaktische Leitung von Schulinitiativen, Live-Workshops und Peer-to-Peer-Schulungen."
    }
].sort((a, b) => new Date(b.date.split(' ').reverse().join(' ')).getTime() - new Date(a.date.split(' ').reverse().join(' ')).getTime());


const skills = [
  'LAMP Stacks', 'Docker', 'Supabase', 'Nextcloud', 'Ollama / llama3', 'Open WebUI',
  'WebGL / D3', 'React / Next.js', 'TypeScript', 'GitOps', 'UI Motion (Framer)', 'Linux'
];

const motivation = {
    vision: "Digitale Souveränität, Edu-Tech mit Storytelling, und Teamwork.",
    points: [
        "Fokus auf Selfhosting, Open Source und Datenschutz (Nextcloud, Ollama).",
        "Vermittlung von IT- und AI-Themen durch Gamification und Crossmedia-Projekte.",
        "Zusammenarbeit mit Bruder Vinzenz bei Hardware-AG, Konferenzen und Talks."
    ]
}

export default function ResumePage() {
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    unlockAchievement('RESUME_VIEWER');
  }, [unlockAchievement]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.5 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-6 sm:px-8 max-w-5xl"
        >
            <motion.div variants={itemVariants} className="flex justify-between items-start mb-16">
                <div>
                    <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter font-headline">
                        Lebenslauf
                    </h1>
                    <p className="text-2xl text-muted-foreground mt-2">Benedikt Schächner</p>
                </div>
                <Button className="rounded-full text-lg py-6 px-8 mt-4 whitespace-nowrap" data-cursor-interactive>
                    <Download className="mr-3"/>
                    CV Herunterladen
                </Button>
            </motion.div>

            {/* Timeline Section */}
            <motion.div variants={itemVariants} className="mb-16">
                <div className="relative border-l-2 border-border/50 ml-4 pl-4">
                    {timelineEvents.map((event, index) => (
                         <motion.div key={index} variants={itemVariants} className="mb-10 ml-8">
                            <span className={`absolute -left-[18px] flex items-center justify-center w-9 h-9 rounded-full ring-8 ring-background ${event.iconBg}`}>
                                {event.icon}
                            </span>
                            <Card className="rounded-2xl shadow-lg border-border/50 transition-all hover:border-primary/50">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-2xl font-bold font-headline">{event.title}</CardTitle>
                                        <Badge variant="secondary" className="text-sm rounded-md whitespace-nowrap">{event.date}</Badge>
                                    </div>
                                    <CardDescription className="text-lg pt-1">{event.organization}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg text-muted-foreground">{event.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Grid for Skills and Vision */}
            <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
                <motion.div variants={itemVariants}>
                    <Card className="rounded-2xl p-8 h-full">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="flex items-center text-4xl font-bold font-headline">
                                <Code className="mr-3 text-primary"/> Sprachen & Technologien
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-lg rounded-lg px-4 py-1">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Card className="rounded-2xl p-8 h-full">
                        <CardHeader className="p-0 mb-6">
                             <CardTitle className="flex items-center text-4xl font-bold font-headline">
                                <Rocket className="mr-3 text-primary"/> Vision & Motivation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                             <p className="text-xl font-semibold mb-4">{motivation.vision}</p>
                             <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
                                {motivation.points.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
