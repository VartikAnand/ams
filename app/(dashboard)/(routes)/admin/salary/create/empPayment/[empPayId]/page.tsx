import React from "react";
import { db } from "/lib/db";

const EmpSal = async ({ params }: { params: { empPayId: string } }) => {
  const salaryData = await db.empSalary.findUnique({
    where: {
      salId: params.empPayId,
    },
  });
  console.log(salaryData);
  return (
    <div>Emp sal</div>
    // <Create
    //   farmerId={farmer?.farmerPayId}
    //   payId={farmer?.payId}
    //   initialData={farmer}
    // />
  );
};

export default EmpSal;
