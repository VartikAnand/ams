import React from "react";
import { db } from "@/lib/db";
import { PlotAccountTable } from "../_components/plotAccountTable";

const PlotSales = async ({ params }: { params: { plotSaleId: string } }) => {
  const plot = await db.plotSale.findUnique({
    where: {
      saleId: params.plotSaleId,
    },

    include: {
      plotPayemnts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  console.log(plot);

  return (
    <div>
      <PlotAccountTable empId={plot} initialData={plot?.plotPayemnts} />
    </div>
  );
};

export default PlotSales;
