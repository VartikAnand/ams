import React from "react";
import { Pin, IndianRupee } from "lucide-react";
import { Button } from "@nextui-org/react";
interface LeftAmountProps {
  farmer: {
    totalLandCost: number;
    farmerPayments: Array<{
      paidAmount: number | null;
    }>;
  };
}

const LeftAmount = ({ farmer }: LeftAmountProps) => {
  const totalPaidAmount = farmer.farmerPayments
    .filter((payment) => payment.paidAmount !== null)
    .reduce((sum, payment) => sum + (payment.paidAmount || 0), 0);

  const leftAmount = farmer.totalLandCost - totalPaidAmount;

  return (
    <div className="border rounded-md p-6">
      <div className="font-medium flex items-center  justify-between">
        <div>
          Remaining Amount
          <p className="text-sm mt-2">₹ {leftAmount}</p>
        </div>
        <Button isDisabled isIconOnly color="danger" variant="light">
          <IndianRupee className="h-4 w-4 " />
        </Button>
      </div>
    </div>
  );
};

export default LeftAmount;
