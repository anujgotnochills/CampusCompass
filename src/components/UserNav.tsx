
"use client";

import { User, LogOut, Settings, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/contexts/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PreferencesDialog } from "./PreferencesDialog";

export function UserNav() {
  const { session, profile, supabase } = useAppContext();
  const router = useRouter();

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
    }
  };
  
  const getInitials = (name: string | undefined) => {
    if (!name) return <User />;
    const initials = name.split(' ').map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 md:h-9 md:w-9 rounded-full touch-manipulation">
          <Avatar className="h-10 w-10 md:h-9 md:w-9">
            <AvatarFallback className="text-sm">
              {getInitials(profile?.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 md:w-56" align="end" forceMount sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="py-3 md:py-2">
              <User className="mr-3 h-5 w-5 md:mr-2 md:h-4 md:w-4" />
              <span className="text-base md:text-sm">Profile</span>
            </DropdownMenuItem>
          </Link>          
          <PreferencesDialog profile={profile}>
             <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="py-3 md:py-2">
                <Settings className="mr-3 h-5 w-5 md:mr-2 md:h-4 md:w-4" />
                <span className="text-base md:text-sm">Settings</span>
            </DropdownMenuItem>
          </PreferencesDialog>
          <Link href="/help">
            <DropdownMenuItem className="py-3 md:py-2">
                <HelpCircle className="mr-3 h-5 w-5 md:mr-2 md:h-4 md:w-4" />
                <span className="text-base md:text-sm">Help Center</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="py-3 md:py-2 text-destructive focus:text-destructive">
          <LogOut className="mr-3 h-5 w-5 md:mr-2 md:h-4 md:w-4" />
          <span className="text-base md:text-sm">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
