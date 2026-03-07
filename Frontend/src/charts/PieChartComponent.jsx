import React from 'react'
import { Pie, PieChart, ResponsiveContainer,Cell , Tooltip, Legend } from 'recharts'
import { Demographic } from '../data/mockdata';
function PieChartComponent() {
  const chartData = Object.entries(Demographic).map(([key, data]) => ({
    name: key,
    value: data.Total
  }));

  const COLORS = ["#3b82f6", "#22c55e", "#ef4444"];

  return (
    <div className="p-4 w-full">
      <div
        id="chartcards"
        className="flex flex-col items-center justify-center w-full h-[300px] bg-background border border-border rounded-lg p-4"
      >
        <h1 className="text-textprimary text-lg font-bold p-4">
          This is a Pie Chart
        </h1>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default  PieChartComponent