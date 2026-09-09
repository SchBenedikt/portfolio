import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Links & Kontakt',
  description:
    'Profile, Kontakt und Verlinkungen von Benedikt Schächner: LinkedIn, Instagram, GitHub und mehr.',
  alternates: { canonical: `${siteUrl}/links` },
  openGraph: {
    title: 'Links & Kontakt | Benedikt Schächner',
    description: 'Profile, Kontakt und Verlinkungen von Benedikt Schächner.',
    url: `${siteUrl}/links`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: [`${siteUrl}/og/og-default.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Links & Kontakt | Benedikt Schächner',
    description: 'Profile, Kontakt und Verlinkungen von Benedikt Schächner.',
    images: [`${siteUrl}/og/og-default.jpg`],
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}