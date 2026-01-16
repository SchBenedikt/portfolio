
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
  title: {
    default: 'Benedikt Schächner | Digitaler Entwickler & Kreativtechnologe',
    template: '%s | Benedikt Schächner'
  },
  description:
    'Entdecken Sie das Portfolio von Benedikt Schächner. Ein Schaufenster für innovative Webprojekte, Full-Stack-Entwicklung und KI-Integration von einem jungen Entwickler und digitalen Pionier aus Deutschland.',
  keywords: [
    'Benedikt Schächner',
    'Portfolio',
    'Web-Entwickler',
    'Full-Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'JavaScript',
    'Python',
    'Künstliche Intelligenz',
    'KI-Integration',
    'Webentwicklung',
    'Frontend',
    'Backend',
    'UI/UX Design',
    'Crossmedia',
    'Notio',
    'Meum Diarium',
    'Medienscouts',
    'Digitalisierung',
    'Innovation',
    'Schulprojekte',
    'Open Source',
    'Cloud Computing',
    'Nachhaltigkeit',
    'Rechenzentren'
  ],
  authors: [{ name: 'Benedikt Schächner', url: siteUrl }],
  creator: 'Benedikt Schächner',
  publisher: 'Benedikt Schächner',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'technology',
  classification: 'Portfolio',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'de-DE': siteUrl,
    },
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Benedikt Schächner | Digitaler Entwickler & Kreativtechnologe',
    description: 'Entdecken Sie das Portfolio von Benedikt Schächner. Ein Schaufenster für innovative Webprojekte, Full-Stack-Entwicklung und KI-Integration von einem jungen Entwickler und digitalen Pionier.',
    url: siteUrl,
    siteName: 'Benedikt Schächner Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Benedikt Schächner Portfolio - Vorschau',
        type: 'image/png',
      },
    ],
    locale: 'de_DE',
    type: 'website',
    countryName: 'Deutschland',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benedikt Schächner | Digitaler Entwickler & Kreativtechnologe',
    description: 'Entdecken Sie das Portfolio von Benedikt Schächner. Ein Schaufenster für innovative Webprojekte, Full-Stack-Entwicklung und KI-Integration.',
    images: ['/og-image.png'],
    creator: '@benedikt.schaechner',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#111827',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Benedikt Schächner',
    statusBarStyle: 'black-translucent',
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
  "@type": ["Person", "ProfilePage"],
  "name": "Benedikt Schächner",
  "alternateName": "Benedikt Schaechner",
  "url": "https://benedikt.xn--schchner-2za.de",
  "sameAs": [
    "https://de.linkedin.com/in/benedikt-schächner-a22632299/",
    "https://www.instagram.com/benedikt.schaechner/",
    "https://github.com/SchBenedikt"
  ],
  "jobTitle": "Digitaler Entwickler und Kreativtechnologe",
  "worksFor": {
    "@type": "EducationalOrganization",
    "name": "König-Karlmann-Gymnasium Altötting"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Technologist%20Medium-Light%20Skin%20Tone.png",
    "caption": "Benedikt Schächner - Digitaler Entwickler"
  },
  "description": "Schüler, Entwickler und digitaler Pionier mit einer Leidenschaft für Webtechnologien, KI-Integration und innovative Projekte. Ausgezeichnet mit dem Crossmedia-Preis des Bayerischen Rundfunks.",
  "knowsAbout": [
    "Web-Entwicklung",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Python",
    "Künstliche Intelligenz",
    "UI/UX Design",
    "Full-Stack Development",
    "Cloud Computing",
    "Datenbanken",
    "Git",
    "Responsive Design",
    "SEO",
    "Webdesign",
    "Software-Architektur"
  ],
  "knowsLanguage": [
    {
      "@type": "Language",
      "name": "Deutsch",
      "alternateName": "de"
    },
    {
      "@type": "Language",
      "name": "Englisch",
      "alternateName": "en"
    }
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Web Developer",
    "occupationLocation": {
      "@type": "Country",
      "name": "Deutschland"
    },
    "skills": "Next.js, React, TypeScript, Python, KI-Integration, Full-Stack Development"
  },
  "award": [
    "Crossmedia-Preis 2024/2025 des Bayerischen Rundfunks",
    "Deutscher Multimediapreis mb21",
    "Top-Verein Bayerischer Judo-Verband (TuS Töging)"
  ],
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/CreateAction",
    "userInteractionCount": "20+"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://benedikt.xn--schchner-2za.de",
    "name": "Benedikt Schächner Portfolio",
    "description": "Portfolio-Website von Benedikt Schächner mit Projekten, Lebenslauf und Kontaktinformationen",
    "inLanguage": "de-DE",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Benedikt Schächner Portfolio",
      "url": "https://benedikt.xn--schchner-2za.de"
    }
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#111827" />
        <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="color-scheme" content="dark light" />
        <meta name="msapplication-TileColor" content="#111827" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Benedikt Schächner" />
        <meta name="application-name" content="Benedikt Schächner Portfolio" />
        <meta name="format-detection" content="telephone=no" />
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
