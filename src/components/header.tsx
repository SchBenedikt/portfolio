
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FolderKanban, UserSquare, Wrench, Link as LinkIcon, Home, GalleryHorizontal, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const Header = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: <Home/> },
    { href: "/projects", label: "Projekte", icon: <FolderKanban/> },
    { href: "/resume", label: "Lebenslauf", icon: <UserSquare/> },
    { href: "/gallery", label: "Galerie", icon: <GalleryHorizontal/> },
    { href: "/press", label: "Presse", icon: <Newspaper/> },
    { href: "/tools", label: "Tools", icon: <Wrench/> },
    { href: "/links", label: "Links", icon: <LinkIcon/> },
  ]
  
  const mobileNavLinks = navLinks.filter(l => ["/", "/projects", "/resume", "/links"].includes(l.href));


  const isLabelVisible = (href: string) => {
    return pathname.startsWith(href) || hoveredHref === href;
  }

  const navItemVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { 
      opacity: 1, 
      width: 'auto',
      transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } 
    },
    exit: { 
      opacity: 0, 
      width: 0,
      transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] }
    },
  }
  
  const layoutTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 hidden md:block">
        <motion.div 
          layout
          transition={layoutTransition}
          className={cn(
            "container mx-auto px-6 sm:px-8 flex items-center",
            isScrolled ? "justify-center gap-2" : "justify-between"
          )}
        >
          <motion.div layout transition={layoutTransition}>
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <Link
                    href="/"
                    className="text-2xl md:text-3xl font-black uppercase tracking-widest font-headline hover:text-primary transition-colors"
                    data-cursor-interactive
                    prefetch
                  >
                    BS
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  className="p-1 rounded-full bg-muted/50 backdrop-blur-lg"
                >
                  <Button asChild variant={'ghost'} className={cn("rounded-full relative")} data-cursor-interactive>
                      <Link href="/" className="flex items-center gap-1" prefetch>
                        <span className="font-headline text-base">BS</span>
                      </Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div 
              layout 
              transition={layoutTransition}
              className="flex items-center"
          >
              <motion.nav 
                layout
                transition={layoutTransition}
                className="flex items-center gap-1 p-1 rounded-full bg-muted/50 backdrop-blur-lg"
                onMouseLeave={() => setHoveredHref(null)}
              >
                {navLinks.slice(1).map(link => { // Slice to exclude Home from main nav
                    const showLabel = isLabelVisible(link.href)
                    return (
                        <Button 
                            key={link.href} 
                            asChild 
                            variant={pathname.startsWith(link.href) ? 'active' : 'ghost'}
                            className={cn("rounded-full relative")}
                            onMouseEnter={() => setHoveredHref(link.href)}
                            data-cursor-interactive
                        >
                            <Link href={link.href} className="flex items-center gap-1" prefetch>
                                {React.cloneElement(link.icon as React.ReactElement, { className: "w-4 h-4" })}
                                <AnimatePresence>
                                {showLabel && (
                                    <motion.span
                                        variants={navItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="overflow-hidden whitespace-nowrap"
                                    >
                                        {link.label}
                                    </motion.span>
                                )}
                                </AnimatePresence>
                            </Link>
                        </Button>
                    )
                })}
              </motion.nav>
          </motion.div>

          <motion.div layout transition={layoutTransition}>
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex items-center"
                >
                  <div className="flex items-center gap-1 p-1 rounded-full bg-muted/50 backdrop-blur-lg">
                      {children}
                      <ThemeToggle />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  className="p-1 rounded-full bg-muted/50 backdrop-blur-lg"
                >
                  <ThemeToggle />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border/50">
          <div className="flex justify-around items-center h-16">
              {mobileNavLinks.map(link => (
                  <Link href={link.href} key={link.href} className={cn(
                    "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
                    pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )} prefetch>
                      {React.cloneElement(link.icon as React.ReactElement, { className: "w-6 h-6" })}
                      <span className="text-xs font-medium">{link.label}</span>
                  </Link>
              ))}
          </div>
      </nav>
    </>
  );
};

export default Header;
