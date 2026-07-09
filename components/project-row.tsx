"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types";

/** A horizontally scrolling "row" of project cards, Netflix catalogue style. */
export function ProjectRow({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  if (projects.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-3 font-display text-lg text-ink">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="w-56 shrink-0"
          >
            <Link
              href={`/netflix/${project.slug}`}
              className="group block overflow-hidden rounded-xl border border-border transition-colors hover:border-signal-teal/40"
            >
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-ink">
                  {project.status}
                </span>
              </div>
              <div className="bg-base-panel p-3">
                <h3 className="truncate text-sm text-ink">{project.title}</h3>
                <p className="mono-tag mt-1">{project.category}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
