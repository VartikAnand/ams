import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";

export async function POST(req) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const createUserParams = {
      emailAddress: [values.email],
      phoneNumber: [values.phoneNumber],
      username: values.userName,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };

    const createUser = await clerkClient.users.createUser(createUserParams);

    let response;

    if (createUser) {
      const {
        id,
        emailAddresses,
        firstName,
        lastName,
        username,
        phoneNumbers,
      } = createUser;

      response = await db.user.create({
        data: {
          userId: id,
          firstName,
          lastName,
          userName: username,
          phoneNumber:
            phoneNumbers && phoneNumbers.length > 0
              ? phoneNumbers[0].phoneNumber
              : "",
          email:
            emailAddresses && emailAddresses.length > 0
              ? emailAddresses[0].emailAddress
              : "",
        },
      });
    }

    if (response) {
      return NextResponse.json(response);
    } else {
      return new NextResponse("Error creating user or saving data", {
        status: 500,
      });
    }
  } catch (error) {
    console.error("[COURSES] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
