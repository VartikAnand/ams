import React from "react";
import { db } from "/lib/db";
import { CreateSalary } from "./_components/createSalary";

const EmpSal = async ({ params }: { params: { empPayId: string } }) => {
  const salaryData = await db.empSalary.findUnique({
    where: {
      salId: params.empPayId,
    },
  });
  console.log(salaryData);
  return (
    <CreateSalary
      empId={salaryData?.employeeId}
      salId={salaryData?.salId}
      initialData={salaryData}
    />
  );
};

export default EmpSal;
