
"use client";

import { Award, FileText, Search, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/contexts/AppContext";
import { ItemCard } from "@/components/ItemCard";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { items, profile, isLoading } = useAppContext();

  const openCases = items.filter((item) => !item.isRecovered).length;
  const recentLostItems = items.filter((item) => item.type === 'lost' && !item.isRecovered).slice(0, 4);
  const recentFoundItems = items.filter((item) => item.type === 'found' && !item.isRecovered).slice(0, 4);

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
            <div className="text-2xl font-bold text-primary">{profile.rewardPoints}</div>
            <p className="text-xs text-muted-foreground">Earn points by helping others</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Recent Items</h2>
          <Tabs defaultValue="lost" className="w-auto">
            <TabsList>
              <TabsTrigger value="lost">Lost</TabsTrigger>
              <TabsTrigger value="found">Found</TabsTrigger>
            </TabsList>
            <TabsContent value="lost" className="mt-6">
              {recentLostItems.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {recentLostItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Search}
                  title="No Lost Items"
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
            <TabsContent value="found" className="mt-6">
              {recentFoundItems.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {recentFoundItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                  <EmptyState
                      icon={Search}
                      title="No Found Items"
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
    </div>
  );
}
