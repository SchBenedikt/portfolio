
'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-lg'
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
        <nav className="hidden md:flex items-center gap-10 text-xl">
          <Link href="/projects" className="font-medium hover:text-accent transition-colors" data-cursor-interactive>
            Projekte
          </Link>
          <Link href="/resume" className="font-medium hover:text-accent transition-colors" data-cursor-interactive>
            Lebenslauf
          </Link>
          <Link href="/blog" className="font-medium hover:text-accent transition-colors" data-cursor-interactive>
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
