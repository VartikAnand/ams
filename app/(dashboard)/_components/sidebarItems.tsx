"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Use "next/router" for routing
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
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
  const [isLoading, setIsLoading] = useState(false);
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      router.push(href);

      const checkPathname = () => {
        if (window.location.pathname === href) {
          setIsLoading(false);
        } else {
          setTimeout(checkPathname, 100); // Check again after 100ms if pathname is not yet matched
        }
      };

      checkPathname();
    }, 1000);
  };

  const lightTextColor = "black";
  const darkTextColor = "white";

  return (
    <Button
      radius="none"
      onClick={onClick}
      type="submit"
      color={isActive ? "primary" : "lightTextColor"}
      variant={isActive ? "flat" : "light"}
      size="lg"
      isLoading={isLoading}
      spinner={
        <svg
          className="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      }
      className="my-0.5 p-0 pl-2 hover:bg-primary-500/20"
    >
      <div className="flex items-center gap-x-2 py-4">
        {isLoading ? (
          <span>Loading...</span> // Display loading text
        ) : (
          <>
            <Icon size={22} className={` ${isActive ? `text-primary` : ""}`} />
            {label}
          </>
        )}
      </div>
      <div
        className={`ml-auto opacity-0 border-2 border-[#12A150] h-full transition-all ${
          isActive ? "opacity-100" : ""
        }`}
      />
    </Button>
  );
};

export default SidebarItems;
