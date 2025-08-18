
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, Search, Award, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Campus Compass</span>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-4">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block" prefetch={false}>
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup" prefetch={false}>
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900/50 dark:via-background dark:to-blue-900/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                    The Smartest Way to Find Lost Items on Campus
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Campus Compass uses AI to instantly match lost items with found reports. Say goodbye to lost-and-found stress and hello to quick reunions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup" prefetch={false}>
                    <Button size="lg" className="w-full min-[400px]:w-auto shadow-lg hover:shadow-primary/40 transition-shadow">Report an Item</Button>
                  </Link>
                  <Link href="#features" prefetch={false}>
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">Learn More</Button>
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
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm font-medium">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform simplifies reporting, finding, and returning lost items with a seamless, AI-driven process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Compass className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">1. Report an Item</h3>
                  </div>
                  <p className="text-muted-foreground">Snap a photo and write a quick description. Our AI helps you create a clear report in seconds, whether you've lost or found something.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">2. AI-Powered Matching</h3>
                  </div>
                  <p className="text-muted-foreground">Our system instantly analyzes new reports, comparing images and descriptions to find potential matches in the database.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">3. Get Notified & Recover</h3>
                  </div>
                  <p className="text-muted-foreground">Receive instant notifications for high-confidence matches. Found items are secured in a designated campus locker for easy pickup.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Join the Compass Community?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and never worry about losing something on campus again.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link href="/signup" prefetch={false}>
                <Button size="lg" className="w-full shadow-lg hover:shadow-primary/40 transition-shadow">Create Your Account</Button>
              </Link>
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
