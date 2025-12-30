"use client";
import React, { useRef, ReactNode, ElementType, useEffect } from "react";
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
  
  // #region agent log
  useEffect(() => {
    if (buttonRef.current) {
      const style = window.getComputedStyle(buttonRef.current);
      fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MagneticButton.tsx:31',message:'Component mounted',data:{opacity:style.opacity,display:style.display,href:href||'none'},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v3',hypothesisId:'H'})}).catch(()=>{});
    }
  }, [href]);
  // #endregion

  useGSAP(
    () => {
      // #region agent log
      const button = buttonRef.current;
      const computedStyle = button ? window.getComputedStyle(button) : null;
      fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MagneticButton.tsx:33',message:'useGSAP entry',data:{hasButton:!!button,opacity:computedStyle?.opacity,display:computedStyle?.display,visibility:computedStyle?.visibility},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v3',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      
      if (prefersReducedMotion) return;

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
          overwrite: "auto",
        });

        gsap.to(inner, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to([button, inner], {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto",
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);
      
      // #region agent log
      const finalStyle = window.getComputedStyle(button);
      fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MagneticButton.tsx:77',message:'Event listeners attached',data:{opacity:finalStyle.opacity,transform:finalStyle.transform},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v3',hypothesisId:'G'})}).catch(()=>{});
      // #endregion

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
