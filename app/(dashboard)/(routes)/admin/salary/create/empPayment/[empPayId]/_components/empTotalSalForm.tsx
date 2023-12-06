import React from "react";
import { Button } from "@nextui-org/react";
import { IndianRupee } from "lucide-react";
interface FormProps {
  initialData: string;
  salId: string;
  empId: string;
}

export const EmpTotalSalForm = async ({
  initialData,
  empId,
  salId,
}: FormProps) => {
  return (
    <div className="border mb-6 rounded-md p-6">
      <div className="font-medium flex items-center  justify-between">
        <div>
          <span className="flex">
            Net Salary<p className="text-danger">*</p>
          </span>
          <p className="text-sm mt-2">
            ₹ {initialData?.netSalary?.toLocaleString() || 0}
          </p>
        </div>
        <Button isDisabled isIconOnly color="danger" variant="light">
          <IndianRupee className="h-4 w-4 " />
        </Button>
      </div>
    </div>
  );
};
