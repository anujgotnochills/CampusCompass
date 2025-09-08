"use client";

import { ChevronRight, HelpCircle, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from '@/components/ui/button';
import { EditProfileDialog } from '@/components/EditProfileDialog';
import { PreferencesDialog } from '@/components/PreferencesDialog';
import { useRouter } from 'next/navigation';

const ProfileRow = ({ icon: Icon, label, description, children }: { icon: React.ElementType, label: string, description: string, children?: React.ReactNode }) => (
  <div className="flex items-center p-3 -mx-3 rounded-lg hover:bg-muted cursor-pointer">
    <Icon className="h-5 w-5 text-muted-foreground mr-4" />
    <div className="flex-grow">
      <p className="font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {children || <ChevronRight className="h-5 w-5 text-muted-foreground" />}
  </div>
);

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
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-3xl">
            {initials ? initials : <UserIcon className="h-10 w-10" />}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{profile?.name || 'User'}</h1>
          <p className="text-muted-foreground">{profile?.id}</p>
          <EditProfileDialog profile={profile}>
            <Button variant="outline" size="sm" className="mt-2">Edit Profile</Button>
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
            <div onClick={() => router.push('/help')}>
              <ProfileRow icon={HelpCircle} label="Help Center" description="Get support or read our FAQs." />
            </div>
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
  );
}
