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
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1 text-sm whitespace-nowrap z-10 border border-gray-300 dark:border-gray-600">
          <span className="font-medium">{alt}</span>
        </div>
      )}
    </div>
  );
};

export default TechStackIcon;
