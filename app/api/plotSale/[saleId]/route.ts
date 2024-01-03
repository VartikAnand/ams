import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
export async function PATCH(
  req: Request,
  { params }: { params: { saleId: string } }
) {
  try {
    const { userId } = auth();
    const { saleId } = params;
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const plotSale = await db.plotSale.update({
      where: {
        saleId: saleId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(plotSale);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { saleId: string } }
) {
  try {
    const { userId } = auth();
    const { saleId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const plotSale = await db.plotSale.delete({
      where: {
        saleId: saleId,
      },
    });

    return NextResponse.json(plotSale);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
