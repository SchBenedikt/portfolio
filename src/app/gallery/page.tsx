'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { galleryData } from '@/lib/gallery';
import Image from 'next/image';
import { useAchievements } from '@/components/providers/achievements-provider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from '@/components/ui/card';

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function GalleryPage() {
  const { unlockAchievement } = useAchievements();
  const [shuffledGallery, setShuffledGallery] = useState(galleryData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    unlockAchievement('GALLERY_VIEWER');
  }, [unlockAchievement]);

  // Shuffle nur auf dem Client, nach dem Mount
  useEffect(() => {
    const arr = [...galleryData];

    // Fisher-Yates-Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    setShuffledGallery(arr);
    setIsMounted(true);
  }, []);

  // Render nicht, bis Client gemountet ist
  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="relative z-10 flex-grow pt-16 md:pt-32 pb-24 md:pb-16">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-black text-center mb-8 md:mb-12 uppercase tracking-tighter font-headline">
                Galerie
              </h1>
              <div className="text-center text-muted-foreground">Lädt...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <h1 className="text-6xl md:text-8xl font-black text-center mb-8 md:mb-12 uppercase tracking-tighter font-headline">
              Galerie
            </h1>

            <motion.div
              className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {shuffledGallery.map((item) => (
                <motion.div
                  key={item.src}
                  variants={itemVariants}
                  className="break-inside-avoid"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card
                        className="rounded-2xl overflow-hidden group relative cursor-pointer"
                        data-cursor-interactive
                      >
                        <CardContent className="p-0">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            className="w-full h-auto"
                            data-ai-hint={item.aiHint}
                          />
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl w-full p-0 bg-transparent border-none flex items-center justify-center">
                      <DialogHeader className="sr-only">
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>{item.description}</DialogDescription>
                      </DialogHeader>
                      <div className="flex-1 min-w-0 bg-black flex items-center justify-center rounded-lg overflow-hidden max-h-[90vh]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={1600}
                          height={1200}
                          className="object-contain w-full h-auto max-h-[90vh]"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
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
