"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input, Textarea } from "@nextui-org/react";

interface AadhaarNumberFormProps {
  initialData: {
    khasraNumber: string;
    farmerDetails: {
      id: string;
      fName: string;
      lName: string;
    };
  };
  farmerId: {
    farmerId: string;
  };
}

const formSchema = z.object({
  aadharNumber: z
    .string()
    .min(12, {
      message: "Aadhaar Number is required",
    })
    .max(12, {
      message: "Aadhaar Number should be 12 characters including",
    }),
});

export const AadhaarNumberForm = ({
  farmerId,
  initialData,
}: AadhaarNumberForm) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const [isFarmerDetails, setIsFarmerDetails] = useState(initialData || null);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/plotSale/${saleId}`, {
        aadharNumber: values.aadharNumber,
      });

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Aadhaar Number", status: "success" };
        },
        {
          loading: "Adding Aadhaar Number...",
          success: (data) => `${data.name} Added Successfully`,
          error: "Error Adding Aadhaar Number",
        }
      );
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating Aadhaar Number:", error);
      toast.error("Something went wrong Try Again !");
    }
  };
  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Aadhaar Number
        <Button onClick={toggleEdit} color="primary" variant="flat">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 " /> Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData?.aadharNumber ? (
            <>{initialData.aadharNumber}</>
          ) : (
            "Aadhaar Number not available"
          )}
        </p>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3 ">
          <div className="flex flex-col sm:flex-row sm:gap-y-2 gap-2 justify-between w-full">
            {/* aadharNumber */}
            <div className=" flex flex-col  w-full gap-1 ">
              <div>
                <h3>Aadhaar Numberr</h3>
                <Input
                  {...register("aadharNumber")}
                  type="number"
                  size="sm"
                  isRequired
                  variant="flat"
                  defaultValue={initialData?.aadharNumber || ""}
                  color={formState.errors.aadharNumber ? "danger" : "primary"}
                  isInvalid={!!formState.errors.aadharNumber}
                  errorMessage={formState.errors.pinCode?.aadharNumber}
                />
              </div>
            </div>
          </div>
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!isFarmerDetails.aadhaarNumber ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
