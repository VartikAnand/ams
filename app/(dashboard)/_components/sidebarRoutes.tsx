"use client";
import React from "react";
import {
  Layout,
  Compass,
  Tractor,
  User,
  Wallet2,
  Ratio,
  Landmark,
  IndianRupee,
  Blocks,
} from "lucide-react";
import SidebarItems from "./sidebarItems";
import { usePathname } from "next/navigation";
import { Divider } from "@nextui-org/react";
import UserSetting from "./(userSetting)/setting";
import { ThemeSwitcher } from "../../../components/ThemeSwitch/ThemeSwitcher";
//USER ROUTES

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Tractor,
    label: "Farmer",
    href: "/farmer",
  },
  {
    icon: User,
    label: "Personal",
    href: "/personal",
  },
  {
    icon: Wallet2,
    label: "Salary",
    href: "/salary",
  },
  {
    icon: Ratio,
    label: "Plot Selling",
    href: "/plotSelling",
  },
  {
    icon: Landmark,
    label: "Loan",
    href: "/loan",
  },
  {
    icon: IndianRupee,
    label: "Daily Expenses",
    href: "/dailyExpenses",
  },
  {
    icon: User,
    label: "Personal Entry",
    href: "/admin/personal",
  },
];

//ADMIN ROUTES

const adminRoutes = [
  {
    icon: Blocks,
    label: "Main Entry",
    href: "/admin/mainEntry",
  },
  {
    icon: Tractor,
    label: "Farmer Entry",
    href: "/admin/farmerEntry",
  },

  {
    icon: User,
    label: "Personal Entry",
    href: "/admin/user",
  },
  {
    icon: Wallet2,
    label: "Salary Entry",
    href: "/admin/salary",
  },
  {
    icon: Ratio,
    label: "Plot Selling Entry",
    href: "/admin/plotSelling",
  },
  {
    icon: Landmark,
    label: "Loan Entry",
    href: "/admin/loan",
  },
  {
    icon: IndianRupee,
    label: "Daily Expenses Entry",
    href: "/admin/dailyExpenses",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.includes("/admin");
  const routes = isAdminPage ? adminRoutes : guestRoutes;

  return (
    <div className="flex flex-col justify-between p-0 m-0  h-full">
      <div className="flex flex-col w-full ">
        {routes.map((route) => (
          <SidebarItems
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
      <div className="my-3 px-2">
        <Divider className="my-4 " />
        <div className="sm:hidden">
          <ThemeSwitcher />
        </div>

        <UserSetting />
      </div>
    </div>
  );
};

export default SidebarRoutes;
