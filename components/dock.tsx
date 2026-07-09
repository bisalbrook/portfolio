"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Users,
  PlaySquare,
  Clapperboard,
  Search,
  Github,
  FolderKanban,
  Award,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/facebook", label: "Profile", icon: Users },
  { href: "/youtube", label: "Analytics", icon: PlaySquare },
  { href: "/netflix", label: "Showcase", icon: Clapperboard },
  { href: "/google", label: "Search", icon: Search },
  { href: "/github", label: "Code", icon: Github },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/contact", label: "Contact", icon: Mail },
];

/** Persistent bottom dock — the primary way to move between "apps" without a page reload. */
export function Dock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
    >
      <div className="glass-strong flex items-center gap-1 rounded-2xl px-2 py-2 shadow-2xl shadow-black/40">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className="group relative flex flex-col items-center rounded-xl px-3 py-2"
            >
              {active && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-xl bg-signal-teal/10 border border-signal-teal/30"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <Icon
                className={cn(
                  "relative h-5 w-5 transition-colors",
                  active
                    ? "text-signal-teal"
                    : "text-ink-muted group-hover:text-ink"
                )}
              />
              <span
                className={cn(
                  "relative mt-1 hidden font-mono text-[10px] uppercase tracking-wide sm:block",
                  active ? "text-signal-teal" : "text-ink-faint"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
