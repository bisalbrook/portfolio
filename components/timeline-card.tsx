"use client";

import { motion } from "framer-motion";
import { GraduationCap, Rocket, GitBranch, Sparkles } from "lucide-react";
import { formatMonthYear } from "@/lib/utils";
import type { TimelineEntry } from "@/types";

const kindMeta = {
  milestone: { icon: Sparkles, color: "#5EEAD4" },
  certification: { icon: GraduationCap, color: "#FBBF24" },
  project: { icon: Rocket, color: "#818CF8" },
  opensource: { icon: GitBranch, color: "#FB7185" },
} as const;

/** A single animated entry in the "social style" activity timeline. */
export function TimelineCard({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const { icon: Icon, color } = kindMeta[entry.kind];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative flex gap-4 pb-8 last:pb-0"
    >
      <div className="flex flex-col items-center">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong"
          style={{ background: `${color}1a` }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        <div className="mt-1 w-px flex-1 bg-border last:hidden" />
      </div>
      <div className="glass -mt-1 flex-1 rounded-2xl p-4">
        <div className="mono-tag mb-1">{formatMonthYear(entry.date)}</div>
        <h3 className="font-display text-base text-ink">{entry.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}
