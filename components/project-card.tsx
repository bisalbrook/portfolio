"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Gauge } from "lucide-react";
import type { Project } from "@/types";

const statusColor: Record<Project["status"], string> = {
  Live: "#5EEAD4",
  "In Progress": "#FBBF24",
  Archived: "#8B93A7",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
    >
      <Link
        href={`/netflix/${project.slug}`}
        className="group glass block h-full overflow-hidden rounded-2xl transition-colors hover:border-signal-teal/40"
      >
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="360px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className="absolute right-2 top-2 rounded-full px-2 py-0.5 font-mono text-[10px]"
            style={{
              background: `${statusColor[project.status]}22`,
              color: statusColor[project.status],
            }}
          >
            {project.status}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm text-ink">{project.title}</h3>
            <span className="flex items-center gap-1 font-mono text-xs text-signal-amber">
              <Star className="h-3 w-3" /> {project.stars}
            </span>
          </div>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-ink-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[11px] text-ink-faint">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {project.duration}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="h-3 w-3" /> {project.difficulty}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
