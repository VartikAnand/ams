import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { payId: string; farmerId: string } }
) {
  try {
    const { userId } = auth();
    const { payId, farmerId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userUuid } = values;

    if (userUuid) {
      const res = await db.user.findUnique({
        where: {
          uuid: userUuid,
        },
      });

      const farmerPayments = await db.farmerPayment.update({
        where: {
          payId: payId,
        },
        data: {
          ...values,
          paymentGivenBy: `${res.firstName} ${res.lastName}`,
        },
      });
      return NextResponse.json(farmerPayments);
    } else {
      const farmerPayments = await db.farmerPayment.update({
        where: {
          payId: payId,
        },
        data: {
          ...values,
        },
      });
      return NextResponse.json(farmerPayments);
    }
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { payId: string; farmerId: string } }
) {
  try {
    const { userId } = auth();
    const { payId, farmerId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const fetchUserAccountPayData = await db.userAccount.findUnique({
      where: {
        payId: payId,
      },
    });
    if (fetchUserAccountPayData) {
      await db.userAccount.delete({
        where: {
          payId: payId,
        },
      });

      const farmer = await db.farmerPayment.delete({
        where: {
          payId: payId,
        },
      });

      return NextResponse.json(farmer);
    } else {
      const farmer = await db.farmerPayment.delete({
        where: {
          payId: payId,
        },
      });

      return NextResponse.json(farmer);
    }
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
