
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
  const recentLostItems = items.filter((item) => item.type === 'lost' && !item.is_recovered).slice(0, 4);
  const recentFoundItems = items.filter((item) => item.type === 'found' && !item.is_recovered).slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items Reported</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-xs text-muted-foreground">All lost and found items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Cases</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openCases}</div>
            <p className="text-xs text-muted-foreground">Items yet to be recovered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reward Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{profile?.reward_points || 0}</div>
            <p className="text-xs text-muted-foreground">Earn points by helping others</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    Activity Overview
                </CardTitle>
                <CardDescription>Lost and found items reported in the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ItemsChart items={items} />
            </CardContent>
        </Card>
      </div>
      
       <div className="space-y-6">
        <Tabs defaultValue="lost">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Recent Items</h2>
            <TabsList className="grid w-full sm:w-auto grid-cols-2">
              <TabsTrigger value="lost">Lost</TabsTrigger>
              <TabsTrigger value="found">Found</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="lost">
            {recentLostItems.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
          <TabsContent value="found">
            {recentFoundItems.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
    </div>
  );
}
