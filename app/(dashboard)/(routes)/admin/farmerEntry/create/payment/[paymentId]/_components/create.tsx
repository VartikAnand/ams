import React from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Particular } from "./particular";
import { Button } from "@nextui-org/react";
import { PaidAmount } from "./paidAmount";
import { TotalAmount } from "./totalAmount";
import LeftAmount from "./leftAmount";
import { Note } from "./note";
import { CreatePaymentBy } from "./createPaymentBy";
import { Save } from "./(actions)/save";
import { PaymentMethod } from "./paymentMethod";

interface CreatePaymentProps {
  farmerId: string;
  payId: string;
  initialData: string;
}

const Create = async ({ farmerId, payId, initialData }: CreatePaymentProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const farmer = await db.farmer.findUnique({
    where: {
      id: farmerId,
    },
    include: {
      farmerDetails: true,
      farmerPayments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const userData = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!farmer) {
    return redirect("/dashboard");
  }

  const Length = farmer.farmerPayments.length;
  const requiredFields = [
    farmer.farmerPayments[0].payId,
    farmer.farmerPayments[0].particular,

    farmer.farmerPayments[0].paidAmount,
    farmer.farmerPayments[0].userUuid,
    farmer.farmerPayments[0].isPaymentAdded,
  ];

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Land Details Field&apos;s</h1>
          <span className="text-sm text-slate-500">
            Complete all fields {completionText}
          </span>
        </div>
        <div className="flex flex-row gap-y-2 gap-2">
          {completedFields === totalFields ? (
            <Save farmer={farmer} farmerPaymentId={farmer.farmerPayments[0]} />
          ) : (
            <Button
              isDisabled
              variant="ghost"
              color="primary"
              aria-label="save"
            >
              Save
            </Button>
          )}

          {/* DELETE Payment  */}

          <Button variant="flat" color="danger" aria-label="save">
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          {/* particular */}

          <Particular
            farmerId={farmerId}
            payId={payId}
            initialData={initialData}
          />
          {/* PaidAmount  */}
          <PaidAmount
            farmerId={farmerId}
            farmer={farmer}
            payId={payId}
            initialData={initialData}
          />

          {/* Notes */}

          <Note farmerId={farmerId} payId={payId} initialData={initialData} />
        </div>
        <div className="lg:mt-6">
          {/* Total Amount */}
          <TotalAmount totalLandCost={farmer?.totalLandCost} />
          {/* Left Amount */}
          <LeftAmount farmerId={farmerId} farmer={farmer} />
          {/* Create Payment By */}
          <CreatePaymentBy
            farmerId={farmerId}
            farmerUser={userData}
            initialData={initialData}
          />
          {/* Payment Method */}
          <PaymentMethod
            farmerId={farmerId}
            payId={payId}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
