"use client";
import { useRef, ElementType, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  animation?: "words" | "chars" | "fade" | "blur";
  delay?: number;
  stagger?: number;
  trigger?: "load" | "scroll";
  duration?: number;
}

export function AnimatedText({
  children,
  as: Component = "p",
  className = "",
  animation = "words",
  delay = 0,
  stagger = 0.03,
  trigger = "scroll",
  duration = 0.8,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current || hasAnimated) {
        // Ensure visible
        if (containerRef.current) {
          const elements =
            animation === "chars"
              ? containerRef.current.querySelectorAll(".char")
              : containerRef.current.querySelectorAll(".word");
          gsap.set(elements, { opacity: 1, y: 0, rotateX: 0, filter: "none" });
        }
        return;
      }

      const elements =
        animation === "chars"
          ? containerRef.current.querySelectorAll(".char")
          : containerRef.current.querySelectorAll(".word");

      if (!elements.length) return;

      const animationProps = {
        words: {
          from: { y: 30, opacity: 0, rotateX: -45 },
          to: { y: 0, opacity: 1, rotateX: 0 },
        },
        chars: {
          from: { y: 20, opacity: 0 },
          to: { y: 0, opacity: 1 },
        },
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        blur: {
          from: { opacity: 0, filter: "blur(10px)" },
          to: { opacity: 1, filter: "blur(0px)" },
        },
      };

      const { from, to } = animationProps[animation];

      // Check if element is already in viewport
      const rect = containerRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight * 0.85;

      if (trigger === "load" || isInViewport) {
        // Animate immediately
        gsap.fromTo(elements, from, {
          ...to,
          stagger,
          ease: "power3.out",
          duration,
          delay: trigger === "load" ? delay : 0,
          onComplete: () => setHasAnimated(true),
        });
      } else {
        // Set initial state and use ScrollTrigger
        gsap.set(elements, from);

        gsap.to(elements, {
          ...to,
          stagger,
          ease: "power3.out",
          duration,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
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
        const elements =
          animation === "chars"
            ? containerRef.current.querySelectorAll(".char")
            : containerRef.current.querySelectorAll(".word");
        gsap.set(elements, { opacity: 1, y: 0, rotateX: 0, filter: "none" });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasAnimated, animation]);

  // Split text into words or characters
  const renderContent = () => {
    if (animation === "chars") {
      return children.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ perspective: "400px" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    return children.split(" ").map((word, i) => (
      <span
        key={i}
        className="word inline-block"
        style={{ perspective: "400px" }}
      >
        {word}
        {i < children.split(" ").length - 1 && "\u00A0"}
      </span>
    ));
  };

  return (
    <Component
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ perspective: "1000px" }}
    >
      {renderContent()}
    </Component>
  );
}
