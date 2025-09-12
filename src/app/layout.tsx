
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';
import { Providers } from '@/contexts/Providers';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});
const outfit = localFont({
  src: [
    {
      path: '../../public/fonts/Outfit-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Outfit-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-outfit',
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
       <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable, outfit.variable)}>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  );
}
