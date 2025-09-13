

import { Compass, LayoutGrid, List, HeartHandshake, User, PlusCircle, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/UserNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainContent } from "@/components/MainContent";
import MobileNav from "@/components/MobileNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { href: "/items", icon: List, label: "All Items" },
    { href: "/matches", icon: HeartHandshake, label: "Matches" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
       <aside className="hidden w-20 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Compass className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Campus Compass</span>
            </Link>
            {navItems.map((item) => (
               <Link
                key={item.href}
                href={item.href}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 sm:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold mb-4 text-primary"
                  >
                    <Compass className="h-6 w-6" />
                    <span>Campus Compass</span>
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            
             <div className="flex items-center gap-2 font-semibold text-foreground sm:hidden">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Compass className="h-6 w-6 text-primary" />
                <span>Campus Compass</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Link href="/report?type=lost" className="hidden sm:inline-flex">
                  <Button size="sm" variant="outline">
                      Report Lost
                  </Button>
              </Link>
              <Link href="/report?type=found">
                  <Button size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Report Found
                  </Button>
              </Link>
              <UserNav />
            </div>
          </header>
          <MainContent>
            {children}
          </MainContent>
        </div>
        <MobileNav />
    </div>
  );
}
