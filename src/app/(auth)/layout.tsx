
"use client";

import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
                <Leaf className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Campus Compass</span>
            </Link>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            {children}
        </div>
      </div>
    </div>
  );
}
