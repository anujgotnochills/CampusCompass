
"use client";

import { Compass, LayoutGrid, List, HeartHandshake, User, PlusCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/UserNav";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/MobileNav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";


const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/items", icon: List, label: "All Items" },
  { href: "/matches", icon: HeartHandshake, label: "Matches" },
  { href: "/profile", icon: User, label: "Profile" },
];

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    // We can remove the redirection logic for now
    // if (!isLoading && !isAuthenticated) {
    //   router.push('/login');
    // }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
        </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Compass className="h-6 w-6" />
                  <span>Campus Compass</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                       pathname === item.href && "bg-muted text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Link href="/report?type=lost" className="mr-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" variant="outline">
                        Report Lost
                    </Button>
                </motion.div>
            </Link>
            <Link href="/report?type=found">
                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Report Found
                    </Button>
                </motion.div>
            </Link>
          </div>
          <UserNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
           <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {children}
              </motion.div>
            </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
