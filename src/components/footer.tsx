import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="editorial-footer">
      <div className="editorial-footer-top">
        <Link href="/" className="portfolio-brand">
          <span>Benedikt Schächner</span>
        </Link>
        <Link href="/links" className="footer-cta">
          In Verbindung bleiben <span>↗</span>
        </Link>
      </div>
      <div className="editorial-footer-middle">
        <div className="footer-links-group">
          <p className="footer-label">Navigation</p>
          <nav aria-label="Footer Navigation">
            <Link href="/projects">Projekte</Link>
            <Link href="/resume">Lebenslauf</Link>
            <Link href="/awards">Auszeichnungen</Link>
          </nav>
        </div>
        <div className="footer-links-group">
          <p className="footer-label">Mehr</p>
          <nav aria-label="Footer Navigation">
            <Link href="/blog">Blog</Link>
            <Link href="/gallery">Galerie</Link>
            <Link href="/press">Presse</Link>
          </nav>
        </div>
        <div className="footer-links-group">
          <p className="footer-label">Kontakt</p>
          <nav aria-label="Footer Navigation">
            <Link href="/links">Links & Kontakt</Link>
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
