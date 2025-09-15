"use client";

import { Award, FileText, Search, PlusCircle, TrendingUp, Calendar, Tag, Info, List, BarChart, CheckCircle, XCircle, MoreVertical, Users, Activity, Shield, AlertTriangle } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Campus Compass</h1>
            <p className="text-slate-400 mt-1">Lost & Found Analytics • {format(new Date(), 'dd MMM - dd MMM')}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700">
              <Calendar className="h-4 w-4 mr-2" />
              {format(new Date(), 'dd MMM - dd MMM')}
            </Button>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-slate-400" />
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Trend Chart */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl">Trend</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      High
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      Medium
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      Low
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lost" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: '#EF4444' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="found" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: '#10B981' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#F59E0B" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <div className="bg-slate-700/50 px-4 py-2 rounded-full">
                    <span className="text-2xl font-bold text-white">5,674</span>
                    <span className="text-slate-400 ml-2">Total Items</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Risk Analysis</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-slate-300">High</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-slate-300">Low</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm">Total Assets</p>
                      <p className="text-3xl font-bold text-white">57,985<span className="text-lg text-slate-400">.07</span></p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">
                        0.14%
                      </Badge>
                    </div>
                    <div className="w-24 h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={riskData}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={40}
                            dataKey="value"
                          >
                            {riskData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-slate-400 text-sm">Vulnerable Assets</p>
                      <p className="text-2xl font-bold text-white">28,374<span className="text-lg text-slate-400">.12</span></p>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mt-1">
                        0.91%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vulnerabilityData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9CA3AF" fontSize={12} hide />
                        <YAxis 
                          dataKey="category" 
                          type="category" 
                          stroke="#9CA3AF" 
                          fontSize={12}
                          width={80}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Bar 
                          dataKey="count" 
                          fill="#8B5CF6" 
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vulnerabilities Table */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Risk Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Low</Badge>
                      <span className="text-white">Git Director Exposure</span>
                      <span className="text-slate-400">Source code & Credentials</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white font-semibold">158</span>
                      <span className="text-slate-400">Vulnerable Assets</span>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">High</Badge>
                      <span className="text-white">SSL Certificate Exposure</span>
                      <span className="text-slate-400">Source code & Credentials</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white font-semibold">214</span>
                      <span className="text-slate-400">Vulnerable Assets</span>
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Participants</CardTitle>
                <CardDescription className="text-slate-400">
                  Onboarding: How to transform new signups into successful users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <Avatar className="w-8 h-8 border-2 border-slate-700">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">JA</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-slate-700">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">MB</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-slate-700">
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">SC</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-slate-700">
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">DL</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-slate-400 text-sm">+25</span>
                </div>
              </CardContent>
            </Card>

            {/* Last Actions */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Last actions</CardTitle>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActions.map((action, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        action.type === 'success' ? 'bg-green-500' : 
                        action.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{action.action}</p>
                        <p className="text-slate-400 text-xs mt-1">{action.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-slate-400 hover:text-white">
                  Show all actions
                </Button>
              </CardContent>
            </Card>

            {/* Decorative Element */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center transform rotate-12">
                <span className="text-2xl">👌</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}