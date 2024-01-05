import { FarmerTable } from "./_components/farmerTable";
import { db } from "@/lib/db";
import { SalaryTable } from "./_components/salaryTable";

const Salary = async () => {
  const salary = await db.employee.findMany({
    orderBy: {
      createdAt: "desc",
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
  return (
    <div>
      <SalaryTable empId={salary} initialData={salary} />
    </div>
  );
};

export default Salary;
