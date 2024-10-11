// app/components/ThemeSwitcher.tsx
// "use client";

import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
import React from "react";
import { Moon, Sun } from "lucide-react"
import { Toggle } from "@/components/ui/toggle";



export function ThemeSwitcher() {
    // const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    return (
        <Toggle
            aria-label="Toggle theme"
            pressed={theme === "dark"}
            onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
        >
            <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 phone:h-[1.0rem] phone:w-[1.0rem]" />
            <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 phone:h-[1.0rem] phone:w-[1.0rem]" />
            <span className="sr-only">Toggle theme</span>
        </Toggle>

    )
};