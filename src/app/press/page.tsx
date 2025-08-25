
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { articlesData } from '@/lib/articles';
import { useAchievements } from '@/components/providers/achievements-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Calendar, Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getOrganizationBySlug } from '@/lib/organizations';

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

type GroupedArticles = { [year: string]: typeof articlesData };

export default function PressPage() {
  const { unlockAchievement } = useAchievements();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    unlockAchievement('PRESS_READER');
  }, [unlockAchievement]);

  const filteredArticles = useMemo(() => {
    return articlesData
      .filter(article => {
        const term = searchTerm.toLowerCase();
        return article.title.toLowerCase().includes(term) || 
               article.description.toLowerCase().includes(term);
      });
  }, [searchTerm]);

  const groupedArticles = useMemo(() => {
    const sorted = [...filteredArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sorted.reduce((acc: GroupedArticles, article) => {
      const year = new Date(article.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(article);
      return acc;
    }, {});
  }, [filteredArticles]);

  const sortedYears = Object.keys(groupedArticles).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-16 md:pt-32 pb-24 md:pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-black text-center mb-8 uppercase tracking-tighter font-headline">
              Presse
            </h1>
            
            <div className="mb-12 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                 <Input 
                    type="text"
                    placeholder="Artikel durchsuchen..."
                    className="w-full p-4 pl-12 text-lg rounded-full h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6"/>
              </div>
            </div>


            {sortedYears.length > 0 ? (
              <motion.div
                className="space-y-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sortedYears.map((year) => (
                  <motion.div key={year} variants={itemVariants}>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 border-b pb-4">{year}</h2>
                    <div className="columns-1 md:columns-2 gap-8 space-y-8">
                      {groupedArticles[year].map((article) => (
                        <motion.div key={article.url} variants={itemVariants} className="break-inside-avoid">
                           <Card className="group rounded-2xl overflow-hidden transition-all hover:border-primary/50 hover:bg-muted/30 w-full flex flex-col">
                            <CardHeader className="p-6 md:p-8">
                              <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-start gap-4">
                                  <div>
                                      <CardTitle className="text-2xl font-bold font-headline mb-2">
                                        <Link href={article.url} target="_blank" rel="noopener noreferrer" data-cursor-interactive className="hover:text-primary transition-colors" prefetch>
                                          {article.title}
                                        </Link>
                                      </CardTitle>
                                      <Link href={`/organization/${article.organizationSlug}`} data-cursor-interactive className="text-base text-primary hover:underline" prefetch>
                                          {getOrganizationBySlug(article.organizationSlug)?.name || article.source}
                                      </Link>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap self-start sm:self-auto">
                                      <Calendar className="w-4 h-4" />
                                      <span>{new Date(article.date).toLocaleDateString('de-DE')}</span>
                                  </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8 pt-0 flex-grow flex flex-col">
                                <p className="text-muted-foreground text-base flex-grow">{article.description}</p>
                                <Button asChild variant="outline" className="rounded-full mt-4 self-start group-hover:bg-accent group-hover:text-accent-foreground" data-cursor-interactive>
                                  <Link href={article.url} target="_blank" rel="noopener noreferrer" prefetch>
                                    <span>Artikel lesen</span>
                                    <ArrowUpRight className="ml-2 w-5 h-5 transform-gpu transition-transform group-hover:rotate-45" />
                                  </Link>
                                </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="text-center text-lg text-muted-foreground py-16">
                <p>Keine Artikel für die aktuelle Auswahl gefunden.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
