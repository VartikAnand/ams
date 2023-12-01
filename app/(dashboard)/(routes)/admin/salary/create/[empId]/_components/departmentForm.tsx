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

interface DepartmentFormProps {
  initialData: {
    department: string;
  };
  farmerId: {
    empId: string;
  };
}

const formSchema = z.object({
  department: z.string().min(3, {
    message: "Department must be at least 3 characters long",
  }),
});

export const DepartmentForm = ({ empId, initialData }: DepartmentFormProps) => {
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
      await axios.patch(`/api/salary/${empId}`, {
        department: values.department,
      });
      toast.success("Department Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating Department:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Department
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

      {!isEditing && <p className="text-sm mt-2">{initialData.department}</p>}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("department")}
            type="text"
            // label="Department"
            size="sm"
            variant="flat"
            defaultValue={initialData.department}
            color={formState.errors.department ? "danger" : "primary"}
            isInvalid={!!formState.errors.department}
            errorMessage={formState.errors.department?.message}
          />
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
