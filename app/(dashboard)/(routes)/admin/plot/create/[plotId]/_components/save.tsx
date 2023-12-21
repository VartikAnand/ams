"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export const Save = ({ initialData, saleId, landData }) => {
  const router = useRouter();
  const onSubmit = async () => {
    try {
      const currentDate = new Date().toISOString();
      await axios.patch(`/api/plotSale/${saleId}`, {
        saleDate: currentDate,
        khasraNumber: landData?.khasraNumber,
      });
      toast.success("Plot Created Successfully");
      router.push("/admin/plot");
    } catch (error) {
      console.error("Error in creating Plot:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Button
        type="button" // Changed from "submit"
        color="primary"
        variant="flat"
        aria-label="save"
        onClick={onSubmit}
      >
        Save
      </Button>
    </div>
  );
};
