
import { List, Search, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LandingHeader, GetStartedButton } from '@/components/LandingHeader';
import placeholderImages from '@/lib/placeholder-images.json';
import { MouseTracer } from '@/components/MouseTracer';
import TextPressure from '@/components/TextPressure';

export default function LandingPage() {
  const dashboardImage = placeholderImages.dashboard;
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <MouseTracer />
      <LandingHeader />
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
           <div className="absolute inset-0 z-0">
             <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 to-transparent rounded-full blur-3xl opacity-40"></div>
             <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
             <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2">
                <div className="absolute w-full h-full border-2 border-primary/20 rounded-full animate-ping-slow"></div>
                <div className="absolute w-full h-full border-2 border-primary/30 rounded-full animate-ping-slow animation-delay-500"></div>
             </div>
           </div>
          <div className="container px-4 md:px-6 text-center flex flex-col items-center space-y-6 relative z-10">
              <Link href="#" className="inline-block rounded-full bg-primary/10 border border-primary/30 px-4 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
                What's New? <span className="text-white">AI-Powered Matching!</span>
              </Link>
              <div className="h-[200px] w-full max-w-[900px] flex flex-col items-center justify-center">
                <TextPressure
                  text="Accelerate Your Search"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  flex={true}
                  width={true}
                  weight={true}
                  italic={true}
                  minFontSize={36}
                />
                 <TextPressure
                  text="with Smarter Solutions."
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  flex={true}
                  width={true}
                  weight={true}
                  italic={true}
                  minFontSize={36}
                />
              </div>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Unlock a seamless way to find lost items. Campus Compass helps you streamline reporting and intelligently matches items.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <GetStartedButton />
                <Link href="#features" prefetch={false}>
                    <button className="h-11 rounded-md px-8 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent border-muted-foreground/50 hover:border-primary hover:text-primary">Learn More</button>
                </Link>
              </div>
          </div>
        </section>
        
        <section className="relative z-10 -mt-16 px-4 md:px-6">
            <div className="relative mx-auto max-w-7xl rounded-xl border border-white/10 bg-black/10 backdrop-blur-sm shadow-2xl shadow-primary/10">
                <div className="p-2 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" aria-label="close button decor"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500" aria-label="minimize button decor"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500" aria-label="maximize button decor"></div>
                    </div>
                     <div className="text-sm text-muted-foreground">campus-compass-dashboard</div>
                     <div></div>
                </div>
                <Image
                    src={dashboardImage.src}
                    alt="App Dashboard Preview"
                    data-ai-hint="dashboard user interface"
                    width={dashboardImage.width}
                    height={dashboardImage.height}
                    className="rounded-b-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        </section>

        <section id="features" className="w-full py-24 md:py-32 lg:py-40">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold text-primary">Key Features</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-outfit text-white">Why You'll Love Campus Compass</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We've packed our app with features to make finding lost items a breeze.
                    </p>
                </div>
                 <div className="mx-auto grid max-w-7xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <FeatureCard
                      icon={Search}
                      title="AI-Powered Matching"
                      description="Our smart system analyzes descriptions and images to find matches with high accuracy, saving you time and effort."
                    />
                    <FeatureCard
                      icon={List}
                      title="Effortless Reporting"
                      description="Quickly report lost or found items with a simple form. Our AI can even help you write a better description."
                    />
                    <FeatureCard
                      icon={User}
                      title="Community Focused"
                      description="Join a community of students helping each other. Earn rewards for reuniting people with their lost belongings."
                    />
                     <FeatureCard
                      icon={ShieldCheck}
                      title="Secure Locker System"
                      description="Found items are stored securely in campus lockers, ensuring they are safe until picked up by their rightful owner."
                    />
                </div>
            </div>
        </section>

        <section id="how-it-works" className="w-full py-24 md-py-32 lg:py-40 bg-black/20">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white font-outfit">How It Works</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Finding what you've lost is easier than ever. Follow these simple steps.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl pt-12">
              <div className="grid gap-8 sm:grid-cols-3">
                <HowItWorksStep number="1" title="Report Your Item" description="Fill out a quick form with details about the lost or found item. Upload a photo for better matching." />
                <HowItWorksStep number="2" title="AI Finds Matches" description="Our AI gets to work, comparing your item against the database to find potential matches in real-time." />
                <HowItWorksStep number="3" title="Get Notified & Recover" description="Receive a notification when a likely match is found. Arrange for a secure pickup at a campus locker." />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border/20 mt-20">
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
    <div className="p-6 rounded-lg hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-primary/50 hover:bg-card hover:shadow-2xl hover:shadow-primary/10">
        <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Icon className="h-6 w-6 text-primary"/>
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
);

const HowItWorksStep = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center gap-4 relative">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-2xl font-bold">{number}</div>
    <h3 className="text-lg font-bold text-white">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

    
    