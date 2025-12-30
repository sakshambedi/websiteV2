"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Hide on touch devices
    if (
      typeof window === "undefined" ||
      "ontouchstart" in window ||
      prefersReducedMotion
    ) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsVisible(false);
      }
    };

    // Add listeners to interactive elements
    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, select"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return interactiveElements;
    };

    let interactiveElements = addInteractiveListeners();

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(() => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      interactiveElements = addInteractiveListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseout", handleMouseOut);

    // Add custom cursor class to body
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseout", handleMouseOut);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isVisible, prefersReducedMotion]);

  // Don't render on touch devices or with reduced motion
  if (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || prefersReducedMotion)
  ) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out-expo mix-blend-difference ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovering
            ? "w-16 h-16 border-foreground/50 bg-foreground/10"
            : "w-8 h-8 border-foreground/30"
        }`}
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[9999] w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: 0, top: 0 }}
      />
    </>
  );
}
