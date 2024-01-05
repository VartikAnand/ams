import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { saleId: string; payId: string } }
) {
  try {
    const { userId } = auth();
    const { saleId, payId } = params;
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

      const PlotPayment = await db.plotPayemnt.update({
        where: {
          payId: payId,
        },
        data: {
          ...values,
          paymentRecivedBy: `${res.firstName} ${res.lastName}`,
        },
      });
      return NextResponse.json(PlotPayment);
    } else {
      const PlotPayment = await db.plotPayemnt.update({
        where: {
          payId: payId,
        },
        data: {
          ...values,
        },
      });
      return NextResponse.json(PlotPayment);
    }
  } catch (err) {
    console.error(" PlotPayment :", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { saleId: string; payId: string } }
) {
  // { params }: { params: { employeeId: string; salId: string } }
  try {
    const { userId } = auth();
    const { saleId, payId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const fetchUserAccountPayData = await db.userAccount.findUnique({
      where: {
        payId: payId,
      },
    });

    const notificationCheck = await db.userAccount.findUnique({
      where: {
        payId: payId,
      },
    });
    if (fetchUserAccountPayData && notificationCheck) {
      await db.userAccount.delete({
        where: {
          payId: payId,
        },
      });
      await db.notification.delete({
        where: {
          payId: payId,
        },
      });
      const farmer = await db.plotPayemnt.delete({
        where: {
          payId: payId,
        },
      });

      return NextResponse.json(farmer);
    } else {
      const farmer = await db.plotPayemnt.delete({
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
