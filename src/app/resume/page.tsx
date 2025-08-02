
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Award, Briefcase, Lightbulb, Link as LinkIcon, Users, Code } from 'lucide-react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect } from 'react';
import Link from 'next/link';

const skills = [
  'LAMP Stacks',
  'Docker',
  'Supabase',
  'Nextcloud',
  'Ollama / llama3',
  'Open WebUI',
  'WebGL / D3',
  'React',
  'GitOps',
  'UI Motion',
];

const competitions = [
    {
        title: "Deutscher Multimedia-Preis mb21 2024",
        project: "„Meum Diarium – Ein Feldherr als Influencer“",
        result: "Hauptpreis (500 €) in der Kategorie „textbased“, Altersgruppe 11–15 Jahre.",
        description: "Offizielle Präsentation und Preisverleihung in Dresden im November 2024."
    },
    {
        title: "Crossmedia-Wettbewerb des Bayerischen Rundfunks 2024",
        project: "„Meum Diarium“",
        result: "Nominierter Beitrag in der Sparte „textbased“.",
        description: "Preisverleihung am 21.11.2024 beim BR in Unterföhring."
    }
]

const events = [
    {
        title: "Nextcloud Community Conference 2024 (Berlin)",
        role: "Lightning Talk",
        description: "Fokus: Nextcloud-Security, Selfhosting und Schutz sensibler Daten."
    },
    {
        title: "Medien- & Technik-Engagement (AG-Ebene)",
        role: "Mitgründer der MedienScouts am KKG",
        description: "Technisch-didaktische Schulinitiativen, Live-Workshops, Aufbau von Audiotechnik, und peer-to-peer Schulung."
    }
]

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
      transition: { staggerChildren: 0.2, duration: 0.6 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };


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
            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter font-headline">
                        Benedikt Schächner
                    </h1>
                    <p className="text-2xl text-muted-foreground mt-2">Pleiskirchen / Altötting, Bayern</p>
                </div>
                <Button className="rounded-full text-lg py-6 px-8 mt-4">
                    <Download className="mr-3"/>
                    Download CV
                </Button>
            </div>

            <motion.div 
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
                <motion.section variants={itemVariants}>
                    <h2 className="flex items-center text-5xl font-bold font-headline mb-8"><Award className="mr-4 text-primary"/>Wettbewerbe & Auszeichnungen</h2>
                    <div className="space-y-8">
                         {competitions.map((comp) => (
                           <Card key={comp.title} className="rounded-3xl">
                               <CardHeader>
                                   <CardTitle className="text-3xl font-bold font-headline">{comp.title}</CardTitle>
                                   <CardDescription className="text-xl pt-1">{comp.project}</CardDescription>
                               </CardHeader>
                               <CardContent>
                                   <p className="text-lg text-primary font-semibold">{comp.result}</p>
                                   <p className="text-lg text-muted-foreground mt-2">{comp.description}</p>
                               </CardContent>
                           </Card>
                        ))}
                    </div>
                </motion.section>

                <motion.section variants={itemVariants}>
                    <h2 className="flex items-center text-5xl font-bold font-headline mb-8"><Users className="mr-4 text-primary"/>Events & Community</h2>
                     <div className="space-y-8">
                         {events.map((event) => (
                           <Card key={event.title} className="rounded-3xl">
                               <CardHeader>
                                   <CardTitle className="text-3xl font-bold font-headline">{event.title}</CardTitle>
                                   <CardDescription className="text-xl pt-1">{event.role}</CardDescription>
                               </CardHeader>
                               <CardContent>
                                   <p className="text-lg text-muted-foreground mt-2">{event.description}</p>
                               </CardContent>
                           </Card>
                        ))}
                    </div>
                </motion.section>

                <motion.section variants={itemVariants}>
                    <h2 className="flex items-center text-5xl font-bold font-headline mb-6"><Code className="mr-4 text-primary"/>Sprachen & Technologien</h2>
                     <Card className="rounded-3xl">
                        <CardContent className="p-6">
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-lg rounded-lg px-4 py-1">
                                    {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.section>
                
                <motion.section variants={itemVariants}>
                    <h2 className="flex items-center text-5xl font-bold font-headline mb-6"><Lightbulb className="mr-4 text-primary"/>Vision & Motivation</h2>
                     <Card className="overflow-hidden rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold font-headline">{motivation.vision}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
                                {motivation.points.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.section>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
