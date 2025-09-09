
"use client";

import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ReactLenis } from '@studio-freight/react-lenis'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], weight: ['700'], variable: '--font-outfit' });


// export const metadata: Metadata = {
//   title: 'Campus Compass - Lost & Found',
//   description: 'Helping students find their lost items on campus.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ scrollBehavior: 'smooth' }} className="dark">
       <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable, outfit.variable)}>
        <ReactLenis root>
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
