"use client";

import { useEffect, useRef, useState } from "react";

/** Load an image, strip near-white pixels, return transparent PNG data URL */
function removeWhiteBackground(src: string): Promise<string> {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const offscreen = document.createElement("canvas");
            offscreen.width = img.width;
            offscreen.height = img.height;
            const c = offscreen.getContext("2d")!;
            c.drawImage(img, 0, 0);
            const data = c.getImageData(0, 0, img.width, img.height);
            const d = data.data;
            for (let i = 0; i < d.length; i += 4) {
                if (d[i] > 210 && d[i + 1] > 210 && d[i + 2] > 210) {
                    d[i + 3] = 0;
                }
            }
            c.putImageData(data, 0, 0);
            resolve(offscreen.toDataURL("image/png"));
        };
        img.src = src;
    });
}

export default function PencilCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pencilRef = useRef<HTMLDivElement>(null);
    const [processedSrc, setProcessedSrc] = useState<string | null>(null);

    useEffect(() => {
        removeWhiteBackground("/images/pencil.jpg").then(setProcessedSrc);
    }, []);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const canvas = canvasRef.current;
        const pencilEl = pencilRef.current;
        if (!canvas || !pencilEl) return;

        const ctx = canvas.getContext("2d")!;

        // Trail points: each has position + individual opacity
        const trail: Array<{ x: number; y: number; opacity: number }> = [];
        const MAX_TRAIL = 80;
        const FADE_SPEED = 0.04; // how fast trail vanishes per frame

        // The pencil tip is offset from the cursor position.
        // Adjust these to match where the tip sits in your pencil.jpg.
        // Pencil.jpg is typically shown diagonally (~45°), tip at bottom-right corner.
        const TIP_OFFSET_X = 0; // px from cursor X
        const TIP_OFFSET_Y = 0; // px from cursor Y

        let curX = -500, curY = -500;
        let raf: number;

        function resize() {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        function onMouseMove(e: MouseEvent) {
            curX = e.clientX + TIP_OFFSET_X;
            curY = e.clientY + TIP_OFFSET_Y;

            // Move pencil image (no rotation — stays fixed angle)
            pencilEl!.style.left = `${e.clientX}px`;
            pencilEl!.style.top = `${e.clientY}px`;

            // Add trail point at the tip
            trail.push({ x: curX, y: curY, opacity: 1 });
            while (trail.length > MAX_TRAIL) trail.shift();
        }
        window.addEventListener("mousemove", onMouseMove);

        function draw() {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height);

            // Fade and prune
            for (let i = trail.length - 1; i >= 0; i--) {
                trail[i].opacity -= FADE_SPEED;
                if (trail[i].opacity <= 0) trail.splice(i, 1);
            }

            // Draw segments — each inherits the opacity of its start point
            for (let i = 1; i < trail.length; i++) {
                const t0 = trail[i - 1];
                const t1 = trail[i];
                const opacity = Math.min(t0.opacity, t1.opacity);
                if (opacity <= 0) continue;

                ctx.beginPath();
                ctx.moveTo(t0.x, t0.y);
                ctx.lineTo(t1.x, t1.y);
                ctx.strokeStyle = `rgba(20, 20, 20, ${opacity})`;
                ctx.lineWidth = 1.8;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();
            }

            raf = requestAnimationFrame(draw);
        }
        raf = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            {/* Trail canvas */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-[9998]"
            />

            {/* Pencil image — static angle, tip at cursor */}
            <div
                ref={pencilRef}
                className="fixed pointer-events-none z-[9999]"
                style={{
                    top: 0,
                    left: 0,
                    // No transformOrigin rotation — pencil stays at its natural angle
                }}
            >
                {processedSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={processedSrc}
                        alt=""
                        style={{
                            width: "64px",
                            height: "auto",
                            display: "block",
                            // Offset so the pencil tip (top-right of the image) sits at cursor.
                            // Adjust translate values to fine-tune tip alignment.
                            transform: "translate(-96%, -4%)",
                            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))",
                            userSelect: "none",
                        }}
                    />
                )}
            </div>
        </>
    );
}
