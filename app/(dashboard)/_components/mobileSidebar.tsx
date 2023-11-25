"use client";
import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { Button } from "@nextui-org/react";
const MobileSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <Button
        className="md:hidden   hover:opacity-75 transition"
        isIconOnly
        color="primary"
        size="md"
        variant="light"
        onClick={toggleDrawer}
      >
        <Menu />
      </Button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        style={{ backgroundColor: "#0D001A", color: "white" }}
      >
        <Sidebar />
      </Drawer>
    </>
  );
};

export default MobileSidebar;
