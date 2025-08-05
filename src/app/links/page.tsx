
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Code, Home, Instagram, Linkedin, Mail, Notebook, Rss, User } from 'lucide-react';
import Footer from '@/components/footer';
import Header from '@/components/header';

const links = [
  {
    title: 'Portfolio',
    href: '/',
    icon: <Home />,
  },
  {
    title: 'Lebenslauf',
    href: '/resume',
    icon: <User />,
  },
  {
    title: 'LinkedIn',
    href: 'https://de.linkedin.com/in/benedikt-schächner-a22632299/',
    icon: <Linkedin />,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/benedikt.schaechner/',
    icon: <Instagram />,
  },
  {
    title: 'Notio - Notenverwaltung',
    href: 'https://notio.schächner.de',
    icon: <Notebook />,
  },
  {
    title: 'Meum Diarium - Cäsars Blog',
    href: 'https://caesar.schächner.de',
    icon: <Briefcase />,
  },
  {
    title: 'Medienscouts KKG',
    href: 'https://medienscouts-kkg.de/',
    icon: <Code />,
  },
  {
    title: 'Technik Blog',
    href: 'https://technik.xn--schchner-2za.de/',
    icon: <Rss />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LinksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-32 pb-16">
            <motion.div
                className="container mx-auto px-6 sm:px-8 max-w-md"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="flex flex-col items-center text-center mb-12" variants={itemVariants}>
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                     <AvatarImage src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Technologist%20Medium-Light%20Skin%20Tone.png" alt="Benedikt Schächner" />
                    <AvatarFallback>BS</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold font-headline">Benedikt Schächner</h1>
                <p className="text-muted-foreground mt-1">Schüler, Entwickler & digitaler Pionier</p>
                </motion.div>

                <motion.div className="space-y-4" variants={containerVariants}>
                {links.map((link) => (
                    <motion.div key={link.href} variants={itemVariants}>
                    <Button asChild variant="outline" className="w-full h-14 text-lg rounded-xl justify-start p-4" data-cursor-interactive>
                        <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'}>
                            <div className="w-6 mr-4">{link.icon}</div>
                            {link.title}
                        </Link>
                    </Button>
                    </motion.div>
                ))}
                </motion.div>
            </motion.div>
        </main>
        <Footer />
    </div>
  );
}
