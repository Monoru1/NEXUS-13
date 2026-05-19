import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ClassificationBar } from '@/components/system/ClassificationBar';
import { StatusBar } from '@/components/system/StatusBar';

export const metadata: Metadata = {
  title: 'NEXUS//13',
  description: 'CLASSIFIED // NOFORN — UNAUTHORIZED ACCESS PROHIBITED',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    nosnippet: true,
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=instrument-serif@400i&display=swap" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&display=swap" />
      </head>
      <body className="nexus-grain nexus-scanline min-h-screen bg-void-0 text-text-1 antialiased">
        <ClassificationBar position="top" />
        <main className="relative">{children}</main>
        <ClassificationBar position="bottom" />
        <StatusBar />
      </body>
    </html>
  );
}
