"use client";
import React, { useState } from "react";
import Image from "next/image";

interface TechStackIconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const TechStackIcon: React.FC<TechStackIconProps> = ({
  src,
  alt,
  width = 0,
  height = 0,
  className = "",
  priority = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={className}
        priority={priority}
      />
      {isHovered && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap z-10 shadow-xl transition-all duration-300 ease-in-out backdrop-blur-sm"
          style={{
            animation: "float 1.5s ease-in-out infinite alternate",
          }}
        >
          <div className="flex items-center space-x-1">
            <span className="inline-block transform -rotate-2 font-bold tracking-wide">
              {alt}
            </span>
            {/* <span
              className="text-lg transform rotate-12 inline-block"
              role="img"
              aria-label="sparkle"
            >
              ✨
            </span> */}
          </div>
          <style jsx>{`
            @keyframes float {
              0% {
                transform: translate(-50%, 0px) rotate(2deg);
              }
              100% {
                transform: translate(-50%, -5px) rotate(-2deg);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default TechStackIcon;
