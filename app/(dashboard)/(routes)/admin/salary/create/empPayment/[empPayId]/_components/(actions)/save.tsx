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
          const currentDate = new Date();
          let upcomingDate = new Date();

          switch (employeeData.payrollType) {
            case "1 Week":
              upcomingDate.setDate(currentDate.getDate() + 7); // Add 7 days
              break;
            case "1 Month":
              upcomingDate.setMonth(currentDate.getMonth() + 1); // Add 1 month
              break;
            case "1 Year":
              upcomingDate.setFullYear(currentDate.getFullYear() + 1); // Add 1 year
              break;
            default:
              // Handle other cases if needed
              break;
          }
          try {
            const notification = await axios.post(`/api/notification`, {
              isSent: true,
              notiDate: upcomingDate,
              notiTitle: "Title",
              notiDesc: "Description",
              payId: response.payId,
            });
            router.push(`/admin/salary/view/${empId}`);

            return { name: "Employee salary", status: "success" };
          } catch (error) {
            throw new Error("Error in adding employee salary");
          }
        },
        {
          loading: "Adding employee salary...",
          success: (data) => `${data.name} added successfully`,
          error: "Error in adding employee salary",
        }
      );
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
