
"use client";

import { Award, ChevronRight, HelpCircle, LogOut, MapPin, ShieldCheck, User as UserIcon, CreditCard, Bell, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/AppContext";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ListItem = ({ icon: Icon, label, hasArrow = true, onClick }: { icon: any, label: string, hasArrow?: boolean, onClick?: () => void }) => (
    <button onClick={onClick} className="flex items-center w-full text-left p-3 -mx-3 rounded-lg hover:bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground mr-4" />
        <span className="flex-grow text-foreground">{label}</span>
        {hasArrow && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
    </button>
)

export default function ProfilePage() {
  const { profile, user, logout } = useAppContext();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/avatars/01.png" alt="@student" />
           <AvatarFallback>
              <UserIcon className="h-10 w-10"/>
            </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Marion Angela</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ListItem icon={Award} label="My promo code" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>General Setting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <ListItem icon={UserIcon} label="My account" />
            <ListItem icon={CreditCard} label="Payment methods" />
            <ListItem icon={MapPin} label="My Address" />
            <ListItem icon={Bell} label="Notifications" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className='text-lg'>Other</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <ListItem icon={Star} label="Contact preferences" />
            <ListItem icon={ShieldCheck} label="Terms & Conditions" />
            <ListItem icon={HelpCircle} label="Help Center" />
            <ListItem icon={LogOut} label="Log out" hasArrow={false} onClick={logout}/>
        </CardContent>
      </Card>

    </div>
  );
}
