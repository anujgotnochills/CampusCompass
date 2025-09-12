
"use client";

import { Award, FileText, Search, PlusCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/contexts/AppContext";
import { ItemCard } from "@/components/ItemCard";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ItemsChart } from "@/components/ItemsChart";

export default function DashboardPage() {
  const { items, profile } = useAppContext();

  const openCases = items.filter((item) => !item.is_recovered).length;
  const recentLostItems = items.filter((item) => item.type === 'lost' && !item.is_recovered).slice(0, 6);
  const recentFoundItems = items.filter((item) => item.type === 'found' && !item.is_recovered).slice(0, 6);

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
                {recentLostItems.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                {recentFoundItems.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                    <div className="text-2xl font-bold">{items.length}</div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Open Cases</CardTitle>
                    <Search className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{openCases}</div>
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
