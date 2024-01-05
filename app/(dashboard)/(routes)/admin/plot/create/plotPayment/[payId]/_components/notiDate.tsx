"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus, CalendarDays } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";

interface bonusFormProps {
  initialData: string;
  plotId: string;
}

const formSchema = z.object({
  bonusDate: z.string().min(1, {
    message: "bonusDate must be at least 1 characters long",
  }),
});

export const NotiDate = ({ initialData, plotId }: bonusFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bonusDate: initialData.notiDate,
    },
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedBonusDate = new Date(values.bonusDate).toISOString();

      await axios.patch(
        `/api/plotSale/${plotId}/plotPayment/${initialData.payId}`,
        {
          notiDate: formattedBonusDate,
        }
      );
      toast.success("Next Payment Added");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error in adding payment reminder:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Next Payment Notification
        <div>
          {!initialData?.notiDate ? (
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

      {!isEditing ? (
        <>
          {initialData?.notiDate ? (
            <div className="text-sm flex gap-4 items-center  py-2 w-full justify-between mt-2 pt-1">
              <div className="flex items-center gap-1 mt-1">
                <CalendarDays className="h-4 w-4" />
                <p>{initialData?.notiDate?.toISOString().substring(0, 10)}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm mt-2  py-3 ">
              Set the next payment reminder .
            </p>
          )}
        </>
      ) : null}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <div className="flex flex-col gap-1 my-2 items-start">
            <Input
              {...register("bonusDate")}
              type="date"
              size="sm"
              variant="flat"
              placeholder="Set next payment reminder date"
              defaultValue={initialData.notiDate
                ?.toISOString()
                .substring(0, 10)}
              color={formState.errors.bonusDate ? "danger" : "primary"}
              isInvalid={!!formState.errors.bonusDate}
              errorMessage={formState.errors.bonusDate?.message}
            />
          </div>

          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!initialData?.bonus ? "Set" : "Change"}
          </Button>
        </form>
      )}
    </div>
  );
};
