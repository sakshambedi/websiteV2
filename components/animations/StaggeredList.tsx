"use client";
import { useRef, ReactNode } from "react";
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

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

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

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const triggerPoint = viewportHeight * 0.85;
      const isInViewport = rect.top < triggerPoint;

      // Check if element is near bottom of document (footer detection)
      const elementAbsoluteTop = rect.top + scrollY;
      const distanceFromBottom = documentHeight - (elementAbsoluteTop + rect.height);
      const isNearBottom = distanceFromBottom < viewportHeight * 0.3;

      // Check if element is already in viewport OR is a footer element near bottom
      if (isInViewport || isNearBottom) {
        // Animate immediately without ScrollTrigger
        gsap.fromTo(items, from, {
          ...to,
          stagger,
          delay,
          duration,
          ease: "power3.out",
        });
      } else {
        // Use ScrollTrigger for elements below viewport
        gsap.fromTo(items, from, {
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
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
