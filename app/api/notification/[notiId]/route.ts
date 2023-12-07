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

    const user = await db.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (user) {
      const notification = await db.notification.update({
        where: {
          notiId: notiId,
        },
        data: {
          ...values,
          readByUuid: user.uuid,
          readByName: `${user.firstName} ${user.lastName}`,
        },
      });

      return new NextResponse(JSON.stringify(notification), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new NextResponse("User not found", { status: 404 });
    }
  } catch (err) {
    console.error("Error in PATCH request:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
