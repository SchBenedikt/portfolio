import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Presse',
  description:
    'Presseartikel und Medienberichte über Benedikt Schächner – vom Bayerischen Rundfunk bis zur lokalen Presse.',
  alternates: { canonical: `${siteUrl}/press` },
  openGraph: {
    title: 'Presse | Benedikt Schächner',
    description:
      'Presseartikel und Medienberichte über Benedikt Schächner.',
    url: `${siteUrl}/press`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Presse | Benedikt Schächner',
    description:
      'Presseartikel und Medienberichte über Benedikt Schächner.',
    images: ['/og-image.png'],
  },
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}