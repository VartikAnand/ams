"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus, CalendarDays } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";

interface BonusFormProps {
  initialData: {
    paidAmount: string;
    payId: string;
    bonus?: string;
  };
  plotId: string;
  totalPaidAmount: number;
}

const formSchema = z.object({
  PaidAmount: z.string().min(1, {
    message: " bonus must be at least 1 characters long",
  }),
});

export const PaidAmount = ({
  initialData,
  plotId,
  totalPaidAmount,
}: bonusFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PaidAmount: initialData.paidAmount,
    },
  });

  const { handleSubmit, register, formState } = form;
  const leftAmount = initialData.tottalAmount - totalPaidAmount;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const parsePaidAmount = parseFloat(values.PaidAmount);

      if (parsePaidAmount > leftAmount) {
        toast.error("Enter Amount is more then the left amount");
        return; // Stop further execution
      }

      await axios.patch(
        `/api/plotSale/${plotId}/plotPayment/${initialData.payId}`,
        {
          paidAmount: parsePaidAmount,
        }
      );
      toast.success("Amount Added successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error Adding Amount:", error);
      toast.error("Something went wrong");
    }
  };

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
              <Button
                isIconOnly
                onClick={toggleEdit}
                color="primary"
                variant="flat"
              >
                {isEditing ? (
                  <X className="h-4 w-4 " />
                ) : (
                  <>
                    <Pencil className="h-4 w-4 " />
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
            <div className="text-sm flex gap-4 items-center  py-2 w-full justify-between mt-2 pt-1">
              <p>&#8377; {initialData.paidAmount.toLocaleString()} </p>
            </div>
          ) : (
            <p className="text-sm mt-2  py-3 ">Add Paid Amount. </p>
          )}
        </>
      ) : null}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <div className="flex flex-col gap-1 my-2 items-start">
            <Input
              {...register("PaidAmount")}
              type="number"
              size="sm"
              variant="flat"
              placeholder="Add paid amount"
              defaultValue={initialData.paidAmount}
              color={formState.errors.PaidAmount ? "danger" : "primary"}
              isInvalid={!!formState.errors.PaidAmount}
              errorMessage={formState.errors.PaidAmount?.message}
            />
          </div>

          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!initialData?.paidAmount ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
