import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const MainEntry = () => {
  return (
    <div className="p-6">
      <Link href="/admin/farmerEntry/create">
        <Button color="primary">Add Farmer</Button>
      </Link>
    </div>
  );
};

export default MainEntry;
