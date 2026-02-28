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

const AgeData = [
  { ageGroup: "15-20", value: 10 },
  { ageGroup: "21-25", value: 20 },
  { ageGroup: "26-30", value: 15 },
  { ageGroup: "31-35", value: 8 },
  { ageGroup: "36-40", value: 5 },
];
const ageChartConfig = {
    age: {
        label: "age",
        color: "#eda42d",
    },
    label: {
        color: "var(--background)",
    },
} satisfies ChartConfig

const subCityData = [
  { subCity: "Arada", value: 12 },
  { subCity: "Addis Ketema", value: 18 },
  { subCity: "Akaky Kaliti", value: 9 },
  { subCity: "Bole", value: 25 },
  { subCity: "Gullele", value: 14 },
  { subCity: "Kirkos", value: 16 },
  { subCity: "Kolfe Keranio", value: 11 },
  { subCity: "Lideta", value: 13 },
  { subCity: "Nifas Silk-Lafto", value: 17 },
  { subCity: "Yeka", value: 20 },
];
const subCityChartConfig = {
    subCity: {
        label: "subCity",
        color: "#0ea5e9",
    },
    label: {
        color: "var(--background)",
    },
} satisfies ChartConfig




export function AgeBarChart() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Age groups of participants</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={ageChartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={AgeData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="ageGroup"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="value" type="number"  />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="value"
                            layout="vertical"
                            fill="var(--color-age)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="ageGroup"
                                position="insideLeft"
                                offset={8}
                                className="fill-(--color-label)"
                                fontSize={12}
                            />
                            {/* <LabelList
                                dataKey="age"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            /> */}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    Showing age distribution of participants in specific age groups
                </div>
            </CardFooter>
        </Card>
    )
}

export function SubCityBarChart() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>SubCity Distribution</CardTitle>
                <CardDescription>Participants in each subcity</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={subCityChartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={subCityData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="subCity"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <XAxis
                        domain={[0,'auto']}
                        type="number"
                        />
                        <Bar
                            dataKey="value"
                            layout="vertical"
                            fill="var(--color-subCity)"
                            radius={4}
                        >
                            {/* <LabelList
                                dataKey="subCity"
                                position="insideLeft"
                                offset={8}
                                className="fill-(--color-label)"
                                fontSize={12}
                            /> */}
                            <LabelList
                                dataKey="subCity"
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
                <div className="text-muted-foreground leading-none">
                    Showing age distribution of participants in specific age groups
                </div>
            </CardFooter>
        </Card>
    )
}



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
  Monthly: { label: "Monthly", color: "var(--chart-3)" },
  Telegram: { label: "Telegram", color: "var(--chart-1)" },
  TikTok: { label: "TikTok", color: "var(--chart-2)" },
  YouTube: { label: "YouTube", color: "var(--chart-3)" },
  LinkedIn: { label: "LinkedIn", color: "var(--chart-4)" },
} satisfies ChartConfig

export function ChartBarMultiple() {
  return (
    <Card className="h-full">
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
              tickLine={true}
              tickMargin={20}
              axisLine={true}
            />
            <YAxis 
             domain={[0,'auto']}
              type="number"
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