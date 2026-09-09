'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const Header = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePalette, setActivePalette] = useState<string>('green');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('palette') || 'green';
    if (saved) {
      setActivePalette(saved);
      document.documentElement.setAttribute('data-palette', saved);
    }
  }, []);

  const handlePaletteChange = (palette: string) => {
    setActivePalette(palette);
    localStorage.setItem('palette', palette);
    document.documentElement.setAttribute('data-palette', palette);
  };

  const navLinks = [
    { href: '/projects', label: 'Projekte' },
    { href: '/blog', label: 'Blog' },
    { href: '/resume', label: 'Lebenslauf' },
    { href: '/awards', label: 'Auszeichnungen' },
    { href: '/gallery', label: 'Galerie' },
  ];

  const paletteColors: Record<string, string> = {
    green: '#35543c',
    red: '#711f2d',
    blue: '#354154',
  };

  return (
    <header
      className={cn(
        'portfolio-header sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/30'
          : 'bg-transparent'
      )}
    >
      <div className="px-[clamp(22px,5.5vw,88px)] py-4 flex items-center justify-between">
        <Link
          href="/"
          className="portfolio-brand text-foreground hover:text-primary transition-colors"
          data-cursor-interactive
          prefetch
        >
          <span>Benedikt Schächner</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm tracking-wide transition-all duration-200 relative py-1',
                pathname.startsWith(link.href)
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              data-cursor-interactive
              prefetch
            >
              {link.label}
              {pathname.startsWith(link.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-oxblood rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {['green', 'red', 'blue'].map((palette) => (
              <button
                key={palette}
                onClick={() => handlePaletteChange(palette)}
                className={cn(
                  'w-5 h-5 rounded-full transition-all duration-200 border-2',
                  activePalette === palette
                    ? 'border-foreground scale-110'
                    : 'border-transparent hover:scale-110'
                )}
                style={{ backgroundColor: paletteColors[palette] }}
                aria-label={`Palette ${palette === 'green' ? 'Grün' : palette === 'red' ? 'Rot' : 'Blau'}`}
                data-cursor-interactive
              />
            ))}
          </div>

          <ThemeToggle />

          <button
            className="md:hidden p-3 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            data-cursor-interactive
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={menuOpen ? "M5 5L15 15M5 15L15 5" : "M3 5H17M3 10H17M3 15H17"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile Navigation" className="md:hidden px-6 pb-6 grid gap-1 border-b bg-background">
          {[...navLinks, {href: '/press', label: 'Presse'}, {href: '/links', label: 'Links & Kontakt'}].map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="py-4 text-base border-b hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-4">
            <span className="text-sm text-muted-foreground">Farbkonzept</span>
            <div className="flex items-center gap-2">
              {['green', 'red', 'blue'].map((palette) => (
                <button
                  key={palette}
                  onClick={() => handlePaletteChange(palette)}
                  className={cn(
                    'w-7 h-7 md:w-6 md:h-6 rounded-full transition-all duration-200 border-2',
                    activePalette === palette
                      ? 'border-foreground scale-110'
                      : 'border-transparent'
                  )}
                  style={{ backgroundColor: paletteColors[palette] }}
                  aria-label={`Palette ${palette === 'green' ? 'Grün' : palette === 'red' ? 'Rot' : 'Blau'}`}
                />
              ))}
            </div>
          </div>
        </nav>
      )}
      {children}
    </header>
  );
};

export default Header;
