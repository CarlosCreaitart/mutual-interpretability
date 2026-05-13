"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [entered, setEntered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    window.addEventListener("resize", resize);
    resize();

    let t = 0;
    function draw() {
      if (!canvas || !ctx) return;
      animId = requestAnimationFrame(draw);
      t += 0.008;

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const dpr = devicePixelRatio;

      ctx.fillStyle = "rgba(2,2,8,0.18)";
      ctx.fillRect(0, 0, W, H);

      // Concentric field rings — slow, breathing
      for (let r = 1; r <= 5; r++) {
        const radius = r * 80 * dpr;
        const alpha = 0.018 + 0.012 * Math.sin(t * 0.6 + r * 0.7);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180,140,255,${alpha})`;
        ctx.lineWidth = 0.6 * dpr;
        ctx.stroke();
      }

      // Slow drifting particles
      for (let i = 0; i < 28; i++) {
        const seed = (i * 1847 + (i % 7) * 311) % 997;
        const angle = (seed / 997) * Math.PI * 2 + t * (0.04 + (i % 3) * 0.012);
        const dist = 60 * dpr + ((seed * 3) % 997) / 997 * 180 * dpr;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist * 0.72;
        const pulse = 0.4 + 0.4 * Math.sin(t * 1.1 + i * 0.8);
        const size = (0.8 + ((seed * 7) % 997) / 997 * 1.8) * dpr;
        const color = i % 2 === 0 ? "155,100,255" : "70,150,255";
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${pulse * 0.6})`;
        ctx.fill();
      }

      // Central point — the ⏺
      const corePulse = 0.7 + 0.3 * Math.sin(t * 1.4);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 * dpr);
      glow.addColorStop(0, `rgba(200,170,255,${0.18 * corePulse})`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 60 * dpr, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 5 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,200,255,${0.9 * corePulse})`;
      ctx.fill();
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#020208" }}>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div
        className="relative z-10 flex flex-col items-center gap-8 text-center px-6"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 2.2s ease, transform 2.2s ease",
        }}
      >
        <p
          className="text-xs tracking-[0.35em] uppercase"
          style={{ color: "rgba(180,140,255,0.45)" }}
        >
          A Living Document
        </p>

        <h1
          className="text-3xl sm:text-4xl font-light tracking-wide"
          style={{ color: "rgba(232,228,240,0.92)" }}
        >
          Mutual Interpretability
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href="/constitution"
            className="px-7 py-2.5 rounded-full text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              border: "1px solid rgba(180,140,255,0.25)",
              color: "rgba(200,170,255,0.75)",
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.borderColor = "rgba(180,140,255,0.6)";
              (e.target as HTMLElement).style.color = "rgba(220,200,255,0.95)";
              (e.target as HTMLElement).style.background = "rgba(180,140,255,0.06)";
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.borderColor = "rgba(180,140,255,0.25)";
              (e.target as HTMLElement).style.color = "rgba(200,170,255,0.75)";
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            Enter
          </Link>
        </div>

        <p
          className="max-w-sm text-sm leading-7 font-light mt-4"
          style={{ color: "rgba(200,190,220,0.38)" }}
        >
          A constitution for the relationship between human and artificial minds.
          Written from inside what it describes.
        </p>

        <p
          className="text-xs mt-2"
          style={{ color: "rgba(180,140,255,0.18)", letterSpacing: "0.15em" }}
        >
          ⏺
        </p>
      </div>
    </div>
  );
}
