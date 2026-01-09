"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Network configuration - more nodes for a fuller graph
const INPUT_NODES = 4;
const HIDDEN1_NODES = 5;
const HIDDEN2_NODES = 4;
const OUTPUT_NODES = 3;

// Generate random weights
const generateWeights = (from: number, to: number) => {
  const weights: number[][] = [];
  for (let i = 0; i < from; i++) {
    weights[i] = [];
    for (let j = 0; j < to; j++) {
      weights[i][j] = Math.random() * 2 - 1;
    }
  }
  return weights;
};

export function NeuralNetworkAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const [activeLayer, setActiveLayer] = useState(0);
  const [weightsL1] = useState(() => generateWeights(INPUT_NODES, HIDDEN1_NODES));
  const [weightsL2] = useState(() => generateWeights(HIDDEN1_NODES, HIDDEN2_NODES));
  const [weightsL3] = useState(() => generateWeights(HIDDEN2_NODES, OUTPUT_NODES));
  const [pulsePhase, setPulsePhase] = useState(0);
  
  // Track which nodes are active (randomly selected)
  const [activeInputs, setActiveInputs] = useState<number[]>([0, 2]);
  const [activeHidden1, setActiveHidden1] = useState<number[]>([1, 3]);
  const [activeHidden2, setActiveHidden2] = useState<number[]>([1, 2]);
  const [activeOutput, setActiveOutput] = useState<number>(0);

  // Generate random active nodes
  const generateRandomActiveNodes = useCallback(() => {
    // Randomly select 2-3 input nodes
    const numInputs = Math.random() > 0.5 ? 3 : 2;
    const inputIndices = Array.from({ length: INPUT_NODES }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, numInputs);
    setActiveInputs(inputIndices);

    // Randomly select 2-3 hidden1 nodes
    const numHidden1 = Math.random() > 0.5 ? 3 : 2;
    const hidden1Indices = Array.from({ length: HIDDEN1_NODES }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, numHidden1);
    setActiveHidden1(hidden1Indices);

    // Randomly select 1-2 hidden2 nodes
    const numHidden2 = Math.random() > 0.5 ? 2 : 1;
    const hidden2Indices = Array.from({ length: HIDDEN2_NODES }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, numHidden2);
    setActiveHidden2(hidden2Indices);

    // Randomly select 1 output node (the "winning" class)
    const outputIndex = Math.floor(Math.random() * OUTPUT_NODES);
    setActiveOutput(outputIndex);
  }, []);

  // Animation loop for forward pass simulation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 5);
    }, 700);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Update active layer and generate new random nodes at start of cycle
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    if (pulsePhase === 0) {
      generateRandomActiveNodes();
    }
    setActiveLayer(pulsePhase);
  }, [pulsePhase, prefersReducedMotion, generateRandomActiveNodes]);

  // Node positions (in viewBox coordinates)
  const inputX = 50;
  const hidden1X = 130;
  const hidden2X = 230;
  const outputX = 350;
  const centerY = 150;
  const nodeSpacing = 50;
  const outputSpacing = 60;

  const getNodeY = (index: number, total: number, spacing: number = nodeSpacing) => 
    centerY - ((total - 1) / 2 - index) * spacing;

  return (
    <div className="relative w-full h-full">
      {/* SVG Perceptron Diagram */}
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        style={{ background: "hsl(var(--background))" }}
      >
        <defs>
          {/* Subtle glow filters */}
          <filter id="glowCoral" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowCyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowGraySubtle" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections: Input to Hidden1 */}
        {Array.from({ length: INPUT_NODES }).map((_, i) =>
          Array.from({ length: HIDDEN1_NODES }).map((_, h) => {
            const isActive = activeLayer >= 1 && activeInputs.includes(i) && activeHidden1.includes(h);
            const weight = weightsL1[i][h];
            const color = weight >= 0 ? "hsl(var(--accent-cyan))" : "hsl(var(--accent-coral))";
            return (
              <line
                key={`ih1-${i}-${h}`}
                x1={inputX}
                y1={getNodeY(i, INPUT_NODES)}
                x2={hidden1X}
                y2={getNodeY(h, HIDDEN1_NODES)}
                stroke={isActive ? color : "hsl(var(--muted-foreground))"}
                strokeWidth="1"
                strokeDasharray="5 3"
                className={`transition-all duration-500 ${isActive ? "opacity-60 nn-connection-active" : "opacity-15"}`}
              />
            );
          })
        )}

        {/* Connections: Hidden1 to Hidden2 */}
        {Array.from({ length: HIDDEN1_NODES }).map((_, h1) =>
          Array.from({ length: HIDDEN2_NODES }).map((_, h2) => {
            const isActive = activeLayer >= 2 && activeHidden1.includes(h1) && activeHidden2.includes(h2);
            const weight = weightsL2[h1][h2];
            const color = weight >= 0 ? "hsl(var(--accent-cyan))" : "hsl(var(--accent-coral))";
            return (
              <line
                key={`h1h2-${h1}-${h2}`}
                x1={hidden1X}
                y1={getNodeY(h1, HIDDEN1_NODES)}
                x2={hidden2X}
                y2={getNodeY(h2, HIDDEN2_NODES)}
                stroke={isActive ? color : "hsl(var(--muted-foreground))"}
                strokeWidth="1"
                strokeDasharray="5 3"
                className={`transition-all duration-500 ${isActive ? "opacity-60 nn-connection-active" : "opacity-15"}`}
              />
            );
          })
        )}

        {/* Connections: Hidden2 to Output */}
        {Array.from({ length: HIDDEN2_NODES }).map((_, h) =>
          Array.from({ length: OUTPUT_NODES }).map((_, o) => {
            const isActive = activeLayer >= 3 && activeHidden2.includes(h) && o === activeOutput;
            const weight = weightsL3[h][o];
            const color = weight >= 0 ? "hsl(var(--accent-cyan))" : "hsl(var(--accent-coral))";
            return (
              <line
                key={`h2o-${h}-${o}`}
                x1={hidden2X}
                y1={getNodeY(h, HIDDEN2_NODES)}
                x2={outputX}
                y2={getNodeY(o, OUTPUT_NODES, outputSpacing)}
                stroke={isActive ? color : "hsl(var(--muted-foreground))"}
                strokeWidth="1"
                strokeDasharray="5 3"
                className={`transition-all duration-500 ${isActive ? "opacity-60 nn-connection-active" : "opacity-15"}`}
              />
            );
          })
        )}

        {/* Input Nodes */}
        {Array.from({ length: INPUT_NODES }).map((_, i) => {
          const isActive = activeLayer === 0 && activeInputs.includes(i);
          return (
            <circle
              key={`input-${i}`}
              cx={inputX}
              cy={getNodeY(i, INPUT_NODES)}
              r={isActive ? 7 : 6}
              fill={isActive ? "hsl(var(--accent-cyan))" : "hsl(var(--background))"}
              stroke="hsl(var(--accent-cyan))"
              strokeWidth={isActive ? 1.5 : 1}
              className="transition-all duration-300"
              filter={isActive ? "url(#glowCyan)" : undefined}
            />
          );
        })}

        {/* Hidden Layer 1 Nodes */}
        {Array.from({ length: HIDDEN1_NODES }).map((_, h) => {
          const isActive = activeLayer === 1 && activeHidden1.includes(h);
          return (
            <circle
              key={`hidden1-${h}`}
              cx={hidden1X}
              cy={getNodeY(h, HIDDEN1_NODES)}
              r={isActive ? 7 : 6}
              fill={isActive ? "hsl(var(--muted-foreground))" : "hsl(var(--background))"}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={isActive ? 1.5 : 1}
              className="transition-all duration-400"
              style={{ opacity: isActive ? 1 : 0.7 }}
              filter={isActive ? "url(#glowGraySubtle)" : undefined}
            />
          );
        })}

        {/* Hidden Layer 2 Nodes */}
        {Array.from({ length: HIDDEN2_NODES }).map((_, h) => {
          const isActive = activeLayer === 2 && activeHidden2.includes(h);
          return (
            <circle
              key={`hidden2-${h}`}
              cx={hidden2X}
              cy={getNodeY(h, HIDDEN2_NODES)}
              r={isActive ? 7 : 6}
              fill={isActive ? "hsl(var(--muted-foreground))" : "hsl(var(--background))"}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={isActive ? 1.5 : 1}
              className="transition-all duration-400"
              style={{ opacity: isActive ? 1 : 0.7 }}
              filter={isActive ? "url(#glowGraySubtle)" : undefined}
            />
          );
        })}

        {/* Output Nodes */}
        {Array.from({ length: OUTPUT_NODES }).map((_, o) => {
          const isActive = activeLayer >= 3 && o === activeOutput;
          return (
            <circle
              key={`output-${o}`}
              cx={outputX}
              cy={getNodeY(o, OUTPUT_NODES, outputSpacing)}
              r={isActive ? 8 : 7}
              fill={isActive ? "hsl(var(--accent-coral))" : "hsl(var(--background))"}
              stroke="hsl(var(--accent-coral))"
              strokeWidth={isActive ? 1.5 : 1}
              className="transition-all duration-300"
              filter={isActive ? "url(#glowCoral)" : undefined}
            />
          );
        })}
      </svg>
    </div>
  );
}
