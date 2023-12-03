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

    const response = await db.empSalary.create({
      data: {
        employeeId: values.empId,
        salary: values.salary,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Employee Salary] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
