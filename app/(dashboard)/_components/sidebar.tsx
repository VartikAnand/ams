import React from "react";
import { Logo } from "./logo";
import SidebarRoutes from "./sidebarRoutes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto  shadow-sm">
      <div className="p-2 mt-2 pr-8 flex justify-center items-center w-full">
        <Logo />
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
