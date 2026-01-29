"use client"

import React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import MoonIcon from "./icons/moon";
import SunIcon from "./icons/sun";

const Toggle = () => {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMode = () => {
    if (!document.startViewTransition) {
      switchTheme();
      return;
    }
    document.startViewTransition(switchTheme);
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleMode}
      className="relative h-12 w-12 overflow-hidden rounded-full"
    >
      <SunIcon className="h-6 w-6 text-primary rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-6 w-6 text-primary rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default Toggle;
