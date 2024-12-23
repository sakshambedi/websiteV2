"use client";

import React, { useEffect, useRef } from "react";

interface LoadingProps {
    onComplete?: () => void;
}

export default function Loading({ onComplete }: LoadingProps) {
    const loadingScreenRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        let A = 0,
            B = 0;

        const renderDonut = () => {
            const loadingScreen = loadingScreenRef.current;
            if (!loadingScreen) return;

            const b: string[] = [];
            const z: number[] = [];
            A += 0.07;
            B += 0.03;
            const cA = Math.cos(A),
                sA = Math.sin(A),
                cB = Math.cos(B),
                sB = Math.sin(B);

            for (let k = 0; k < 1760; k++) {
                b[k] = k % 80 === 79 ? "\n" : " ";
                z[k] = 0;
            }

            for (let j = 0; j < 6.28; j += 0.07) {
                const ct = Math.cos(j),
                    st = Math.sin(j);
                for (let i = 0; i < 6.28; i += 0.02) {
                    const sp = Math.sin(i),
                        cp = Math.cos(i),
                        h = ct + 2,
                        D = 1 / (sp * h * sA + st * cA + 5),
                        t = sp * h * cA - st * sA;

                    const x = Math.floor(40 + 30 * D * (cp * h * cB - t * sB));
                    const y = Math.floor(12 + 15 * D * (cp * h * sB + t * cB));
                    const o = x + 80 * y;
                    const N = Math.floor(
                        8 *
                        ((st * sA - sp * ct * cA) * cB -
                            sp * ct * sA -
                            st * cA -
                            cp * ct * sB)
                    );

                    if (
                        y >= 0 &&
                        y < 22 &&
                        x >= 0 &&
                        x < 80 &&
                        D > z[o]
                    ) {
                        z[o] = D;
                        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                    }
                }
            }

            loadingScreen.innerText = b.join("");
        };

        const interval = window.setInterval(renderDonut, 50);

        // Ensure the animation runs for at least 2 seconds
        const timeout = window.setTimeout(() => {
            if (onComplete) onComplete();
            clearInterval(interval);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen font-mono">
            <div>
                <pre
                    id="loadingScreen"
                    ref={loadingScreenRef}
                    className="whitespace-pre text-sm leading-tight text-gray-950 dark:text-gray-300 w-full"
                ></pre>
            </div>
            <p className="mt-4 text-center">Loading ...</p>
        </div>
    );
}