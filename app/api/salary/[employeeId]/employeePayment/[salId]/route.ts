import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { employeeId: string; salId: string } }
) {
  try {
    const { userId } = auth();
    const { salId, employeeId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userUuid } = values;

    if (userUuid) {
      const res = await db.user.findUnique({
        where: {
          uuid: userUuid,
        },
      });

      const empPayments = await db.empSalary.update({
        where: {
          salId: salId,
        },
        data: {
          ...values,
          paymentGivenBy: `${res.firstName} ${res.lastName}`,
        },
      });
      return NextResponse.json(empPayments);
    } else {
      const empSalary = await db.empSalary.update({
        where: {
          salId: salId,
        },
        data: {
          ...values,
        },
      });
      return NextResponse.json(empSalary);
    }
  } catch (err) {
    console.error(" empSalary :", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { employeeId: string; salId: string } }
) {
  try {
    const { userId } = auth();
    const { salId, employeeId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const fetchUserAccountPayData = await db.userAccount.findUnique({
      where: {
        payId: salId,
      },
    });
    if (fetchUserAccountPayData) {
      await db.userAccount.delete({
        where: {
          payId: salId,
        },
      });

      const farmer = await db.employee.delete({
        where: {
          empId: employeeId,
        },
      });

      return NextResponse.json(farmer);
    } else {
      const farmer = await db.employee.delete({
        where: {
          empId: employeeId,
        },
      });

      return NextResponse.json(farmer);
    }
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
