'use client'
import React, {useState} from 'react'
import {SelectDemo} from "@/components/Select";
import {ChartBarLabelCustom} from "@/components/charts/BarChart";
import {ChartPieDonutText} from "@/components/charts/pieChart";



const ChartCard = () => {
    const [selected, setSelected] = useState("age");
    return (
        <div className="bg-muted/50 aspect-video rounded-xl">
            <div className="w-full flex items-center justify-between gap-2 px-4 py-2">
                <h1>Demographic Charts</h1>
                <SelectDemo onChange= {setSelected}/>
            </div>
            {selected === "age" && <ChartBarLabelCustom/>}
            {selected === "subSity" && <ChartBarLabelCustom/>}
            {selected === "education" && <ChartPieDonutText/>}
        </div>
    )
}
export default ChartCard
