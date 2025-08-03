
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Header = ({children}: {children?: React.ReactNode}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-4 bg-background/80 backdrop-blur-lg shadow-lg' : 'py-10'
      )}
      initial={{ y: -150 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <div className="container mx-auto px-6 sm:px-8 flex justify-between items-center">
        <Link href="/" className="text-3xl font-black uppercase tracking-widest font-headline hover:text-accent transition-colors" data-cursor-interactive>
          BS
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xl">
          <Link href="/projects" className="font-medium hover:text-accent transition-colors" data-cursor-interactive>Projekte</Link>
          <Link href="/resume" className="font-medium hover:text-accent transition-colors" data-cursor-interactive>Lebenslauf</Link>
          <Link href="/blog" className="font-medium hover:text-accent transition-colors" data-cursor-interactive>Blog</Link>
        </nav>
        <div className="flex items-center gap-4">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
