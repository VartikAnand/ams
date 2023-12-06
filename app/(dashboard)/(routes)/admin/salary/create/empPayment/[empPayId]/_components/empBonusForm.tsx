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
  salId: string;
  empId: string;
}

const formSchema = z.object({
  bonus: z.string().min(1, {
    message: " bonus must be at least 1 characters long",
  }),
  bonusDate: z.string().min(1, {
    message: "bonusDate must be at least 1 characters long",
  }),
});

export const EmpBonusForm = ({ initialData, empId, salId }: bonusFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bonusDate: initialData.bonusDate,
      bonus: initialData.bonus,
    },
  });

  const { handleSubmit, register, formState } = form;

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const parseBonus = parseFloat(values.bonus);
      const formattedBonusDate = new Date(values.bonusDate).toISOString();
      const { bonus, salary, deduction } = initialData;
      const Salary = parseFloat(salary) || 0;
      const Bonus = parseFloat(values.bonus) || 0;
      const Deduction = parseFloat(deduction) || 0;

      const parseNetSalary = Salary + Bonus - Deduction;

      await axios.patch(`/api/salary/${empId}/employeePayment/${salId}`, {
        bonus: parseBonus,
        bonusDate: formattedBonusDate,
        netSalary: parseNetSalary,
      });
      toast.success("bonus Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating  bonus:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Bonus
        <div>
          {!initialData?.bonus ? (
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
          {initialData?.bonus ? (
            <div className="text-sm flex gap-4 items-center  py-2 w-full justify-between mt-2 pt-1">
              <p>&#8377; {initialData.bonus} </p>
              <div className="flex items-center gap-1 mt-1">
                <CalendarDays className="h-4 w-4" />
                <p>{initialData?.bonusDate?.toISOString().substring(0, 10)}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm mt-2  py-3 ">
              Add bonus amount,if applicable.{" "}
            </p>
          )}
        </>
      ) : null}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <div className="flex flex-col gap-1 my-2 items-start">
            <h3>Amount</h3>
            <Input
              {...register("bonus")}
              type="number"
              size="sm"
              variant="flat"
              placeholder="Add bonus amount"
              defaultValue={initialData.bonus}
              color={formState.errors.bonus ? "danger" : "primary"}
              isInvalid={!!formState.errors.bonus}
              errorMessage={formState.errors.bonus?.message}
            />
          </div>
          <div className="flex flex-col gap-1 my-2 items-start">
            <h3>Date</h3>
            <Input
              {...register("bonusDate")}
              type="date"
              size="sm"
              variant="flat"
              placeholder="Add Bonus Date"
              defaultValue={initialData.bonusDate
                ?.toISOString()
                .substring(0, 10)}
              color={formState.errors.bonusDate ? "danger" : "primary"}
              isInvalid={!!formState.errors.bonusDate}
              errorMessage={formState.errors.bonusDate?.message}
            />
          </div>

          <Button type="submit" color="primary" variant="flat" className="mt-4">
            {!initialData?.bonus ? "Add" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};
