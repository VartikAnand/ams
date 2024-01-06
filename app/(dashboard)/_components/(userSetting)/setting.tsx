"use client";
import { SignOutButton, useAuth, UserProfile } from "@clerk/nextjs";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { UserCog } from "lucide-react";
import { useRouter } from "next/navigation";

const UserSetting = () => {
  const { sessionId } = useAuth();
  const router = useRouter();

  const handleItemClick = (key) => {
    if (key === "1") {
      router.push("/profile");
    } else if (key === "2") {
      router.push("/admin/addAdmin");
    }
  };

  const items = [
    {
      key: "1",
      label: "Profile",
    },
    // {
    //   key: "2",
    //   label: "Add Admin",
    // },
    {
      key: "Setting",
      label: (
        <SignOutButton signOutOptions={{ sessionId }} afterSignOutUrl="/" />
      ),
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="w-full flex justify-between"
          variant="flat"
          color="primary"
          aria-label="setting"
        >
          <h3 className="text-medium font-medium">Setting </h3>
          <UserCog />
        </Button>
      </DropdownTrigger>
      <DropdownMenu color="primary" aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            onAction={(key) => handleItemClick(key)} // Handle item click
            key={item.key}
            color={item.key === "Setting" ? "primary" : "default"}
            className={item.key === "Setting" ? "text-danger" : ""}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserSetting;
