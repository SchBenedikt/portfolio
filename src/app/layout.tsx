
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster as DefaultToaster } from '@/components/ui/toaster';
import { Rubik, JetBrains_Mono as FontMono } from 'next/font/google';
import { AchievementsProvider } from '@/components/providers/achievements-provider';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import CustomCursor from '@/components/custom-cursor';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-rubik',
});

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Benedikt Schächner | Portfolio für kreative Entwicklung',
  description:
    'Ein Portfolio, das kreative Entwicklungs- und Designprojekte mit 3D-Interaktionen und KI-gesteuerten Animationen zeigt.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Benedikt Schächner | Portfolio für kreative Entwicklung',
    description: 'Ein Portfolio, das kreative Entwicklungs- und Designprojekte mit 3D-Interaktionen und KI-gesteuerten Animationen zeigt.',
    url: 'https://benedikt.xn--schchner-2za.de',
    type: 'website',
    images: [
      {
        url: 'https://placehold.co/1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Benedikt Schächner Portfolio',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
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
      </head>
      <body className={`${rubik.variable} ${fontMono.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
      </body>
    </html>
  );
}
