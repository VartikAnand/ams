import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Admin = () => {
  return (
    <div>
      <Link href="/admin/farmerEntry/create">
        <Button color="warning">Add Farmer</Button>
      </Link>
    </div>
  );
};

export default Admin;
