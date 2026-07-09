"use client";

import { motion } from "framer-motion";
import { iconRegistry, type IconName } from "@/components/icon-registry";

/** Single metric tile for the YouTube-style analytics dashboard. */
export function StatCard({
  label,
  value,
  icon,
  accent,
  index,
}: {
  label: string;
  value: string;
  icon: IconName;
  accent: string;
  index: number;
}) {
  const Icon = iconRegistry[icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <span className="mono-tag">{label}</span>
        <Icon className="h-4 w-4" style={{ color: accent }} />
      </div>
      <p className="mt-3 font-display text-2xl text-ink">{value}</p>
    </motion.div>
  );
}
