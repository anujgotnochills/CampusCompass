
"use client";

import { Award, FileText, Search, PlusCircle, TrendingUp, Calendar, Tag, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/contexts/AppContext";
import { ItemRow } from "@/components/ItemRow";
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
  const recentItems = items.slice(0, 10);

  const areItemsLoading = items.length === 0 && !isInitialLoading;

  return (
    <div className="space-y-6">
       <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {profile?.name || 'User'}!</h1>
          <p className="text-muted-foreground">Here's a summary of the latest activity.</p>
        </div>
        <div className="flex items-center gap-2">
            <Link href="/report?type=lost">
                <Button variant="outline">Report Lost Item</Button>
            </Link>
            <Link href="/report?type=found">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Report Found Item
                </Button>
            </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left column for recent items */}
        <Card className="lg:col-span-2 h-full">
            <CardHeader>
              <CardTitle>All Recent Items</CardTitle>
              <CardDescription>A live feed of all lost and found items being reported.</CardDescription>
            </CardHeader>
            <CardContent>
                {areItemsLoading ? (
                    <div className="space-y-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <Skeleton className="h-10 w-10 rounded-lg" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </div>
                      ))}
                    </div>
                ) : recentItems.length > 0 ? (
                  <div className="space-y-2">
                    {recentItems.map((item) => (
                      <ItemRow key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Info}
                    title="No Items Reported Yet"
                    description="When items are reported as lost or found, they will appear here."
                  />
                )}
            </CardContent>
        </Card>
        
        {/* Right column for chart and summary */}
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <TrendingUp className="h-5 w-5 text-muted-foreground" />
                        Activity Overview
                    </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
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
