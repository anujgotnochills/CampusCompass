
"use client";

import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { AuthDialog } from "@/components/AuthDialog";
import { Button } from "@/components/ui/button";

export const GetStartedButton = () => (
    <AuthDialog initialView="signup">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
    </AuthDialog>
);

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/10 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary" prefetch={false}>
          <Compass className="h-6 w-6" />
          <span className="font-outfit font-bold text-2xl text-white">Campus Compass</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#features" className="transition-colors hover:text-primary text-muted-foreground" prefetch={false}>
            Features
          </Link>
          <Link href="#how-it-works" className="transition-colors hover:text-primary text-muted-foreground" prefetch={false}>
            How It Works
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <AuthDialog initialView="login">
            <Button variant="ghost">Log In</Button>
          </AuthDialog>
          <GetStartedButton />
        </div>
      </div>
    </header>
  );
}
