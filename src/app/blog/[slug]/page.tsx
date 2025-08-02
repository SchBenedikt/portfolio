
'use client';

import { blogData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Github, Rss } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAchievements } from '@/components/providers/achievements-provider';
import { useEffect } from 'react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogData.find((p) => p.slug === params.slug);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    if (post) {
      unlockAchievement('BLOG_POST_READER');
    }
  }, [post, unlockAchievement]);

  if (!post) {
    notFound();
  }

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
            <div className="mb-8">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/blog">
                  <ArrowLeft className="mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </div>
            <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter font-headline mb-4">
              {post.title}
            </h1>
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-md rounded-lg">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground text-lg">{new Date(post.date).toLocaleDateString()}</p>
            </div>

            <div className="prose prose-invert prose-lg max-w-4xl mx-auto text-muted-foreground text-2xl space-y-6">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.
                </p>
                 <p>
                    Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam.           
                </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

