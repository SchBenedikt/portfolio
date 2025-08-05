
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
import { cn } from '@/lib/utils';
import { Expand } from 'lucide-react';

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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    unlockAchievement('GALLERY_VIEWER');
  }, [unlockAchievement]);

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
            <h1 className="text-6xl md:text-8xl font-black text-center mb-12 md:mb-16 uppercase tracking-tighter font-headline">
              Galerie
            </h1>

            <motion.div
              className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {galleryData.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="break-inside-avoid">
                   <Dialog>
                      <DialogTrigger asChild>
                        <Card 
                            className="rounded-2xl overflow-hidden group relative cursor-pointer"
                            data-cursor-interactive
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                width={item.width}
                                height={item.height}
                                className="w-full h-auto"
                                data-ai-hint={item.aiHint}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Expand className="text-white w-12 h-12" />
                            </div>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-7xl w-full h-screen max-h-screen p-4 bg-transparent border-none flex items-center justify-center">
                         <DialogHeader className="sr-only">
                            <DialogTitle>{item.title}</DialogTitle>
                            <DialogDescription>{item.description}</DialogDescription>
                         </DialogHeader>
                         <Image
                            src={item.src}
                            alt={item.alt}
                            width={1920}
                            height={1080}
                            className="object-contain w-auto h-auto max-w-full max-h-[90vh] rounded-lg"
                          />
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
