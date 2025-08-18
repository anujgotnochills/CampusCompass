
"use client";

import { Compass, LayoutGrid, List, HeartHandshake, User, PlusCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/UserNav";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

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
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAppContext();
  const router = useRouter();

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

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
              <Compass className="h-6 w-6" />
              <span>Campus Compass</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-muted text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-6">
          <div className="flex-1">
             <Link href="/report?type=lost" className="mr-4">
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
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
