"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import React from 'react'
import { Toggle } from "@/components/ui/toggle"

const NavBar = () => {
    const { theme, setTheme } = useTheme()

    return (

        <header className="relative flex flex-col items-center pt-14 w-screen max-w-full overflow-hidden phone:pt-8 ">
            <div className="absolute right-20  phone:hidden z-10 ">
                <Toggle
                    aria-label="Toggle theme"
                    pressed={theme === "dark"}
                    onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
                >
                    <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 phone:h-[1.0rem] phone:w-[1.0rem]" />
                    <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 phone:h-[1.0rem] phone:w-[1.0rem]" />
                    <span className="sr-only">Toggle theme</span>
                </Toggle>
            </div>

            <div className="flex w-screen items-center justify-center relative">
                <h1 className="text-4xl font-serif phone:text-3xl">
                    <span className="font-normal">Saksham</span>
                    <span className="mr-4 phone:mr-1.5"></span>
                    <span className="font-normal">Bedi</span>
                </h1>
            </div>
            <div className="flex flex-row w-full justify-center items-center py-3 phone:py-0">
                <h3 className="font-mono text-xl font-light phone:text-lg phone:p-2">
                    ML/AI Student
                </h3>
            </div>


        </header>

    )
}

export default NavBar