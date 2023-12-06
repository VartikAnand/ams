import React from "react";
import { db } from "/lib/db";
import { CreateSalary } from "./_components/createSalary";

const EmpSal = async ({ params }: { params: { empPayId: string } }) => {
  const salaryData = await db.empSalary.findUnique({
    where: {
      salId: params.empPayId,
    },
  });
  const user = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const employee = await db.employee.findUnique({
    where: {
      empId: salaryData.employeeId,
    },
  });
  console.log(employee);
  return (
    <CreateSalary
      empId={salaryData?.employeeId}
      salId={salaryData?.salId}
      initialData={salaryData}
      userData={user}
    />
  );
};

export default EmpSal;
