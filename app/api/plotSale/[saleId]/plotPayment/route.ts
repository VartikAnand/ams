import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await req.json();
    console.log(id);
    const response = await db.plotPayemnt.create({
      data: {
        userUuid: userId,
        plotPayId: id,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[PLOT PAYMENT] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
