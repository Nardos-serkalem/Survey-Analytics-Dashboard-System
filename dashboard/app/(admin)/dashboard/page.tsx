import ChartCard from "@/components/chartCard";
import { ChartBarMultiple } from "@/components/charts/BarChart";
import { ChartPieLabel, ChartRadialStacked } from "@/components/charts/pieChart";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-12 lg:col-span-4 h-60 bg-slate-800 rounded-2xl flex items-center justify-center text-white text-2xl">
          1
        </div>

        {/* 2 - Top Middle */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 h-60 bg-slate-800 rounded-2xl  text-white text-2xl">
            <div className="bg-muted/50 aspect-video rounded-xl">
             <ChartRadialStacked/>
            </div>
        </div>

        {/* 3 - Top Right */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5  bg-slate-800 rounded-2xl  text-white text-2xl">
           <ChartCard/>
        </div>

        {/* 4 - Big Bottom Left */}
        <div className="col-span-12 lg:col-span-8 max-h-20 bg-slate-800 rounded-2xl  text-white text-2xl">
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
