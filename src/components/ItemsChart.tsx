
"use client"

import { subDays, format, parseISO } from 'date-fns';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { Item } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"


interface ItemsChartProps {
  items: Item[];
}

export function ItemsChart({ items }: ItemsChartProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();
  
  const chartData = last7Days.map(day => {
    const formattedDate = format(day, 'MMM d');
    const dayItems = items.filter(item => format(parseISO(item.created_at), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
    return {
      date: formattedDate,
      lost: dayItems.filter(item => item.type === 'lost').length,
      found: dayItems.filter(item => item.type === 'found').length,
    };
  });

  const chartConfig = {
    lost: {
      label: "Lost",
      color: "hsl(var(--destructive))",
    },
    found: {
      label: "Found",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip 
             cursor={false}
             content={<ChartTooltipContent indicator="dot" />}
             wrapperStyle={{ outline: 'none' }}
          />
          <Bar dataKey="lost" fill="var(--color-lost)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="found" fill="var(--color-found)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
