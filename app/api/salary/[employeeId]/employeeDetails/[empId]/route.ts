import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { employeeId: string; empId: string } }
) {
  try {
    const { userId } = auth();
    const { empId, employeeId } = params;
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedFarmerDetails = await db.employeeDetail.update({
      where: {
        empDetailId: empId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedFarmerDetails);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
