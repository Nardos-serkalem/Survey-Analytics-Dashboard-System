import React from 'react'
import PieChartComponent from './PieChartComponent'
function Allchart() {
  return (
    <main className="p-4 w-full h-full bg-backgroundSecondary border border-border rounded-lg">
      <div id="title">
        <h1 className="text-xl font-bold text-textprimary mb-4">
          Charts Dashboard
        </h1>
      </div>

      <div className="flex w-full gap-4">
        <div className="flex-1">
          <PieChartComponent />
        </div>

        <div className="flex-1">
          <PieChartComponent />
        </div>
      </div>
    </main>
  );
}

export default Allchart