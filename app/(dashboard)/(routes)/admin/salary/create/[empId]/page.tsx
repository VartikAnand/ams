import React from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { Delete } from "./_components/delete";
import { WalletCards, User } from "lucide-react";
import { DepartmentForm } from "./_components/departmentForm";
import { BaseSalaryForm } from "./_components/baseSalaryForm";
import { PayrollTypeForm } from "./_components/payrollTypeForm";
import { JoiningDateForm } from "./_components/joiningDateForm";
import { EmployeeDetailsPage } from "./_components/employeeDetails";
const EmpId = async ({ params }: { params: { empId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }
  const employee = await db.employee.findUnique({
    where: {
      empId: params.empId,
    },
    include: {
      employeeDetails: true,
      empSalary: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!employee) {
    return redirect("/dashboard");
  }

  const requiredFields = [
    employee.department,
    employee.baseSalary,
    employee.joiningDate,
    employee.payrollType,

    employee.employeeDetails?.firstName,
    employee.employeeDetails?.lastName,
    employee.employeeDetails?.address,
    employee.employeeDetails?.city,
    employee.employeeDetails?.state,
    employee.employeeDetails?.pinCode,
    employee.employeeDetails?.phoneNumber,
    employee.employeeDetails?.aadhazrNumber,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;
  const [completedCount, totalCount] = completionText.split("/").map(Number);
  return (
    <div className="p-6">
      {/* LCustomize Employee Salary */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Employee Detail Field&apos;s</h1>
          <span className="text-sm text-slate-500">
            Complete all fields {completionText}
          </span>
        </div>
        <div className="flex flex-row gap-y-2 gap-2">
          {completedCount === totalCount ? (
            <Button variant="ghost" color="primary" aria-label="save">
              Save
            </Button>
          ) : (
            <Button
              isDisabled
              variant="flat"
              color="primary"
              aria-label="cancel"
            >
              Save
            </Button>
          )}

          {/* DELETE Employee  */}
          <Delete empId={employee.empId} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          {/*Customize Employee Salary */}
          <div className="flex items-center gap-x-2">
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              aria-label="Take a photo"
            >
              <WalletCards className="text-primary" />
            </Button>
            <h2 className="text-xl">Customize Employee Salary</h2>
          </div>
          {/* Department Form */}
          <DepartmentForm initialData={employee} empId={employee.empId} />
          {/* BaseSalaryForm Form */}
          <BaseSalaryForm initialData={employee} empId={employee.empId} />

          {/* PayrollTypeForm */}
          <PayrollTypeForm initialData={employee} empId={employee.empId} />
          {/* joiningDate */}

          <JoiningDateForm initialData={employee} empId={employee.empId} />
        </div>
        <div>
          {/* Add Employee Details */}
          <div className="flex items-center gap-x-2">
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              aria-label="Take a photo"
            >
              <User className="text-primary" />
            </Button>
            <h2 className="text-xl">Add Employee Details</h2>
          </div>

          <EmployeeDetailsPage initialData={employee} empId={employee.empId} />
        </div>
      </div>
    </div>
  );
};

export default EmpId;
