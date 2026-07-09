"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FolderKanban, Award, Users, Github, Mail } from "lucide-react";
import projects from "@/data/projects.json";
import type { Project } from "@/types";

const staticDestinations = [
  { label: "Dashboard", href: "/", icon: Search },
  { label: "Profile (Facebook-style)", href: "/facebook", icon: Users },
  { label: "Analytics (YouTube-style)", href: "/youtube", icon: FolderKanban },
  { label: "Showcase (Netflix-style)", href: "/netflix", icon: FolderKanban },
  { label: "Search (Google-style)", href: "/google", icon: Search },
  { label: "Code (GitHub-style)", href: "/github", icon: Github },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Certificates", href: "/certificates", icon: Award },
  { label: "Contact", href: "/contact", icon: Mail },
];

const projectData = projects as Project[];

/** Global Ctrl+K / Cmd+K command menu for jumping to any section or project instantly. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-24 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg px-4">
        <Command className="glass-strong overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="h-4 w-4 text-ink-muted" />
            <Command.Input
              autoFocus
              placeholder="Jump to a page or project..."
              className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-ink-faint"
            />
            <kbd className="mono-tag rounded border border-border px-1.5 py-0.5">
              esc
            </kbd>
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-ink-muted">
              No matches.
            </Command.Empty>
            <Command.Group heading="Navigate" className="mono-tag px-3 pb-1 pt-2">
              {staticDestinations.map(({ label, href, icon: Icon }) => (
                <Command.Item
                  key={href}
                  onSelect={() => go(href)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink data-[selected=true]:bg-signal-teal/10"
                >
                  <Icon className="h-4 w-4 text-signal-teal" />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>
            <Command.Group heading="Projects" className="mono-tag px-3 pb-1 pt-3">
              {projectData.map((project) => (
                <Command.Item
                  key={project.slug}
                  onSelect={() => go(`/netflix/${project.slug}`)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink data-[selected=true]:bg-signal-teal/10"
                >
                  <FolderKanban className="h-4 w-4 text-signal-indigo" />
                  {project.title}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
