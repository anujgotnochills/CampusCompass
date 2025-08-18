
"use client";

import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
            <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
                <Leaf className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold text-primary">Dipstore</span>
            </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
