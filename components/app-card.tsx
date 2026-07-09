"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { iconRegistry, type IconName } from "@/components/icon-registry";

interface AppCardProps {
  href: string;
  title: string;
  description: string;
  icon: IconName;
  accent: string;
  index: number;
}

/**
 * Large "app tile" on the landing dashboard. Tilts toward the cursor and glows
 * on hover — the signature interaction of the whole site.
 */
export function AppCard({
  href,
  title,
  description,
  icon,
  accent,
  index,
}: AppCardProps) {
  const Icon = iconRegistry[icon];
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["20%", "80%"]);

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        className="glass group relative block h-full overflow-hidden rounded-2xl p-6"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(280px circle at ${glowX} ${glowY}, ${accent}22, transparent 70%)`,
          }}
        />
        <div
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border"
          style={{ background: `${accent}14` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
        <h3 className="font-display text-lg text-ink">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          {description}
        </p>
        <span
          className="mt-4 inline-block font-mono text-xs uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: accent }}
        >
          Open →
        </span>
      </motion.a>
    </motion.div>
  );
}
