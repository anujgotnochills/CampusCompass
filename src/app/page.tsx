
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center">
            <div className="flex justify-center items-center mb-6">
                <Image
                    src="https://placehold.co/600x400.png"
                    width="600"
                    height="400"
                    alt="Welcome"
                    data-ai-hint="fashion model"
                    className="rounded-xl object-cover w-full max-w-sm"
                />
            </div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to Dipstore
          </h1>
          <p className="max-w-md mx-auto mt-2 text-muted-foreground">
            Get exclusive limited apparel that only you have! Made by famous brands in the world.
          </p>
        </div>
        <div className="w-full max-w-sm mt-8 space-y-4">
          <Link href="/login" prefetch={false}>
            <Button size="lg" className="w-full" variant="outline">Sign In</Button>
          </Link>
          <Link href="/signup" prefetch={false}>
            <Button size="lg" className="w-full">Get Started</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
