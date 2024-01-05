import React from "react";
import { db } from "/lib/db";
import { PlotTable } from "./_components/plotTable";

const Plot = async () => {
  const plotSale = await db.plotSale.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <PlotTable userData={plotSale} initialData={plotSale} />
    </div>
  );
};

export default Plot;
