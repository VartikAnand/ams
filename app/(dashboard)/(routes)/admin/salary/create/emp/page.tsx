"use client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Textarea,
  Select,
  SelectItem,
  Selection,
  Button,
  Input,
} from "@nextui-org/react";
import Link from "next/link";

const formSchema = z.object({
  department: z
    .string()
    .min(3, "Department must be at least 3 characters long")
    .max(50),
  baseSalary: z
    .string()
    .min(1, "Base Salary must be at least 1 character long")
    .max(50),
  joiningDate: z
    .string()
    .refine(
      (value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
      "Please enter a valid date in the format YYYY-MM-DD for Joining Date"
    ),
  payrollType: z.string().min(3, "Payroll Type must be selected").max(50),
});

const payroll = [
  { label: "Weekly", value: "1 Week" },
  { label: "Monthly", value: "1 Month" },
  { label: "Yearly", value: "1 Year" },
];

const Emp = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: "",
      joiningDate: "",
      baseSalary: "",
      payrollType: "",
    },
  });

  const { handleSubmit, formState, reset } = form;
  const { isSubmitting, isValid, dirtyFields, errors } = formState;

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("/api/salary", { ...values });

      await toast.promise(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          return { name: "Employee", status: "success" };
        },
        {
          loading: "Adding Employee ...",
          success: (data) => `${data.name} Added Successfully`,
          error: "Error in Adding Land Employee",
        }
      );
      router.push(`/admin/salary/create/${response.data.empId}`);
      reset();
    } catch {
      toast.error("Try Again !");
    }
  };

  return (
    <div className="lg:max-w-3xl md:max-w-2xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <form
        className="flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full ">
          {/* Department */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Department</h1>
            <p className="text-default-400 text-xs ">
              Enter the employee department name [Cook, Servant, etc]
            </p>
            <Input
              {...form.register("department")}
              size="sm"
              type="text"
              label="Department Name"
              variant="flat"
              isRequired
              color={errors.department ? "danger" : "primary"}
              isInvalid={!!errors.department}
              errorMessage={errors.department?.message}
            />
          </div>
          {/* Base Salary */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Base Salary</h1>
            <p className="text-default-400 text-xs ">
              Enter the employee Base Salary [5,000, 10,000, etc]
            </p>
            <Input
              {...form.register("baseSalary")}
              type="text"
              label="Per Sq.&nbsp;m&sup2;"
              size="sm"
              isRequired
              variant="flat"
              color={errors.baseSalary ? "danger" : "primary"}
              isInvalid={!!errors.baseSalary}
              errorMessage={errors.baseSalary?.message}
            />
          </div>
          {/* Joining Date */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Joining Date</h1>{" "}
            <p className="text-default-400 text-xs ">
              Enter the employee Base Salary [DD-MM-YYYY]
            </p>
            <Input
              {...form.register("joiningDate")}
              type="date"
              size="sm"
              aria-label="date"
              isRequired
              variant="flat"
              color={errors.joiningDate ? "danger" : "primary"}
              isInvalid={!!errors.joiningDate}
              errorMessage={errors.joiningDate?.message}
            />
          </div>
          {/* Payroll Type */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Payroll Type</h1>
            <p className="text-default-400 text-xs ">
              Enter the employee Base Salary [weekly, monthly,yearly]
            </p>
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
          </div>
        </div>
        {/* Submit and Cancel Buttons */}
        <div className="flex gap-x-2 lg:justify-end lg:items-end justify-center items-center lg:py-5 py-2">
          <Link href="/">
            <Button color="primary" type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button
            variant="shadow"
            color="primary"
            className="cursor-pointer lg:w-28 w-full"
            type="submit"
            isDisabled={
              !isValid ||
              !Object.keys(dirtyFields).length ||
              isSubmitting ||
              !Object.values(formState.dirtyFields).every(Boolean) // Disable if any field is empty
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Emp;
