import React from "react";
import { UserTable } from "./_components/userTable";
import { db } from "@/lib/db";

const Personal = async () => {
  const user = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      userAccounts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div>
      <UserTable userData={user} initialData={user} />
    </div>
  );
};

export default Personal;
