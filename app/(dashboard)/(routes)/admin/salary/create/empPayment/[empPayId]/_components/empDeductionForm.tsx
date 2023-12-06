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

interface SalaryFormProps {
  initialData: string;
  salId: string;
  empId: string;
}

const formSchema = z.object({
  deduction: z.string().min(1, {
    message: "Deduction Amount must be at least 1 characters long",
  }),
  deductionDate: z.string().min(1, {
    message: " Deduction Date must be at least 1 characters long",
  }),
});

export const EmpDeductionForm = ({
  initialData,
  empId,
  salId,
}: SalaryFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deductionDate: initialData.deductionDate,
      deduction: initialData.deduction,
    },
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const parseDeduction = parseFloat(values.deduction);
      const FormattedDeductionDate = new Date(
        values.deductionDate
      ).toISOString();
      const { bonus, salary, deduction } = initialData;
      const Salary = parseFloat(salary) || 0;
      const Bonus = parseFloat(bonus) || 0;
      const Deduction = parseFloat(values.deduction) || 0;

      const parseNetSalary = Salary + Bonus - Deduction;

      await axios.patch(`/api/salary/${empId}/employeePayment/${salId}`, {
        deduction: parseDeduction,
        deductionDate: FormattedDeductionDate,
        netSalary: parseNetSalary,
      });
      toast.success("deduction Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating deduction:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Deduction
        <div>
          {!initialData?.deduction ? (
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
          {initialData?.deduction ? (
            <div className="text-sm  flex gap-4 items-center w-full justify-between mt-2 pt-1">
              <p>&#8377; {initialData.deduction} </p>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <p>
                  {initialData?.deductionDate?.toISOString().substring(0, 10)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm mt-2">
              Add the deduction amount, if applicable.
            </p>
          )}
        </>
      ) : null}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3 ">
          <div className="flex flex-col gap-1 my-2 items-start">
            <h3>Amount</h3>
            <Input
              {...register("deduction")}
              type="number"
              size="sm"
              variant="flat"
              placeholder="Add deduction amount"
              defaultValue={initialData.deduction}
              color={formState.errors.deduction ? "danger" : "primary"}
              isInvalid={!!formState.errors.deduction}
              errorMessage={formState.errors.deduction?.message}
            />
          </div>
          <div className="flex flex-col gap-1 my-2 items-start">
            <h3>Date</h3>
            <Input
              {...register("deductionDate")}
              type="date"
              size="sm"
              variant="flat"
              placeholder="Add deductionDate"
              defaultValue={initialData.deductionDate
                ?.toISOString()
                .substring(0, 10)}
              color={formState.errors.deductionDate ? "danger" : "primary"}
              isInvalid={!!formState.errors.deductionDate}
              errorMessage={formState.errors.deductionDate?.message}
            />
          </div>

          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!initialData?.deduction ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
