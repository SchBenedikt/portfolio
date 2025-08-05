
'use client';

import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { articlesData } from '@/lib/articles';
import { useAchievements } from '@/components/providers/achievements-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Calendar } from 'lucide-react';
import Link from 'next/link';

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
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function PressPage() {
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    unlockAchievement('PRESS_READER');
  }, [unlockAchievement]);

  const sortedArticles = useMemo(() => {
    return [...articlesData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

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
            <h1 className="text-6xl md:text-8xl font-black text-center mb-12 md:mb-16 uppercase tracking-tighter font-headline">
              Presse
            </h1>
            <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 -mt-8">
              Eine Auswahl von Artikeln und Veröffentlichungen über meine Projekte und Aktivitäten.
            </p>

            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedArticles.map((article, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link href={article.url} target="_blank" rel="noopener noreferrer" data-cursor-interactive>
                    <Card className="group rounded-2xl overflow-hidden transition-all hover:border-primary/50 hover:bg-muted/30">
                      <CardHeader className="p-6 md:p-8">
                        <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-start gap-4">
                           <div>
                                <CardTitle className="text-2xl md:text-3xl font-bold font-headline mb-2">{article.title}</CardTitle>
                                <CardDescription className="text-base md:text-lg text-primary">{article.source}</CardDescription>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap self-start sm:self-auto">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(article.date).toLocaleDateString('de-DE')}</span>
                           </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8 pt-0">
                         <p className="text-muted-foreground text-base md:text-lg">{article.description}</p>
                         <div className="flex items-center text-primary mt-4 font-semibold">
                            <span>Artikel lesen</span>
                            <ArrowUpRight className="ml-2 w-5 h-5 transform-gpu transition-transform group-hover:rotate-45" />
                         </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
