import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Tools',
  description:
    'Eine Sammlung nützlicher Tools und Web-Anwendungen von Benedikt Schächner.',
  alternates: { canonical: `${siteUrl}/tools` },
  openGraph: {
    title: 'Tools | Benedikt Schächner',
    description:
      'Nützliche Tools und Web-Anwendungen von Benedikt Schächner.',
    url: `${siteUrl}/tools`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools | Benedikt Schächner',
    description:
      'Nützliche Tools und Web-Anwendungen von Benedikt Schächner.',
    images: ['/og-image.png'],
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}