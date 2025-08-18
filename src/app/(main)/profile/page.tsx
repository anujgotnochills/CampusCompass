
"use client";

import { Award, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/AppContext";
import { ItemCard } from "@/components/ItemCard";
import { EmptyState } from '@/components/EmptyState';
import { User as UserIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { profile, items } = useAppContext();

  const userLostItems = items.filter(item => item.type === 'lost').sort((a,b) => b.postedAt - a.postedAt);
  const userFoundItems = items.filter(item => item.type === 'found').sort((a,b) => b.postedAt - a.postedAt);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/avatars/01.png" alt="@student" />
           <AvatarFallback>
              <UserIcon className="h-10 w-10"/>
            </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">Student</h1>
          <p className="text-muted-foreground">student@university.edu</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Your Reward Points</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">{profile.rewardPoints}</div>
          <p className="text-xs text-muted-foreground">Earn 10 points for every found item you help return!</p>
        </CardContent>
      </Card>

      <div>
        <Tabs defaultValue="lost-items">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Your Reported Items</h2>
          <TabsList>
            <TabsTrigger value="lost-items">Lost Items ({userLostItems.length})</TabsTrigger>
            <TabsTrigger value="found-items">Found Items ({userFoundItems.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="lost-items" className="mt-4">
            {userLostItems.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {userLostItems.map(item => <ItemCard key={item.id} item={item} />)}
              </div>
            ) : (
                <EmptyState
                    icon={Search}
                    title="No Lost Items"
                    description="You haven't reported any lost items yet."
                >
                    <Link href="/report?type=lost">
                        <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Report a Lost Item
                        </Button>
                    </Link>
                </EmptyState>
            )}
          </TabsContent>
          <TabsContent value="found-items" className="mt-4">
            {userFoundItems.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {userFoundItems.map(item => <ItemCard key={item.id} item={item} />)}
              </div>
            ) : (
                <EmptyState
                    icon={Search}
                    title="No Found Items"
                    description="You haven't reported any found items yet."
                >
                     <Link href="/report?type=found">
                        <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Report a Found Item
                        </Button>
                    </Link>
                </EmptyState>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
