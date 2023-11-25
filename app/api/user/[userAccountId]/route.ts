import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";

export async function POST(
  req: Request,
  { params }: { params: { userAccountId: string } }
) {
  try {
    const values = await req.json();

    const response = await db.userAccount.create({
      data: {
        ...values,
        userId: params.userAccountId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[USER ACCOUNT] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userAccountId: string } }
) {
  try {
    const { userId } = auth();
    const { userAccountId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userData = await db.user.findUnique({
      where: { uuid: userAccountId },
    });

    if (userData) {
      const userDelete = await clerkClient.users.deleteUser(userData.userId);

      if (userDelete.deleted === true) {
        const user = await db.user.delete({
          where: {
            uuid: userAccountId,
          },
        });
        return NextResponse.json(user);
      } else {
        return new NextResponse("Internal Error", { status: 404 });
      }
    }
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
