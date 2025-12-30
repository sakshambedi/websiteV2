"use client";
import { useRef, ReactNode, ElementType } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: ElementType;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as: Component = "button",
  href,
  onClick,
  target,
  rel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const button = buttonRef.current;
      const inner = innerRef.current;
      if (!button || !inner) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(inner, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to([button, inner], {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: buttonRef, dependencies: [prefersReducedMotion, strength] }
  );

  const props = {
    ref: buttonRef as React.RefObject<HTMLButtonElement>,
    className: `magnetic-btn ${className}`,
    ...(href && { href }),
    ...(onClick && { onClick }),
    ...(target && { target }),
    ...(rel && { rel }),
  };

  return (
    <Component {...props}>
      <span ref={innerRef} className="relative z-10 inline-flex items-center">
        {children}
      </span>
    </Component>
  );
}
