"use client";

import { Award, FileText, Search, Calendar, MoreVertical, ChevronUp, ChevronDown, Bell, Shield, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, MapPin, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppContext } from "@/contexts/AppContext";
import { ItemRow } from "@/components/ItemRow";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { subDays, format, parseISO } from "date-fns";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/UserNav";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();
  const trendData = last7Days.map(day => {
    const formattedDate = format(day, 'MMM d');
    const dayItems = items.filter(item => format(parseISO(item.created_at), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
    return {
      date: formattedDate,
      lost: dayItems.filter(item => item.type === 'lost').length,
      found: dayItems.filter(item => item.type === 'found').length,
      total: dayItems.length,
    };
  });

  const statusData = [
    { name: 'Open', value: openCases, fill: '#3b82f6' },
    { name: 'Recovered', value: recoveredCases, fill: '#8b5cf6' }
  ];

  const categoryData = Object.entries(CATEGORIES).map(([key]) => ({
    name: key,
    value: items.filter(item => item.category === key).length,
  }));

  const riskData = [
    { name: 'Low', value: 45, color: '#10B981' },
    { name: 'Medium', value: 30, color: '#F59E0B' },
    { name: 'High', value: 25, color: '#EF4444' },
  ];

  const vulnerabilityData = [
    { category: 'Electronics', count: 12, risk: 'High' },
    { category: 'Personal Items', count: 8, risk: 'Medium' },
    { category: 'Documents', count: 15, risk: 'High' },
    { category: 'Accessories', count: 6, risk: 'Low' },
  ];

  const recentActions = [
    { action: 'Scan for lost items completed', time: '3h Ago', type: 'success' },
    { action: 'New found item reported', time: '1 Day Ago', type: 'info' },
    { action: 'Match found for wallet', time: '2 Days Ago', type: 'success' },
    { action: 'Security scan completed', time: '3 Days Ago', type: 'warning' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between gap-2 md:gap-4 border-b bg-background/80 px-4 md:px-6 backdrop-blur-lg">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center gap-4">
          <form className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search items..."
                className="pl-8 w-full bg-background"
              />
            </div>
          </form>
          <div className="flex items-center gap-2">
            <Link href="/report?type=lost">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Report Lost
              </Button>
            </Link>
            <Link href="/report?type=found">
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Report Found
              </Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <UserNav />
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <UserNav />
        </div>
      </div>

      {/* Mobile Search Bar (when expanded) */}
      <div className="md:hidden px-4 py-2 border-b bg-background/80 backdrop-blur-lg">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-8 w-full bg-background"
            />
          </div>
        </form>
      </div>

      {/* Mobile Action Buttons */}
      <div className="md:hidden px-4 py-3 border-b bg-background/80 backdrop-blur-lg">
        <div className="flex gap-2">
          <Link href="/report?type=lost" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Report Lost
            </Button>
          </Link>
          <Link href="/report?type=found" className="flex-1">
            <Button size="sm" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Report Found
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-6">
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
                    <div className="divide-y divide-border">
                      {/* Desktop Table Header */}
                      <div className="hidden md:grid grid-cols-5 items-center py-2 text-xs font-semibold text-muted-foreground">
                          <div className="col-span-2">Item</div>
                          <div>Status</div>
                          <div>Date</div>
                          <div className="text-right">Actions</div>
                      </div>
                      {/* Mobile Header */}
                      <div className="md:hidden py-2 text-xs font-semibold text-muted-foreground">
                          Recent Items
                      </div>
                      {recentItems.map((item) => (
                        <ItemRow key={item.id} item={item} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No items found"
                      description="There are no items to display at the moment."
                      icon={FileText}
                    />
                  )}
              </CardContent>
          </Card>
      </div>
    </div>
  );
}