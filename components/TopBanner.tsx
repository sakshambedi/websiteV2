"use client";
import React from "react";
import { ThemeSwitcher } from "@/app/util/ThemeSwitcher";

export default function TopBanner() {

  return (
    <div className="w-full bg-foreground text-background px-4 py-1 lg:px-8" data-cursor-invert>
      <div className="w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Left */}
          <span className="font-mono text-fluid-xs uppercase tracking-widest text-background">
            PORTFOLIO<span className="hidden lg:inline"> — SAKSHAM BEDI</span>
          </span>

          {/* Right - Theme Switcher and Year */}
          <div className="flex items-center gap-4">            
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
