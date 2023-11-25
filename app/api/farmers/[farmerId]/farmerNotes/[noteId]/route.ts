import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth();
    const { noteId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const farmer = await db.farmerOtherNotes.delete({
      where: {
        id: noteId,
      },
    });

    return NextResponse.json(farmer);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
