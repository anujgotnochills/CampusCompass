

import { Compass, LayoutGrid, List, HeartHandshake, User, PlusCircle, Menu, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/UserNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainContent } from "@/components/MainContent";
import MobileNav from "@/components/MobileNav";
import { Input } from "@/components/ui/input";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { href: "/items", icon: List, label: "All Items" },
    { href: "/matches", icon: HeartHandshake, label: "Matches" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-4 md:px-6 backdrop-blur-lg">
        <nav className="hidden flex-col gap-6 text-sm font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base text-primary"
          >
            <Compass className="h-6 w-6" />
            <span className="sr-only">Campus Compass</span>
          </Link>
          {navItems.map((item) => (
             <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold text-primary"
              >
                <Compass className="h-6 w-6" />
                <span>Campus Compass</span>
              </Link>
              {navItems.map((item) => (
                 <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
               <Link
                  href="/profile"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Profile
                </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
           <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search items..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background/50"
              />
            </div>
          </form>
          <UserNav />
        </div>
      </header>
        <MainContent>
            {children}
        </MainContent>
        <MobileNav />
    </div>
  );
}
