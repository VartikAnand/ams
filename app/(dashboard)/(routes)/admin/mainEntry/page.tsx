import React from "react";
import DashCard from "./_components/dashCard";
import { db } from "@/lib/db";
import PlotDataChart from "./_components/graph";
import PlotSellGraph from "./_components/plotGraph";

const MainEntry = async () => {
  const farmerData = await db.farmer.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      farmerPayments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  const plotSaleData = await db.plotSale.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  let totalLandArea = 0;
  for (const data of farmerData) {
    totalLandArea += data.totalArea;
  }

  // Current Month Revenue
  let totalPlotEarnLastMonth = 0;
  let totalPlotEarnCurrentMonth = 0;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const lastMonthStart = new Date(currentYear, currentMonth - 1, 1);
  const lastMonthEnd = new Date(currentYear, currentMonth, 0);

  for (const data of plotSaleData) {
    const dataDate = new Date(data.createdAt);

    if (dataDate >= lastMonthStart && dataDate <= lastMonthEnd) {
      totalPlotEarnLastMonth += data.plotPrice;
    }

    if (
      dataDate.getMonth() === currentMonth &&
      dataDate.getFullYear() === currentYear
    ) {
      totalPlotEarnCurrentMonth += data.plotPrice;
    }
  }

  const percentageIncrease =
    ((totalPlotEarnCurrentMonth - totalPlotEarnLastMonth) /
      totalPlotEarnLastMonth) *
    100;

  // console.log("Total earnings last month:", totalPlotEarnLastMonth);
  // console.log("Total earnings current month:", totalPlotEarnCurrentMonth);
  // console.log("Percentage increase:", percentageIncrease);

  const totalPlotArea = plotSaleData.reduce(
    (total, plot) => total + plot.plotArea,
    0
  );

  function calculatePaymentSumWithLandCost(data) {
    const filteredResults = data
      .map((farmer) => {
        const { totalLandCost, farmerPayments } = farmer;
        const paymentSum = farmerPayments.reduce(
          (sum, payment) => sum + (payment.paidAmount || 0),
          0
        );
        return { totalLandCost, paymentSum };
      })
      .filter(({ totalLandCost, paymentSum }) => totalLandCost !== paymentSum);

    const leftAmount = filteredResults.reduce(
      (sum, item) => sum + (item.totalLandCost - item.paymentSum),
      0
    );
    const count = filteredResults.length;

    return { filteredResults, leftAmount, count };
  }

  const { filteredResults, leftAmount, count } =
    calculatePaymentSumWithLandCost(farmerData);

  // Graph Current Month Data
  const currentYearData = farmerData.filter((item) => {
    const itemDate = new Date(item.createdAt);
    const itemYear = itemDate.getFullYear();

    return itemYear === currentYear;
  });

  const currentYearPlotSellData = plotSaleData.filter((item) => {
    const itemDate = new Date(item.createdAt);
    const itemYear = itemDate.getFullYear();

    return itemYear === currentYear;
  });
  return (
    <div className="p-6">
      <DashCard
        farmerData={farmerData}
        plotSaleData={plotSaleData}
        totalPlotArea={totalPlotArea}
        totalPlotEarn={totalPlotEarnLastMonth}
        totalLandArea={totalLandArea}
        filteredResults={filteredResults}
        leftAmount={leftAmount}
        count={count}
        percentageIncrease={percentageIncrease}
      />
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 pt-4">
        <div className="flex flex-col">
          <h2 className="text-center text-xl font-mono font-bold">
            Farmer Land Yearly Graph
          </h2>
          <PlotDataChart plotSaleData={currentYearData} />
        </div>
        <div>
          <div className="flex flex-col">
            <h2 className="text-center text-xl font-mono font-bold">
              Plot Sell Yearly Graph
            </h2>
            <PlotSellGraph plotSaleData={currentYearPlotSellData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainEntry;
