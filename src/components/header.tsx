
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu, FolderKanban, UserSquare, Rss, Wrench } from 'lucide-react';
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
    { href: "/projects", label: "Projekte", icon: <FolderKanban/> },
    { href: "/resume", label: "Lebenslauf", icon: <UserSquare/> },
    { href: "/blog", label: "Blog", icon: <Rss/> },
    { href: "/tools", label: "Tools", icon: <Wrench/> },
  ]

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300">
      <motion.div 
        layout 
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="container mx-auto px-6 sm:px-8 flex items-center justify-between"
      >
        <motion.div layout>
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
              >
                 <div className="p-1 rounded-full bg-muted/50">
                    <Button asChild variant={'active'} className={cn("rounded-full relative")} data-cursor-interactive>
                       <Link href="/" className="flex items-center gap-1">
                          <span className="font-headline text-base">BS</span>
                       </Link>
                    </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div 
            layout 
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="hidden md:flex items-center gap-2"
        >
            <motion.nav 
              layout
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center gap-1 p-1 rounded-full bg-muted/50"
              onMouseLeave={() => setHoveredHref(null)}
            >
              {navLinks.map(link => {
                  const showLabel = isLabelVisible(link.href) || (isScrolled && pathname.startsWith(link.href) && hoveredHref === null) || (!isScrolled);
                  return (
                      <Button 
                          key={link.href} 
                          asChild 
                          variant={pathname.startsWith(link.href) ? 'active' : 'ghost'}
                          className={cn("rounded-full relative")}
                          onMouseEnter={() => setHoveredHref(link.href)}
                          data-cursor-interactive
                      >
                          <Link href={link.href} className="flex items-center gap-1">
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

        <motion.div layout>
          <AnimatePresence>
            {!isScrolled && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex items-center"
              >
                <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-muted/50">
                    {children}
                    <ThemeToggle />
                </div>
                
                {/* Mobile Menu */}
                <div className="md:hidden">
                    <div className="flex items-center gap-2">
                        {children}
                        <ThemeToggle />
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="w-9 h-9" data-cursor-interactive>
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Menü öffnen</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {navLinks.map(link => (
                                <DropdownMenuItem key={link.href} asChild>
                                <Link href={link.href} className="flex items-center gap-2 text-base">
                                    {React.cloneElement(link.icon as React.ReactElement, { className: "text-muted-foreground" })}
                                    {link.label}
                                </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
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
                 className="hidden md:flex"
              >
                <div className="flex items-center gap-1 p-1 rounded-full bg-muted/50">
                    <ThemeToggle />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
