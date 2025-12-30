"use client";
import { useRef, ReactNode, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  start?: string;
  distance?: number;
}

const animations: Record<
  AnimationType,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  "fade-up": {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  "fade-down": {
    from: { y: -40, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  "fade-left": {
    from: { x: -40, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  "fade-right": {
    from: { x: 40, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  scale: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
  blur: {
    from: { filter: "blur(10px)", opacity: 0 },
    to: { filter: "blur(0px)", opacity: 1 },
  },
};

export function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  start = "top 85%",
  distance = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion || !ref.current || hasAnimated) {
        // If reduced motion or already animated, ensure visible
        if (ref.current) {
          gsap.set(ref.current, { opacity: 1, y: 0, x: 0, scale: 1, filter: "none" });
        }
        return;
      }

      const animConfig = { ...animations[animation] };

      // Apply custom distance for directional animations
      if (animation === "fade-up") animConfig.from.y = distance;
      if (animation === "fade-down") animConfig.from.y = -distance;
      if (animation === "fade-left") animConfig.from.x = -distance;
      if (animation === "fade-right") animConfig.from.x = distance;

      // Check if element is already in viewport
      const rect = ref.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight * 0.85;

      if (isInViewport) {
        // If already in viewport, animate immediately
        gsap.fromTo(
          ref.current,
          animConfig.from,
          {
            ...animConfig.to,
            duration,
            delay,
            ease: "power3.out",
            onComplete: () => setHasAnimated(true),
          }
        );
      } else {
        // Set initial state and use ScrollTrigger
        gsap.set(ref.current, animConfig.from);

        gsap.to(ref.current, {
          ...animConfig.to,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true, // Only trigger once
          },
          onComplete: () => setHasAnimated(true),
        });
      }
    },
    { scope: ref, dependencies: [prefersReducedMotion, animation, distance, hasAnimated] }
  );

  // Fallback: ensure content is visible after mount if animation didn't trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current && !hasAnimated) {
        gsap.set(ref.current, { opacity: 1, y: 0, x: 0, scale: 1, filter: "none" });
      }
    }, 2000); // Fallback after 2 seconds

    return () => clearTimeout(timer);
  }, [hasAnimated]);

  return (
    <div ref={ref} className={className} style={{ opacity: prefersReducedMotion ? 1 : undefined }}>
      {children}
    </div>
  );
}
