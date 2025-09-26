
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
        <div className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t bg-background/95 backdrop-blur-lg md:hidden safe-area-inset-bottom">
            <nav className="grid h-full grid-cols-5 items-center px-2">
                {navItems.map((item) => (
                    <TooltipProvider key={item.href} delayDuration={0}>
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-all duration-200 rounded-lg p-2 min-h-[48px] active:scale-95 touch-manipulation",
                                        pathname === item.href && "text-primary bg-primary/10"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-6 w-6 transition-all duration-200",
                                        pathname === item.href && "h-7 w-7"
                                    )} />
                                    <span className={cn(
                                        "text-xs font-medium transition-all duration-200",
                                        pathname === item.href ? "opacity-100" : "opacity-70"
                                    )}>{item.label}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top" sideOffset={8}>
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
                 <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Link href="/report?type=found" className="flex justify-center p-2">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg active:scale-90 transition-all duration-200 hover:shadow-xl">
                                    <PlusCircle className="h-7 w-7" />
                                </div>
                             </Link>
                        </TooltipTrigger>
                         <TooltipContent side="top" sideOffset={8}>
                            <p>Report an Item</p>
                        </TooltipContent>
                    </Tooltip>
                 </TooltipProvider>
            </nav>
        </div>
    );
}
