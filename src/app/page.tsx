
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, Search, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Campus Compass</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            <Button>Enter App</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-background to-blue-100 dark:from-background dark:to-blue-900/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary-foreground bg-primary p-2 rounded-md inline-block">
                    Lost something? Find it.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Campus Compass is the smart way to reconnect lost items with their owners on campus. Our AI-powered platform makes finding what you've lost simpler than ever.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login" prefetch={false}>
                    <Button size="lg" className="w-full min-[400px]:w-auto">Get Started</Button>
                  </Link>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="campus life students"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-2xl"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple process for reporting, finding, and returning lost items.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary rounded-full p-3">
                      <Compass className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Report an Item</h3>
                  </div>
                  <p className="text-muted-foreground">Quickly post a lost or found item with a description, photo, location, and date. Let the community help.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary rounded-full p-3">
                      <Search className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">AI-Powered Matching</h3>
                  </div>
                  <p className="text-muted-foreground">Our smart system analyzes descriptions to suggest potential matches between lost and found items, saving you time.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary rounded-full p-3">
                      <Award className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Earn Rewards</h3>
                  </div>
                  <p className="text-muted-foreground">Get rewarded for your help! Earn points for successfully returning items and be a campus hero.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Campus Compass. All rights reserved.</p>
      </footer>
    </div>
  );
}
