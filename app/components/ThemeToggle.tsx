"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "components/ui/button";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [, updateState] = useState({}); // force update

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleClick = () => {
    setTheme(isDark ? "light" : "dark");
    // force React to re-render so resolvedTheme updates
    updateState({});
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative rounded-full"
      onClick={handleClick}
    >
      <FaSun
        className={`absolute h-6 w-6 transition-all duration-300 ${
          isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        }`}
      />
      <FaMoon
        className={`absolute h-6 w-6 transition-all duration-300 ${
          isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"
        }`}
      />
    </Button>
  );
}