
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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [showCaptions, setShowCaptions] = useState(false);

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
            <h1 className="text-6xl md:text-8xl font-black text-center mb-8 md:mb-12 uppercase tracking-tighter font-headline">
              Galerie
            </h1>

            <div className="flex items-center justify-center space-x-2 mb-12">
              <Switch 
                id="show-captions" 
                checked={showCaptions}
                onCheckedChange={setShowCaptions}
              />
              <Label htmlFor="show-captions" className="text-lg">
                Bildunterschriften anzeigen
              </Label>
            </div>


            <motion.div
              className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {galleryData.map((item) => (
                <motion.div key={item.src} variants={itemVariants} className="break-inside-avoid">
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
                                 {showCaptions && (
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4 pt-12">
                                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                                  </div>
                                )}
                            </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl w-full p-0 bg-transparent border-none flex items-center justify-center">
                         <DialogHeader className="sr-only">
                           <DialogTitle>{item.title}</DialogTitle>
                           <DialogDescription>{item.description}</DialogDescription>
                         </DialogHeader>
                         <div className="flex flex-col-reverse md:flex-row items-stretch gap-0 max-h-[90vh] w-full">
                            <div className="md:w-96 flex-shrink-0 bg-card p-6 md:p-8 flex flex-col rounded-b-lg md:rounded-r-lg md:rounded-l-none">
                                <h2 className="text-2xl font-bold font-headline mb-2">{item.title}</h2>
                                <p className="text-muted-foreground text-base mb-6">{item.description}</p>
                                <div className="space-y-4 mt-auto border-t pt-6">
                                    <div className="flex items-start">
                                        <MapPin className="w-5 h-5 mr-3 mt-1 text-primary"/>
                                        <div>
                                            <h4 className="font-semibold">Ort</h4>
                                            <p className="text-muted-foreground text-sm">{item.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Calendar className="w-5 h-5 mr-3 mt-1 text-primary"/>
                                        <div>
                                            <h4 className="font-semibold">Datum</h4>
                                            <p className="text-muted-foreground text-sm">{new Date(item.date).toLocaleDateString('de-DE')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div 
                                className="flex-1 min-w-0 bg-black flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    width={1600}
                                    height={1200}
                                    className="object-contain w-full h-full"
                                />
                            </div>
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
