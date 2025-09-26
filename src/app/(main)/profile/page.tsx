
"use client";

// Force dynamic rendering for personalized content
export const dynamic = 'force-dynamic';

import { ChevronRight, HelpCircle, LogOut, Settings, User as UserIcon, Search, Bell, FileText, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/UserNav';
import { useRouter } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const EditProfileDialog = dynamicImport(() => import('@/components/EditProfileDialog').then(mod => mod.EditProfileDialog), {
  loading: () => <ProfileRowSkeleton />,
  ssr: false
});
const PreferencesDialog = dynamicImport(() => import('@/components/PreferencesDialog').then(mod => mod.PreferencesDialog), {
  loading: () => <ProfileRowSkeleton />,
  ssr: false
});

const ProfileRow = ({ icon: Icon, label, description, children, onClick }: { icon: React.ElementType, label: string, description: string, children?: React.ReactNode, onClick?: () => void }) => (
  <div className="flex items-center p-3 -mx-3 rounded-lg hover:bg-muted cursor-pointer" onClick={onClick}>
    <Icon className="h-5 w-5 text-muted-foreground mr-4" />
    <div className="flex-grow">
      <p className="font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {children || <ChevronRight className="h-5 w-5 text-muted-foreground" />}
  </div>
);

const ProfileRowSkeleton = () => (
    <div className="flex items-center p-3 -mx-3">
        <Skeleton className="h-5 w-5 mr-4 rounded-full" />
        <div className="flex-grow space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
        </div>
        <Skeleton className="h-5 w-5" />
    </div>
)

export default function ProfilePage() {
  const { profile, supabase } = useAppContext();
  const router = useRouter();

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.push('/');
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return '';
    const initials = name.split(' ').map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(profile?.name);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between gap-2 md:gap-4 border-b bg-background/80 px-4 md:px-6 backdrop-blur-lg">
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
          <h1 className="text-lg md:text-2xl font-bold truncate">Profile</h1>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center gap-4">
          <form className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search items..."
                className="pl-8 w-full bg-background"
              />
            </div>
          </form>
          <div className="flex items-center gap-2">
            <Link href="/report?type=lost">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Report Lost
              </Button>
            </Link>
            <Link href="/report?type=found">
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Report Found
              </Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <UserNav />
        </div>

        {/* Mobile Layout - Compact */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-10 w-10 flex items-center justify-center">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <UserNav />
        </div>
      </div>

      {/* Mobile Search Bar (when expanded) */}
      <div className="md:hidden px-4 py-2 border-b bg-background/80 backdrop-blur-lg">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-8 w-full bg-background"
            />
          </div>
        </form>
      </div>

      {/* Mobile Action Buttons */}
      <div className="md:hidden px-4 py-3 border-b bg-background/80 backdrop-blur-lg">
        <div className="flex gap-2">
          <Link href="/report?type=lost" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Report Lost
            </Button>
          </Link>
          <Link href="/report?type=found" className="flex-1">
            <Button size="sm" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Report Found
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 text-center sm:text-left">
          <Avatar className="h-24 w-24 md:h-28 md:w-28">
            <AvatarFallback className="text-2xl md:text-3xl">
              {initials ? initials : <UserIcon className="h-10 w-10 md:h-12 md:w-12" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{profile?.name || 'User'}</h2>
            <p className="text-sm md:text-base text-muted-foreground break-all sm:break-normal">{profile?.id}</p>
            <EditProfileDialog profile={profile}>
              <Button variant="outline" size="sm" className="mt-3 w-full sm:w-auto">Edit Profile</Button>
            </EditProfileDialog>
          </div>
        </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Account</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
            <EditProfileDialog profile={profile}>
                <ProfileRow icon={UserIcon} label="Personal Information" description="Update your name and contact details." />
            </EditProfileDialog>
            <PreferencesDialog profile={profile}>
                <ProfileRow icon={Settings} label="Preferences" description="Customize your notification settings." />
            </PreferencesDialog>
            <ProfileRow icon={HelpCircle} label="Help Center" description="Get support or read our FAQs." onClick={() => router.push('/help')} />
        </CardContent>
      </Card>
      
        <Card className="border-destructive">
           <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
             <CardDescription>Be careful with these actions.</CardDescription>
          </CardHeader>
          <CardContent>
              <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
              </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
