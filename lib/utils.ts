import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely, resolving conflicts (last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an ISO date like 2024-03 into "Mar 2024". */
export function formatMonthYear(iso: string) {
  const [year, month] = iso.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Accent color per "app". Lives in a plain module (no "use client") so
 * Server Components can call it directly during render — functions exported
 * from a "use client" file can only be used as JSX, never invoked inline
 * from server code.
 */
export function accentColorFor(name: string) {
  const map: Record<string, string> = {
    facebook: "#818CF8",
    youtube: "#FB7185",
    netflix: "#FB7185",
    google: "#5EEAD4",
    github: "#E7EAF0",
    projects: "#5EEAD4",
    certificates: "#FBBF24",
    contact: "#818CF8",
  };
  return map[name] ?? "#5EEAD4";
}
