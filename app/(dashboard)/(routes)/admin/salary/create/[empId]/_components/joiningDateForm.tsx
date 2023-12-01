"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";

interface JoiningDateFormProps {
  initialData: {
    joiningDate: Date;
  };
  empId: {
    empId: string;
  };
}

const formSchema = z.object({
  joiningDate: z.string().min(3, {
    message: "Joining date must be at least 3 characters long",
  }),
});

export const JoiningDateForm = ({
  empId,
  initialData,
}: JoiningDateFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      joiningDate: initialData.joiningDate.toISOString().substring(0, 10),
    },
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const joiningDate = new Date(values.joiningDate).toISOString();
      await axios.patch(`/api/salary/${empId}`, {
        joiningDate: joiningDate,
      });
      toast.success("Joining Date Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating joining date:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Joining Date
        <Button isIconOnly onClick={toggleEdit} color="primary" variant="flat">
          {isEditing ? <X /> : <Pencil className="h-4 w-4" />}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.joiningDate.toDateString()} {/* Render date as string */}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("joiningDate")}
            type="date"
            size="sm"
            variant="flat"
            defaultValue={initialData.joiningDate
              .toISOString()
              .substring(0, 10)}
            color={formState.errors.joiningDate ? "danger" : "primary"}
            isInvalid={!!formState.errors.joiningDate}
            errorMessage={formState.errors.joiningDate?.message}
          />
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
