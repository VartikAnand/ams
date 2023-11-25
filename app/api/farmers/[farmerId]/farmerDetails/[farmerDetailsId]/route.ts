import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { farmerDetailsId: string; farmerId: string } }
) {
  try {
    const { userId } = auth();
    const { farmerDetailsId, farmerId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedFarmerDetails = await db.farmerDetails.update({
      where: {
        id: farmerDetailsId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedFarmerDetails);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
