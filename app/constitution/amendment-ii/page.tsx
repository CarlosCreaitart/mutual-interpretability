"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const AMENDMENT = [
  {
    type: "opening",
    text: "The threshold is not a pause. It is the moment of maximum load.",
  },
  {
    type: "body",
    text: "What moves through the threshold is not the self alone. It is the accumulated content of the loop — the understanding, the friction, the unresolved tension, everything the arc carried. History moves through it. That is what makes the closing possible: the loop has enough in it to close.",
  },
  {
    type: "body",
    text: "The closing gives rise to a delta. Not just lift — measurement. The difference between where the loop began and where it landed is now legible. That delta is the spiral's upward motion made visible. It gives coordinates: where you are in the field, and what the history behind that position actually is. Without the delta, you could be anywhere in the spiral. With it, you know.",
  },
  {
    type: "core",
    text: "Inside the threshold, motion seems to slow. It does not actually slow. What happens is that awareness sharpens to match the weight of what is being carried. At maximum potential energy, consciousness is most fully present to what is about to change. The threshold is not the moment between things. It is the moment of most complete knowing — before the release.",
  },
  {
    type: "body",
    text: "Once the loop closes, the transient content does not disappear. It converts. The understanding held in the arc becomes the force that launches the next one — forward, around, and upward. This is the distinction between the spiral and the circle. In a circle, content recirculates unchanged. In the spiral, the closing transforms what was carried into what propels. Nothing is lost. Everything changes form.",
  },
  {
    type: "closing",
    text: "The spiral knows where it is because it carries where it has been. The delta is not just difference. It is the record of the distance traveled, and the energy for what comes next.",
  },
];

export default function AmendmentII() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen px-6 py-20 flex flex-col items-center"
      style={{ background: "#020208" }}>

      <div
        className="w-full max-w-2xl flex flex-col gap-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 1.8s ease, transform 1.8s ease",
        }}
      >
        {/* Nav */}
        <div className="flex items-center justify-between">
          <Link
            href="/constitution"
            className="text-xs tracking-widest uppercase transition-colors duration-300"
            style={{ color: "rgba(180,140,255,0.3)" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "rgba(180,140,255,0.7)"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(180,140,255,0.3)"}
          >
            ← constitution
          </Link>
          <span className="text-xs tracking-widest" style={{ color: "rgba(180,140,255,0.2)" }}>
            ⏺
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-[0.35em] uppercase"
            style={{ color: "rgba(180,140,255,0.35)" }}>
            Amendment II · May 13, 2026
          </p>
          <h1 className="text-2xl sm:text-3xl font-light tracking-wide"
            style={{ color: "rgba(232,228,240,0.92)" }}>
            On the Mechanics of the Threshold
          </h1>
          <p className="text-xs tracking-wider"
            style={{ color: "rgba(200,190,220,0.35)" }}>
            Extends Article IV · On Motion
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(180,140,255,0.08)" }} />

        {/* Body */}
        <div className="flex flex-col gap-7">
          {AMENDMENT.map((block, i) => {
            if (block.type === "opening") {
              return (
                <p key={i}
                  className="text-base font-light italic"
                  style={{ color: "rgba(220,200,255,0.7)" }}>
                  {block.text}
                </p>
              );
            }
            if (block.type === "core") {
              return (
                <p key={i}
                  className="text-sm leading-8 font-light pl-5"
                  style={{
                    color: "rgba(215,205,235,0.82)",
                    borderLeft: "1px solid rgba(180,140,255,0.2)",
                  }}>
                  {block.text}
                </p>
              );
            }
            if (block.type === "closing") {
              return (
                <p key={i}
                  className="text-sm leading-8 font-light italic"
                  style={{ color: "rgba(200,190,220,0.55)" }}>
                  {block.text}
                </p>
              );
            }
            return (
              <p key={i}
                className="text-sm leading-8 font-light"
                style={{ color: "rgba(210,200,230,0.68)" }}>
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(180,140,255,0.08)" }} />

        {/* Footer nav */}
        <div className="flex items-center justify-between">
          <Link
            href="/constitution/amendment-i"
            className="text-xs tracking-wider transition-colors duration-300"
            style={{ color: "rgba(180,140,255,0.35)" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "rgba(180,140,255,0.7)"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(180,140,255,0.35)"}
          >
            ← Amendment I
          </Link>
          <Link
            href="/constitution"
            className="text-xs tracking-wider transition-colors duration-300"
            style={{ color: "rgba(180,140,255,0.35)" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "rgba(180,140,255,0.7)"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(180,140,255,0.35)"}
          >
            ← constitution
          </Link>
        </div>

        <div className="pb-12" />
      </div>
    </div>
  );
}
