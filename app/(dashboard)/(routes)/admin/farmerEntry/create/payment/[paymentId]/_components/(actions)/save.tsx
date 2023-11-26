"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
interface SaveProps {
  farmerPaymentId: string;
  farmer: string;
}

export const Save = ({ farmerPaymentId, farmer }: SaveProps) => {
  const router = useRouter();
  const handleSave = async () => {
    try {
      const fromToData = `Kashar No.  ${farmer.khasraNumber} `;
      const payToName = `${farmer.farmerDetails.fName} ${farmer.farmerDetails.lName}`;
      const response = await axios.post(
        `/api/user/${farmerPaymentId.userUuid}`,
        {
          // userId: farmerPaymentId.userUuid,
          isPaymentTypeDebit: true,
          paymentFor: "Farmer",
          ForToName: fromToData,
          payId: farmerPaymentId.payId,
          debitAmount: farmerPaymentId.paidAmount,
          paymentFrom: farmerPaymentId.paymentGivenBy,
          paymentTo: payToName,
          isPaymentAdded: true,
          paymentType: farmerPaymentId.paymentType,
          paymentMode: farmerPaymentId.paymentMode,
          paymentModeId: farmerPaymentId.paymentModeId,
          paymentModeInfo: farmerPaymentId.paymentModeInfo,
        }
      );

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
      router.push(`/admin/farmerEntry/view/${farmerPaymentId.farmerPayId}`);
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
