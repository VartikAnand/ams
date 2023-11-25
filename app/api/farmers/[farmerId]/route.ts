import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
export async function PATCH(
  req: Request,
  { params }: { params: { farmerId: string } }
) {
  try {
    const { userId } = auth();
    const { farmerId } = params;
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const farmer = await db.farmer.update({
      where: {
        id: farmerId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(farmer);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { farmerId: string } }
) {
  try {
    const { userId } = auth();
    const { farmerId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const farmer = await db.farmer.delete({
      where: {
        id: farmerId,
      },
    });

    return NextResponse.json(farmer);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
