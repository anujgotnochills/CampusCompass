
"use client";

import { Award, FileText, Search, PlusCircle, TrendingUp, LayoutGrid, List, HeartHandshake, User, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/contexts/AppContext";
import { ItemCard } from "@/components/ItemCard";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ItemsChart = dynamic(() => import('@/components/ItemsChart').then(mod => mod.ItemsChart), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
  ssr: false,
});


export default function DashboardPage() {
  const { items, profile, isInitialLoading } = useAppContext();

  const openCases = items.filter((item) => !item.is_recovered).length;
  const recentLostItems = items.filter((item) => item.type === 'lost' && !item.is_recovered).slice(0, 6);
  const recentFoundItems = items.filter((item) => item.type === 'found' && !item.is_recovered).slice(0, 6);

  // Show a more detailed skeleton when items are loading but profile is ready.
  // isInitialLoading is now only for session/profile.
  const areItemsLoading = items.length === 0 && !isInitialLoading;

  if (isInitialLoading) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                         <Skeleton className="h-8 w-48" />
                         <Skeleton className="h-10 w-44" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
                        {[...Array(6)].map((_, i) => (
                           <Card key={i}>
                               <CardHeader className="p-0">
                                   <Skeleton className="aspect-[4/3] w-full rounded-t-lg" />
                               </CardHeader>
                               <CardContent className="p-4">
                                   <div className="flex items-center text-sm text-muted-foreground mb-2">
                                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                        <Skeleton className="h-4 w-1/3" />
                                   </div>
                                   <Skeleton className="h-6 w-full" />
                               </CardContent>
                               <CardFooter className="p-4 pt-0">
                                   <div className="flex items-center text-xs text-muted-foreground">
                                        <Skeleton className="h-3 w-3 mr-1.5 rounded-full" />
                                        <Skeleton className="h-3 w-1/2" />
                                   </div>
                               </CardFooter>
                           </Card>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <Skeleton className="h-64 w-full" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
        {/* Left column for recent items */}
        <div className="flex flex-col h-full">
            <Tabs defaultValue="lost" className="flex-grow flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Recent Items</h2>
                <TabsList className="grid w-full sm:w-auto grid-cols-2">
                  <TabsTrigger value="lost">Lost</TabsTrigger>
                  <TabsTrigger value="found">Found</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="lost" className="flex-grow">
                {areItemsLoading ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
                        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-[350px] w-full" />)}
                    </div>
                ) : recentLostItems.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
                    {recentLostItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Search}
                    title="No Recent Lost Items"
                    description="No one has reported a lost item recently."
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
              <TabsContent value="found" className="flex-grow">
                {areItemsLoading ? (
                     <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
                        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-[350px] w-full" />)}
                    </div>
                ) : recentFoundItems.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
                    {recentFoundItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                    <EmptyState
                        icon={Search}
                        title="No Recent Found Items"
                        description="No one has reported a found item recently."
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
        
        {/* Right column for chart and summary */}
        <div className="flex flex-col gap-6">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-muted-foreground" />
                        Activity Overview
                    </CardTitle>
                    <CardDescription>Lost and found items reported in the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2 flex-grow">
                  <ItemsChart items={items} />
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{areItemsLoading ? <Skeleton className="h-8 w-12" /> : items.length}</div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Open Cases</CardTitle>
                    <Search className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{areItemsLoading ? <Skeleton className="h-8 w-12" /> : openCases}</div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Reward Points</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-primary">{profile?.reward_points || 0}</div>
                </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
