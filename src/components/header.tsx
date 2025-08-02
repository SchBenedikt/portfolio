'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Header = () => {
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
        scrolled ? 'py-2 bg-background/80 backdrop-blur-lg shadow-md' : 'py-6'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 sm:px-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold uppercase tracking-widest font-headline hover:text-accent transition-colors">
          BS
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#projects" className="text-sm font-medium hover:text-accent transition-colors">Projects</a>
          <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
          <a href="#contact" className="text-sm font-medium hover:text-accent transition-colors">Contact</a>
        </nav>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
