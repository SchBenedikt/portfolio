
'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu, FolderKanban, UserSquare, Rss } from 'lucide-react';

const Header = ({ children }: { children?: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-6 transition-colors duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-black uppercase tracking-widest font-headline hover:text-accent transition-colors"
          data-cursor-interactive
        >
          BS
        </Link>

        <AnimatePresence>
          {!scrolled && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-10 text-xl"
            >
              <Link href="/projects" className="font-medium hover:text-accent transition-colors" data-cursor-interactive>
                Projekte
              </Link>
              <Link href="/resume" className="font-medium hover:text-accent transition-colors" data-cursor-interactive>
                Lebenslauf
              </Link>
              <Link href="/blog" className="font-medium hover:text-accent transition-colors" data-cursor-interactive>
                Blog
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {children}
          
          <AnimatePresence>
            {scrolled && (
                 <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="w-9 h-9" data-cursor-interactive>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menü öffnen</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/projects" className="flex items-center gap-2">
                      <FolderKanban className="text-muted-foreground" /> 
                      Projekte
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/resume" className="flex items-center gap-2">
                      <UserSquare className="text-muted-foreground" />
                      Lebenslauf
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/blog" className="flex items-center gap-2">
                      <Rss className="text-muted-foreground" />
                      Blog
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </motion.div>
            )}
          </AnimatePresence>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
