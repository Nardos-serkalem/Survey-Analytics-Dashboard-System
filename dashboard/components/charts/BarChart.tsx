"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart with a custom label"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-2)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
    label: {
        color: "var(--background)",
    },
} satisfies ChartConfig

export function ChartBarLabelCustom() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Custom Label</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="desktop" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="desktop"
                            layout="vertical"
                            fill="var(--color-desktop)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="month"
                                position="insideLeft"
                                offset={8}
                                className="fill-(--color-label)"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="desktop"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}



export const description2 = "A multiple bar chart showing preferences"

const chartData2 = [
  {
    category: "Session",
    Weekly: 50,
    BiWeekly: 30,
    Daily: 90,
    Monthly: 100,
  },
  {
    category: "Time",
    Evening: 186,
    Afternoon: 80,
    
  },
  {
    category: "Platform",
    Telegram: 70,
    TikTok: 120,
    YouTube: 95,
    LinkedIn: 40,
  },
]

const chartConfig2 = {
  Evening: { label: "Evening", color: "var(--chart-1)" },
  Afternoon: { label: "Afternoon", color: "var(--chart-2)" },
  BiWeekly: { label: "Bi-weekly", color: "var(--chart-3)" },
  Daily: { label: "Daily", color: "var(--chart-4)" },
  Weekly: { label: "Weekly", color: "var(--chart-5)" },
  Monthly: { label: "Monthly", color: "var(--chart-6)" },
  Telegram: { label: "Telegram", color: "var(--chart-7)" },
  TikTok: { label: "TikTok", color: "var(--chart-8)" },
  YouTube: { label: "YouTube", color: "var(--chart-9)" },
  LinkedIn: { label: "LinkedIn", color: "var(--chart-10)" },
} satisfies ChartConfig

export function ChartBarMultiple() {
  return (
    <Card className="h-8">
      <CardHeader>
        <CardTitle>Preference Overview</CardTitle>
        <CardDescription>
          Session, Time, and Platform Preferences
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig2}>
          <BarChart accessibilityLayer data={chartData2}>
            <CartesianGrid vertical={true} />

            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
            />

            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            {/* Session */}
            <Bar dataKey="Weekly" fill="var(--color-Weekly)" radius={4} />
            <Bar dataKey="BiWeekly" fill="var(--color-BiWeekly)" radius={4} />
            <Bar dataKey="Daily" fill="var(--color-Daily)" radius={4} />
            <Bar dataKey="Monthly" fill="var(--color-Monthly)" radius={4} />

            {/* Time */}
            <Bar dataKey="Evening" fill="var(--color-Evening)" radius={4} />
            <Bar dataKey="Afternoon" fill="var(--color-Afternoon)" radius={4} />

            {/* Platform */}
            <Bar dataKey="Telegram" fill="var(--color-Telegram)" radius={4} />
            <Bar dataKey="TikTok" fill="var(--color-TikTok)" radius={4} />
            <Bar dataKey="YouTube" fill="var(--color-YouTube)" radius={4} />
            <Bar dataKey="LinkedIn" fill="var(--color-LinkedIn)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}