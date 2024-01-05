import React from "react";
import { Button } from "@nextui-org/react";
import { IndianRupee } from "lucide-react";

export const LeftAmount = ({
  initialData,
  totalPaidAmount,
}: {
  initialData: string;
  totalPaidAmount: number;
}) => {
  const leftAmount = initialData.tottalAmount - totalPaidAmount;
  return (
    <div className="border mb-6 rounded-md p-6">
      <div className="font-medium flex items-center  justify-between">
        <div>
          Left Amount
          <p className="text-sm mt-2">₹ {leftAmount.toLocaleString()}</p>
        </div>
        <Button isDisabled isIconOnly color="danger" variant="light">
          <IndianRupee className="h-4 w-4 " />
        </Button>
      </div>
    </div>
  );
};
