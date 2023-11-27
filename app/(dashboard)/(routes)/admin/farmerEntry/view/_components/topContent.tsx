import React from "react";
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  Chip,
  Divider,
} from "@nextui-org/react";
import { BadgeIndianRupee, CheckCircle, BadgeAlert, Badge } from "lucide-react";

export const TopContent = ({ initialData, farmerData }) => {
  function formatArea(number) {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(1).toLocaleString() + " C";
    } else if (number >= 100000) {
      return (number / 100000).toFixed(1).toLocaleString() + " L";
    } else {
      return number?.toLocaleString();
    }
  }

  const totalPaidAmount = farmerData.farmerPayments
    .filter((payment) => payment.paidAmount !== null)
    .reduce((sum, payment) => sum + (payment.paidAmount || 0), 0);
  const leftAmount = farmerData.totalLandCost - totalPaidAmount;

  return (
    <div className="hidden  md:flex lg:flex w-full gap-2 justify-between">
      <Card
        isBlurred
        color="primary"
        className="border-none flex flex-row justify-between items-center gap-2 px-4 pr-6 lg:px-10 bg-primary-600 dark:bg-primary-700/10   h-28 w-full "
        shadow="sm"
      >
        {/* Total Paid Card */}

        <div className="flex flex-row justify-center gap-2">
          <span className="flex gap-2 ">
            <BadgeIndianRupee className="text-primary-500 " />
          </span>

          <div className="flex flex-col gap-1">
            <h6 className="text-sm font-medium text-primary-500 ">
              Total Paid
            </h6>
            <div className="flex text-2xl text-default-500  items-center justify-center gap-1 font-semibold ">
              <span className="text-default-500 text-3xl">&#8377;</span>
              {formatArea(farmerData.totalLandCost)}
            </div>
          </div>
        </div>
        <div className=" border-r-1 px-2 h-4/6 "></div>

        {/* Remaining Amount */}

        <div className="flex flex-row justify-center gap-2 ">
          <span className="flex gap-2 ">
            <BadgeAlert className="text-primary-500 " />
          </span>

          <div className="flex flex-col gap-1">
            <h6 className="text-sm font-medium text-primary-500 ">Remaining</h6>
            <div className="flex  text-default-500 text-2xl items-center justify-center gap-1 font-semibold ">
              <span className="text-default-500 text-3xl">&#8377;</span>
              {leftAmount}
            </div>
          </div>
        </div>

        {/* Total Area */}

        <div className=" border-r-1 px-2 h-4/6 "></div>

        <div className="flex flex-row justify-center gap-2 ">
          <span className="flex gap-2 ">
            <Badge className="text-primary-500 " />
          </span>

          <div className="flex flex-col gap-1">
            <h6 className="text-sm font-medium text-primary-500 ">
              Total Area
            </h6>
            <div className="flex text-default-500  text-2xl items-center justify-center gap-1 font-semibold ">
              <span className="text-default-500 text-3xl">&#8377;</span>
              {formatArea(farmerData.totalArea)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
