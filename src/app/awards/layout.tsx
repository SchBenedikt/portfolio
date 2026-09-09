import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Auszeichnungen',
  description:
    'Preise und Zertifikate von Benedikt Schächner: Crossmedia-Preis des Bayerischen Rundfunks, Deutscher Multimediapreis mb21 und weitere Auszeichnungen.',
  alternates: { canonical: `${siteUrl}/awards` },
  openGraph: {
    title: 'Auszeichnungen | Benedikt Schächner',
    description: 'Preise, Zertifikate und Qualifikationen von Benedikt Schächner.',
    url: `${siteUrl}/awards`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auszeichnungen | Benedikt Schächner',
    description: 'Preise, Zertifikate und Qualifikationen von Benedikt Schächner.',
    images: ['/og-image.png'],
  },
};

export default function AwardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}