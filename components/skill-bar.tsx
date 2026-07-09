"use client";

import { motion } from "framer-motion";

/** Animated proficiency bar that fills in when scrolled into view. */
export function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-ink">{name}</span>
        <span className="font-mono text-xs text-ink-muted">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-raised">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-signal-indigo to-signal-teal"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
