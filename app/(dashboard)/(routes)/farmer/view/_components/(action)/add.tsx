"use client";
import React from "react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
interface userDataProps {
  userData: string;
}

export const Add = ({ userData }: userDataProps) => {
  const router = useRouter();
  const handlePaymentButtonClick = async () => {
    try {
      const response = await axios.post(
        `/api/farmers/${userData}/farmerPayment`,
        { id: userData }
      );

      const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));
      toast.promise(promise, {
        loading: "Loading...",
        success: "Adding Farmer Payment ",
        error: "Error",
      });
      router.push(`/admin/farmerEntry/create/payment/${response.data.payId}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Try Again !! Something went wrong");
    }
  };
  return (
    <Button
      onClick={handlePaymentButtonClick}
      variant="flat"
      isIconOnly
      color="primary"
    >
      <Plus />
    </Button>
  );
};
