"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import React from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        disabled
        className="relative h-10 w-10 flex items-center justify-center text-muted-foreground"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-10 w-10 flex items-center justify-center text-foreground hover:text-muted-foreground transition-colors duration-200"
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
