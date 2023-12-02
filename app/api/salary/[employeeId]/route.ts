import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
export async function PATCH(
  req: Request,
  { params }: { params: { employeeId: string } }
) {
  try {
    const { userId } = auth();
    const { employeeId } = params;
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const employee = await db.employee.update({
      where: {
        empId: employeeId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(employee);
  } catch (err) {
    console.log("[EMP UPDATE : ]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { employeeId: string } }
) {
  try {
    const { userId } = auth();
    const { employeeId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const employee = await db.employee.delete({
      where: {
        empId: employeeId,
      },
    });

    return NextResponse.json(employee);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
