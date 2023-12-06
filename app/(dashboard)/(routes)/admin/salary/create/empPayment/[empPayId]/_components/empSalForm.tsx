"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";

interface SalaryFormProps {
  initialData: string;
  salId: string;
  empId: string;
}

const formSchema = z.object({
  salary: z.string().min(1, {
    message: " salary must be at least 1 characters long",
  }),
});

export const EmpSalForm = ({ initialData, empId, salId }: SalaryFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData.salary,
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const parseSalary = parseInt(values.salary);
      const { bonus, salary, deduction } = initialData;
      const Salary = parseFloat(values.salary) || 0;
      const Bonus = parseFloat(bonus) || 0;
      const Deduction = parseFloat(deduction) || 0;

      const parseNetSalary = Salary + Bonus - Deduction;

      console.log(parseNetSalary);
      await axios.patch(`/api/salary/${empId}/employeePayment/${salId}`, {
        salary: parseSalary,
        netSalary: parseNetSalary,
      });
      toast.success("Salary Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating  salary:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        <span className="flex">
          Salary<p className="text-danger">*</p>
        </span>
        <div>
          {!initialData?.salary ? (
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
          {initialData?.salary ? (
            <p className="text-sm mt-2"> &#8377; {initialData.salary}</p>
          ) : (
            <p className="text-sm mt-2">Oops go back and Try Agin !!</p>
          )}
        </>
      ) : null}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Input
            {...register("salary")}
            type="number"
            size="sm"
            variant="flat"
            placeholder=""
            defaultValue={initialData.salary}
            color={formState.errors.salary ? "danger" : "primary"}
            isInvalid={!!formState.errors.salary}
            errorMessage={formState.errors.salary?.message}
          />

          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!initialData?.salary ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
