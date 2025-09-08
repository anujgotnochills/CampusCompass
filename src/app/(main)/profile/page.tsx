
"use client";

import { ChevronRight, HelpCircle, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from '@/components/ui/button';
import { EditProfileDialog } from '@/components/EditProfileDialog';
import { PreferencesDialog } from '@/components/PreferencesDialog';
import Link from 'next/link';
import { DialogTrigger } from '@/components/ui/dialog';

const ProfileRow = ({ icon: Icon, label, description, action }: { icon: React.ElementType, label: string, description: string, action: React.ReactNode }) => (
    <div className="flex items-center p-3 -mx-3 rounded-lg hover:bg-muted cursor-pointer">
        <Icon className="h-5 w-5 text-muted-foreground mr-4" />
        <div className="flex-grow">
            <p className="font-medium">{label}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {action}
    </div>
);


export default function ProfilePage() {
  const { profile, supabase, session } = useAppContext();

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
  }
  
  const getInitials = (name: string | undefined): string => {
    if (!name) return '';
    const initials = name.split(' ').map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  }

  const userInitials = getInitials(profile?.name);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-3xl">
              {userInitials ? userInitials : <UserIcon />}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{profile?.name}</h1>
          <p className="text-muted-foreground">{session?.user?.email}</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Account</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          <EditProfileDialog profile={profile}>
            <DialogTrigger asChild>
              <ProfileRow icon={UserIcon} label="Personal Information" description="Update your name and contact details." action={<ChevronRight className="h-5 w-5 text-muted-foreground" />} />
            </DialogTrigger>
          </EditProfileDialog>
          
          <PreferencesDialog profile={profile}>
             <DialogTrigger asChild>
                <ProfileRow icon={Settings} label="Preferences" description="Customize your notification settings." action={<ChevronRight className="h-5 w-5 text-muted-foreground" />} />
            </DialogTrigger>
          </PreferencesDialog>

          <Link href="/help">
             <ProfileRow icon={HelpCircle} label="Help Center" description="Get support or read our FAQs." action={<ChevronRight className="h-5 w-5 text-muted-foreground" />} />
          </Link>
        </CardContent>
      </Card>
      
      <Card className="border-destructive">
         <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
           <CardDescription>Be careful with these actions.</CardDescription>
        </Header>
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
