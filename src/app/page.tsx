
"use client";

import { Button } from '@/components/ui/button';
import { Compass, Search, Bot, Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary" prefetch={false}>
            <Compass className="h-6 w-6" />
            <span>Campus Compass</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
             <Link
              href="#features"
              className="transition-colors hover:text-primary text-muted-foreground"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-primary text-muted-foreground"
              prefetch={false}
            >
              How It Works
            </Link>
          </nav>
           <div className="flex items-center gap-4">
             <Link href="/login" prefetch={false}>
                <Button variant="ghost">Log In</Button>
            </Link>
             <Link href="/signup" prefetch={false}>
                <Button>Sign Up <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40">
           <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="container px-4 md:px-6 text-center flex flex-col items-center space-y-6 relative z-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl text-foreground font-outfit">
                The <span className="text-primary hover-headline">Smartest</span> Way to Find Lost Items on Campus
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our AI-powered platform makes reporting lost items effortless and intelligently matches them with found ones. Never lose anything again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <Link href="/signup" prefetch={false}>
                    <Button size="lg">Get Started Now</Button>
                </Link>
                <Link href="#how-it-works" prefetch={false}>
                    <Button size="lg" variant="outline">Learn More</Button>
                </Link>
              </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold text-primary">Key Features</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why You'll Love Campus Compass</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We've packed our app with features to make finding lost items a breeze.
                    </p>
                </div>
                 <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    <FeatureCard
                      icon={Search}
                      title="AI-Powered Search"
                      description="Our smart system analyzes descriptions and images to find matches with high accuracy, saving you time and effort."
                    />
                    <FeatureCard
                      icon={Bot}
                      title="Smart Suggestions"
                      description="When you report an item, our AI helps you write a clear, detailed description and suggests a title automatically."
                    />
                    <FeatureCard
                      icon={Bell}
                      title="Real-time Updates"
                      description="Get notified the moment a potential match for your lost item is found, so you can recover it quickly."
                    />
                </div>
            </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold text-primary">How It Works</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Simple, 3-Step Process</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We've streamlined the lost and found process to be as simple and stress-free as possible.
                    </p>
                     <div className="space-y-6 pt-4">
                       <HowItWorksStep
                        step="1"
                        title="Report Your Item"
                        description="Lost something? Found something? Quickly submit a report with a description and photo. Our AI will even help you write a clear description."
                       />
                       <HowItWorksStep
                        step="2"
                        title="AI Finds a Match"
                        description="Our smart system analyzes new reports in real-time, comparing text descriptions and images to find potential matches for your item."
                       />
                       <HowItWorksStep
                        step="3"
                        title="Get Notified & Recover"
                        description="When a high-confidence match is found, you'll be notified immediately. Found items are secured in a campus locker for easy pickup."
                       />
                    </div>
                </div>
                <div className="relative">
                  <Image 
                      src="https://picsum.photos/seed/1/800/1000"
                      alt="Student using phone"
                      data-ai-hint="student phone campus"
                      width={800}
                      height={1000}
                      className="rounded-xl shadow-2xl object-cover aspect-[4/5] z-10 relative shadow-primary/10"
                      priority
                  />
                </div>
            </div>
        </section>

      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-muted-foreground">&copy; 2024 Campus Compass. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="p-6 bg-background/50 border-border/50 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm">
    <div className="flex items-center gap-4 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Icon className="h-6 w-6 text-primary"/>
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Card>
);

const HowItWorksStep = ({step, string, title, description}: {step: string, title: string, description: string}) => (
  <div className="flex items-start gap-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
        {step}
    </div>
    <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
)

    

    