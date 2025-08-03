
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
