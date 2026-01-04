'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, 0.05, 0.01, 0.9],
            },
        },
    };

    const glitchVariants = {
        initial: { x: 0 },
        animate: {
            x: [0, -5, 5, -5, 5, 0],
            transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3,
            },
        },
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/10 via-transparent to-transparent rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                className="container mx-auto px-6 sm:px-8 text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 404 Number with glitch effect */}
                <motion.div
                    className="relative mb-8"
                    variants={itemVariants}
                >
                    <motion.h1
                        className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-black leading-none tracking-tighter font-headline"
                        variants={glitchVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <span className="bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                            404
                        </span>
                    </motion.h1>

                    {/* Glitch layers */}
                    <motion.h1
                        className="absolute inset-0 text-[12rem] sm:text-[16rem] md:text-[20rem] font-black leading-none tracking-tighter font-headline opacity-20"
                        style={{ color: 'hsl(var(--primary))' }}
                        animate={{
                            x: [0, 3, -3, 3, -3, 0],
                            opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                            delay: 0.05,
                        }}
                    >
                        404
                    </motion.h1>
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants} className="mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Seite nicht gefunden
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
                        Keine Sorge, wir helfen Ihnen zurück auf den richtigen Weg.
                    </p>
                </motion.div>

                {/* Animated search icon */}
                <motion.div
                    variants={itemVariants}
                    className="mb-12 flex justify-center"
                >
                    <motion.div
                        className="relative"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        <Search className="w-16 h-16 text-primary relative z-10" />
                    </motion.div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/">
                        <Button
                            size="lg"
                            className="group relative overflow-hidden rounded-full px-8 py-6 text-lg font-semibold"
                            data-cursor-interactive
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/10 to-primary/0"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <Home className="mr-2 h-5 w-5 inline-block" />
                            Zur Startseite
                        </Button>
                    </Link>

                    <Link href="/projects">
                        <Button
                            variant="outline"
                            size="lg"
                            className="group rounded-full px-8 py-6 text-lg font-semibold border-2"
                            data-cursor-interactive
                        >
                            <ArrowLeft className="mr-2 h-5 w-5 inline-block transition-transform group-hover:-translate-x-1" />
                            Projekte ansehen
                        </Button>
                    </Link>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-primary rounded-full"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </motion.div>
        </div>
    );
}
