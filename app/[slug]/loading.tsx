"use client"

import React, { useEffect } from "react";


export default function Loading({ onComplete }) {
    useEffect(() => {
        let A = 1, B = 1;
        const loadingScreen = document.getElementById('loadingScreen');

        const renderDonut = () => {
            const b = [];
            const z = [];
            A += 0.07;
            B += 0.03;
            const cA = Math.cos(A), sA = Math.sin(A),
                cB = Math.cos(B), sB = Math.sin(B);

            for (let k = 0; k < 1760; k++) {
                b[k] = k % 80 === 79 ? "\n" : " ";
                z[k] = 0;
            }

            for (let j = 0; j < 6.28; j += 0.07) {
                const ct = Math.cos(j), st = Math.sin(j);
                for (let i = 0; i < 6.28; i += 0.02) {
                    const sp = Math.sin(i), cp = Math.cos(i),
                        h = ct + 2,
                        D = 1 / (sp * h * sA + st * cA + 5),
                        t = sp * h * cA - st * sA;

                    const x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
                        y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
                        o = x + 80 * y,
                        N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

                    if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                        z[o] = D;
                        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                    }
                }
            }
            if (loadingScreen) {
                loadingScreen.innerText = b.join("");
            }
        };

        const interval = setInterval(renderDonut, 50);

        // Ensuring the animation runs for at least 2 seconds
        const timeout = setTimeout(() => {
            if (onComplete) onComplete();
            clearInterval(interval);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <div className="flex items-center justify-center h-screen text-white font-mono">
            <div>
                <pre id="loadingScreen" className="whitespace-pre text-xs leading-tight">
                </pre>
            </div>
            <p className="self-center justify-center">Loading ...</p>
        </div>
    );
}