import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { UserCog } from "lucide-react";

const UserSetting = () => {
  const items = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Account",
    },
    {
      key: "Setting",
      label: "Setting",
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
            key={item.key}
            color={item.key === "Setting" ? "primary" : "default"}
            className={item.key === "Setting" ? "text-primary" : ""}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserSetting;
