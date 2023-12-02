"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation"; // Use "next/router" for routing
import { useTheme } from "next-themes";
interface SidebarItemsProps {
  icon: React.ComponentType;
  label: string;
  href: string;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  const lightTextColor = "black";
  const darkTextColor = "white";

  return (
    <button
      onClick={onClick}
      type="button"
      className={`pl-2  flex items-center gap-x-2 text-sm font-[500]  transition-all  hover:text-white hover:bg-primary-600/50 bg-opacity-50  ${
        isActive
          ? theme === "dark"
            ? "bg-primary-900/50 bg-opacity-50 text-primary-600"
            : "bg-primary-600/30 bg-opacity-50  text-primary-600"
          : ""
      }`}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={` ${isActive ? `hover:bg-primary-600` : ""}`}
        />
        {label}
      </div>
      <div
        className={`ml-auto opacity-0 border-2 border-[#12A150] h-full transition-all ${
          isActive ? "opacity-100" : ""
        }`}
      />
    </button>
  );
};

export default SidebarItems;
