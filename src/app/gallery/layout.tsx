import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Fotogalerie von Benedikt Schächner – Porträts und Eindrücke aus Projekten, Veranstaltungen und dem Alltag.',
  alternates: { canonical: `${siteUrl}/gallery` },
  openGraph: {
    title: 'Galerie | Benedikt Schächner',
    description:
      'Porträts und Fotos von Benedikt Schächner.',
    url: `${siteUrl}/gallery`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galerie | Benedikt Schächner',
    description:
      'Porträts und Fotos von Benedikt Schächner.',
    images: ['/og-image.png'],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}