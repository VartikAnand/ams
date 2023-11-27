import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const values = await req.json();
    const parsedBaseSalary = parseInt(values.baseSalary);
    const joiningDate = new Date(values.joiningDate).toISOString();
    const response = await db.employee.create({
      data: {
        department: values.department,
        baseSalary: parsedBaseSalary,
        joiningDate: joiningDate,
        payrollType: values.payrollType,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Employee] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
