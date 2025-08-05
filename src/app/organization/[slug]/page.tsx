
'use client';

import { notFound, useParams } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { getOrganizationBySlug, resumeOrgToSlug } from '@/lib/organizations';
import { articlesData } from '@/lib/articles';
import { timelineEvents, certificates } from '@/app/resume/page';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase, Award, Newspaper, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrganizationPage() {
  const params = useParams();
  const slug = params.slug as string;
  const organization = getOrganizationBySlug(slug);

  if (!organization) {
    notFound();
  }
  
  const relatedTimelineEvents = timelineEvents.filter(event => resumeOrgToSlug[event.organization] === slug);
  const relatedCertificates = certificates.filter(cert => resumeOrgToSlug[cert.organization] === slug);
  const relatedArticles = articlesData.filter(article => article.organizationSlug === slug);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-16 md:pt-32 pb-24 md:pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <Button asChild variant="outline" className="rounded-full" data-cursor-interactive>
                <Link href="/resume">
                  <ArrowLeft className="mr-2" />
                  Zurück zum Lebenslauf
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                {organization.logo && (
                    <div className="w-16 h-16 md:w-24 md:h-24 relative p-2 bg-white rounded-xl flex items-center justify-center">
                        <Image src={organization.logo} alt={`${organization.name} Logo`} layout="fill" objectFit="contain" />
                    </div>
                )}
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter font-headline">
                    {organization.name}
                </h1>
            </div>

            <div className="space-y-16">
              {relatedTimelineEvents.length > 0 && (
                <section>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8 flex items-center gap-3"><Briefcase className="text-primary"/> Werdegang</h2>
                  <div className="relative border-l-2 border-border ml-3 md:ml-4 pl-4">
                     {relatedTimelineEvents.map((event, index) => (
                        <div key={index} className="mb-10 ml-4 md:ml-8">
                            <span className="absolute -left-[18px] flex items-center justify-center w-9 h-9 bg-background rounded-full ring-8 ring-background">
                                <div className="flex items-center justify-center w-full h-full bg-secondary rounded-full">
                                    {event.icon}
                                </div>
                            </span>
                            <Card className="rounded-2xl border-border/50">
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                        <CardTitle className="text-lg md:text-2xl font-bold font-headline">{event.title}</CardTitle>
                                        <CardDescription>{event.date}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-base md:text-lg text-muted-foreground">{event.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                  </div>
                </section>
              )}

              {relatedCertificates.length > 0 && (
                 <section>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8 flex items-center justify-center gap-3"><Award className="text-primary"/> Bescheinigungen & Zertifikate</h2>
                    <div className="md:columns-2 md:gap-8 space-y-8">
                        {relatedCertificates.map((cert, index) => (
                            <div key={index} className="break-inside-avoid">
                                <Card className="rounded-2xl border-border/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg md:text-2xl font-bold font-headline">{cert.title}</CardTitle>
                                        <CardDescription>{cert.date}</CardDescription>
                                    </CardHeader>
                                    {cert.description && (
                                        <CardContent>
                                            <p className="text-base md:text-lg text-muted-foreground">{cert.description}</p>
                                        </CardContent>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div>
                </section>
              )}

              {relatedArticles.length > 0 && (
                <section>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8 flex items-center gap-3"><Newspaper className="text-primary"/> Presseartikel</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {relatedArticles.map((article) => (
                        <div key={article.url}>
                           <Link href={article.url} target="_blank" rel="noopener noreferrer" data-cursor-interactive className="h-full flex">
                              <Card className="group rounded-2xl overflow-hidden transition-all hover:border-primary/50 hover:bg-muted/30 w-full flex flex-col">
                                <CardHeader className="p-6 md:p-8">
                                  <CardTitle className="text-2xl font-bold font-headline mb-2">{article.title}</CardTitle>
                                  <CardDescription className="text-base text-primary">{article.source}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 md:p-8 pt-0 flex-grow flex flex-col">
                                   <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(article.date).toLocaleDateString('de-DE')}</span>
                                   </div>
                                   <p className="text-muted-foreground text-base flex-grow">{article.description}</p>
                                </CardContent>
                              </Card>
                            </Link>
                        </div>
                      ))}
                    </div>
                </section>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
