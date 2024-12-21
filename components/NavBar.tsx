"use client"
import React from 'react'
import { ThemeSwitcher } from "@/app/util/ThemeSwitcher"
const NavBar = () => {

    return (

        <header className="relative flex flex-col items-center pt-20 w-screen max-w-full overflow-hidden phone:pt-8 ">
            <div className="absolute right-20  phone:hidden z-10 ">
                <ThemeSwitcher />

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
                    Deep Learning/AI Student
                </h3>
            </div>


        </header>

    )
}

export default NavBar