import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { notiId: string } }
) {
  try {
    const { userId } = auth();
    const { notiId } = params;

    if (!userId || !notiId) {
      return new NextResponse("Unauthorized or Invalid Notification ID", {
        status: 401,
      });
    }

    const values = await req.json();

    const notification = await db.notification.update({
      where: {
        notiId: notiId,
      },
      data: {
        ...values,
      },
    });

    return new NextResponse(notification);
  } catch (err) {
    console.error("NOTIFICATION ERROR", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
