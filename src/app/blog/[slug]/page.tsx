
'use client';

import { blogData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect } from 'react';
import { useChat } from '@/components/providers/chat-provider';

export default function BlogPostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = blogData.find((p) => p.slug === slug);
  const { unlockAchievement } = useAchievements();
  const { openChat } = useChat();

  useEffect(() => {
    if (post) {
      unlockAchievement('BLOG_POST_READER');
    }
  }, [post, unlockAchievement]);

  if (!post) {
    notFound();
  }

  const handleAskAI = () => {
    const context = `
      Blog-Titel: ${post.title}
      Veröffentlichungsdatum: ${post.date}
      Tags: ${post.tags.join(', ')}
      Inhalt: ${post.content.replace(/<[^>]*>?/gm, '')}
    `;
    openChat(context);
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
          >
            <div className="flex justify-between items-center mb-8">
              <Button asChild variant="outline" className="rounded-full" data-cursor-interactive>
                <Link href="/blog">
                  <ArrowLeft className="mr-2" />
                  Zurück zum Blog
                </Link>
              </Button>
              <Button variant="outline" size="icon" onClick={handleAskAI} data-cursor-interactive>
                  <Bot className="w-5 h-5" />
                  <span className="sr-only">Frag die KI zu diesem Beitrag</span>
              </Button>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-headline mb-4">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm md:text-md rounded-lg">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground text-base md:text-lg">{new Date(post.date).toLocaleDateString('de-DE')}</p>
            </div>

            <div className="prose prose-invert prose-lg max-w-4xl mx-auto text-muted-foreground text-lg md:text-2xl space-y-6" dangerouslySetInnerHTML={{ __html: post.content }}>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
