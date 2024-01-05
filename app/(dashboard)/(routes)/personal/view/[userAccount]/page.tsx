import React from "react";
import { db } from "@/lib/db";
import { UsersAccountTable } from "../_components/usersAccountTable";

const UsersAccount = async ({
  params,
}: {
  params: { userAccount: string };
}) => {
  const user = await db.user.findUnique({
    where: {
      uuid: params.userAccount,
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
      <UsersAccountTable
        userId={user.uuid}
        userData={user}
        initialData={user?.userAccounts}
      />
    </div>
  );
};

export default UsersAccount;
