export { }

declare global {
    type Course = {
        id: string,
        training: string,
        participants: number
    }
}

declare global {
    type ChartConfigItem = {
        label: string;
        color: string;
    };
}
declare global {
    type CourseChartData = {
        training: string,
        participants: number
        fill: string
    };
}
declare global {
    type CourseChartProps = {
        CourseChartData: CourseChartData[];
        chartConfig: ChartConfig;
    };
}

//subCity
declare global {
    type SubCity = {
        id: string,
        name: string,
        participants: number
    }
}
declare global {
    type SubCityChartData = {
        name: string,
        participants: number
        fill: string
    };
}

declare global {
    type SubCityChartProps = {
        subCityData: SubCityChartData[],
        chartConfig: ChartConfig;
    }
}
//age
declare global {
    type AgeDistribution = {
        id: string,
        range: string,
        frequency: number
    }
}
declare global {
    type AgeDistributionData = {
        range: string,
        frequency: number
        fill: string
    };
}
declare global {
    type AgeDistributionChartProps = {
        ageData: AgeDistributionData[],
        chartConfig: ChartConfig;
    }
}