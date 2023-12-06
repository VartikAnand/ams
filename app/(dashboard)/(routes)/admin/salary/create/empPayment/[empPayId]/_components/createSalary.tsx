import React from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Particular } from "./particular";
import { Button } from "@nextui-org/react";
import { EmpSalForm } from "./empSalForm";
import { EmpBonusForm } from "./empBonusForm";
import { EmpBonusDateForm } from "./empBonusDateForm";
import { EmpDeductionForm } from "./empDeductionForm";
import { EmpTotalSalForm } from "./empTotalSalForm";
import { EmpSalMadeBy } from "./empSalMadeBy";
import { EmpPaymentMethod } from "./empPaymentMethod";
import { Save } from "./(actions)/save";
import { Delete } from "./(actions)/delete";

interface CreateSalaryProps {
  initialData: string;
  salId: string;
  empId: string;
  userData: string;
}
export const CreateSalary = async ({
  initialData,
  empId,
  salId,
  userData,
}: CreateSalaryProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }
  const employee = await db.employee.findUnique({
    where: {
      empId: empId,
    },
    include: {
      employeeDetails: true,
    },
  });

  const Length = Object.keys(initialData).length;
  const requiredFields = [
    initialData.salary,

    initialData.netSalary,
    initialData.userUuid,
    initialData.paymentType,
    initialData.paymentMode,
    initialData.paymentModeId,
    initialData.paymentModeInfo,
  ];
  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  console.log(completionText);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Employee Salary</h1>
          <span className="text-sm text-slate-500">
            Complete required fields {completionText}
          </span>
        </div>
        <div className="flex flex-row gap-y-2 gap-2">
          {completedFields === totalFields ? (
            <Save
              employeeData={employee}
              empId={empId}
              salId={salId}
              initialData={initialData}
            />
          ) : (
            <Button
              isDisabled
              variant="ghost"
              color="primary"
              aria-label="save"
            >
              Save
            </Button>
          )}

          {/* DELETE Payment  */}

          <Delete empId={empId} salId={salId} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          {/* eMP SALARY */}

          <EmpSalForm empId={empId} salId={salId} initialData={initialData} />
          {/* Bonus  */}
          <EmpBonusForm empId={empId} salId={salId} initialData={initialData} />
          {/* Deduction Date  */}

          <EmpDeductionForm
            empId={empId}
            salId={salId}
            initialData={initialData}
          />
        </div>
        <div className="lg:mt-6">
          <EmpTotalSalForm
            empId={empId}
            salId={salId}
            initialData={initialData}
          />
          {/* Salary Given By  */}
          <EmpSalMadeBy
            userData={userData}
            empId={empId}
            salId={salId}
            initialData={initialData}
          />
          <EmpPaymentMethod
            farmerId={empId}
            payId={salId}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
};
