import type { Metadata } from 'next';

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  title: 'Lebenslauf',
  description:
    'Der Lebenslauf von Benedikt Schächner: Schulbildung, Projekte, Auszeichnungen, Skills und Engagement.',
  alternates: { canonical: `${siteUrl}/resume` },
  openGraph: {
    title: 'Lebenslauf | Benedikt Schächner',
    description: 'Stationen, Skills und Engagement von Benedikt Schächner.',
    url: `${siteUrl}/resume`,
    type: 'website',
    siteName: 'Benedikt Schächner',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lebenslauf | Benedikt Schächner',
    description: 'Stationen, Skills und Engagement von Benedikt Schächner.',
    images: ['/og-image.png'],
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}