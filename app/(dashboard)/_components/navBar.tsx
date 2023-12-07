"use client";
import React from "react";
import NavbarRoutes from "./navbarRoutes";
import MobileSidebar from "./mobileSidebar";
import { useTheme } from "next-themes";
interface dataProps {
  Notidata: string;
}
const NavBar = ({ Notidata }: dataProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 border-b h-full flex items-center  shadow-sm bg-${
        theme === "light" ? "white" : "background"
      } `}
    >
      {/* Mobile Drawer */}
      <MobileSidebar />
      <NavbarRoutes Notidata={Notidata} />
    </div>
  );
};

export default NavBar;
