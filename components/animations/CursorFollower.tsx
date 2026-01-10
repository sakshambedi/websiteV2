"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Detect Safari browser
const isSafari = () => {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  // Safari detection: contains Safari but not Chrome
  return /safari/.test(userAgent) && !/chrome/.test(userAgent) && !/chromium/.test(userAgent);
};

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInFooter, setIsInFooter] = useState(false);
  const [isInTopBanner, setIsInTopBanner] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const rafIdRef = useRef<number | null>(null);
  const cursorPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices, Safari, or when reduced motion is preferred
    if (
      typeof window === "undefined" ||
      "ontouchstart" in window ||
      prefersReducedMotion ||
      isSafari()
    ) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      cursorPosRef.current = { x: e.clientX, y: e.clientY };

      // Check if cursor is over footer or TopBanner
      const elementAtCursor = document.elementFromPoint(e.clientX, e.clientY);
      const footer = document.querySelector("footer");
      const topBanner = document.querySelector("[data-cursor-invert]");
      const inFooter = footer && footer.contains(elementAtCursor);
      const inTopBanner = topBanner && topBanner.contains(elementAtCursor);
      setIsInFooter(inFooter || false);
      setIsInTopBanner(inTopBanner || false);

      // Use RAF for smoother performance
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        gsap.to(cursor, {
          x: cursorPosRef.current.x,
          y: cursorPosRef.current.y,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(dot, {
          x: cursorPosRef.current.x,
          y: cursorPosRef.current.y,
          duration: 0.1,
          overwrite: "auto",
        });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsVisible(false);
      }
    };

    // Add listeners to interactive elements with debouncing
    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, select"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      });
      return interactiveElements;
    };

    let interactiveElements = addInteractiveListeners();

    // Throttle observer updates
    let observerTimeout: NodeJS.Timeout;
    const observer = new MutationObserver(() => {
      clearTimeout(observerTimeout);
      observerTimeout = setTimeout(() => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        });
        interactiveElements = addInteractiveListeners();
      }, 100);
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false,
      characterData: false,
    });

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    // Add custom cursor class to body
    document.body.classList.add("custom-cursor-active");

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      clearTimeout(observerTimeout);
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

  // Don't render on touch devices, Safari, or with reduced motion
  if (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || prefersReducedMotion || isSafari())
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
            ? isInFooter || isInTopBanner
              ? "w-16 h-16 border-background/50 bg-background/10"
              : "w-16 h-16 border-foreground/90 dark:border-foreground/50 bg-foreground/50 dark:bg-foreground/10"
            : isInFooter || isInTopBanner
            ? "w-8 h-8 border-background/30"
            : "w-8 h-8 border-foreground/30"
        }`}
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[9999] w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 ${
          isInFooter || isInTopBanner ? "bg-background" : "bg-foreground"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ left: 0, top: 0 }}
      />
    </>
  );
}
