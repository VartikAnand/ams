"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Switch
      size="md"
      defaultSelected
      color="primary"
      startContent={<Sun className="h-4 w-4 p-1    " />}
      endContent={<Moon className="h-4 w-4 p-1 " />}
      onClick={toggleTheme}
    ></Switch>
  );
}
