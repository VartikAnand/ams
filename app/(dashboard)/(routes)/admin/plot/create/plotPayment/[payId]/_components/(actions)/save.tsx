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
  plotId,
  salId,
  employeeData,
  plotData,
}: SaveProps) => {
  const router = useRouter();

  const handleSave = async () => {
    try {
      await toast.promise(
        async () => {
          const response = await axios.post(
            `/api/user/${initialData.userUuid}`,
            {
              isPaymentTypeCredit: true,
              paymentFor: "Plot Selling",
              creditAmount: initialData.paidAmount,
              paymentFrom: initialData.paymentRecivedBy,
              ForToName: "Customer",
              payId: initialData.payId,
              paymentTo: plotData.customerName,
              isPaymentAdded: true,
              paymentType: "Credit",
              paymentMode: initialData.paymentMode,
              paymentModeId: initialData.paymentModeId,
              paymentModeInfo: initialData.paymentModeInfo,
            }
          );

          if (response) {
            const notificationDate = new Date(initialData.notiDate);
            const formattedDate = notificationDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            try {
              const notification = await axios.post(`/api/notification`, {
                isSent: true,
                notiDate: initialData.notiDate,
                notiTitle: "Plot Payment",
                notiDesc: `Reminder: the upcoming payment date on ${formattedDate} . Please ensure to reach out to the PLOT NO. : ${plotData.plotNumber}, ${plotData.customerName}  for the next payment as scheduled`,
                payId: initialData.payId,
              });
              router.push(`/admin/plot/view/${plotData.saleId}`);

              return { name: "Plot Payment ", status: "success" };
            } catch (error) {
              throw new Error("Error in adding employee salary");
            }
          } else {
            toast.error("Setting notification Failed !!");
          }
        },
        {
          loading: "Adding plot selling details...",
          success: (data) => `${data.name} added successfully`,
          error: "Error in adding plot selling details",
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
