"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Textarea } from "@nextui-org/react";

interface CreateParticularProps {
  plotId: string;
  initialData: FarmerPayment[];
}

interface FarmerPayment {
  particular: string | null;
}

const formSchema = z.object({
  particular: z.string().min(3, {
    message: "Particular must be at least 3 characters long",
  }),
});

export const Particular = ({ initialData, plotId }: CreateParticularProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/plotSale/${plotId}/plotPayment/${initialData.payId}`,
        {
          particular: values.particular,
        }
      );
      toast.success("Particular Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating Particular:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Particular
        <div>
          {!initialData?.particular ? (
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
              {isEditing ? (
                <Button
                  isIconOnly
                  onClick={toggleEdit}
                  color="danger"
                  variant="flat"
                >
                  {" "}
                  <X className="h-4 w-4 " />{" "}
                </Button>
              ) : (
                <>
                  <Button
                    isIconOnly
                    onClick={toggleEdit}
                    color="primary"
                    variant="flat"
                  >
                    <Pencil className="h-4 w-4 " />
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        <>
          {initialData?.particular ? (
            <p className="text-sm mt-2">{initialData.particular}</p>
          ) : (
            <p className="text-sm mt-2">Add Particular Payment for.</p>
          )}
        </>
      ) : null}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Textarea
            {...register("particular")}
            type="text"
            size="sm"
            variant="flat"
            placeholder="Such as '' Brokage, Other expense etc..''  "
            defaultValue={initialData.particular}
            color={formState.errors.particular ? "danger" : "primary"}
            isInvalid={!!formState.errors.particular}
            errorMessage={formState.errors.particular?.message}
          />

          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!initialData?.particular ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
