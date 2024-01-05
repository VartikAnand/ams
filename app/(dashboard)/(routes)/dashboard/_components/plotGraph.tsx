"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PlotSellGraph = ({ plotSaleData }) => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveContainer>
        <BarChart
          data={plotSaleData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="plotNumber" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            radius={[10, 10, 0, 0]}
            dataKey="plotPrice"
            fill="rgba(255, 146, 0, 0.8)"
          />
          <Bar
            radius={[10, 10, 0, 0]}
            dataKey="totalArea"
            fill="rgba(255, 0, 46, 0.8)"
          />
          <Bar
            radius={[10, 10, 0, 0]}
            dataKey="perSqCost"
            fill="rgba(136, 3, 253, 0.8)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlotSellGraph;
