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

interface plotNumberFormProps {
  initialData: {
    plotNumber: string;
  };
  saleId: {
    saleId: string;
  };
  landData: string[];
  plotData: string[];
}

const formSchema = z.object({
  plotNumber: z.string().min(1, {
    message: "khasra Number must be at least 1 number long",
  }),
});

export const PlotArea = ({
  saleId,
  initialData,
  landData,
  plotData,
}: plotNumberFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const totalPlotArea = plotData.reduce(
    (total, plot) => total + plot.plotArea,
    0
  );

  const leftLandArea = landData.totalArea - totalPlotArea;

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const parsedPlotNumber = parseInt(values.plotNumber);

    try {
      const proposedPlotArea = parsedPlotNumber; // Assuming 'parsedPlotNumber' represents area

      const totalPlotArea = plotData.reduce(
        (total, plot) => total + plot.plotArea,
        0
      );

      const leftLandArea = landData.totalArea - totalPlotArea;

      if (proposedPlotArea > leftLandArea) {
        // If proposed area exceeds available land, show a toast message
        toast.error("Plot area exceeds available land!");
      } else {
        // Proceed with updating the plot number
        await axios.patch(`/api/plotSale/${saleId}`, {
          plotArea: parsedPlotNumber,
        });
        toast.success("Plot Number Updated");
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating Plot Number:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Plot Area
        <div>
          {!initialData?.plotNumber ? (
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
          {initialData.plotArea
            ? `${initialData.plotArea} m²`
            : "Total Area m²"}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("plotNumber")}
            type="text"
            size="sm"
            variant="flat"
            defaultValue={initialData.plotArea}
            color={formState.errors.plotNumber ? "danger" : "primary"}
            isInvalid={!!formState.errors.plotNumber}
            errorMessage={formState.errors.plotNumber?.message}
          />
          <p className="text-xs text-default-600 mx-2">
            The plot area should not exceed the available land on the left.{" "}
          </p>

          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
