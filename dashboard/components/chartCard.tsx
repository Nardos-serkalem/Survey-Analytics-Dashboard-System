'use client'
import React, {useState} from 'react'
import {SelectDemo} from "@/components/Select";
import {AgeBarChart, SubCityBarChart} from "@/components/charts/BarChart";
import {ChartPieDonutText} from "@/components/charts/pieChart";



const ChartCard = () => {
    const [selected, setSelected] = useState("age");
    return (
        <div className="bg-muted/50 rounded-xl w-full">
            <div className="w-full flex items-center justify-between gap-2 px-4 py-2">
                <h1>Demographic Charts</h1>
                <SelectDemo onChange= {setSelected}/>
            </div>
            {selected === "age" && <AgeBarChart/>}
            {selected === "subCity" && <SubCityBarChart/>}
            {selected === "education" && <ChartPieDonutText/>}
        </div>
    )
}
export default ChartCard
