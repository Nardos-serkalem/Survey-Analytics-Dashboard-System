import ChartCard from "@/components/chartCard";
import { ChartBarMultiple } from "@/components/charts/BarChart";
import { ChartPieLabel, ChartRadialStacked } from "@/components/charts/pieChart";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="grid grid-cols-12 grid-rows-6 gap-8">

        <div className="col-span-12 row-span-1 lg:col-span-4  bg-slate-800 rounded-2xl flex items-center justify-around  text-white text-2xl ">
          <div className="w-[40%]">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <h1>Abebe Kebede</h1>
            <p className="text-lg text-muted-foreground">Here's a quick overview of your dashboard.</p>
          </div>
            <Image className=" w-[40%] drop-shadow-xl drop-shadow-taupe-50" src="/assets/image.png" width={100} height={100} alt="Dashboard image"></Image>
        </div>

        {/* 2 - Top Middle */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 h-60 bg-slate-800 rounded-2xl  text-white text-2xl">
            <div className="bg-muted/50 aspect-video rounded-xl">
             <ChartRadialStacked/>
            </div>
        </div>

        {/* 3 - Top Right */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5  row-span-2 bg-slate-800 rounded-2xl  text-white text-2xl">
           <ChartCard/>
        </div>

        {/* 4 - Big Bottom Left */}
        <div className="col-span-12 lg:col-span-7 row-span-2 bg-slate-800 rounded-2xl  text-white text-2xl">
          <ChartBarMultiple/>
        </div>

        {/* 5 - Bottom Right */}
        <div className="col-span-12 lg:col-span-4  bg-slate-800 rounded-2xl  text-white text-2xl">
          <ChartPieLabel/>
        </div>
      </div>
    </div>

        // <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        //   <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        //      <ChartCard/>
        //     <div className="bg-muted/50 aspect-video rounded-xl" >
        //       <ChartPieLabel/>
        //     </div>
       
        //   </div>
        //   <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" >
    
        //      <ChartBarMultiple/>
          
        //   </div>
        // </div>
  )
}
