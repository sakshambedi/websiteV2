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
    <div ref={iconRef} className="opacity-0">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={className}
        priority={priority}
      />
    </div>
  );
};

export default TechStackIcon;
