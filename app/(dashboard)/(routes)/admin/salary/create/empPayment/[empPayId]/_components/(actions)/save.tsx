"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
interface SaveProps {
  initialData: string;
  salId: string;
  empId: string;
  employeeData: string;
}

export const Save = ({
  initialData,
  empId,
  salId,
  employeeData,
}: SaveProps) => {
  const router = useRouter();

  const handleSave = async () => {
    try {
      const forToName = `${employeeData.department}`;
      const payToName = `${employeeData.employeeDetails.firstName} ${employeeData.employeeDetails.lastName}`;
      const response = await axios.post(`/api/user/${initialData.userUuid}`, {
        isPaymentTypeDebit: true,
        paymentFor: "Employee Salary",
        debitAmount: initialData.netSalary,
        paymentFrom: initialData.paymentGivenBy,

        ForToName: forToName,
        payId: salId,
        paymentTo: payToName,
        isPaymentAdded: true,
        paymentType: "Debit",
        paymentMode: initialData.paymentMode,
        paymentModeId: initialData.paymentModeId,
        paymentModeInfo: initialData.paymentModeInfo,
      });

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Land Detail's", status: "success" };
        },
        {
          loading: "Adding Land Detail ......",
          success: (data) => `${data.name} Added Fill Farmer Detail's`,
          error: "Error in  Adding Land Details",
        }
      );
      router.push(`/admin/salary/view/${salId}`);
    } catch {
      toast.error("Try Again! Something went wrong");
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        color="primary"
        aria-label="save"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
};
