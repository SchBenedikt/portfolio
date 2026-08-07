import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Projekte',
  description:
    'Projekte von Benedikt Schächner: Web-Anwendungen, Schönprojekte, Crossmedia und mehr – von Notio bis Medienscouts.',
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: 'Projekte | Benedikt Schächner',
    description:
      'Eine Auswahl der Projekte von Benedikt Schächner.',
    url: `${siteUrl}/projects`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projekte | Benedikt Schächner',
    description:
      'Eine Auswahl der Projekte von Benedikt Schächner.',
    images: ['/og-image.png'],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}