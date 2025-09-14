

import { Compass, LayoutDashboard, List, HeartHandshake, User, Settings, Menu, Search, Bell } from "lucide-react";
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
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/items", icon: List, label: "All Items" },
    { href: "/matches", icon: HeartHandshake, label: "Matches" },
    { href: "/profile", icon: User, label: "Profile"},
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr_280px] lg:grid-cols-[280px_1fr_320px] bg-background">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-primary">
              <Compass className="h-6 w-6" />
              <span className="">Campus Compass</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
          </div>
        </div>
      </div>
      
      <main className="flex flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-4 md:px-6 backdrop-blur-lg md:hidden">
              <Sheet>
              <SheetTrigger asChild>
                  <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-primary">
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
                    <Link href="/profile" className="text-muted-foreground hover:text-foreground">
                        Profile
                    </Link>
                  </nav>
              </SheetContent>
              </Sheet>
              <div className="text-lg font-semibold text-primary">Campus Compass</div>
              <div className="ml-auto">
                <UserNav />
              </div>
          </header>
          <div className="flex-1 overflow-y-auto">
            <MainContent>
                {children}
            </MainContent>
          </div>
      </main>

      <div className="hidden border-l bg-card md:flex flex-col">
        <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
            <form>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-8 sm:w-[200px] bg-background"
                    />
                </div>
            </form>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5"/>
                    <span className="sr-only">Notifications</span>
                </Button>
                <UserNav />
            </div>
        </div>
        <div className="flex-1 p-6">
            {/* Right sidebar content goes here */}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
