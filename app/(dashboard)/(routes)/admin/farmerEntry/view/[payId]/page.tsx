import React from "react";
import { db } from "@/lib/db";
import { PaymentTable } from "../_components/paymentTable";

const PayId = async ({ params }: { params: { payId: string } }) => {
  const farmer = await db.farmer.findUnique({
    where: {
      id: params.payId,
    },

    include: {
      farmerPayments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div>
      <PaymentTable
        farmerId={farmer.id}
        farmerData={farmer}
        initialData={farmer?.farmerPayments}
      />
    </div>
  );
};

export default PayId;
