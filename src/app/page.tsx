
"use client";

import { Button } from '@/components/ui/button';
import { Compass, Search, Bot, Bell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  },
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary" prefetch={false}>
            <Compass className="h-6 w-6" />
            <span>Campus Compass</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
             <Link
              href="#features"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
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
                <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-48 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/50 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
          </div>
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
                The <span className="text-primary">Smartest</span> Way to Find Lost Items on Campus
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our AI-powered platform makes reporting lost items effortless and intelligently matches them with found ones. Never lose anything again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <Link href="/signup" prefetch={false}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg">Get Started</Button>
                    </motion.div>
                </Link>
                <Link href="#how-it-works" prefetch={false}>
                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline">Learn More</Button>
                   </motion.div>
                </Link>
              </div>
            </div>
            <div className="relative">
                <Image 
                    src="https://picsum.photos/800/600"
                    alt="Happy students on campus"
                    data-ai-hint="happy students campus"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-2xl object-cover aspect-video z-10 relative shadow-primary/10"
                />
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
                    <motion.div className="grid gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={featureVariants}>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Search className="h-6 w-6 text-primary"/>
                            </div>
                            <h3 className="text-lg font-bold">AI-Powered Search</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Our smart system analyzes descriptions and images to find matches with high accuracy, saving you time and effort.</p>
                    </motion.div>
                     <motion.div className="grid gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={{...featureVariants, visible: {...featureVariants.visible, transition: {...featureVariants.visible.transition, delay: 0.2}}}}>
                        <div className="flex items-center gap-3">
                             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Bot className="h-6 w-6 text-primary"/>
                            </div>
                            <h3 className="text-lg font-bold">Smart Suggestions</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">When you report an item, our AI helps you write a clear, detailed description and suggests a title automatically.</p>
                    </motion.div>
                     <motion.div className="grid gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={{...featureVariants, visible: {...featureVariants.visible, transition: {...featureVariants.visible.transition, delay: 0.4}}}}>
                        <div className="flex items-center gap-3">
                             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Bell className="h-6 w-6 text-primary"/>
                            </div>
                            <h3 className="text-lg font-bold">Real-time Updates</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Get notified the moment a potential match for your lost item is found, so you can recover it quickly.</p>
                    </motion.div>
                </div>
            </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold text-primary">How It Works</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Simple, 3-Step Process</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We've streamlined the lost and found process to be as simple and stress-free as possible.
                        </p>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-2 md:gap-16 lg:grid-cols-3 lg:max-w-none mt-16">
                    <motion.div className="grid gap-1 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={featureVariants}>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 border-4 border-primary/20">
                            <span className="text-2xl font-bold">1</span>
                        </div>
                        <h3 className="text-lg font-bold">Report Your Item</h3>
                        <p className="text-sm text-muted-foreground">
                        Lost something? Found something? Quickly submit a report with a description and photo. Our AI will even help you write a clear description.
                        </p>
                    </motion.div>
                    <motion.div className="grid gap-1 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={{...featureVariants, visible: {...featureVariants.visible, transition: {...featureVariants.visible.transition, delay: 0.2}}}}>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 border-4 border-primary/20">
                            <span className="text-2xl font-bold">2</span>
                        </div>
                        <h3 className="text-lg font-bold">AI Finds a Match</h3>
                        <p className="text-sm text-muted-foreground">
                        Our smart system analyzes new reports in real-time, comparing text descriptions and images to find potential matches for your item.
                        </p>
                    </motion.div>
                    <motion.div className="grid gap-1 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={{...featureVariants, visible: {...featureVariants.visible, transition: {...featureVariants.visible.transition, delay: 0.4}}}}>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 border-4 border-primary/20">
                            <span className="text-2xl font-bold">3</span>
                        </div>
                        <h3 className="text-lg font-bold">Get Notified & Recover</h3>
                        <p className="text-sm text-muted-foreground">
                        When a high-confidence match is found, you'll be notified immediately. Found items are secured in a campus locker for easy pickup.
                        </p>
                    </motion.div>
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
