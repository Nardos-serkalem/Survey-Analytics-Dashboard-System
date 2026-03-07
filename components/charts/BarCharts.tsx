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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"


export function SubCityChart({ subCityData, chartConfig }: SubCityChartProps) {
    return (
        <Card className="w-[50%]">
            <CardHeader>
                <CardTitle>Sub City Destribution</CardTitle>
                <CardDescription>Number Participants in each Sub City</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={subCityData}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                    >
                        <XAxis type="number" dataKey="participants" />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={true}
                            tickMargin={0}
                            axisLine={true}
                            tickFormatter={(value) => value.slice(0, 8)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Bar dataKey="participants" fill="var(--color-participants)" radius={5} >
                            <LabelList
                                dataKey="participants"
                                position="right"
                                offset={8}
                                className="text-black"
                                fontSize={12}
                            />
                        </Bar>
                     <ChartLegend className="mt-8" content={<ChartLegendContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}




export function AgeDistributionChart({ageData, chartConfig} : AgeDistributionChartProps) {
  return (
    <Card className="w-[50%]">
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={ageData}
            margin={{
              top: 20,
            }}
            barCategoryGap={0}
            barGap={0}
          >
            <CartesianGrid vertical={false} />
             <YAxis type="number" dataKey="frequency" />
            <XAxis
              dataKey="range"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="frequency" fill="var(--chart-3)" radius={0}>
              <LabelList
                position="top"
                offset={12}
                className="bg-blue"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

interface PreferenceChartProps {
  PreferenceChartData: Record<string, any>[];
  chartConfig: ChartConfig;
}

export function PreferenceChart({
  PreferenceChartData,
  chartConfig,
}: PreferenceChartProps) {

  console.log(PreferenceChartData);
  
  const dataKeys = Object.keys(chartConfig).filter((key) => key !== "participants");
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Preference Overview</CardTitle>
        <CardDescription>Session, Time, and Platform Preferences</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={PreferenceChartData}>
            <CartesianGrid vertical={true} />

            <XAxis dataKey="category" tickLine={true} tickMargin={20} axisLine={true} />
            <YAxis domain={[0, "auto"]} type="number" />

            <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="dashed" />} />

            {/* Dynamically render bars */}
            {dataKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartConfig[key].color}
                radius={4}
              />
            ))}

            <ChartLegend
              content={<ChartLegendContent  />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
