
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, List, HeartHandshake, User, PlusCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
    href: string;
    icon: LucideIcon;
    label: string;
}

const navItems: NavItem[] = [
    { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { href: "/items", icon: List, label: "All Items" },
    { href: "/matches", icon: HeartHandshake, label: "Matches" },
    { href: "/profile", icon: User, label: "Profile" },
];


export default function MobileNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t bg-background/80 backdrop-blur-lg md:hidden">
            <nav className="grid h-full grid-cols-5 items-center">
                {navItems.map((item) => (
                    <TooltipProvider key={item.href} delayDuration={0}>
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-1 text-muted-foreground",
                                        pathname === item.href && "text-primary"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="text-xs font-medium sr-only">{item.label}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
                 <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Link href="/report?type=found" className="flex justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg active:scale-95 transition-transform">
                                    <PlusCircle className="h-6 w-6" />
                                </div>
                             </Link>
                        </TooltipTrigger>
                         <TooltipContent side="top">
                            <p>Report an Item</p>
                        </TooltipContent>
                    </Tooltip>
                 </TooltipProvider>
            </nav>
        </div>
    );
}
