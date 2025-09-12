
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/contexts/Providers';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});


export const metadata: Metadata = {
  title: 'Campus Compass - Lost & Found',
  description: 'Helping students find their lost items on campus.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
       <head>
          <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
       </head>
       <body className={cn('min-h-screen bg-background font-sans antialiased', outfit.variable)}>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  );
}
