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

interface AddressPageFormProps {
  initialData: {
    khasraNumber: string;
    EmployeeDetails: {
      id: string;
      fName: string;
      lName: string;
    };
  };
  empId: {
    empId: string;
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

export const AddressForm = ({ empId, initialData }: AddressPageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const [isEmployeeDetails, setIsEmployeeDetails] = useState(
    initialData.employeeDetails || null
  );
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const parsePinCode = parseInt(values.pinCode, 10);

      if (isNaN(parsePinCode)) {
        throw new Error("Invalid pinCode. Please enter a valid number.");
      }

      await axios.patch(
        `/api/salary/${initialData.empId}/employeeDetails/${initialData?.employeeDetails.empDetailId}`,
        {
          address: values.address,
          city: values.city,
          state: values.state,
          pinCode: parsePinCode,
        }
      );

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { name: "Farmer", status: "success" };
        },
        {
          loading: "Adding Farmer Address...",
          success: (data) => `${data.name} Address  Added Successfully`,
          error: "Error Adding Farmer Address ",
        }
      );
      toggleEdit();
    } catch (error) {
      console.error("Error updating Address:", error);
      toast.error("Something went wrong");
    }
    router.refresh();
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Farmer Address
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
          {initialData?.employeeDetails?.address &&
          initialData?.employeeDetails?.state &&
          initialData?.employeeDetails?.city &&
          initialData?.employeeDetails?.pinCode ? (
            <>
              {initialData?.employeeDetails?.address}
              <br />
              {initialData?.employeeDetails?.city},{" "}
              {initialData?.employeeDetails?.state} -{" "}
              {initialData?.employeeDetails?.pinCode}
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
                defaultValue={initialData?.employeeDetails?.address || ""}
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
                    defaultValue={initialData?.employeeDetails?.city || ""}
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
                    defaultValue={
                      initialData?.employeeDetails?.state || "No data"
                    }
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
                  defaultValue={initialData?.employeeDetails.pinCode || ""}
                  color={formState.errors.pinCode ? "danger" : "primary"}
                  isInvalid={!!formState.errors.pinCode}
                  errorMessage={formState.errors.pinCode?.message}
                />
              </div>
            </div>
          </div>
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!isEmployeeDetails.address ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
