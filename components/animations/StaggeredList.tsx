"use client";
import { useRef, ReactNode, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StaggeredListProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  start?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale";
}

export function StaggeredList({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  duration = 0.6,
  start = "top 85%",
  animation = "fade-up",
}: StaggeredListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current || hasAnimated) {
        // Ensure visible
        if (containerRef.current) {
          const items = containerRef.current.children;
          gsap.set(items, { opacity: 1, y: 0, x: 0, scale: 1 });
        }
        return;
      }

      const items = containerRef.current.children;
      if (!items.length) return;

      const animations = {
        "fade-up": { from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1 } },
        "fade-left": { from: { x: -30, opacity: 0 }, to: { x: 0, opacity: 1 } },
        "fade-right": { from: { x: 30, opacity: 0 }, to: { x: 0, opacity: 1 } },
        scale: {
          from: { scale: 0.9, opacity: 0 },
          to: { scale: 1, opacity: 1 },
        },
      };

      const { from, to } = animations[animation];

      // Check if element is already in viewport
      const rect = containerRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight * 0.85;

      if (isInViewport) {
        // If already in viewport, animate immediately
        gsap.fromTo(items, from, {
          ...to,
          stagger,
          delay,
          duration,
          ease: "power3.out",
          onComplete: () => setHasAnimated(true),
        });
      } else {
        // Set initial state and use ScrollTrigger
        gsap.set(items, from);

        gsap.to(items, {
          ...to,
          stagger,
          delay,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true,
          },
          onComplete: () => setHasAnimated(true),
        });
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, animation, hasAnimated] }
  );

  // Fallback: ensure content is visible after mount if animation didn't trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current && !hasAnimated) {
        const items = containerRef.current.children;
        gsap.set(items, { opacity: 1, y: 0, x: 0, scale: 1 });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
