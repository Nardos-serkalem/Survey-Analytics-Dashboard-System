import ChartCard from "@/components/chartCard";
import { ChartBarMultiple } from "@/components/charts/BarChart";
import { ChartPieLabel, ChartRadialStacked } from "@/components/charts/pieChart";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="  grid grid-cols-12 grid-rows-[repeat(auto-fit,minmax(250px,1fr)) gap-6">
        <div className="col-span-12  lg:col-span-5  row-span-1  bg-slate-800 rounded-2xl flex items-center justify-around  text-white text-2xl ">
          <div className="w-[40%]">
            <h1 className="text-3xl font-bold mb-2 text-secondary-light">Welcome back</h1>
            <h1>Abebe Kebede</h1>
            <p className="text-lg text-muted-foreground">Here’s a quick overview of your data insights.</p>
          </div>
            <Image className=" w-[40%]  drop-shadow-xl drop-shadow-taupe-50" src="/assets/image.png" width={100} height={100} alt="Dashboard image"></Image>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-3 row-span-1 bg-slate-800 rounded-2xl  text-white text-2xl">
            <div className="bg-muted/50 aspect-video rounded-xl">
             <ChartRadialStacked/>
            </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2   rounded-2xl  text-white text-2xl">
           <ChartCard/>
        </div>

        <div className="col-span-12 lg:col-span-6  lg:col-start-1 lg:row-start-3 row-span-2 bg-slate-800 rounded-2xl  text-white text-2xl">
          <ChartBarMultiple/>
        </div>
        
        <div className="col-span-12 lg:col-span-4 lg:row-start-3 lg:row-end-5 lg:col-start-7 lg:col-end-13 bg-slate-800 rounded-2xl  text-white text-2xl">
          <ChartPieLabel/>
        </div>
      </div>
    </div>
  )
}
