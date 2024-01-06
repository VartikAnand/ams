import React from "react";
import { UserTable } from "./_components/userTable";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { UsersAccountTable } from "./_components/usersAccountTable";
import PlotDataChart from "./_components/graph";
import { Image } from "@nextui-org/react";

const User = async () => {
  const { userId } = auth();

  const user = await db.user.findUnique({
    where: {
      userId: userId,
    },

    include: {
      userAccounts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Image
          width={400}
          height={400}
          alt="NextUI hero Image"
          src="/wait.gif"
        />
        <h1 className="font-bold text-lg font-mono">
          Oops You Are Not a Member
        </h1>{" "}
      </div>
    );
  }
  return (
    <div>
      <UsersAccountTable
        userId={user?.uuid}
        userData={user}
        initialData={user?.userAccounts}
      />
      <PlotDataChart plotSaleData={user?.userAccounts} />
    </div>
  );
};

export default User;
