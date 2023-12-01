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

interface BaseSalaryFormProps {
  initialData: {
    baseSalary: string;
  };
}

const formSchema = z.object({
  baseSalary: z.string().min(1, {
    message: "Per Sq. Cost must be at least 1 number long",
  }),
});

export const BaseSalaryForm = ({ empId, initialData }: BaseSalaryFormProps) => {
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
    const parsedBaseSalary = parseInt(values.baseSalary);

    try {
      await axios.patch(`/api/salary/${empId}`, {
        baseSalary: parsedBaseSalary,
      });
      toast.success("Base Salary  Updated");
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
        Base Salary
        <Button isIconOnly onClick={toggleEdit} color="primary" variant="flat">
          {isEditing ? (
            <>
              <X />
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 " />
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-sm mt-2">{initialData.baseSalary}</p>}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("baseSalary")}
            type="text"
            size="sm"
            variant="flat"
            defaultValue={initialData.baseSalary}
            color={formState.errors.baseSalary ? "danger" : "primary"}
            isInvalid={!!formState.errors.baseSalary}
            errorMessage={formState.errors.baseSalary?.message}
          />
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
