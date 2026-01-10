"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "BLOG", href: "/?tab=blog" },
  { name: "PROJECTS", href: "/?tab=projects" },
  { name: "CONTACT", href: "#contact" },
];

interface NavBarProps {
  className?: string;
}

const NavBar = ({ className }: NavBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn("w-full", className)}>
      {/* Navigation bar */}
      <div className="w-full bg-cyan px-4 py-4 lg:px-8">
        <div className="w-full">
          {/* Main nav row */}
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="font-serif text-2xl font-semibold">S</span>
            </Link>

            {/* Desktop Navigation - Right Aligned */}
            <nav className="hidden flex-1 items-center justify-end gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative font-mono text-fluid-sm uppercase tracking-widest text-foreground transition-colors hover:text-foreground/70"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right: Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="font-mono text-fluid-sm uppercase tracking-widest lg:hidden"
            >
              MENU [{mobileMenuOpen ? "−" : "+"}]
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="flex flex-col gap-3 border-t border-foreground/20 pt-3 mt-3 lg:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-fluid-sm uppercase tracking-widest text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
