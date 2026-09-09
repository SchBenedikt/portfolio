import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Presse',
  description:
    'Medienberichte über die Projekte von Benedikt Schächner – vom Bayerischen Rundfunk bis zum Deutschen Multimediapreis mb21.',
  alternates: { canonical: `${siteUrl}/press` },
  openGraph: {
    title: 'Presse | Benedikt Schächner',
    description: 'Medienberichte und Pressestimmen zu Projekten von Benedikt Schächner.',
    url: `${siteUrl}/press`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Presse | Benedikt Schächner',
    description: 'Medienberichte und Pressestimmen zu Projekten von Benedikt Schächner.',
    images: ['/og-image.png'],
  },
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}