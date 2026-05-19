import type { Metadata, Viewport } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClassificationBar } from '@/components/system/ClassificationBar';
import { StatusBar } from '@/components/system/StatusBar';
import { ConsoleEasterEgg } from '@/components/effects/ConsoleEasterEgg';
import { AuditTrail } from '@/components/effects/AuditTrail';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NEXUS//13',
    template: '%s — NEXUS//13',
  },
  description: 'Leaked intelligence interface. Four open dossiers. You were not meant to be here.',
  keywords: ['classified', 'intelligence', 'NEXUS', 'dossier', 'surveillance'],
  authors: [{ name: 'NEXUS-CTRL-13' }],
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    nosnippet: true,
  },
  openGraph: {
    type: 'website',
    title: 'NEXUS//13 — CLASSIFIED',
    description: 'Leaked intelligence interface. Four open dossiers. You were not meant to be here.',
    siteName: 'NEXUS//13',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NEXUS//13 — CLASSIFIED INTERFACE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS//13 — CLASSIFIED',
    description: 'Leaked intelligence interface. Four open dossiers. You were not meant to be here.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#060607',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={geistMono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=instrument-serif@400i&display=swap"
        />
      </head>
      <body className="nexus-grain nexus-scanline min-h-screen bg-void-0 text-text-1 antialiased">
        <ClassificationBar position="top" />
        <main className="relative">{children}</main>
        <ClassificationBar position="bottom" />
        <StatusBar />
        <ConsoleEasterEgg />
        <AuditTrail />
      </body>
    </html>
  );
}
