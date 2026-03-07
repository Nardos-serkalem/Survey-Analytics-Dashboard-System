import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Demographic } from "../data/mockdata";

function LineChartComponent() {

  const chartData = Object.entries(Demographic).map(([key, data]) => ({
    name: key,
    value: data.Total
  }));

  const COLORS = ["#3b82f6", "#22c55e", "#ef4444"];

  return (
    <div className="w-full h-[350px] bg-background border border-border rounded-lg p-4">

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default LineChartComponent;