import React from "react";
import { db } from "/lib/db";
import Create from "./_components/create";

const PaymentId = async ({ params }: { params: { paymentId: string } }) => {
  const farmer = await db.farmerPayment.findUnique({
    where: {
      payId: params.paymentId,
    },
  });
  return (
    <Create
      farmerId={farmer?.farmerPayId}
      payId={farmer?.payId}
      initialData={farmer}
    />
  );
};

export default PaymentId;
