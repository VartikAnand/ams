"use client";
import React from "react";
import NavbarRoutes from "./navbarRoutes";
import MobileSidebar from "./mobileSidebar";
import { useTheme } from "next-themes";

const NavBar = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 border-b h-full flex items-center  shadow-sm bg-${
        theme === "light" ? "white" : "background"
      } `}
    >
      {/* Mobile Drawer */}
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default NavBar;
