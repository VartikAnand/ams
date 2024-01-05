"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PlotDataChart = ({ plotSaleData }) => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveContainer>
        <LineChart
          data={plotSaleData}
          margin={{
            top: 20,
            right: 10,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="khasraNumber" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalLandCost"
            stroke="rgba(226, 255, 0, 0.8)"
          />
          <Line
            type="monotone"
            dataKey="totalArea"
            stroke="rgba(77, 254, 0, 0.8)"
          />
          <Line
            type="monotone"
            dataKey="perSqCost"
            stroke="rgba(0, 248, 255, 0.8)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlotDataChart;
