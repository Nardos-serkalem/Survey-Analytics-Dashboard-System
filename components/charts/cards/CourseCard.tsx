import { getAgeDistribution, getCourses, getEducationLevel, getGender, getSubCity } from "@/lib/actions/api.actions"
import { CourseChart, EducationLevelChart, GenderDistributionChart } from "../PieChart";
import { ChartConfig } from "@/components/ui/chart";
import { AgeDistributionChart, SubCityChart } from "../BarCharts";

export const GenderDistributionCard = async () => {
    const gender = await getGender();
    const chartConfig = {
        male: {
            label: "male",
            color: "var(--chart-1)",
        },
        female: {
            label: "female",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig
    return <GenderDistributionChart GenderChartData={gender} chartConfig={chartConfig} />
}
export const CoursePreferenceCard = async () => {
    const Courses = await getCourses();
    const CourseChartData = Courses.map((course, index) => ({
        training: course.training,
        participants: course.participants,
        fill: `var(--chart-${index + 1})`
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
export const EducationLevelCard = async () => {
    const educationLevelData = await getEducationLevel();
    const EducationLevelChartData = educationLevelData.map((education) => ({
        level: education.level,
        participants: education.participants,
        fill: `var(--color-${education.level})`
    }))
    const chartConfig: ChartConfig = EducationLevelChartData.reduce((acc, course, index) => {
        acc[course.level] = {
            label: course.level,
            color: `var(--chart-${index})`,
        };
        return acc;
    }, {
        participants: { label: "participants", color: "var(--chart-0)" },
    } as ChartConfig);

    return <EducationLevelChart EducationLevelChartData={EducationLevelChartData} chartConfig={chartConfig} />
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