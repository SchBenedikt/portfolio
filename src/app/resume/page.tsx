
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Award, Briefcase, Lightbulb, Users, Code, ChevronDown } from 'lucide-react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect } from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      transition: { staggerChildren: 0.1, duration: 0.5 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const AccordionTriggerStyled = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <AccordionTrigger className="text-4xl font-bold font-headline hover:no-underline">
        <div className="flex items-center">
            {icon}
            <span className="ml-4">{title}</span>
        </div>
    </AccordionTrigger>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter font-headline">
                        Benedikt Schächner
                    </h1>
                    <p className="text-2xl text-muted-foreground mt-2">Pleiskirchen / Altötting, Bayern</p>
                </div>
                <Button className="rounded-full text-lg py-6 px-8 mt-4 whitespace-nowrap" data-cursor-interactive>
                    <Download className="mr-3"/>
                    CV Herunterladen
                </Button>
            </motion.div>

            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <Accordion type="single" collapsible defaultValue="item-1">
                        <AccordionItem value="item-1" className="border-b-0">
                             <Card className="rounded-3xl overflow-hidden">
                                <CardHeader>
                                    <AccordionTriggerStyled icon={<Award className="text-primary"/>} title="Wettbewerbe & Auszeichnungen"/>
                                </CardHeader>
                                <AccordionContent>
                                    <div className="px-6 pb-6 space-y-6">
                                        {competitions.map((comp) => (
                                        <Card key={comp.title} className="rounded-2xl bg-muted/50">
                                            <CardHeader>
                                                <CardTitle className="text-2xl font-bold font-headline">{comp.title}</CardTitle>
                                                <CardDescription className="text-lg pt-1">{comp.project}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-lg text-primary font-semibold">{comp.result}</p>
                                                <p className="text-lg text-muted-foreground mt-2">{comp.description}</p>
                                            </CardContent>
                                        </Card>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    </Accordion>
                </motion.div>

                 <motion.div variants={itemVariants}>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="border-b-0">
                             <Card className="rounded-3xl overflow-hidden">
                                <CardHeader>
                                    <AccordionTriggerStyled icon={<Users className="text-primary"/>} title="Events & Community"/>
                                </CardHeader>
                                <AccordionContent>
                                    <div className="px-6 pb-6 space-y-6">
                                        {events.map((event) => (
                                        <Card key={event.title} className="rounded-2xl bg-muted/50">
                                            <CardHeader>
                                                <CardTitle className="text-2xl font-bold font-headline">{event.title}</CardTitle>
                                                <CardDescription className="text-lg pt-1">{event.role}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-lg text-muted-foreground mt-2">{event.description}</p>
                                            </CardContent>
                                        </Card>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    </Accordion>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="border-b-0">
                             <Card className="rounded-3xl overflow-hidden">
                                <CardHeader>
                                    <AccordionTriggerStyled icon={<Code className="text-primary"/>} title="Sprachen & Technologien"/>
                                </CardHeader>
                                <AccordionContent>
                                    <div className="px-6 pb-6">
                                        <div className="flex flex-wrap gap-3">
                                            {skills.map((skill) => (
                                                <Badge key={skill} variant="secondary" className="text-lg rounded-lg px-4 py-1">
                                                {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="border-b-0">
                             <Card className="rounded-3xl overflow-hidden">
                                <CardHeader>
                                    <AccordionTriggerStyled icon={<Lightbulb className="text-primary"/>} title="Vision & Motivation"/>
                                </CardHeader>
                                <AccordionContent>
                                    <div className="px-6 pb-6">
                                        <CardTitle className="text-2xl font-bold font-headline mb-4">{motivation.vision}</CardTitle>
                                        <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
                                            {motivation.points.map((point, i) => <li key={i}>{point}</li>)}
                                        </ul>
                                    </div>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
