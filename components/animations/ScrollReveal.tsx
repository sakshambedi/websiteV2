"use client";
import { useRef, ReactNode } from "react";
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
  trigger?: "scroll" | "load";
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
  trigger = "scroll",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !ref.current) return;

      const animConfig = { ...animations[animation] };

      // Apply custom distance for directional animations
      if (animation === "fade-up") animConfig.from.y = distance;
      if (animation === "fade-down") animConfig.from.y = -distance;
      if (animation === "fade-left") animConfig.from.x = -distance;
      if (animation === "fade-right") animConfig.from.x = distance;

      // Use GSAP's default behavior with ScrollTrigger
      gsap.fromTo(
        ref.current,
        animConfig.from,
        {
          ...animConfig.to,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: trigger === "scroll" ? {
            trigger: ref.current,
            start,
            once: true,
          } : undefined,
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
