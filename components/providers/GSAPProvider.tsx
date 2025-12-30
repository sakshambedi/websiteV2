"use client";
import { useEffect, createContext, useContext, ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GSAPContextType {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}

const GSAPContext = createContext<GSAPContextType | null>(null);

export function GSAPProvider({ children }: { children: ReactNode }) {
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Set global defaults respecting user preferences
    gsap.defaults({
      ease: "power3.out",
      duration: prefersReducedMotion ? 0 : 0.8,
      overwrite: "auto",
    });

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: "play none none none",
    });

    // Configure ScrollTrigger for better performance
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150,
    });

    // Debounced refresh on resize
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    // Initial refresh after a short delay to ensure layout is stable
    const initialRefresh = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(initialRefresh);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <GSAPContext.Provider value={{ gsap, ScrollTrigger }}>
      {children}
    </GSAPContext.Provider>
  );
}

export const useGSAPContext = () => {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error("useGSAPContext must be used within a GSAPProvider");
  }
  return context;
};

export { gsap, ScrollTrigger };
