"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";

interface totalLandCostFormProps {
  initialData: {
    totalLandCost: string;
  };
  farmerId: {
    farmerId: string;
  };
}

const formSchema = z.object({
  totalLandCost: z.string().min(1, {
    message: "Total Land Cost must be at least 1 number long",
  }),
});

export const TotalLandCostForm = ({
  farmerId,
  initialData,
}: totalLandCostFormProps) => {
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
    const parsedTotalLandCost = parseFloat(values.totalLandCost);

    try {
      await axios.patch(`/api/farmers/${farmerId}`, {
        totalLandCost: parsedTotalLandCost,
      });
      toast.success("Total Land Cost Cost Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating Total Land Cost", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Total Land Cost
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
        <p className="text-sm mt-2">{initialData.totalLandCost}</p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("totalLandCost")}
            type="text"
            size="sm"
            variant="flat"
            defaultValue={initialData.totalLandCost}
            color={formState.errors.totalLandCost ? "danger" : "primary"}
            isInvalid={!!formState.errors.totalLandCost}
            errorMessage={formState.errors.totalLandCost?.message}
          />
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
