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

const PlotDataChart = ({ plotSaleData }) => {
  const currentYear = new Date().getFullYear();

  const dateFormatter = (timeStr) => {
    const date = new Date(timeStr);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options); // Format: "12 Jan 2023"
  };

  // Preprocess data to replace null values with 0 and filter data for the current year
  const processedData = plotSaleData
    .filter((item) => new Date(item.createdAt).getFullYear() === currentYear)
    .map((item) => ({
      ...item,
      debitAmount: item.debitAmount || 0,
      creditAmount: item.creditAmount || 0,
    }));

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} dy={16} textAnchor="middle" fill="#666">
        {dateFormatter(payload.value)}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveContainer>
        <BarChart
          data={processedData}
          margin={{
            top: 40,
            right: 10,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="creditAmount" fill="green" name="Credit Amount" />
          <Bar dataKey="debitAmount" fill="red" name="Debit Amount" />
          <Bar dataKey="paymentFor" fill="orange" name="For" />
          <Bar dataKey="paymentMode" fill="blue" name="Mode" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlotDataChart;
