import React from "react";
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  Chip,
  Divider,
} from "@nextui-org/react";
import {
  BadgeIndianRupee,
  CheckCircle,
  BadgeAlert,
  Badge,
  Sparkles,
  ShieldMinus,
} from "lucide-react";

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

  const totalPaidAmount = initialData
    ?.filter((payment) => payment.netSalary !== null)
    .reduce((sum, payment) => sum + (payment.netSalary || 0), 0);

  const totalBonusAmount = initialData
    ?.filter((payment) => payment.bonus !== null)
    .reduce((sum, payment) => sum + (payment.bonus || 0), 0);

  const totalDeductionAmount = initialData
    ?.filter((payment) => payment.deduction !== null)
    .reduce((sum, payment) => sum + (payment.deduction || 0), 0);
  return (
    <div className="hidden  md:flex lg:flex w-full gap-2 justify-between">
      <Card
        isBlurred
        className="border-none flex flex-row justify-between items-center gap-2 px-4 pr-6 lg:px-10 bg-primary-600/10 dark:bg-primary-700/10   h-28 w-full "
        shadow="sm"
      >
        {/* Total Paid Card */}

        <div className="flex flex-row justify-center gap-2">
          <span className="flex gap-2 ">
            <BadgeIndianRupee className="text-primary-500 " />
          </span>

          <div className="flex flex-col gap-1">
            <h6 className="text-sm font-medium text-primary-500 ">
              Net Salary
            </h6>
            <div className="flex text-2xl text-default-500  items-center justify-center gap-1 font-semibold ">
              <span className="text-default-500 text-3xl">&#8377;</span>
              {formatArea(totalPaidAmount)}
            </div>
          </div>
        </div>
        <div className=" border-r-1 px-2 h-4/6 "></div>

        {/* Remaining Amount */}

        <div className="flex flex-row justify-center gap-2 ">
          <span className="flex gap-2 ">
            <Sparkles className="text-primary-500 " />
          </span>

          <div className="flex flex-col gap-1">
            <h6 className="text-sm font-medium text-primary-500 ">Bonus</h6>
            <div className="flex  text-default-500 text-2xl items-center justify-center gap-1 font-semibold ">
              <span className="text-default-500 text-3xl">&#8377;</span>
              {formatArea(totalBonusAmount)}
            </div>
          </div>
        </div>

        {/* Total Area */}

        <div className=" border-r-1 px-2 h-4/6 "></div>

        <div className="flex flex-row justify-center gap-2 ">
          <span className="flex gap-2 ">
            <ShieldMinus className="text-primary-500 " />
          </span>

          <div className="flex flex-col gap-1">
            <h6 className="text-sm font-medium text-primary-500 ">Deduction</h6>
            <div className="flex text-default-500  text-2xl items-center justify-center gap-1 font-semibold ">
              <span className="text-default-500 text-3xl">&#8377;</span>

              {formatArea(totalDeductionAmount)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
