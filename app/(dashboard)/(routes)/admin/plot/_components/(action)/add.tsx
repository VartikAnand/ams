"use client";
import React from "react";
import { toast } from "sonner";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import Link from "next/link";
interface userDataProps {
  userData: string;
}

export const Add = ({ userData }: userDataProps) => {
  const router = useRouter();

  return (
    <>
      <Link href="/admin/plot/create">
        <Button variant="flat" isIconOnly color="primary">
          <Plus />
        </Button>
      </Link>
    </>
  );
};
