
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

const Header = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border/50' : ''
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 flex justify-between items-center transition-all duration-300">
        <div className={cn("transition-all duration-300", isScrolled ? "opacity-0 pointer-events-none" : "opacity-100")}>
            <Link
              href="/"
              className="text-2xl md:text-3xl font-black uppercase tracking-widest font-headline hover:text-primary transition-colors"
              data-cursor-interactive
            >
              BS
            </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={cn(
            "hidden md:flex items-center gap-2 p-1 rounded-full transition-all duration-300",
            isScrolled ? "bg-muted/0" : "bg-muted/50"
        )}>
          {navLinks.map(link => (
             <Button 
                key={link.href} 
                asChild 
                variant={pathname.startsWith(link.href) ? 'active' : 'ghost'}
                className="rounded-full"
                data-cursor-interactive
              >
                <Link href={link.href}>
                    {React.cloneElement(link.icon as React.ReactElement, { className: "w-4 h-4" })}
                    {link.label}
                </Link>
              </Button>
          ))}
        </nav>

        <div className={cn("flex items-center gap-2 transition-all duration-300", isScrolled ? "opacity-0 pointer-events-none" : "opacity-100")}>
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
                      <Link href={link.href} className="flex items-center gap-2 text-base">
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
