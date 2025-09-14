
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, LineChart } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"


interface ItemsChartProps {
  type: 'bar' | 'line';
  data: any[];
}

export function ItemsChart({ type, data }: ItemsChartProps) {

  const chartConfig = {
    lost: {
      label: "Lost",
      color: "hsl(var(--destructive))",
    },
    found: {
      label: "Found",
      color: "hsl(var(--primary))",
    },
     count: {
      label: "Count",
      color: "hsl(var(--primary))",
    }
  }

  if (type === 'line') {
      return (
        <ChartContainer config={chartConfig} className="w-full h-full min-h-[250px]">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
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
                 cursor={true}
                 content={<ChartTooltipContent indicator="dot" />}
                 wrapperStyle={{ outline: 'none' }}
              />
              <Line type="monotone" dataKey="lost" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="found" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      );
  }

  return (
    <ChartContainer config={chartConfig} className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 0, bottom: 0, left: 0 }} layout="vertical">
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis
            type="number"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            hide
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ width: 80 }}
          />
          <Tooltip 
             cursor={false}
             content={<ChartTooltipContent indicator="dot" />}
             wrapperStyle={{ outline: 'none' }}
          />
          <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
