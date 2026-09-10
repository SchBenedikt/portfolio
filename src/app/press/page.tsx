
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header';
import PageHeading from '@/components/page-heading';
import Footer from '@/components/footer';
import { articlesData } from '@/lib/articles';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useI18n } from '@/components/providers/i18n-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Calendar, Search, Folder } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getOrganizationBySlug } from '@/lib/organizations';
import { projectData } from '@/lib/projects';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const { t, locale } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');

  useEffect(() => {
    unlockAchievement('PRESS_READER');
  }, [unlockAchievement]);

  const sources = useMemo(() => {
    const set = new Set<string>();
    articlesData.forEach((article) => {
      const org = getOrganizationBySlug(article.organizationSlug);
      set.add(org?.name || article.source);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredArticles = useMemo(() => {
    return articlesData
      .filter(article => {
        const term = searchTerm.toLowerCase();
        const matchesSearch = article.title.toLowerCase().includes(term) || 
               article.description.toLowerCase().includes(term);
        const org = getOrganizationBySlug(article.organizationSlug);
        const source = org?.name || article.source;
        const matchesSource = sourceFilter === 'all' || source === sourceFilter;
        return matchesSearch && matchesSource;
      });
  }, [searchTerm, sourceFilter]);

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
      <main className="portfolio-subpage relative z-10 flex-grow pt-16 md:pt-32 pb-24 md:pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <PageHeading title={t.press.title} description={t.press.description}/>
            
            <div className="mb-12 flex flex-col lg:flex-row gap-4">
              <div className="relative flex-grow">
                 <Input 
                    type="text"
                    placeholder={t.press.searchPlaceholder}
                    className="w-full p-4 pl-12 text-lg rounded-full h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6"/>
              </div>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full lg:w-72 h-12 rounded-full px-6 text-base">
                  <SelectValue placeholder={t.press.allSources} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.press.allSources}</SelectItem>
                  {sources.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                    <div className="flex items-baseline justify-between mb-8 border-b pb-4">
                      <h2 className="text-4xl md:text-5xl font-black">{year}</h2>
                      <span className="text-base md:text-lg text-muted-foreground whitespace-nowrap">
                        {groupedArticles[year].length} {t.press.articles}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {groupedArticles[year].map((article) => {
                         const organization = getOrganizationBySlug(article.organizationSlug);
                         return (
                            <motion.div key={article.url} variants={itemVariants} className="break-inside-avoid">
                               <Card className={cn("group rounded-none overflow-hidden transition-all w-full flex flex-col relative hover:border-primary/50 hover:bg-muted/30")}>
                                <div className="relative z-10 bg-transparent flex flex-col h-full">
                                  <CardHeader className="p-6 md:p-8">
                                    <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-start gap-4">
                                        <div>
                                            <CardTitle className="text-2xl font-bold font-headline mb-2">
                                              <Link href={article.url} target="_blank" rel="noopener noreferrer" data-cursor-interactive className="hover:text-primary transition-colors" prefetch>
                                                {article.title}
                                              </Link>
                                            </CardTitle>
                                            <Link href={`/organization/${article.organizationSlug}`} data-cursor-interactive className="text-base text-primary hover:underline" prefetch>
                                                {organization?.name || article.source}
                                            </Link>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap self-start sm:self-auto">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(article.date).toLocaleDateString(locale === 'en' ? 'en-GB' : 'de-DE')}</span>
                                        </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="p-6 md:p-8 pt-0 flex-grow flex flex-col">
                                      <p className="text-muted-foreground text-base flex-grow">{article.description}</p>
                                      {article.projectSlug && (() => {
                                        const project = projectData.find(p => p.slug === article.projectSlug);
                                        if (!project) return null;
                                        return (
                                          <Link href={`/projects/${project.slug}`} className="flex items-center gap-2 text-sm text-primary mt-3 hover:underline" data-cursor-interactive prefetch>
                                            <Folder size={14} />
                                            <span>{project.title}</span>
                                          </Link>
                                        );
                                      })()}
                                      <Button asChild variant="outline" className="rounded-full mt-4 self-start group-hover:bg-accent group-hover:text-accent-foreground" data-cursor-interactive>
                                        <Link href={article.url} target="_blank" rel="noopener noreferrer" prefetch>
                                          <span>{t.press.readArticle}</span>
                                          <ArrowUpRight className="ml-2 w-5 h-5 transform-gpu transition-transform group-hover:rotate-45" />
                                        </Link>
                                      </Button>
                                  </CardContent>
                                </div>
                              </Card>
                            </motion.div>
                         )
                      })}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="text-center text-lg text-muted-foreground py-16">
                <p>{t.press.noResults}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
