
"use client";

import { Award, FileText, Search, PlusCircle, TrendingUp, Calendar, Tag, Info, List, BarChart, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAppContext } from "@/contexts/AppContext";
import { ItemRow } from "@/components/ItemRow";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { Item, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { subDays, format, parseISO } from "date-fns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
    PieChart,
    Pie,
    Cell,
} from "recharts";


const ItemsChart = dynamic(() => import('@/components/ItemsChart').then(mod => mod.ItemsChart), {
  loading: () => <Skeleton className="h-[250px] w-full" />,
  ssr: false,
});


export default function DashboardPage() {
  const { items, profile, isInitialLoading } = useAppContext();

  const openCases = items.filter((item) => !item.is_recovered).length;
  const recoveredCases = items.length - openCases;
  const recentItems = items.slice(0, 5);

  const areItemsLoading = isInitialLoading;

  const statusData = [
    { name: 'Open', value: openCases, fill: 'hsl(var(--primary))' },
    { name: 'Recovered', value: recoveredCases, fill: 'hsl(var(--secondary))' },
  ];

  const categoryData = CATEGORIES.map(category => ({
      name: category.name,
      count: items.filter(item => item.category === category.name).length,
  }));
  
  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();
  const trendData = last7Days.map(day => {
    const formattedDate = format(day, 'MMM d');
    const dayItems = items.filter(item => format(parseISO(item.created_at), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
    return {
      date: formattedDate,
      lost: dayItems.filter(item => item.type === 'lost').length,
      found: dayItems.filter(item => item.type === 'found').length,
    };
  });


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ItemsChart type="line" data={trendData} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Item Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                     <h3 className="text-muted-foreground font-medium">Open vs. Recovered</h3>
                     <div className="h-[150px] w-full">
                        <ChartContainer config={{}} className="w-full h-full">
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={60}>
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                     </div>
                     <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span>Open Cases: {openCases}</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            <span>Recovered: {recoveredCases}</span>
                        </div>
                    </div>
                </div>
                 <div className="flex flex-col items-center justify-center space-y-2">
                     <h3 className="text-muted-foreground font-medium">Items by Category</h3>
                     <div className="h-[150px] w-full">
                        <ItemsChart type="bar" data={categoryData} />
                     </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Items</p>
                        <div className="text-2xl font-bold">{areItemsLoading ? <Skeleton className="h-8 w-12" /> : items.length}</div>
                    </div>
                    <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                        <p className="text-sm text-muted-foreground">Open Cases</p>
                        <div className="text-2xl font-bold">{areItemsLoading ? <Skeleton className="h-8 w-12" /> : openCases}</div>
                    </div>
                    <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                        <p className="text-sm text-muted-foreground">Reward Points</p>
                        <p className="text-2xl font-bold text-primary">{profile?.reward_points || 0}</p>
                    </div>
                    <Award className="h-6 w-6 text-primary" />
                </div>
            </CardContent>
        </Card>
      </div>

       <Card>
            <CardHeader>
              <CardTitle>Recent Items</CardTitle>
              <CardDescription>A live feed of all lost and found items being reported.</CardDescription>
            </CardHeader>
            <CardContent>
                {areItemsLoading ? (
                    <div className="space-y-1">
                      {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between p-3">
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                      ))}
                    </div>
                ) : recentItems.length > 0 ? (
                  <div className="divide-y divide-border -mx-6">
                    <div className="grid grid-cols-5 items-center px-6 py-2 text-xs font-semibold text-muted-foreground">
                        <div className="col-span-2">Item</div>
                        <div>Status</div>
                        <div>Date</div>
                        <div className="text-right">Actions</div>
                    </div>
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
    </div>
  );
}
