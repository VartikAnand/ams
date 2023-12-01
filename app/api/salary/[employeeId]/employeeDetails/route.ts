import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const { firstName, lastName, employeeId } = await req.json();
    const response = await db.employeeDetail.create({
      data: {
        firstName,
        lastName,
        employeeId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[EMPLOYEE DETAILS] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
