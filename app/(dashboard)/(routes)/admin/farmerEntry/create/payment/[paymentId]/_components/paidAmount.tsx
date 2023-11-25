"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Textarea, Input } from "@nextui-org/react";

interface CreatePaidAmountProps {
  farmerId: string;
  farmer: FarmerData[];
  payId: string;
  initialData: Array<LeftAmountProps>;
}

interface FarmerPayment {
  paidAmount: string | null;
}

interface LeftAmountProps {
  farmer: {
    totalLandCost: number;
    farmerPayments: Array<FarmerPayment>;
  };
}

const formSchema = z.object({
  paidAmount: z.string().min(1, {
    message: "Paid Amount must be at least 3 characters long",
  }),
});

export const PaidAmount = ({
  farmerId,
  payId,
  initialData,
  farmer,
}: CreatePaidAmountProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;
  const totalPaidAmount = farmer.farmerPayments
    .filter((payment) => payment.paidAmount !== null)
    .reduce((sum, payment) => sum + (payment.paidAmount || 0), 0);

  const leftAmount = farmer.totalLandCost - totalPaidAmount;
  const remainingAmount = farmer.remainingAmount;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const parsedPaidAmount = parseFloat(values.paidAmount);

      const totalPaidAmount = farmer.farmerPayments
        .filter((payment) => payment.paidAmount !== null)
        .reduce(
          (sum, payment) => sum + (parseFloat(payment.paidAmount) || 0),
          0
        );

      const leftAmount = farmer.totalLandCost - totalPaidAmount;

      if (parsedPaidAmount > leftAmount) {
        toast.error(
          "Entered Paid Amount exceeds the remaining amount. Please enter a valid amount."
        );
        return;
      }

      await axios.patch(
        `/api/farmers/${farmerId}/farmerPayment/${initialData.payId}`,
        {
          paidAmount: parsedPaidAmount,
        }
      );

      toast.success("Paid Amount Updated");
      toggleEdit();
      router.refresh();

      const updatedTotalPaidAmount = totalPaidAmount + parsedPaidAmount;
      const updatedLeftAmount = farmer.totalLandCost - updatedTotalPaidAmount;

      const updatedRemainingAmount = remainingAmount + parsedPaidAmount;
      if (updatedRemainingAmount) {
        await axios.patch(`/api/farmers/${farmerId}`, {
          remainingAmount: updatedRemainingAmount,
        });
      }
      if (updatedLeftAmount === 0) {
        await axios.patch(`/api/farmers/${farmerId}`, {
          isPayment: true,
        });
        toast.success("Congratulations! Remaining amount is cleared.");
      }
    } catch (error) {
      console.error("Error updating Paid Amount", error);
      toast.error("Try Again !! Something went wrong");
    }
  };

  if (totalPaidAmount === farmer.farmerPayments) {
    toast.success("Paid Amount Completed");
  }

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Paid Amount
        <div>
          {!initialData?.paidAmount ? (
            <>
              {isEditing ? (
                <>
                  <Button
                    isIconOnly
                    onClick={toggleEdit}
                    color="danger"
                    variant="flat"
                  >
                    <X className="h-4 w-4 " />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    isIconOnly
                    onClick={toggleEdit}
                    color="primary"
                    variant="flat"
                  >
                    <Plus className="h-4 w-4 " />
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Button onClick={toggleEdit} color="primary" variant="flat">
                {isEditing ? (
                  <>Cancel</>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 " /> Edit
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        <>
          {initialData?.paidAmount ? (
            <p className="text-sm mt-2">₹ {initialData.paidAmount}</p>
          ) : (
            <p className="text-sm mt-2">
              Add the ₹ amount paid to the farmer to continue...
            </p>
          )}
        </>
      ) : null}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("paidAmount")}
            type="number"
            size="sm"
            variant="flat"
            placeholder="Enter ₹ Amount for ex. '' 15k , 80k etc.. ''  "
            defaultValue={initialData.paidAmount}
            color={formState.errors.paidAmount ? "danger" : "primary"}
            isInvalid={!!formState.errors.paidAmount}
            errorMessage={formState.errors.paidAmount?.message}
          />

          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!initialData?.paidAmount ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
