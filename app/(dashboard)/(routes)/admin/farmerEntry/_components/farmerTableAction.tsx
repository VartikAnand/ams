"use client";
import React, { useState } from "react";

import { MoreVertical, Plus, Eye, FileEdit, Trash } from "lucide-react";
import { Link } from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

import {
  Dropdown,
  DropdownSection,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface userData {
  id: string;
  khasraNumber: string;
  landTitle: string;
}

interface FarmerTableActionProps {
  user: userData[];
}

export const FarmerTableAction = ({ user }: FarmerTableActionProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleItemClick = async (key: string) => {
    setLoading(true);

    try {
      if (key === "edit") {
        await router.push(`/admin/farmerEntry/create/${user?.id}`);
        const promise = () =>
          new Promise((resolve) => setTimeout(resolve, 1000));
        toast.promise(promise, {
          loading: "Loading...",
          success: "Record opened for editing.",
          error: "Error",
        });
      }
      //Add payment Create
      else if (key === "add") {
        try {
          const response = await axios.post(
            `/api/farmers/${user.id}/farmerPayment`,
            {
              id: user.id,
            }
          );
          const promise = () =>
            new Promise((resolve) => setTimeout(resolve, 1000));
          toast.promise(promise, {
            loading: "Loading...",
            success: "Add Farmer Payment here...",
            error: "Error",
          });

          router.push(
            `/admin/farmerEntry/create/payment/${response.data.payId}`
          );
        } catch (error) {
          console.error("Error:", error);
          toast.error(" Try Again !! Something went wrong");
        }
      }

      // vIEW rECORD
      else if (key === "View") {
        router.push(`/admin/farmerEntry/view/${user.id}`);
      } else {
        toast.error("Invalid Action");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" isIconOnly size="sm" variant="light">
          <MoreVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        color="primary"
        variant="flat"
        aria-label="Dropdown menu with description"
      >
        <DropdownSection
          showDivider
          title={`${user?.khasraNumber} - ${user?.landTitle}`}
        >
          <DropdownItem
            key="add"
            description="Allow you to view record"
            startContent={<Plus />}
            onClick={() => handleItemClick("add")}
          >
            Add
          </DropdownItem>
          <DropdownItem
            key="view"
            description="Add payment record"
            startContent={<FileEdit />}
            onClick={() => handleItemClick("View")}
          >
            View
          </DropdownItem>

          <DropdownItem
            key="edit"
            description="Allows you to edit "
            startContent={<Eye />}
            onClick={() => handleItemClick("edit")}
          >
            Edit
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the file"
            startContent={<Trash />}
            onClick={() => handleItemClick("delete")}
          >
            Delete
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
