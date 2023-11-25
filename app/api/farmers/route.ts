import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const { landTitle, landLocation, khasraNumber, totalArea, perSqCost } =
      await req.json();

    const parsedKhasraNumber = parseInt(khasraNumber);
    const parsedTotalArea = parseFloat(totalArea);
    const parsedPerSqCost = parseFloat(perSqCost);
    const parsedTotalLandCost = parsedTotalArea * parsedPerSqCost;
    const response = await db.farmer.create({
      data: {
        landTitle: landTitle,
        landLocation: landLocation,
        khasraNumber: parsedKhasraNumber,
        totalArea: parsedTotalArea,
        perSqCost: parsedPerSqCost,
        totalLandCost: parsedTotalLandCost,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[COURSES] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
