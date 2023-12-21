"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PlusCircle, X, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input, Textarea } from "@nextui-org/react";

interface phoneNumberFormProps {
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
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number is required",
    })
    .max(10, {
      message: "Phone number should be 10 characters only including +91",
    }),
});

export const PhoneNumberForm = ({
  farmerId,
  initialData,
}: phoneNumberFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const [isFarmerDetails, setIsFarmerDetails] = useState(
    initialData.custommerPhoneNumber || null
  );
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const parsePhoneNumber = parseInt(values.phoneNumber);
    try {
      await axios.patch(`/api/plotSale/${farmerId}`, {
        custommerPhoneNumber: values.phoneNumber,
      });

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          return { name: "Phone Number", status: "success" };
        },
        {
          loading: "Updating Phone Number...",
          success: (data) => {
            return `${data.name} Updated Successfully`;
          },
          error: "Error updating Phone Number",
        }
      );

      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating Phone Number:", error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Contact Number
        <div>
          {!initialData?.custommerAddress ? (
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
      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData?.custommerPhoneNumber ? (
            <>{initialData?.custommerPhoneNumber}</>
          ) : (
            "Contact Number not available"
          )}
        </p>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3 ">
          <div className="flex flex-col sm:flex-row sm:gap-y-2 gap-2 justify-between w-full">
            {/* phoneNumber */}
            <div className=" flex flex-col  w-full gap-1 ">
              <div>
                <h3>Phone Number</h3>
                <Input
                  {...register("phoneNumber")}
                  type="number"
                  size="sm"
                  isRequired
                  variant="flat"
                  placeholder="+91 xxxx-xxxx-xx"
                  defaultValue={initialData?.custommerPhoneNumber || ""}
                  color={formState.errors.phoneNumber ? "danger" : "primary"}
                  isInvalid={!!formState.errors.phoneNumber}
                  errorMessage={formState.errors.pinCode?.phoneNumber}
                />
              </div>
            </div>
          </div>
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!isFarmerDetails?.customerPhoneNumber ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
