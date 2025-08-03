
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { blogData } from '@/lib/blog';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAchievements } from '@/components/providers/achievements-provider';

const MotionCard = motion(Card);

export default function BlogPage() {
  const [isClient, setIsClient] = useState(false);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    setIsClient(true);
    unlockAchievement('BLOG_EXPLORER');
  }, [unlockAchievement]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.section
            id="blog"
            className="py-12"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-7xl md:text-8xl font-black text-center mb-16 uppercase tracking-tighter font-headline">
              Technik & KI Blog
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogData.map((post, index) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} data-cursor-interactive>
                  <MotionCard
                    className="flex flex-col overflow-hidden transition-all duration-300 group rounded-3xl h-full shadow-lg hover:shadow-2xl hover:-translate-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CardHeader>
                      <CardTitle className="text-4xl font-bold font-headline">
                        {post.title}
                      </CardTitle>
                       <CardDescription className="text-lg pt-2">{isClient ? new Date(post.date).toLocaleDateString('de-DE') : new Date(post.date).toISOString().split('T')[0]}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-lg text-muted-foreground">{post.description}</p>
                    </CardContent>
                    <CardFooter className="flex-col items-start space-y-4">
                       <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-md rounded-lg">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                       <p className="flex items-center font-semibold text-primary group-hover:text-accent transition-colors">
                        Mehr lesen <ArrowRight className="ml-2 h-5 w-5"/>
                       </p>
                    </CardFooter>
                  </MotionCard>
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
