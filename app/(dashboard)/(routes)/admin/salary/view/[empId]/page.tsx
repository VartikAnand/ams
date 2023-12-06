import React from "react";
import { db } from "@/lib/db";
import { EmpPaymentTable } from "./../_components/empPaymentTable";

const PayId = async ({ params }: { params: { empId: string } }) => {
  try {
    const employee = await db.employee.findUnique({
      where: {
        empId: params.empId,
      },
      include: {
        empSalary: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!employee) {
      return <div>Employee not found.</div>;
    }

    return (
      <div>
        <EmpPaymentTable
          farmerId={employee.empId}
          farmerData={employee}
          initialData={employee?.empSalary}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data. Please try again.</div>;
  }
};

export default PayId;
