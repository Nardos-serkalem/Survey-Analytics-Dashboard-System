import { getAgeDistribution, getCourses, getSubCity } from "@/lib/actions/api.actions"
import { CourseChart } from "../PieChart";
import { ChartConfig } from "@/components/ui/chart";
import { AgeDistributionChart, SubCityChart } from "../BarCharts";

export const CoursePreferenceCard = async () => {
    const Courses = await getCourses();
    const CourseChartData = Courses.map((course) => ({
        training: course.training,
        participants: course.participants,
        fill: `var(--color-${course.training})`
    }))
    const chartConfig: ChartConfig = Courses.reduce((acc, course, index) => {
        acc[course.training] = {
            label: course.training,
            color: `var(--chart-${index})`,
        };
        return acc;
    }, {
        participants: { label: "participants", color: "var(--chart-0)" },
    } as ChartConfig);

    return <CourseChart CourseChartData={CourseChartData} chartConfig={chartConfig} />
}

export const SubCityCard = async () => {
    const subCity = await getSubCity();
    const subCityData = subCity.map((city) => ({
        name: city.name,
        participants: city.participants,
        fill: `var(--color-${city.name})`
    }))
    const chartConfig: ChartConfig = subCity.reduce((acc, city, index) => {
        acc[city.name] = {
            label: city.name,
            color: `var(--chart-${index})`,
        };
        return acc;
    }, { participants: { label: "participants", color: "var(--chart-0)" } } as ChartConfig);
    return <SubCityChart subCityData={subCityData} chartConfig={chartConfig} />
}
export const AgeDistributionCard = async () => {
    const ageDistribution = await getAgeDistribution();
    const ageDistributionData = ageDistribution.map((age) => ({
        range: age.range,
        frequency: age.frequency,
        fill: `var(--color-${age.range})`
    }))

    const chartConfig = {
        frequency: {
            label: "frequency",
            color: "var(--chart-3)",
        },
    } satisfies ChartConfig;

    return <AgeDistributionChart ageData={ageDistributionData} chartConfig={chartConfig} />
}