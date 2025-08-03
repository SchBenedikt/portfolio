
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
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAchievements } from '@/components/providers/achievements-provider';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const MotionCard = motion(Card);

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(blogData[0]);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    unlockAchievement('BLOG_EXPLORER');
  }, [unlockAchievement]);

  const handleSelectPost = (slug: string) => {
    const post = blogData.find((p) => p.slug === slug);
    if (post) {
      setSelectedPost(post);
      unlockAchievement('BLOG_POST_READER');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-black text-center mb-12 md:mb-16 uppercase tracking-tighter font-headline">
              Technik & KI Blog
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="md:col-span-1">
                <div className="md:sticky md:top-32 space-y-4">
                  {blogData.map((post) => (
                    <Card
                      key={post.slug}
                      className={`cursor-pointer rounded-2xl transition-all ${
                        selectedPost.slug === post.slug
                          ? 'border-primary shadow-2xl'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleSelectPost(post.slug)}
                      data-cursor-interactive
                    >
                      <CardHeader>
                        <CardTitle className="text-xl md:text-2xl font-bold font-headline">{post.title}</CardTitle>
                        <CardDescription className="text-sm md:text-md pt-1">{new Date(post.date).toLocaleDateString('de-DE')}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                {selectedPost && (
                  <motion.div
                    key={selectedPost.slug}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:sticky md:top-32"
                  >
                    <Card className="rounded-3xl shadow-lg">
                      <CardHeader>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter font-headline mb-2">
                          {selectedPost.title}
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                            <div className="flex flex-wrap gap-2">
                                {selectedPost.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-sm md:text-md rounded-lg">
                                    {tag}
                                </Badge>
                                ))}
                            </div>
                            <p className="text-muted-foreground text-base md:text-lg shrink-0">{new Date(selectedPost.date).toLocaleDateString('de-DE')}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div
                            className="prose prose-invert prose-lg max-w-none text-muted-foreground text-lg md:text-xl space-y-6"
                            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                        ></div>
                      </CardContent>
                      <CardFooter>
                         <Button asChild className="rounded-full text-base md:text-lg" data-cursor-interactive>
                           <Link href={`/blog/${selectedPost.slug}`}>
                                Beitrag aufrufen <ArrowRight className="ml-2"/>
                           </Link>
                         </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
