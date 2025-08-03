
'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu, FolderKanban, UserSquare, Rss } from 'lucide-react';

const Header = ({ children }: { children?: React.ReactNode }) => {

  const navLinks = [
    { href: "/projects", label: "Projekte", icon: <FolderKanban/> },
    { href: "/resume", label: "Lebenslauf", icon: <UserSquare/> },
    { href: "/blog", label: "Blog", icon: <Rss/> },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-colors duration-300 bg-background/80 backdrop-blur-lg border-b border-border/50'
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-black uppercase tracking-widest font-headline hover:text-accent transition-colors"
          data-cursor-interactive
        >
          BS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-lg">
          {navLinks.map(link => (
             <Link key={link.href} href={link.href} className="font-medium hover:text-accent transition-colors" data-cursor-interactive>
                {link.label}
              </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {children}
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
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
                      <Link href={link.href} className="flex items-center gap-2">
                         {React.cloneElement(link.icon as React.ReactElement, { className: "text-muted-foreground" })}
                         {link.label}
                      </Link>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
