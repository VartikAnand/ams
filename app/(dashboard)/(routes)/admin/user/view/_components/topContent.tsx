"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  Chip,
  Divider,
} from "@nextui-org/react";
import { BadgeIndianRupee, CheckCircle, BadgeAlert, Badge } from "lucide-react";

export const TopContent = ({ initialData, userData }) => {
  function formatArea(number) {
    if (number >= 10000000 || number <= -10000000) {
      const absNumber = Math.abs(number);
      const formattedNumber = (absNumber / 10000000)
        .toFixed(1)
        .toLocaleString();
      return `${number < 0 ? "-" : ""}${formattedNumber} C`;
    } else if (number >= 100000 || number <= -100000) {
      const absNumber = Math.abs(number);
      const formattedNumber = (absNumber / 100000).toFixed(1).toLocaleString();
      return `${number < 0 ? "-" : ""}${formattedNumber} L`;
    } else {
      return number.toLocaleString();
    }
  }

  const totalPaidAmount = userData.userAccounts
    .filter((payment) => payment.debitAmount !== null)
    .reduce((sum, payment) => sum + (payment.debitAmount || 0), 0);

  const totalCreditAmount = userData.userAccounts
    .filter((payment) => payment.creditAmount !== null)
    .reduce((sum, payment) => sum + (payment.creditAmount || 0), 0);

  const balanceAmount = totalCreditAmount - totalPaidAmount;
  const [textColorClass, setTextColorClass] = useState(
    balanceAmount < 0 ? "text-danger" : "text-primary"
  );
  useEffect(() => {
    const colorClass = balanceAmount < 0 ? "text-red-500" : "text-green-500";
    setTextColorClass(colorClass);
  }, [balanceAmount]);
  return (
    <div className="sm:hidden md:flex lg:flex w-full gap-2 justify-between ">
      <Card
        isBlurred
        color="primary"
        className="border-none overflow-x-auto flex flex-row justify-between items-center gap-2 px-4 pr-6 lg:px-10 bg-primary-600 dark:bg-primary-700/10   h-28 w-full "
        shadow="sm"
      >
        {/* Balance */}

        <div className="flex flex-row justify-center gap-2">
          <span className="flex gap-2 ">
            <BadgeIndianRupee className="text-primary-500 " />
          </span>

          <div className="flex flex-col gap-1">
            <h6 className="text-sm font-medium text-primary-500 ">Balance</h6>
            <div className="flex text-2xl items-center justify-center gap-1 font-semibold">
              <span className="text-default-500 text-3xl">&#8377;</span>
              <p className={textColorClass}>{formatArea(balanceAmount)}</p>
            </div>
          </div>
        </div>
        <div className=" border-r-1 px-2 h-4/6 "></div>

        {/* Debit Amount */}

        <div className="flex flex-row justify-center gap-2 ">
          <span className="flex gap-2 ">
            <BadgeAlert className="text-primary-500 " />
          </span>

          <div className="flex flex-col gap-1">
            <h6 className="text-sm font-medium text-primary-500 ">Debit</h6>
            <div className="flex text-2xl items-center justify-center gap-1 font-semibold ">
              <span className="text-default-500 text-3xl">&#8377;</span>
              {formatArea(totalPaidAmount)}
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
            <h6 className="text-sm font-medium text-primary-500 ">Credit</h6>
            <div className="flex text-2xl items-center justify-center gap-1 font-semibold ">
              <span className="text-default-500 text-3xl">&#8377;</span>
              {formatArea(totalCreditAmount)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
