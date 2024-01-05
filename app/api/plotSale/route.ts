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

    const farmerLand = await db.farmer.findUnique({
      where: {
        id: values.farmerLandId,
      },
    });

    if (farmerLand) {
      const response = await db.plotSale.create({
        data: {
          farmerLandId: values.farmerLandId,
          khasraNumber: farmerLand.khasraNumber,
        },
      });

      return NextResponse.json(response);
    } else {
      console.error("[Land Data Not Found ] Error:", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  } catch (error) {
    console.error("[PLOT SALE CREATE] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
