export { }
declare  global{
    type Gender={
        id:string,
        month:string,
        male: number,
        female: number
    }
}
declare global {
    type GenderChartProps = {
        GenderChartData: Omit<Gender[], "id">;
        chartConfig: ChartConfig;
    };
}

/////
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
// education 
declare global {
    type EducationLevel = {
        level: string,
        participants: number,
        fill:string
    }
}
declare global {
    type EducationLevelChartProps = {
        EducationLevelChartData: EducationLevel[];
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