
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster as DefaultToaster } from '@/components/ui/toaster';
import { Rubik, JetBrains_Mono as FontMono } from 'next/font/google';
import { AchievementsProvider } from '@/components/providers/achievements-provider';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import CustomCursor from '@/components/custom-cursor';
import Link from 'next/link';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-rubik',
});

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const siteUrl = 'https://benedikt.xn--schchner-2za.de';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Benedikt Schächner | Digitaler Entwickler & Kreativtechnologe',
  description:
    'Entdecken Sie das Portfolio von Benedikt Schächner. Ein Schaufenster für innovative Webprojekte, Full-Stack-Entwicklung und KI-Integration von einem jungen Entwickler und digitalen Pionier.',
  keywords: 'Benedikt Schächner, Portfolio, Entwickler, Webentwicklung, Next.js, React, TypeScript, KI, Kreativtechnologe, Full-Stack, Projekte',
  authors: [{ name: 'Benedikt Schächner', url: siteUrl }],
  creator: 'Benedikt Schächner',
  publisher: 'Benedikt Schächner',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Benedikt Schächner | Digitaler Entwickler & Kreativtechnologe',
    description: 'Entdecken Sie das Portfolio von Benedikt Schächner. Ein Schaufenster für innovative Webprojekte, Full-Stack-Entwicklung und KI-Integration.',
    url: siteUrl,
    siteName: 'Benedikt Schächner Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Benedikt Schächner Portfolio - Vorschau',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benedikt Schächner | Digitaler Entwickler & Kreativtechnologe',
    description: 'Entdecken Sie das Portfolio von Benedikt Schächner. Ein Schaufenster für innovative Webprojekte, Full-Stack-Entwicklung und KI-Integration.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

const pagesToPrefetch = [
    '/',
    '/projects',
    '/resume',
    '/gallery',
    '/press',
    '/tools',
    '/links',
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Benedikt Schächner",
  "url": "https://benedikt.xn--schchner-2za.de",
  "sameAs": [
    "https://de.linkedin.com/in/benedikt-schächner-a22632299/",
    "https://www.instagram.com/benedikt.schaechner/",
    "https://github.com/SchBenedikt"
  ],
  "jobTitle": "Digitaler Entwickler und Kreativtechnologe",
  "image": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Technologist%20Medium-Light%20Skin%20Tone.png",
  "description": "Schüler, Entwickler und digitaler Pionier mit einer Leidenschaft für Webtechnologien, KI-Integration und innovative Projekte.",
  "knowsAbout": ["Web-Entwicklung", "Next.js", "React", "TypeScript", "Python", "Künstliche Intelligenz", "UI/UX Design", "Judo"],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://benedikt.xn--schchner-2za.de"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <meta name="theme-color" content="#111827" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${rubik.variable} ${fontMono.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AchievementsProvider>
              <CustomCursor />
              {children}
              <DefaultToaster />
              <SonnerToaster />
          </AchievementsProvider>
        </ThemeProvider>
         <div style={{ display: 'none' }}>
            {pagesToPrefetch.map(page => (
                <Link key={page} href={page} prefetch={true} />
            ))}
        </div>
      </body>
    </html>
  );
}
