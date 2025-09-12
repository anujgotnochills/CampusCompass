
import { Compass, LayoutGrid, List, HeartHandshake, User, PlusCircle, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/UserNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainContent } from "@/components/MainContent";
import MobileNav from "@/components/MobileNav";


const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/items", icon: List, label: "All Items" },
  { href: "/matches", icon: HeartHandshake, label: "Matches" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
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
          
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Compass className="h-6 w-6" />
              <span className="hidden md:inline-block">Campus Compass</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6 text-sm font-medium ml-10">
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
        <MobileNav />
    </div>
  );
}
