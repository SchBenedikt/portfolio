
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Award, Briefcase, Lightbulb, Users, Code, Rocket, GitBranch, Terminal as TerminalIcon, Rss, Link as LinkIcon, GraduationCap, Instagram } from 'lucide-react';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect } from 'react';
import Link from 'next/link';

const timelineEvents = [
    {
        icon: <Award className="h-5 w-5 text-background" />,
        iconBg: 'bg-yellow-500',
        date: "Nov 2024",
        title: "Hauptpreis, Deutscher Multimedia-Preis mb21",
        organization: "Finale in Dresden",
        description: "Gewinn des Hauptpreises für das Projekt „Meum Diarium – Ein Feldherr als Influencer“ zusammen mit Vinzenz Schächner."
    },
    {
        icon: <Award className="h-5 w-5 text-background" />,
        iconBg: 'bg-yellow-500',
        date: "Nov 2024",
        title: "Nominierung, Crossmedia-Wettbewerb",
        organization: "Bayerischer Rundfunk, Unterföhring",
        description: "Nominierung und Auszeichnung für „Meum Diarium“ in der Sparte „textbased“ für Idee, Umsetzung und mediale Aufbereitung."
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
        icon: <GraduationCap className="h-5 w-5 text-background" />,
        iconBg: 'bg-green-500',
        date: "Seit 2023",
        title: "Mitgründer der MedienScouts",
        organization: "König-Karlmann-Gymnasium",
        description: "Technische und didaktische Leitung von Schulinitiativen, Live-Workshops und Peer-to-Peer-Schulungen zur Medienkompetenz."
    }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const skills = [
  'Open Source', 'Digitale Bildung', 'LAMP Stacks', 'Docker', 'Next.js', 'React', 'TypeScript', 'GitOps', 'Linux', 'UI Motion', 'Nextcloud', 'Ollama'
];

const about = {
    text: "Schüler am König-Karlmann-Gymnasium in Altötting. Engagiert in technischen und medialen Projekten, um Digitalisierung mit Kreativität und Teamgeist an Schulen zu bringen.",
    links: [
        { name: "Website", url: "https://benedikt.xn--schchner-2za.de", icon: <LinkIcon/> },
        { name: "Medienscouts", url: "https://medienscouts-kkg.de", icon: <Users/> },
        { name: "Instagram", url: "#", icon: <Instagram/> },
        { name: "LinkedIn", url: "#", icon: <Briefcase/> }
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
      <main className="relative z-10 flex-grow pt-24 md:pt-32 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-6 sm:px-8 max-w-5xl"
        >
            <motion.div variants={itemVariants} className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-headline">
                    Lebenslauf
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mt-2">Benedikt Schächner</p>
            </motion.div>

            {/* About Me & Links */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="md:col-span-2 bg-card/50 backdrop-blur-lg p-8 rounded-3xl border border-border/50">
                    <p className="text-lg md:text-xl text-center md:text-left leading-relaxed">{about.text}</p>
                </div>
                <div className="flex flex-row md:flex-col justify-center items-center gap-4">
                    {about.links.map(link => (
                        <Button key={link.name} asChild variant="outline" className="rounded-full w-full justify-center text-md py-6" data-cursor-interactive>
                           <Link href={link.url} target="_blank">
                             {React.cloneElement(link.icon, { className: "mr-2" })}
                             {link.name}
                           </Link>
                        </Button>
                    ))}
                </div>
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
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                        <CardTitle className="text-xl md:text-2xl font-bold font-headline mb-1 sm:mb-0">{event.title}</CardTitle>
                                        <Badge variant="secondary" className="text-sm rounded-md whitespace-nowrap self-start sm:self-center">{event.date}</Badge>
                                    </div>
                                    <CardDescription className="text-md md:text-lg pt-1">{event.organization}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-md md:text-lg text-muted-foreground">{event.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Skills */}
             <motion.div variants={itemVariants}>
                <Card className="rounded-2xl p-8">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="flex items-center text-3xl md:text-4xl font-bold font-headline">
                            <Code className="mr-3 text-primary"/> Sprachen & Technologien
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-md md:text-lg rounded-lg px-4 py-1">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
