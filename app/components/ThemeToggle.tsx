"use client";

import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FaSun className="absolute h-10 w-10 rotate-0 scale-100 dark:-rotate-90 dark:scale-0"></FaSun>
      <FaMoon className="absolute h-10 w-10 rotate-100 scale-0 dark:-rotate-0 dark:scale-100"></FaMoon>
    </Button>
    // <button
    //   onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    //   className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 transition"
    // >
    //   {theme === "dark" ? <Sun /> : <Moon />}
    // </button>
  );
}
