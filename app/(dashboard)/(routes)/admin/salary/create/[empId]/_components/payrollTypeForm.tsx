"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";

interface PayrollTypeFormProps {
  initialData: {
    payrollType: string;
  };
  farmerId: {
    empId: string;
  };
}

const formSchema = z.object({
  payrollType: z.string().min(3, {
    message: "Payroll must be at least 3 characters long",
  }),
});

const payroll = [
  { label: "Weekly", value: "1 Week" },
  { label: "Monthly", value: "1 Month" },
  { label: "Yearly", value: "1 Year" },
];

export const PayrollTypeForm = ({
  empId,
  initialData,
}: PayrollTypeFormProps) => {
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
        payrollType: values.payrollType,
      });
      toast.success("Payroll Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating Payroll:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Payroll Period
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

      {!isEditing && <p className="text-sm mt-2">{initialData.payrollType}</p>}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          <Select
            aria-label="payroll"
            size="sm"
            {...form.register("payrollType")}
            variant="bordered"
            color="primary"
            placeholder="Select Payroll Type"
          >
            {payroll.map((pay) => (
              <SelectItem key={pay.value} value={pay.value}>
                {pay.label}
              </SelectItem>
            ))}
          </Select>
          <Button type="submit" color="primary" variant="flat" className="mt-4">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
