'use client';
import Link from 'next/link';
import { useI18n } from '@/components/providers/i18n-provider';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="editorial-footer">
      <div className="editorial-footer-top">
        <Link href="/" className="portfolio-brand">
          <span>Benedikt Schächner</span>
        </Link>
        <Link href="/links" className="footer-cta">
          {t.footer.stayInTouch} <span>↗</span>
        </Link>
      </div>
      <div className="editorial-footer-middle">
        <div className="footer-links-group">
          <p className="footer-label">{t.footer.navigation}</p>
          <nav aria-label="Footer Primary Navigation">
            <Link href="/projects">{t.nav.projects}</Link>
            <Link href="/resume">{t.nav.resume}</Link>
            <Link href="/awards">{t.nav.awards}</Link>
          </nav>
        </div>
        <div className="footer-links-group">
          <p className="footer-label">{t.footer.more}</p>
          <nav aria-label="Footer More Navigation">
            <Link href="/blog">{t.nav.blog}</Link>
            <Link href="/gallery">{t.nav.gallery}</Link>
            <Link href="/press">{t.nav.press}</Link>
          </nav>
        </div>
        <div className="footer-links-group">
          <p className="footer-label">{t.footer.contact}</p>
          <nav aria-label="Footer Contact Links">
            <Link href="/links">{t.nav.links}</Link>
            <a href="https://github.com/SchBenedikt" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.instagram.com/benedikt.schaechner/" target="_blank" rel="noreferrer">Instagram</a>
          </nav>
        </div>
      </div>
      <div className="editorial-footer-bottom">
        <p>© {new Date().getFullYear()} Benedikt Schächner</p>
      </div>
    </footer>
  );
}
