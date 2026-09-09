import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Bilder und Eindrücke aus Projekten und dem Alltag von Benedikt Schächner.',
  alternates: { canonical: `${siteUrl}/gallery` },
  openGraph: {
    title: 'Galerie | Benedikt Schächner',
    description: 'Bilder und Eindrücke aus Projekten und dem Alltag.',
    url: `${siteUrl}/gallery`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: [`${siteUrl}/og/og-default.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galerie | Benedikt Schächner',
    description: 'Bilder und Eindrücke aus Projekten und dem Alltag.',
    images: [`${siteUrl}/og/og-default.jpg`],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}