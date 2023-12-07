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
      const promise = async () => {
        // Use await inside the promise to ensure the response is available
        const response = await axios.post(
          `/api/salary/${userData.empId}/employeePayment`,
          {
            empId: userData.empId,
            salary: userData.baseSalary,
          }
        );
        return response; // resolve the promise with the response object
      };

      toast.promise(promise, {
        loading: "Loading...",
        success: (response) => {
          router.push(`/admin/salary/create/empPayment/${response.data.salId}`); // navigate after successful response
          return "Add employee payment";
        },
        error: (error) => {
          console.error("Error:", error);
          return "Error adding employee payment";
        },
      });
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
