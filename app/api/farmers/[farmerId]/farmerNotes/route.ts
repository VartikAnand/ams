import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const { notes, someUrl, farmerId } = await req.json();
    const response = await db.farmerOtherNotes.create({
      data: {
        notes,
        someUrl,
        noteId: farmerId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[FARMER NOTE] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
