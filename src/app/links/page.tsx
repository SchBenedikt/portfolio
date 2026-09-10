
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Briefcase, Code, Home, Instagram, Linkedin, Notebook, Rss, User, ArrowUpRight, GalleryHorizontal, Newspaper 
} from 'lucide-react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import PageHeading from '@/components/page-heading';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useI18n } from '@/components/providers/i18n-provider';

const projectLinks = [
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
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};


export default function LinksPage() {
  const { t } = useI18n();

  const mainLinks = [
    {
      title: t.links.portfolio,
      href: '/',
      icon: <Home className="w-8 h-8" />,
      color: 'bg-primary/10 text-primary',
    },
    {
      title: t.links.resume,
      href: '/resume',
      icon: <User className="w-8 h-8" />,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: 'LinkedIn',
      href: 'https://de.linkedin.com/in/benedikt-schächner-a22632299/',
      icon: <Linkedin className="w-8 h-8" />,
       color: 'bg-sky-600/10 text-sky-600',
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/benedikt.schaechner/',
      icon: <Instagram className="w-8 h-8" />,
       color: 'bg-pink-500/10 text-pink-500',
    },
  ];

  const secondaryLinks = [
    { title: t.nav.blog, href: '/blog', icon: <Notebook /> },
    { title: t.nav.gallery, href: '/gallery', icon: <GalleryHorizontal /> },
    { title: t.nav.press, href: '/press', icon: <Newspaper /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="portfolio-subpage links-page flex-grow flex items-center justify-center pt-16 md:pt-32 pb-24 md:pb-16">
            <motion.div
                className="container mx-auto px-6 sm:px-8 max-w-md"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <PageHeading title={t.links.title} description={t.links.description}/>
                <motion.div variants={itemVariants} className="mb-10">
                    <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider text-left mb-4">{t.links.importantLinks}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {mainLinks.map((link) => (
                        <Link href={link.href} key={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'} data-cursor-interactive prefetch>
                            <Card className="group relative rounded-none overflow-hidden text-center h-32 flex flex-col justify-center items-center hover:bg-muted/50 transition-colors">
                              <div className={cn("p-3 rounded-full mb-2 transition-colors", link.color)}>
                                {link.icon}
                              </div>
                              <p className="font-semibold text-sm">{link.title}</p>
                              <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Card>
                        </Link>
                      ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-10">
                    <div className="space-y-3">
                      {secondaryLinks.map((link) => (
                          <div key={link.href}>
                            <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'} data-cursor-interactive prefetch>
                               <Card className="group relative p-4 rounded-none hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center">
                                    <div className="w-6 mr-4 text-muted-foreground">{link.icon}</div>
                                    <span className="font-medium flex-grow">{link.title}</span>
                                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                               </Card>
                            </Link>
                          </div>
                      ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider text-left mb-4">{t.links.projects}</h2>
                    <div className="space-y-3">
                      {projectLinks.map((link) => (
                          <div key={link.href}>
                            <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'} data-cursor-interactive prefetch>
                               <Card className="group relative p-4 rounded-none hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center">
                                    <div className="w-6 mr-4 text-muted-foreground">{link.icon}</div>
                                    <span className="font-medium flex-grow">{link.title}</span>
                                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                               </Card>
                            </Link>
                          </div>
                      ))}
                    </div>
                </motion.div>

            </motion.div>
        </main>
        <Footer />
    </div>
  );
}
