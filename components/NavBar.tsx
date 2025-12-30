"use client";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeSwitcher } from "@/app/util/ThemeSwitcher";
import { AnimatedText } from "./animations/AnimatedText";
import { MagneticButton } from "./animations/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NavBar = () => {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      // Header shrink on scroll
      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          setHasScrolled(self.direction === 1 || self.scroll() > 80);
        },
      });

      // Progress bar animation
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });
      }

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
      className={`sticky top-0 z-40 flex flex-col items-center w-full transition-all duration-500 ease-out-expo ${
        hasScrolled
          ? "pt-4 pb-4 glass"
          : "pt-20 phone:pt-8 bg-background"
      }`}
    >
      {/* Progress indicator */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-px bg-foreground/20 origin-left w-full"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Theme switcher with magnetic effect */}
      <div className="absolute right-8 lg:right-20 top-1/2 -translate-y-1/2 phone:hidden z-10">
        <MagneticButton as="div" strength={0.4} className="p-2">
          <ThemeSwitcher />
        </MagneticButton>
      </div>

      <div ref={titleRef} className="flex flex-col items-center">
        <h1
          className={`font-rebondG tracking-display transition-all duration-500 ease-out-expo ${
            hasScrolled ? "text-fluid-3xl" : "text-fluid-5xl"
          }`}
        >
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

        <div
          className={`overflow-hidden transition-all duration-500 ease-out-expo ${
            hasScrolled ? "max-h-0 opacity-0 py-0" : "max-h-20 opacity-100 py-3 phone:py-0"
          }`}
        >
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
