"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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

export const description = "A donut chart with text"

const chartData = [
  { education: "undergraduate", visitors: 27, fill: "var(--color-undergraduate)" },
  { education: "postgraduate", visitors: 20, fill: "var(--color-postgraduate)" },
  { education: "primary", visitors: 28, fill: "var(--color-primary)" },
  { education: "secondary", visitors: 73, fill: "var(--color-secondary)" },
  { education: "vocational", visitors: 90, fill: "var(--color-vocational)" },
];

const chartConfig = {
  visitors: {
    label: "Students",
  },
  undergraduate: {
    label: "Undergraduate",
    color: "var(--chart-1)",
  },
  postgraduate: {
    label: "Postgraduate",
    color: "var(--chart-2)",
  },
  primary: {
    label: "Primary",
    color: "var(--chart-3)",
  },
  secondary: {
    label: "Secondary",
    color: "var(--chart-4)",
  },
  vocational: {
    label: "Vocational",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartPieDonutText() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Education Level Distribution</CardTitle>
                <CardDescription>Participants by education level</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    All Participants
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                      {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing education level distribution of participants in the survey
                </div>
            </CardFooter>
        </Card>
    )
}


export const description2 = "A pie chart with a label"

const chartData2 = [
  { Course: "Graphics", selectors: 275, fill: "var(--color-chrome)" },
  { Course: "Codding", selectors: 200, fill: "var(--color-safari)" },
  { Course: "Markating", selectors: 187, fill: "var(--color-firefox)" },
  { Course: "Social Media", selectors: 173, fill: "var(--color-edge)" },
  { Course: "other", selectors: 90, fill: "var(--color-other)" },
]

const chartConfig2 = {
  visitors: {
    label: "Visitors",
  },
  Graphics: {
    label: "Graphics",
    color: "var(--chart-1)",
  },
  Codding: {
    label: "Codding",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartPieLabel() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle> Course  Preference</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig2}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData2} dataKey="selectors" label nameKey="Course" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
        </div>
        <div className="text-muted-foreground leading-none">
          {/* Showing total visitors for the last 6 months */}
        </div>
      </CardFooter>
    </Card>
  )
}




export const description3 = "A radial chart with stacked sections"

const chartData3 = [{ month: "january", male: 160, female: 270 }]

const chartConfig3 = {
  male: {
    label: "Male",
    color: "var(--chart-1)",
  },
  female: {
    label: "Female",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartRadialStacked() {
  const totalVisitors = chartData3[0].male + chartData3[0].female

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>participants</CardTitle>
        <CardDescription>March 2026</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig3}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData3}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Participants
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="male"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-male)"
              className="stroke-transparent stroke-2"
            />
            
            <RadialBar
              dataKey="female"
              fill="var(--color-female)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
       
        <div className="text-muted-foreground leading-none">
          Showing total participants for the month of March 2026 with gender distribution
        </div>
      </CardFooter>
    </Card>
  )
}
