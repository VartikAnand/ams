"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { BellDot, LogOut } from "lucide-react";
import { Button } from "@nextui-org/react";
import { ThemeSwitcher } from "/components/ThemeSwitch/ThemeSwitcher";
import Notification from "./(notification)/notification";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const user = useUser();

  const isAdminPage = pathname?.startsWith("/admin");
  const isDataInputPage = pathname?.includes("/admin/farmerDataEntry");
  const isSearchPage = pathname === "/search";
  return (
    <div className="flex gap-x-2 ml-auto">
      <div className="hidden sm:block">
        <ThemeSwitcher />
      </div>
      <div>
        <Notification />
      </div>

      {isAdminPage || isDataInputPage ? (
        <Link href="/dashboard">
          <Button color="primary" variant="ghost" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/admin/mainEntry">
          <Button color="primary" variant="ghost" size="sm">
            Admin Mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;
