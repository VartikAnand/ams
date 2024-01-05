import React from "react";
import { db } from "/lib/db";
import { CreateSalary } from "./_components/createSalary";
import CreatePayment from "./_components/createPayment";

const PayId = async ({ params }: { params: { payId: string } }) => {
  const plotPaymentData = await db.plotPayemnt.findUnique({
    where: {
      payId: params.payId,
    },
  });

  if (!plotPaymentData) {
    return redirect("/dashboard");
  }
  const user = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const plotData = await db.plotSale.findUnique({
    where: {
      saleId: plotPaymentData.plotPayId,
    },
    include: {
      plotPayemnts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const Length = plotPaymentData.length;
  const requiredFields = [
    plotPaymentData.payId,
    plotPaymentData.tottalAmount,
    plotPaymentData.paidAmount,
    plotPaymentData.particular,
    plotPaymentData.paymentRecivedBy,
    plotPaymentData.userUuid,
    plotPaymentData.paymentType,
    plotPaymentData.paymentMode,
  ];

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;
  const plotPayments = plotData.plotPayemnts || [];

  const totalPaidAmount = plotPayments.reduce((total, payment) => {
    const paidAmount = payment.paidAmount || 0;
    return total + parseFloat(paidAmount);
  }, 0);
  return (
    <CreatePayment
      initialData={plotPaymentData}
      completionText={completionText}
      completedFields={completedFields}
      totalFields={totalFields}
      userData={user}
      totalPaidAmount={totalPaidAmount}
      plotData={plotData}
    />
  );
};

export default PayId;
