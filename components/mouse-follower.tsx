"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/** A soft glow that trails the cursor. Desktop only — skipped on touch devices and reduced motion. */
export function MouseFollower() {
  const isDesktop = useMediaQuery("(min-width: 768px) and (pointer: fine)");
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(isDesktop && !prefersReducedMotion);
  }, [isDesktop]);

  useEffect(() => {
    if (!enabled) return;
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX - 150);
      y.set(event.clientY - 150);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[300px] w-[300px] rounded-full bg-signal-teal/[0.06] blur-3xl"
      style={{ x: springX, y: springY }}
    />
  );
}
