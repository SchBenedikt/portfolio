'use client';

import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { awardsData } from '@/lib/awards';
import { getOrganizationBySlug } from '@/lib/organizations';
import { useAchievements } from '@/components/providers/achievements-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Calendar, FolderKanban, Trophy } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type GroupedAwards = { [year: string]: typeof awardsData };

export default function AwardsPage() {
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    unlockAchievement('AWARDS_VIEWER');
  }, [unlockAchievement]);

  const groupedAwards = useMemo(() => {
    const sorted = [...awardsData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted.reduce((acc: GroupedAwards, award) => {
      const year = new Date(award.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(award);
      return acc;
    }, {});
  }, []);

  const sortedYears = Object.keys(groupedAwards).sort((a, b) => parseInt(b) - parseInt(a));

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
            <h1 className="text-5xl md:text-8xl font-black text-center mb-6 uppercase tracking-tighter font-headline">
              Auszeichnungen
            </h1>
            <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
              Preise und Auszeichnungen, die ich mit meinen Projekten und meinem Engagement gewonnen habe.
            </p>

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
                      {groupedAwards[year].length}{' '}
                      {groupedAwards[year].length === 1 ? 'Auszeichnung' : 'Auszeichnungen'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {groupedAwards[year].map((award) => {
                      const organization = getOrganizationBySlug(award.organizationSlug);
                      return (
                        <motion.div
                          key={`${award.date}-${award.title}`}
                          variants={itemVariants}
                          className="break-inside-avoid"
                        >
                          <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all hover:border-primary/50 hover:bg-muted/30">
                            <CardHeader className="p-6 md:p-8">
                              <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                  <Trophy className="h-5 w-5 text-primary" />
                                </span>
                                <div className="flex flex-wrap items-center gap-2">
                                  {award.place && (
                                    <Badge className="rounded-md text-xs md:text-sm">{award.place}</Badge>
                                  )}
                                  {award.category && (
                                    <Badge variant="secondary" className="rounded-md text-xs md:text-sm">
                                      {award.category}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <CardTitle className="text-xl md:text-2xl font-bold font-headline">
                                {award.title}
                              </CardTitle>
                              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                <Link
                                  href={`/organization/${award.organizationSlug}`}
                                  data-cursor-interactive
                                  className="text-base text-primary hover:underline"
                                  prefetch
                                >
                                  {organization?.name || award.organization}
                                </Link>
                                <div className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(award.date).toLocaleDateString('de-DE')}</span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="flex flex-grow flex-col p-6 pt-0 md:p-8 md:pt-0">
                              <p className="flex-grow text-base text-muted-foreground">{award.description}</p>
                              <div className="mt-6 flex flex-wrap gap-3">
                                {award.projectSlug && (
                                  <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-full"
                                    data-cursor-interactive
                                  >
                                    <Link href={`/projects/${award.projectSlug}`} prefetch>
                                      <FolderKanban className="mr-2 h-5 w-5" />
                                      Zum Projekt
                                    </Link>
                                  </Button>
                                )}
                                {award.url && (
                                  <Button asChild className="rounded-full" data-cursor-interactive>
                                    <Link href={award.url} target="_blank" rel="noopener noreferrer" prefetch>
                                      <span>Mehr erfahren</span>
                                      <ArrowUpRight className="ml-2 h-5 w-5 transform-gpu transition-transform group-hover:rotate-45" />
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
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
