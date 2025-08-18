
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
    navItems: {
        href: string;
        icon: React.ElementType;
        label: string;
    }[];
}

export default function MobileNav({ navItems }: MobileNavProps) {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t bg-background/95 backdrop-blur-sm md:hidden">
            <div className="grid h-full grid-cols-4">
                {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 text-muted-foreground",
                        pathname === item.href && "text-primary"
                    )}
                >
                    <item.icon className="h-6 w-6" />
                    <span className="text-xs font-medium">{item.label}</span>
                </Link>
                ))}
            </div>
        </nav>
    );
}
