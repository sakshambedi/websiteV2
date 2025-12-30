"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TechStackIconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  index?: number;
}

const TechStackIcon: React.FC<TechStackIconProps> = ({
  src,
  alt,
  width = 0,
  height = 0,
  className = "",
  priority = false,
  index = 0,
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!iconRef.current) return;

      gsap.fromTo(
        iconRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: iconRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: iconRef }
  );

  return (
    <div ref={iconRef} className="relative group/icon opacity-0">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={className}
        priority={priority}
      />
      <div className="absolute left-1/2 -translate-x-1/2 -top-9 px-2.5 py-1 rounded-sm bg-foreground text-background text-xs font-mono whitespace-nowrap opacity-0 scale-95 pointer-events-none transition-all duration-200 ease-out group-hover/icon:opacity-100 group-hover/icon:scale-100 z-10">
        {alt}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-foreground rotate-45" />
      </div>
    </div>
  );
};

export default TechStackIcon;
