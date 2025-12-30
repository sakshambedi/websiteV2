"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ThemeSwitcher } from "@/app/util/ThemeSwitcher";
import { AnimatedText } from "./animations/AnimatedText";
import { MagneticButton } from "./animations/MagneticButton";

const NavBar = () => {
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      // Initial title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });
      }
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className={`relative z-40 flex flex-col items-center w-full transition-all duration-500 ease-out-expo pt-20 phone:pt-8 pb-4 bg-background`}
    >
      {/* Theme switcher with magnetic effect */}
      <div className="absolute right-8 lg:right-20 top-1/2 -translate-y-1/2 phone:hidden z-10">
        <MagneticButton as="div" strength={0.4} className="p-2">
          <ThemeSwitcher />
        </MagneticButton>
      </div>

      <div ref={titleRef} className="flex flex-col items-center">
        <h1 className="font-rebondG tracking-display text-fluid-5xl">
          <AnimatedText
            as="span"
            animation="words"
            trigger="load"
            delay={0}
            stagger={0.05}
          >
            Saksham Bedi
          </AnimatedText>
        </h1>

        <div className="py-3 phone:py-0">
          <h3 className="font-mono font-light text-muted-foreground text-fluid-xl phone:p-2">
            <AnimatedText
              as="span"
              animation="fade"
              trigger="load"
              delay={0.4}
            >
              AI Software Engineer
            </AnimatedText>
          </h3>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
