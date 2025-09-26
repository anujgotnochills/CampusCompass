

import { Compass, LayoutDashboard, List, HeartHandshake, User, Settings, Menu, Search, Bell } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/UserNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { MainContent } from "@/components/MainContent";
import MobileNav from "@/components/MobileNav";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/items", icon: List, label: "All Items" },
    { href: "/matches", icon: HeartHandshake, label: "Matches" },
    { href: "/profile", icon: User, label: "Profile"},
  ];

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <div className="hidden border-r bg-card md:block fixed left-0 top-0 z-50 h-screen w-[60px]">
        <div className="flex h-full max-h-screen flex-col gap-2 items-center">
          <div className="flex h-16 items-center justify-center border-b px-4 lg:h-[60px] lg:px-6 w-full">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-primary">
              <Compass className="h-6 w-6" />
              <span className="sr-only">Campus Compass</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start text-sm font-medium">
              <TooltipProvider>
              {navItems.map((item) => (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className="flex items-center justify-center h-12 w-12 gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ))}
              </TooltipProvider>
            </nav>
          </div>
          <div className="mt-auto p-4">
             <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                        <Link
                            href="/settings"
                            className="flex items-center justify-center h-12 w-12 gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <Settings className="h-5 w-5" />
                             <span className="sr-only">Settings</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        Settings
                    </TooltipContent>
                </Tooltip>
             </TooltipProvider>
          </div>
        </div>
      </div>
      
      <main className="flex flex-1 flex-col md:ml-[60px] min-h-screen max-w-full overflow-x-hidden">
          <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 px-4 md:px-6 backdrop-blur-lg md:hidden">
              <Sheet>
              <SheetTrigger asChild>
                  <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 h-10 w-10"
                  >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 sm:w-96">
                  <SheetHeader>
                    <VisuallyHidden>
                      <SheetTitle>Navigation Menu</SheetTitle>
                    </VisuallyHidden>
                  </SheetHeader>
                  <nav className="grid gap-6 text-lg font-medium pt-6">
                    <Link href="/dashboard" className="flex items-center gap-3 text-xl font-semibold text-primary mb-4">
                        <Compass className="h-7 w-7" />
                        <span>Campus Compass</span>
                    </Link>
                    {navItems.map((item) => (
                        <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-lg hover:bg-accent"
                        >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                        </Link>
                    ))}
                    <Link href="/settings" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-lg hover:bg-accent">
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                  </nav>
              </SheetContent>
              </Sheet>
              <div className="text-lg font-semibold text-primary truncate flex-1">Campus Compass</div>
              <UserNav />
          </header>
          <div className="flex-1 overflow-y-auto">
            <MainContent>
                {children}
            </MainContent>
          </div>
      </main>

      <MobileNav />
    </div>
  );
}
