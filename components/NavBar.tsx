"use client";
import React from "react";
import { ThemeSwitcher } from "@/app/util/ThemeSwitcher";
const NavBar = () => {
  return (
    <header className="relative flex flex-col items-center pt-20 w-screen max-w-full overflow-hidden phone:pt-8 ">
      <div className="absolute right-20  phone:hidden z-10 ">
        <ThemeSwitcher />
      </div>

      <div className="flex w-screen items-center justify-center relative">
        <h1 className="text-fluid-5xl font-rebondG">
          <span className="font-normal">Saksham</span>
          <span className="mr-4 phone:mr-1.5"></span>
          <span className="font-normal">Bedi</span>
        </h1>
      </div>
      <div className="flex flex-row w-full justify-center items-center py-3 phone:py-0">
        <h3 className="font-mono text-fluid-xl font-light phone:p-2">
          AI Software Engineer
        </h3>
      </div>
    </header>
  );
};

export default NavBar;
