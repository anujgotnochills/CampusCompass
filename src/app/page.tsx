

"use client";

import { List, Search, ShieldCheck, User, Compass } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PillNav from '@/components/PillNav';
import placeholderImages from '@/lib/placeholder-images.json';
import { MouseTracer } from '@/components/MouseTracer';
import TextPressure from '@/components/TextPressure';
import ClickSpark from '@/components/ClickSpark';
import { AuthDialog } from '@/components/AuthDialog';
import { useState } from 'react';
import type { AuthDialogView } from '@/components/AuthDialog';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

export default function LandingPage() {
  const dashboardImage = placeholderImages.dashboard;
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogView, setAuthDialogView] = useState<AuthDialogView>('login');

  const handlePillClick = (action?: 'login' | 'signup') => {
    if (action) {
      setAuthDialogView(action);
      setAuthDialogOpen(true);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <MouseTracer />
      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setAuthDialogOpen}
        initialView={authDialogView}
        onViewChange={setAuthDialogView}
      >
        <PillNav
          onItemClick={handlePillClick}
          logo={<Compass className="h-6 w-6" />}
          items={[
            { label: 'Features', href: '#features' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Log In', href: '#', action: 'login' },
            { label: 'Sign Up', href: '#', action: 'signup', isPrimary: true },
          ]}
          baseColor="hsl(var(--card))"
          pillColor="hsl(var(--primary))"
          pillTextColor="hsl(var(--primary-foreground))"
          hoveredPillTextColor="hsl(var(--primary-foreground))"
        />
      </AuthDialog>
      <main className="flex-1">
        <ClickSpark>
          <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 lg:pt-56 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/2 left-1/2 w-[90vw] h-[90vw] md:w-[80vw] md:h-[80vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 to-transparent rounded-full blur-3xl opacity-40"></div>
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] -translate-x-1/2 -translate-y-1/2">
                <div className="absolute w-full h-full border-2 border-primary/20 rounded-full animate-ping-slow"></div>
                <div className="absolute w-full h-full border-2 border-primary/30 rounded-full animate-ping-slow animation-delay-500"></div>
              </div>
            </div>
            <div className="container px-4 md:px-6 text-center flex flex-col items-center space-y-6 md:space-y-8 relative z-10">
              <Link
                href="#"
                className="inline-block rounded-full bg-primary/10 border border-primary/30 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-primary hover:bg-primary/20 transition-colors touch-manipulation"
              >
                What's New? <span className="text-white">AI-Powered Matching!</span>
              </Link>
              <div className="h-auto w-full max-w-[900px] flex flex-col items-center justify-center space-y-2 md:space-y-4">
                <TextPressure
                  text="Accelerate Your Search"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
                  flex={true}
                  width={true}
                  weight={true}
                  italic={true}
                  minFontSize={28}
                />
                <TextPressure
                  text="with Smarter Solutions."
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
                  flex={true}
                  width={true}
                  weight={true}
                  italic={true}
                  minFontSize={28}
                />
              </div>
              <p className="max-w-[90%] md:max-w-[700px] text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed px-4 md:px-0">
                Unlock a seamless way to find lost items. Campus Compass helps you streamline reporting and intelligently
                matches items.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-sm sm:max-w-none sm:justify-center">
                 <button onClick={() => handlePillClick('signup')} className="h-12 md:h-11 rounded-full px-6 md:px-8 inline-flex items-center justify-center whitespace-nowrap text-base md:text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 touch-manipulation min-h-[48px]">Get Started</button>
                <Link href="#features" prefetch={false} className="w-full sm:w-auto">
                  <button className="h-12 md:h-11 rounded-full px-6 md:px-8 inline-flex items-center justify-center whitespace-nowrap text-base md:text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent border-muted-foreground/50 hover:border-primary hover:text-primary active:scale-95 touch-manipulation min-h-[48px] w-full sm:w-auto">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </ClickSpark>

        <ClickSpark>
          <section id="features" className="w-full py-16 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 text-center mb-12 md:mb-16">
                <div className="inline-block rounded-lg bg-muted px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-primary">
                  Key Features
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter font-outfit text-white px-4 md:px-0">
                  Why You'll Love Campus Compass
                </h2>
                <p className="max-w-[90%] md:max-w-[900px] text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">
                  We've packed our app with features to make finding lost items a breeze.
                </p>
              </div>
              <div className="block md:hidden">
                <div className="space-y-6">
                  <div className="bg-card text-card-foreground rounded-lg">
                    <FeatureCard
                      icon={Search}
                      title="AI-Powered Matching"
                      description="Our smart system analyzes descriptions and images to find matches with high accuracy, saving you time and effort."
                    />
                  </div>
                  <div className="bg-card text-card-foreground rounded-lg">
                    <FeatureCard
                      icon={List}
                      title="Effortless Reporting"
                      description="Quickly report lost or found items with a simple form. Our AI can even help you write a better description."
                    />
                  </div>
                  <div className="bg-card text-card-foreground rounded-lg">
                    <FeatureCard
                      icon={User}
                      title="Community Focused"
                      description="Join a community of students helping each other. Earn rewards for reuniting people with their lost belongings."
                    />
                  </div>
                  <div className="bg-card text-card-foreground rounded-lg">
                    <FeatureCard
                      icon={ShieldCheck}
                      title="Secure Locker System"
                      description="Found items are stored securely in campus lockers, ensuring they are safe until picked up by their rightful owner."
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <ScrollStack useWindowScroll={true} itemDistance={10} itemScale={0.05} rotationAmount={-2} blurAmount={1}>
                  <ScrollStackItem itemClassName="bg-card text-card-foreground">
                    <FeatureCard
                      icon={Search}
                      title="AI-Powered Matching"
                      description="Our smart system analyzes descriptions and images to find matches with high accuracy, saving you time and effort."
                    />
                  </ScrollStackItem>
                  <ScrollStackItem itemClassName="bg-card text-card-foreground">
                    <FeatureCard
                      icon={List}
                      title="Effortless Reporting"
                      description="Quickly report lost or found items with a simple form. Our AI can even help you write a better description."
                    />
                  </ScrollStackItem>
                  <ScrollStackItem itemClassName="bg-card text-card-foreground">
                    <FeatureCard
                      icon={User}
                      title="Community Focused"
                      description="Join a community of students helping each other. Earn rewards for reuniting people with their lost belongings."
                    />
                  </ScrollStackItem>
                   <ScrollStackItem itemClassName="bg-card text-card-foreground">
                    <FeatureCard
                      icon={ShieldCheck}
                      title="Secure Locker System"
                      description="Found items are stored securely in campus lockers, ensuring they are safe until picked up by their rightful owner."
                    />
                  </ScrollStackItem>
                </ScrollStack>
              </div>
            </div>
          </section>
        </ClickSpark>

        <ClickSpark>
          <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32 bg-black/20">
            <div className="container grid items-center justify-center gap-4 md:gap-6 px-4 text-center md:px-6">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-white font-outfit px-4 md:px-0">
                  How It Works
                </h2>
                <p className="mx-auto max-w-[90%] md:max-w-[600px] text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">
                  Finding what you've lost is easier than ever. Follow these simple steps.
                </p>
              </div>
              <div className="mx-auto w-full max-w-4xl pt-8 md:pt-12">
                <div className="grid gap-8 md:gap-12 grid-cols-1 sm:grid-cols-3">
                  <HowItWorksStep
                    number="1"
                    title="Report Your Item"
                    description="Fill out a quick form with details about the lost or found item. Upload a photo for better matching."
                  />
                  <HowItWorksStep
                    number="2"
                    title="AI Finds Matches"
                    description="Our AI gets to work, comparing your item against the database to find potential matches in real-time."
                  />
                  <HowItWorksStep
                    number="3"
                    title="Get Notified & Recover"
                    description="Receive a notification when a likely match is found. Arrange for a secure pickup at a campus locker."
                  />
                </div>
              </div>
            </div>
          </section>
        </ClickSpark>
      </main>
      <footer className="border-t border-border/20 mt-12 md:mt-20">
        <div className="container flex flex-col gap-4 sm:flex-row py-6 md:py-8 w-full shrink-0 items-center px-4 md:px-6 text-center sm:text-left">
          <p className="text-xs md:text-sm text-muted-foreground">&copy; 2024 Campus Compass. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-6 sm:gap-8">
            <Link href="#" className="text-xs md:text-sm hover:underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors touch-manipulation" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-xs md:text-sm hover:underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors touch-manipulation" prefetch={false}>
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <div className="p-4 md:p-6 rounded-lg transition-all duration-300 hover:bg-card/50">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-4">
      <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
        <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{title}</h3>
    </div>
    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

const HowItWorksStep = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center gap-4 md:gap-6 relative px-4 md:px-0">
    <div className="flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-2xl md:text-3xl font-bold">
      {number}
    </div>
    <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{title}</h3>
    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs md:max-w-none">{description}</p>
  </div>
);

    

    