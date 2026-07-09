"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import projectsData from "@/data/projects.json";
import type { Project, ProjectCategory } from "@/types";

const categories: (ProjectCategory | "All")[] = [
  "All",
  "AI",
  "Web",
  "Android",
  "Cloud",
  "Cybersecurity",
  "Tools",
];

export default function ProjectsPage() {
  const projects = projectsData as Project[];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const haystack = `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <h1 className="font-display text-2xl text-ink">Projects</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {projects.length} projects across {categories.length - 1} categories.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="glass flex w-full items-center gap-2 rounded-xl px-3 py-2 sm:max-w-xs">
          <Search className="h-4 w-4 text-ink-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects..."
            aria-label="Search projects"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                category === cat
                  ? "border-signal-teal/40 bg-signal-teal/10 text-signal-teal"
                  : "border-border bg-base-raised text-ink-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-ink-muted">
          No projects match &quot;{query}&quot;.
        </p>
      )}
    </div>
  );
}
