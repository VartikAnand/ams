"use client";
import React from "react";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

export const LandCard = ({
  count,
  title,
  totalNoOfEntry,
  overViewCount,
  totalEarnLastMonth,
}) => {
  // Add Symbol Based on Title
  const formattedNumber = Number(totalNoOfEntry).toLocaleString("en-US");
  const hasKeywords =
    title.includes("Area") ||
    title.includes("Sold") ||
    title.includes("Remaining");
  const hasPaymentKeyword = title === "Active Payments";
  let displayValue = formattedNumber;
  if (hasKeywords) {
    displayValue = `${formattedNumber} m²`;
  }
  if (hasPaymentKeyword) {
    displayValue = `₹${formattedNumber}`;
  }
  return (
    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
      <CardHeader>
        <b>{title}</b>
      </CardHeader>
      <CardBody className="overflow-visible px-4 gap-1">
        <div>{displayValue}</div>
        {title === "Active Payments" ? (
          <>
            <p className="text-xs text-primary-600">{`₹${totalEarnLastMonth}+`}</p>
          </>
        ) : (
          <></>
        )}
      </CardBody>

      <CardFooter className="text-small justify-between">
        <div>
          {title === "Active Payments" ? (
            <div className="text-xs text-primary-600">
              ₹{overViewCount}% from last month
            </div>
          ) : (
            <div
              className={
                typeof overViewCount === "string" &&
                overViewCount.startsWith("+")
                  ? "text-xs text-primary-600"
                  : typeof overViewCount === "string" &&
                    overViewCount.startsWith("-")
                  ? "text-xs text-danger"
                  : "text-xs text-primary-600"
              }
            >
              {overViewCount}% from last month
            </div>
          )}
        </div>

        <div className="text-default-500">{count}</div>
      </CardFooter>
    </Card>
  );
};
