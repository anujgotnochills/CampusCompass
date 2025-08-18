
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Campus Compass</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#features" className="hover:text-primary" prefetch={false}>
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-primary" prefetch={false}>
            How It Works
          </Link>
          <Link href="#testimonials" className="hover:text-primary" prefetch={false}>
            Testimonials
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="flex flex-col items-center justify-center space-y-4 py-12 text-center md:py-24 lg:py-32">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Reuniting Lost Items with their Owners
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our smart, AI-powered platform makes it easy to report lost items and get notified when a potential match is
              found on campus.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/login" prefetch={false}>
                <Button>Get Started</Button>
            </Link>
            <Link href="#how-it-works" prefetch={false}>
                <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </section>
        
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">How It Works</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Simple, 3-Step Process</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We've streamlined the lost and found process to be as simple and stress-free as possible.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-2 md:gap-16 lg:grid-cols-3 lg:max-w-none">
                    <div className="grid gap-1 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                            <span className="text-2xl font-bold">1</span>
                        </div>
                        <h3 className="text-lg font-bold">Report Your Item</h3>
                        <p className="text-sm text-muted-foreground">
                        Lost something? Found something? Quickly submit a report with a description and photo. Our AI will even help you write a clear description.
                        </p>
                    </div>
                    <div className="grid gap-1 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                            <span className="text-2xl font-bold">2</span>
                        </div>
                        <h3 className="text-lg font-bold">AI Finds a Match</h3>
                        <p className="text-sm text-muted-foreground">
                        Our smart system analyzes new reports in real-time, comparing text descriptions and images to find potential matches for your item.
                        </p>
                    </div>
                    <div className="grid gap-1 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                            <span className="text-2xl font-bold">3</span>
                        </div>
                        <h3 className="text-lg font-bold">Get Notified & Recover</h3>
                        <p className="text-sm text-muted-foreground">
                        When a high-confidence match is found, you'll be notified immediately. Found items are secured in a campus locker for easy pickup.
                        </p>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Campus Compass. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
