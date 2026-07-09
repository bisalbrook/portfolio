"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const LEVEL_COLORS = [
  "rgba(231,234,240,0.06)",
  "rgba(94,234,212,0.25)",
  "rgba(94,234,212,0.5)",
  "rgba(94,234,212,0.75)",
  "rgba(94,234,212,1)",
];

/** Deterministic pseudo-random contribution level so SSR and client output match. */
function levelFor(seed: number) {
  const value = Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1;
  if (value > 0.94) return 4;
  if (value > 0.85) return 3;
  if (value > 0.68) return 2;
  if (value > 0.45) return 1;
  return 0;
}

/** GitHub-style contribution heatmap — 52 weeks x 7 days, generated locally (no API needed). */
export function ContributionHeatmap() {
  const weeks = useMemo(() => {
    return Array.from({ length: 52 }, (_, weekIndex) =>
      Array.from({ length: 7 }, (_, dayIndex) => levelFor(weekIndex * 7 + dayIndex))
    );
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((level, dayIndex) => (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (weekIndex * 7 + dayIndex) * 0.0015 }}
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{ background: LEVEL_COLORS[level] }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5">
        <span className="mono-tag mr-1">less</span>
        {LEVEL_COLORS.map((color) => (
          <span key={color} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: color }} />
        ))}
        <span className="mono-tag ml-1">more</span>
      </div>
    </div>
  );
}
