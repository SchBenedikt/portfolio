import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Links',
  description:
    'Wichtige Links und Social-Media-Profile von Benedikt Schächner.',
  alternates: { canonical: `${siteUrl}/links` },
  openGraph: {
    title: 'Links | Benedikt Schächner',
    description:
      'Social Media und weitere Links von Benedikt Schächner.',
    url: `${siteUrl}/links`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Links | Benedikt Schächner',
    description:
      'Social Media und weitere Links von Benedikt Schächner.',
    images: ['/og-image.png'],
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}