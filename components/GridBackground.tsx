"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface GridCardProps {
  className?: string;
  children?: React.ReactNode;
  showCorners?: boolean;
  showGrid?: boolean;
  gridSize?: number;
}

export function GridCard({ 
  className, 
  children, 
  showCorners = false,
  showGrid = true,
  gridSize = 20 
}: GridCardProps) {
  return (
    <div className={cn("atlas-card relative overflow-hidden", className)}>
      {/* Corner accents */}
      {showCorners && (
        <>
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-foreground/20" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-foreground/20" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-foreground/20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-foreground/20" />
        </>
      )}
      
      {/* Grid pattern overlay */}
      {showGrid && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border) / 0.4) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

// Dotted grid variant
export function DottedCard({
  className,
  children,
  dotSpacing = 24,
}: {
  className?: string;
  children?: React.ReactNode;
  dotSpacing?: number;
}) {
  return (
    <div className={cn("atlas-card relative overflow-hidden", className)}>
      {/* Dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--border) / 0.6) 1px, transparent 1px)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
