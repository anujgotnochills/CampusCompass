
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
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ 
                top: 20, 
                right: 10, 
                bottom: 20, 
                left: 0 
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tick={{ fontSize: 10 }}
                width={20}
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
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ 
            top: 20, 
            right: 10, 
            bottom: 20, 
            left: 0 
          }} 
          layout="vertical"
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis
            type="number"
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            hide
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, width: 60 }}
            width={60}
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
