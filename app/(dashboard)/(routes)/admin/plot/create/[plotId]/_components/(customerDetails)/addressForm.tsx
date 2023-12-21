"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PlusCircle, Plus, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input, Textarea } from "@nextui-org/react";

interface AddressPageFormProps {
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
  address: z.string().min(5, {
    message: "Street address is required ",
  }),
  city: z.string().min(3, {
    message: "City name  is required",
  }),
  state: z.string().min(2, {
    message: "State name is required",
  }),
  pinCode: z.string().min(1, {
    message: "pincode is required",
  }),
});

export const AddressForm = ({
  farmerId,
  initialData,
}: AddressPageFormProps) => {
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
      const parsePinCode = parseInt(values.pinCode, 10);

      if (isNaN(parsePinCode)) {
        throw new Error("Invalid pinCode. Please enter a valid number.");
      }
      await axios.patch(`/api/plotSale/${farmerId}`, {
        custommerAddress: values.address,
        customerCity: values.city,
        customerState: values.state,
        customerPinCode: parsePinCode,
      });

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Customer", status: "success" };
        },
        {
          loading: "Adding Customer Address...",
          success: (data) => `${data.name} Address  Added Successfully`,
          error: "Error Adding Customer Address ",
        }
      );
      toggleEdit();
    } catch (error) {
      console.error("Error updating Customer Address:", error.message);
      toast.error("Something went wrong");
    }
    router.refresh();
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Customer Address
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
          {initialData?.custommerAddress &&
          initialData?.customerState &&
          initialData?.customerCity &&
          initialData?.customerPinCode ? (
            <>
              {initialData?.custommerAddress}
              <br />
              {initialData?.customerCity}, {initialData?.customerState} -{" "}
              {initialData?.customerPinCode}
            </>
          ) : (
            "Address not available"
          )}
        </p>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3 ">
          <div className="flex flex-col sm:flex-row sm:gap-y-2 gap-2 justify-between w-full">
            {/* Street Address */}
            <div className=" flex flex-col  w-full gap-1 ">
              <h3>Street Address</h3>
              <Textarea
                {...register("address")}
                type="text"
                size="sm"
                isRequired
                variant="flat"
                defaultValue={initialData?.custommerAddress || ""}
                color={formState.errors.address ? "danger" : "primary"}
                isInvalid={!!formState.errors.address}
                errorMessage={formState.errors.address?.message}
              />
              <div className=" flex flex-col lg:flex-row gap-y-2 w-full gap-1 ">
                {/* City NAME */}
                <div className="flex flex-col gap-2 w-full">
                  <h3>City</h3>
                  <Input
                    {...register("city")}
                    type="text"
                    size="sm"
                    isRequired
                    variant="flat"
                    defaultValue={initialData?.customerCity || ""}
                    color={formState.errors.city ? "danger" : "primary"}
                    isInvalid={!!formState.errors.city}
                    errorMessage={formState.errors.city?.message}
                  />
                </div>
                {/* State Name */}
                <div className="flex flex-col gap-2 w-full">
                  <h3>State</h3>
                  <Input
                    {...register("state")}
                    type="text"
                    size="sm"
                    isRequired
                    variant="flat"
                    defaultValue={initialData?.customerState}
                    color={formState.errors.state ? "danger" : "primary"}
                    isInvalid={!!formState.errors.state}
                    errorMessage={formState.errors.state?.message}
                  />
                </div>
              </div>

              {/* PINCODE */}
              <div>
                <h3>Pin Code</h3>
                <Input
                  {...register("pinCode")}
                  type="number"
                  size="sm"
                  isRequired
                  variant="flat"
                  defaultValue={initialData.customerPinCode || ""}
                  color={formState.errors.pinCode ? "danger" : "primary"}
                  isInvalid={!!formState.errors.pinCode}
                  errorMessage={formState.errors.pinCode?.message}
                />
              </div>
            </div>
          </div>
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!isFarmerDetails?.custommerAddress ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
