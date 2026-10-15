import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Auszeichnungen',
  description:
    'Auszeichnungen und Preise von Benedikt Schächner – vom Nextcloud Community Award über den Crossmedia-Preis des Bayerischen Rundfunks bis zum Deutschen Multimediapreis mb21.',
  alternates: { canonical: `${siteUrl}/awards` },
  openGraph: {
    title: 'Auszeichnungen | Benedikt Schächner',
    description: 'Auszeichnungen und Preise von Benedikt Schächner.',
    url: `${siteUrl}/awards`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auszeichnungen | Benedikt Schächner',
    description: 'Auszeichnungen und Preise von Benedikt Schächner.',
    images: ['/og-image.png'],
  },
};

export default function AwardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
