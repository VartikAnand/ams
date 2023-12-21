"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";

interface plotPriceFormProps {
  initialData: {
    plotPrice: string;
  };
  saleId: {
    saleId: string;
  };
}

const formSchema = z.object({
  plotPrice: z.string().min(1, {
    message: "khasra Number must be at least 1 number long",
  }),
});

export const PlotPriceForm = ({ saleId, initialData }: plotPriceFormProps) => {
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
    const parsedPlotPrice = parseInt(values.plotPrice);

    try {
      await axios.patch(`/api/plotSale/${saleId}`, {
        plotPrice: parsedPlotPrice,
      });
      toast.success("Plot Price Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating  Plot Price:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Plot Price
        <div>
          {!initialData?.plotPrice ? (
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
          &#8377; {initialData.plotPrice || "Enter a  Plot Price for this plot"}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("plotPrice")}
            type="text"
            size="sm"
            variant="flat"
            defaultValue={initialData.plotPrice}
            color={formState.errors.plotPrice ? "danger" : "primary"}
            isInvalid={!!formState.errors.plotPrice}
            errorMessage={formState.errors.plotPrice?.message}
          />
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
