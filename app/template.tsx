"use client";

import { motion } from "framer-motion";

/**
 * Next.js re-mounts `template.tsx` on every navigation (unlike layout.tsx),
 * which is what lets us animate each "app window" in and out via the App Router.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
