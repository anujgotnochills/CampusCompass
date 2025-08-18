
"use client";

import { Award, ChevronRight, HelpCircle, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/AppContext";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ListItem = ({ icon: Icon, label, description, href }: { icon: any, label: string, description: string, href: string }) => (
    <Link href={href} className="flex items-center p-3 -mx-3 rounded-lg hover:bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground mr-4" />
        <div className="flex-grow">
            <p className="font-medium">{label}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
)

export default function ProfilePage() {
  const { profile, user, logout } = useAppContext();

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/avatars/01.png" alt="@student" />
          <AvatarFallback>
              <UserIcon className="h-10 w-10"/>
            </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user?.name}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
          <Button variant="outline" size="sm" className="mt-2">Edit Profile</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Account</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
            <ListItem icon={UserIcon} label="Personal Information" description="Update your name and contact details." href="#" />
            <ListItem icon={Settings} label="Preferences" description="Customize your notification settings." href="#" />
            <ListItem icon={HelpCircle} label="Help Center" description="Get support or read our FAQs." href="#" />
        </CardContent>
      </Card>
      
      <Card className="border-destructive">
         <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
           <CardDescription>Be careful with these actions.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant="destructive" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
