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

    const plotData = await db.plotSale.findUnique({
      where: {
        saleId: id,
      },
    });

    if (plotData) {
      const response = await db.plotPayemnt.create({
        data: {
          plotPayId: id,
          tottalAmount: plotData.plotPrice,
        },
      });

      return NextResponse.json(response);
    } else {
      return new NextResponse("Internal Error", { status: 500 });
    }
  } catch (error) {
    console.error("[PLOT PAYMENT] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
