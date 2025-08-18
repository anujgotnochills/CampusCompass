
"use client";

import { Compass, LayoutGrid, List, HeartHandshake, User, PlusCircle, Search, Home, ShoppingBag, User as UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/UserNav";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNav from "@/components/MobileNav";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/items", icon: Search, label: "Search" },
  { href: "/matches", icon: ShoppingBag, label: "Bag" },
  { href: "/profile", icon: UserIcon, label: "Profile" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAppContext();
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>Loading...</div>
        </div>
    );
  }
  
  if (isMobile === undefined) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {!isMobile && (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-card sm:flex">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-primary">
              <Leaf className="h-6 w-6" />
              <span>Dipstore</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                  pathname === item.href && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
      )}

      <div className={cn("flex flex-col", !isMobile && "sm:pl-64")}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
          {isMobile && (
             <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-primary sm:hidden">
              <Leaf className="h-6 w-6" />
              <span className="sr-only">Dipstore</span>
            </Link>
          )}
          <div className="flex-1">
            {/* Can add a search bar here in the future */}
          </div>
          <div className="ml-auto flex items-center gap-4">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
      
      {isMobile && <MobileNav navItems={navItems} />}
    </div>
  );
}

// Rename Compass to Leaf to avoid conflicts
import { Leaf } from 'lucide-react';
