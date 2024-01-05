import React from "react";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { LandCard } from "./card/landCard";
interface DataProps {
  farmerData: string[];
  plotSaleData: string[];
  totalLandArea: number;
  totalPlotArea: number;
}

const DashCard = ({
  farmerData,
  totalLandArea,
  totalPlotArea,
  plotSaleData,
  count,
  leftAmount,
  filteredResults,
  totalPlotEarn,
  percentageIncrease,
}: DataProps) => {
  //  Land rate percentage

  const allMonthsData = farmerData;
  allMonthsData.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const monthlyTotalAreas = {};

  for (const entry of allMonthsData) {
    const monthYear = new Date(entry.createdAt).toISOString().slice(0, 7);

    if (!monthlyTotalAreas[monthYear]) {
      monthlyTotalAreas[monthYear] = {
        totalArea: 0,
        count: 0,
      };
    }

    monthlyTotalAreas[monthYear].totalArea += entry.totalArea;
    monthlyTotalAreas[monthYear].count++;
  }

  const months = Object.keys(monthlyTotalAreas);
  months.sort();

  let percentageChange = 0;

  for (let i = 1; i < months.length; i++) {
    const lastMonth = months[i - 1];
    const currentMonth = months[i];

    const lastMonthTotalArea = monthlyTotalAreas[lastMonth].totalArea;
    const currentMonthTotalArea = monthlyTotalAreas[currentMonth].totalArea;

    percentageChange =
      ((currentMonthTotalArea - lastMonthTotalArea) / lastMonthTotalArea) * 100;
  }

  // Plot Rate Percentage Change
  const allMonthsPlotData = plotSaleData;
  allMonthsPlotData.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const monthlyTotalPrices = {};

  for (const entry of allMonthsPlotData) {
    const monthYear = new Date(entry.createdAt).toISOString().slice(0, 7);

    if (!monthlyTotalPrices[monthYear]) {
      monthlyTotalPrices[monthYear] = {
        totalPrice: 0,
        count: 0,
      };
    }

    monthlyTotalPrices[monthYear].totalPrice += entry.plotPrice;
    monthlyTotalPrices[monthYear].count++;
  }

  const plotMonths = Object.keys(monthlyTotalPrices);
  plotMonths.sort();

  let plotPercentageChange = 0;

  for (let i = 1; i < plotMonths.length; i++) {
    const lastMonth = plotMonths[i - 1];
    const currentMonth = plotMonths[i];

    const lastMonthTotalPrice = monthlyTotalPrices[lastMonth].totalPrice;
    const currentMonthTotalPrice = monthlyTotalPrices[currentMonth].totalPrice;

    plotPercentageChange =
      ((currentMonthTotalPrice - lastMonthTotalPrice) / lastMonthTotalPrice) *
      100;
  }
  const landExcludingPlotPercentage = percentageChange - plotPercentageChange;

  const remainingArea = totalLandArea - totalPlotArea;
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      <LandCard
        title={"Total Land Area"}
        count={farmerData.length}
        totalNoOfEntry={totalLandArea}
        overViewCount={percentageChange.toFixed(2)}
      />
      <LandCard
        title={"Total Plot Sold"}
        count={plotSaleData.length}
        totalNoOfEntry={totalPlotArea}
        overViewCount={plotPercentageChange.toFixed(2)}
      />
      <LandCard
        title={"Remaining Land "}
        count={farmerData.length}
        totalNoOfEntry={remainingArea}
        overViewCount={landExcludingPlotPercentage.toFixed(2)}
      />{" "}
      <LandCard
        title={"Active Payments"}
        count={count}
        totalNoOfEntry={leftAmount}
        overViewCount={percentageIncrease.toFixed(2)}
        totalEarnLastMonth={totalPlotEarn}
      />
    </div>
  );
};

export default DashCard;
