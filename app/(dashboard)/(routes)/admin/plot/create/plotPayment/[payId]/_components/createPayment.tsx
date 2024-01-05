import React from "react";
import { Button } from "@nextui-org/react";
import { X, Trash } from "lucide-react";
import { TotalAmount } from "./totalAmount";
import { PaidAmount } from "./paidAmount";
import { Particular } from "./particular";
import { LeftAmount } from "./leftAmount";
import { DocUrlForm } from "./docUrl";
import { PlotPayMadeBy } from "./payMadeBy";
import { PaymentMethod } from "./paymentMethod";
import { Save } from "./(actions)/save";
import { NotiDate } from "./notiDate";

interface PlotProps {
  plotData: string;
}

interface CreatePaymentProps {
  userData: string;
  initialData: string;
  totalFields: string;
  completedFields: string;
  completionText: string;
  plotData: string[];
  totalPaidAmount: number;
}

const CreatePayment = ({
  userData,
  initialData,
  totalFields,
  plotData,
  completedFields,
  completionText,
  totalPaidAmount,
}: createPaymentProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Plot Payment</h1>
          <span className="text-sm text-slate-500">
            Complete all fields {completionText}
          </span>
        </div>
        <div className="flex flex-row gap-y-2 gap-2">
          {completedFields === totalFields ? (
            <Save
              plotData={plotData}
              initialData={initialData}
              plotId={initialData.plotPayId}
            />
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

          <Button isIconOnly variant="flat" color="danger" aria-label="save">
            <Trash />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <Particular
            initialData={initialData}
            plotId={initialData.plotPayId}
          />
          <PaidAmount
            totalPaidAmount={totalPaidAmount}
            initialData={initialData}
            plotId={initialData.plotPayId}
          />
          <PlotPayMadeBy
            userData={userData}
            initialData={initialData}
            plotId={initialData.plotPayId}
          />
          <DocUrlForm
            initialData={initialData}
            plotId={initialData.plotPayId}
          />
        </div>
        <div>
          {" "}
          <TotalAmount initialData={initialData.tottalAmount} />
          <LeftAmount
            totalPaidAmount={totalPaidAmount}
            initialData={initialData}
          />
          <PaymentMethod
            userData={userData}
            initialData={initialData}
            payId={initialData.plotPayId}
          />
          <NotiDate initialData={initialData} payId={initialData.plotPayId} />
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;
