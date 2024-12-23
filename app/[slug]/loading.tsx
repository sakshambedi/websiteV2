"use client";

import React, { useEffect, useRef } from "react";

interface LoadingProps {
    onComplete?: () => void;
}

export default function Loading({ onComplete }: LoadingProps) {
    const loadingScreenRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        let A = 0;
        let B = 0;

        const renderDonut = () => {
            const loadingScreen = loadingScreenRef.current;
            if (!loadingScreen) return;

            const width = Math.floor(window.innerWidth / 5); // Half viewport width
            const height = Math.floor(window.innerHeight / 5); // Half viewport height


            const b: string[] = [];
            const z: number[] = [];

            const screenWidth = Math.floor(width / 2);
            const screenHeight = Math.floor(height / 2);

            const scaleX = screenWidth / 5;
            const scaleY = screenHeight / 5;

            A += 0.07;
            B += 0.03;
            const cA = Math.cos(A),
                sA = Math.sin(A),
                cB = Math.cos(B),
                sB = Math.sin(B);

            for (let k = 0; k < screenWidth * screenHeight; k++) {
                b[k] = k % screenWidth === screenWidth - 1 ? "\n" : " ";
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

                    const x = Math.floor(
                        screenWidth / 2 +
                            scaleX * D * (cp * h * cB - t * sB)
                    );
                    const y = Math.floor(
                        screenHeight / 2 +
                            scaleY * D * (cp * h * sB + t * cB)
                    );
                    const o = x + screenWidth * y;
                    const N = Math.floor(
                        8 *
                        ((st * sA - sp * ct * cA) * cB -
                            sp * ct * sA -
                            st * cA -
                            cp * ct * sB)
                    );

                    if (
                        y >= 0 &&
                        y < screenHeight &&
                        x >= 0 &&
                        x < screenWidth &&
                        D > z[o]
                    ) {
                        z[o] = D;
                        b[o] = ",.-~:;=!*#$@"[N > 0 ? N : 0];
                    }
                }
            }

            loadingScreen.innerText = b.join("");
        };

        const interval = window.setInterval(renderDonut, 50);

        return () => {
            clearInterval(interval);
        };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center h-screen font-mono">
            <div>
                <pre
                    id="loadingScreen"
                    ref={loadingScreenRef}
                    className="whitespace-pre text-sm leading-tight text-gray-950 dark:text-gray-300 w-full"
                ></pre>
                <p className="mt-4 text-center">Loading ...</p>
            </div>
        </div>
    );
}