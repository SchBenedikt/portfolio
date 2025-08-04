
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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300'
      )}
    >
      <div className={cn(
          "container mx-auto px-6 sm:px-8 flex items-center transition-all duration-300",
          isScrolled ? "justify-center" : "justify-between"
      )}>
        <div className={cn("transition-all duration-300", isScrolled ? "opacity-0 pointer-events-none w-0" : "opacity-100 w-auto")}>
            <Link
              href="/"
              className="text-2xl md:text-3xl font-black uppercase tracking-widest font-headline hover:text-primary transition-colors"
              data-cursor-interactive
            >
              BS
            </Link>
        </div>

        {isScrolled ? (
             <div className="flex items-center gap-2 p-1 rounded-full bg-background/80 backdrop-blur-lg border border-border/50 shadow-md">
                <nav className="flex items-center gap-1">
                    {navLinks.map(link => {
                        const showLabel = isLabelVisible(link.href);
                        return (
                            <Button 
                                key={link.href} 
                                asChild 
                                variant={pathname.startsWith(link.href) ? 'active' : 'ghost'}
                                size={!showLabel ? 'icon' : 'default'}
                                className={cn("rounded-full transition-all", !showLabel && "w-10 h-10")}
                                onMouseEnter={() => setHoveredHref(link.href)}
                                onMouseLeave={() => setHoveredHref(null)}
                                data-cursor-interactive
                            >
                                <Link href={link.href}>
                                    {React.cloneElement(link.icon as React.ReactElement, { className: "w-4 h-4" })}
                                    <AnimatePresence>
                                    {showLabel && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2, ease: 'easeOut' }}
                                            className="overflow-hidden"
                                        >
                                            {link.label}
                                        </motion.span>
                                    )}
                                    </AnimatePresence>
                                </Link>
                            </Button>
                        )
                    })}
                </nav>
            </div>
        ) : (
            <>
                <nav className="hidden md:flex items-center gap-2 p-1 rounded-full bg-muted/50">
                {navLinks.map(link => (
                    <Button 
                        key={link.href} 
                        asChild 
                        variant={pathname.startsWith(link.href) ? 'active' : 'ghost'}
                        className="rounded-full"
                        onMouseEnter={() => setHoveredHref(link.href)}
                        onMouseLeave={() => setHoveredHref(null)}
                        data-cursor-interactive
                    >
                        <Link href={link.href}>
                            {React.cloneElement(link.icon as React.ReactElement, { className: "w-4 h-4" })}
                            <AnimatePresence>
                            {isLabelVisible(link.href) && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                    className="overflow-hidden"
                                >
                                    {link.label}
                                </motion.span>
                            )}
                            </AnimatePresence>
                        </Link>
                    </Button>
                ))}
                </nav>

                <div className={cn("flex items-center gap-2 transition-all duration-300", isScrolled ? "opacity-0 pointer-events-none w-0" : "opacity-100 w-auto")}>
                    <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-muted/50">
                        {children}
                        <ThemeToggle />
                    </div>
                
                    <div className="md:hidden">
                        <div className="flex items-center gap-2">
                            {children}
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
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </>
        )}
      </div>
    </header>
  );
};

export default Header;
