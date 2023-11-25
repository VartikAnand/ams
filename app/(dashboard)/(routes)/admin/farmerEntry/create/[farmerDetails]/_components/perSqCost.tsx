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

interface perSqCostFormProps {
  initialData: {
    perSqCost: string;
  };
  farmerId: {
    farmerId: string;
  };
}

const formSchema = z.object({
  perSqCost: z.string().min(1, {
    message: "Per Sq. Cost must be at least 1 number long",
  }),
});

export const PerSqCostForm = ({
  farmerId,
  initialData,
}: perSqCostFormProps) => {
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
    const parsedPerSqCost = parseFloat(values.perSqCost);
    const TotalLandCost = parsedPerSqCost * initialData.totalArea;

    try {
      await axios.patch(`/api/farmers/${farmerId}`, {
        perSqCost: parsedPerSqCost,
        totalLandCost: TotalLandCost,
      });
      toast.success("Land per Sq. Cost Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating land per Sq. Cost:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Per &nbsp;m&sup2; Cost
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

      {!isEditing && <p className="text-sm mt-2">{initialData.perSqCost}</p>}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("perSqCost")}
            type="text"
            size="sm"
            variant="flat"
            defaultValue={initialData.perSqCost}
            color={formState.errors.perSqCost ? "danger" : "primary"}
            isInvalid={!!formState.errors.perSqCost}
            errorMessage={formState.errors.perSqCost?.message}
          />
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
