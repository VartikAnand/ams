"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
interface FarmerDetailPageFormProps {
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
  fName: z.string().min(1, {
    message: "First name is required minimum of 1 characters",
  }),
  lName: z.string().min(1, {
    message: "Last name is required minimum of 1 characters",
  }),
});
export const CreateFarmerForm = ({
  farmerId,
  initialData,
}: farmerDetailPageFormProps) => {
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
    initialData.farmerDetails || null
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isFarmerDetails === null) {
        await axios.post(`/api/farmers/${farmerId}/farmerDetails`, {
          fName: values.fName,
          lName: values.lName,
          farmerDetailId: farmerId,
        });

        window.location.reload();
        await toast.promise(
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return { name: "Farmer", status: "success" };
          },
          {
            loading: "Adding Farmer...",
            success: (data) => `${data.name} Added Successfully`,
            error: "Error Adding Farmer",
          }
        );
      } else {
        await axios.patch(
          `/api/farmers/${farmerId}/farmerDetails/${initialData.farmerDetails.id}`,
          {
            fName: values.fName,
            lName: values.lName,
          }
        );

        await toast.promise(
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return { name: "Farmer", status: "success" };
          },
          {
            loading: "Updating Farmer Name...",
            success: (data) => `${data.name} Name Successfully`,
            error: "Error Updating Farmer Name",
          }
        );
      }

      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Farmer Name
        {isFarmerDetails === null ? (
          <>
            <Button onClick={toggleEdit} color="primary" variant="flat">
              {isEditing ? (
                <>Cancel</>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 " /> Add
                </>
              )}
            </Button>
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
      {isFarmerDetails === null ? (
        <p className="text-sm mt-2">Add Farmer Name to fill other details</p>
      ) : (
        <>
          {!isEditing && (
            <p className="text-sm mt-2">
              {initialData?.farmerDetails?.fName &&
              initialData?.farmerDetails?.lName
                ? `${initialData?.farmerDetails?.fName} ${initialData?.farmerDetails?.lName}`
                : "Name not available"}
            </p>
          )}
        </>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3 ">
          <div className="flex flex-col sm:flex-row sm:gap-y-2 gap-2 justify-between w-full">
            <div className=" flex flex-col  w-full gap-1 ">
              <h3>First Name</h3>
              <Input
                {...register("fName")}
                type="text"
                size="sm"
                isRequired
                variant="flat"
                placeholder={
                  isFarmerDetails === null ? "Enter first name" : undefined
                }
                defaultValue={initialData?.farmerDetails?.fName || ""}
                color={formState.errors.fName ? "danger" : "primary"}
                isInvalid={!!formState.errors.fName}
                errorMessage={formState.errors.fName?.message}
              />
            </div>
            <div className=" flex flex-col w-full gap-1 ">
              <h3>Last Name</h3>
              <Input
                {...register("lName")}
                type="text"
                size="sm"
                isRequired
                variant="flat"
                placeholder={
                  isFarmerDetails === null ? "Enter last name" : undefined
                }
                defaultValue={initialData?.farmerDetails?.lName || ""}
                color={formState.errors.lName ? "danger" : "primary"}
                isInvalid={!!formState.errors.lName}
                errorMessage={formState.errors.lName?.message}
              />
            </div>
          </div>
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!isFarmerDetails ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
