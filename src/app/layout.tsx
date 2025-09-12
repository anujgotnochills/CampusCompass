
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/contexts/Providers';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
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
       <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable, 'font-outfit')}>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  );
}
