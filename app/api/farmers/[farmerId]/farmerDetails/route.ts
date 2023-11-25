import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const { fName, lName, farmerDetailId } = await req.json();
    const response = await db.farmerDetails.create({
      data: {
        fName,
        lName,
        farmerDetailId,
        // farmer: farmerDetailId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[FARMER] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
