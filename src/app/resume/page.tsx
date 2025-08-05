
'use client';

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Briefcase, Lightbulb, Users, Code, Rocket, GitBranch, Terminal as TerminalIcon, Rss, Link as LinkIcon, GraduationCap, Instagram, Linkedin, Home, School, Mail, Phone, Calendar, CodeSquare, Star } from 'lucide-react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { projectData } from '@/lib/projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const about = {
    name: "Benedikt Schächner",
    title: "Schüler, Entwickler & digitaler Pionier",
    links: [
        { name: "Website", url: "https://benedikt.xn--schchner-2za.de", icon: <LinkIcon/> },
        { name: "LinkedIn", url: "https://de.linkedin.com/in/benedikt-schächner-a22632299/", icon: <Linkedin/> },
        { name: "Instagram", url: "https://www.instagram.com/benedikt.schaechner/", icon: <Instagram/> },
    ]
}

const timelineEvents = [
    {
        date: "Seit April 2025",
        title: "Schriftführer",
        organization: "Judoabteilung TuS Töging",
        description: "Seit April 2025 bin ich Schriftführer der Judoabteilung vom TuS Töging.",
        icon: <Users/>,
        isCurrent: true
    },
    {
        date: "April 2025",
        title: "Freiwilliges Schülerpraktikum",
        organization: "OMV Burghausen",
        description: "Einblicke in Petrochemie, Erdölverarbeitung und Unternehmensstrukturen.",
        icon: <Briefcase/>
    },
    {
        date: "Nov 2024",
        title: "Hauptpreis, Deutscher Multimedia-Preis mb21",
        organization: "Finale in Dresden",
        description: "Gewinn des Hauptpreises (Altersgruppe 11-15) für das Projekt „Meum Diarium“ zusammen mit Vinzenz Schächner.",
        icon: <Award />,
        projectSlug: 'meum-diarium'
    },
    {
        date: "Nov 2024",
        title: "1. Platz, Crossmedia-Wettbewerb",
        organization: "Bayerischer Rundfunk, Unterföhring",
        description: "Auszeichnung für „Meum Diarium“ in der Sparte „textbased“ für Idee, Umsetzung und mediale Aufbereitung.",
        icon: <Award />,
        projectSlug: 'meum-diarium'
    },
     {
        date: "Sep 2024",
        title: "Lightning Talk, Nextcloud Conference",
        organization: "Berlin",
        description: "Vortrag über Nextcloud-Security, Selfhosting und den Schutz sensibler Daten vor einer internationalen Community.",
        icon: <Rocket/>
    },
    {
        date: "Juli 2024",
        title: "Praktikum Informatik & Netzwerktechnik",
        organization: "Rohde & Schwarz Cybersecurity, München",
        description: "Praktische Arbeit an IT-Projekten und Einblicke in die Netzwerksicherheit.",
        icon: <Briefcase/>
    },
    {
        date: "Seit Aug 2022",
        title: "Gründer",
        organization: "Technik Schächner",
        description: "Bildung",
        icon: <Code/>,
        isCurrent: true
    },
    {
        date: "Seit 2023",
        title: "Administrator & Mitgründer der MedienScouts",
        organization: "König-Karlmann-Gymnasium",
        description: "Technische und didaktische Leitung von Schulinitiativen, Live-Workshops und Peer-to-Peer-Schulungen zur Medienkompetenz.",
        icon: <Users/>,
        projectSlug: 'medienscouts-kkg',
        isCurrent: true
    },
    {
        date: "Seit 2019",
        title: "Schüler am König-Karlmann-Gymnasium",
        organization: "Altötting",
        description: "Aktive Teilnahme an Digitalklassen, Medienscouts und MINT-Angeboten.",
        icon: <School/>,
        isCurrent: true
    }
];

const certificates = [
    {
        title: "Mediator",
        organization: "König-Karlmann-Gymnasium",
        date: "Feb. 2024 - Juli 2025",
        skills: ["Mediation", "Streitschlichtung", "Konfliktlösung", "Konfliktprävention"],
        description: "Im Rahmen des Wahlunterrichts Mediation eine 35-stündige Ausbildung zum Mediator absolviert und die Tätigkeit eines Mediators mit großer Begeisterung ausgeübt.",
        isCurrent: true
    },
    {
        title: "Großes Latinum",
        organization: "König-Karlmann-Gymnasium",
        date: "Juli 2025",
        skills: ["Latein"],
    },
    {
        title: "Königsdiplom Schach",
        organization: "Schachklub Töging e. V.",
        date: "Juli 2025",
        skills: ["Schach"]
    },
    {
        title: "Strafrechtsseminar",
        organization: "Friedrich-Alexander-Universität Erlangen-Nürnberg",
        date: "Nov. 2024",
        skills: ["Jura", "Strafrecht"]
    },
    {
        title: "Kleines Latinum",
        organization: "König-Karlmann-Gymnasium",
        date: "Juli 2024",
        skills: ["Latein"]
    },
    {
        title: "Young Leaders Akademie",
        organization: "young leaders GmbH",
        date: "Nov. 2023",
        skills: ["Mimik-Resonanz Training"]
    },
    {
        title: "1. Hilfe Kurs",
        organization: "Bayerisches Rotes Kreuz (BRK)",
        date: "Sept. 2023",
        skills: ["Erste Hilfe"]
    },
    {
        title: "Lerntrainerseminar",
        organization: "König-Karlmann-Gymnasium",
        date: "Juli 2023",
        skills: ["Nachhilfe", "Lerntrainer"]
    },
    {
        title: "Trainerassistent Judo",
        organization: "Bayerischer Judo-Verband e.V.",
        date: "Juni 2023",
        skills: ["Trainerassistent"]
    }
];


const skills = [
  'IT-Management', 'Serververwaltung', 'Netzwerktechnik', 'Next.js', 'React', 'Docker', 'Linux', 'Nextcloud', 'WordPress', 'UI Motion', 'Ollama', 'GitOps', 'Digitale Bildung', 'Mediation', 'Jura/Strafrecht'
];

const languages = [
    { name: "Deutsch", level: "Muttersprache" },
    { name: "Englisch", level: "B1+ (zertifiziert)" },
    { name: "Latein", level: "Großes Latinum" },
]


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

  const currentActivities = [...timelineEvents, ...certificates].filter(item => (item as any).isCurrent);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-24 md:pt-32 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-6 sm:px-8 max-w-5xl"
        >
            <motion.div variants={itemVariants} className="text-center mb-12">
                <div className="flex justify-center items-center gap-4">
                  <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-headline">
                      {about.name}
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-primary mt-2">{about.title}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
                {about.links.map(link => (
                    <Button key={link.name} asChild variant="outline" className="rounded-full" data-cursor-interactive>
                        <Link href={link.url} target="_blank">
                            {React.cloneElement(link.icon, { className: "mr-2" })}
                            {link.name}
                        </Link>
                    </Button>
                ))}
            </motion.div>

            <Tabs defaultValue="resume" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12">
                <TabsTrigger value="resume">Lebenslauf</TabsTrigger>
                <TabsTrigger value="current">Aktuelle Tätigkeiten</TabsTrigger>
              </TabsList>
              <TabsContent value="resume">
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center flex items-center justify-center gap-3"><Briefcase className="text-primary"/> Werdegang</h2>
                    <div className="relative border-l-2 border-border ml-3 md:ml-4 pl-4">
                        {timelineEvents.map((event, index) => (
                            <motion.div key={index} variants={itemVariants} className="mb-10 ml-4 md:ml-8">
                                <span className="absolute -left-[18px] flex items-center justify-center w-9 h-9 bg-background rounded-full ring-8 ring-background">
                                    <div className="flex items-center justify-center w-full h-full bg-secondary rounded-full">
                                      {React.cloneElement(event.icon, { className: "h-5 w-5 text-muted-foreground" })}
                                    </div>
                                </span>
                                <Card className="rounded-2xl border-border/50 transition-all hover:border-primary/50">
                                    <CardHeader>
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                            <CardTitle className="text-lg md:text-2xl font-bold font-headline">
                                            {event.projectSlug ? (
                                                <Link href={`/projects/${event.projectSlug}`} className="hover:text-primary transition-colors">
                                                {event.title}
                                                </Link>
                                            ) : (
                                                event.title
                                            )}
                                            </CardTitle>
                                            <Badge variant="secondary" className="text-xs md:text-sm rounded-md whitespace-nowrap self-start sm:self-center">{event.date}</Badge>
                                        </div>
                                        <CardDescription className="text-base md:text-lg pt-1 text-primary">{event.organization}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-base md:text-lg text-muted-foreground">{event.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center flex items-center justify-center gap-3"><Award className="text-primary"/> Bescheinigungen & Zertifikate</h2>
                    <div className="md:columns-2 md:gap-8 space-y-8">
                        {certificates.map((cert, index) => (
                            <motion.div key={index} variants={itemVariants} className="break-inside-avoid">
                                <Card className="rounded-2xl border-border/50">
                                    <CardHeader>
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                            <CardTitle className="text-lg md:text-2xl font-bold font-headline">{cert.title}</CardTitle>
                                            <Badge variant="secondary" className="text-xs md:text-sm rounded-md whitespace-nowrap self-start sm:self-center">{cert.date}</Badge>
                                        </div>
                                        <CardDescription className="text-base md:text-lg pt-1 text-primary">{cert.organization}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {cert.description && <p className="text-base md:text-lg text-muted-foreground mb-4">{cert.description}</p>}
                                        <div className="flex flex-wrap gap-2">
                                            {cert.skills.map(skill => (
                                                <Badge key={skill} variant="outline" className="text-xs rounded-md">{skill}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center flex items-center justify-center gap-3"><CodeSquare className="text-primary"/> Fähigkeiten</h2>
                        <Card className="rounded-2xl p-6 md:p-8">
                            <CardContent className="p-0">
                                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                                    {skills.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="text-sm md:text-lg rounded-lg px-3 py-1 md:px-4">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center flex items-center justify-center gap-3"><GraduationCap className="text-primary"/> Sprachen</h2>
                        <Card className="rounded-2xl p-6 md:p-8">
                            <CardContent className="p-0">
                                <div className="flex flex-col gap-4">
                                    {languages.map((lang) => (
                                        <div key={lang.name} className="flex justify-between items-center text-base md:text-lg">
                                            <span className="font-medium">{lang.name}</span>
                                            <span className="text-muted-foreground">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
              </TabsContent>
              <TabsContent value="current">
                 <div className="md:columns-2 md:gap-8 space-y-8">
                    {currentActivities.map((item: any, index) => (
                       <motion.div key={index} variants={itemVariants} className="break-inside-avoid">
                           <Card className="rounded-2xl border-border/50">
                               <CardHeader>
                                   <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                       <CardTitle className="text-lg md:text-2xl font-bold font-headline">{item.title}</CardTitle>
                                       <Badge variant="secondary" className="text-xs md:text-sm rounded-md whitespace-nowrap self-start sm:self-center">{item.date}</Badge>
                                   </div>
                                   <CardDescription className="text-base md:text-lg pt-1 text-primary">{item.organization}</CardDescription>
                               </CardHeader>
                               <CardContent>
                                   {item.description && <p className="text-base md:text-lg text-muted-foreground mb-4">{item.description}</p>}
                                   {item.skills && (
                                     <div className="flex flex-wrap gap-2">
                                         {item.skills.map((skill: string) => (
                                             <Badge key={skill} variant="outline" className="text-xs rounded-md">{skill}</Badge>
                                         ))}
                                     </div>
                                   )}
                               </CardContent>
                           </Card>
                       </motion.div>
                    ))}
                 </div>
              </TabsContent>
            </Tabs>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
