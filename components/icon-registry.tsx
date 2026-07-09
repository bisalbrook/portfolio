import {
  Users,
  PlaySquare,
  Clapperboard,
  Search,
  Github,
  FolderKanban,
  Award,
  MessageSquare,
  Star,
  GitFork,
  GitPullRequest,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Icon components can't cross the Server -> Client Component boundary as
 * props (React can only serialize plain data there, not function
 * references). Server pages instead pass an icon *name* string, and this
 * client-safe map resolves it to the real component inside whichever
 * client component renders it.
 */
export const iconRegistry = {
  Users,
  PlaySquare,
  Clapperboard,
  Search,
  Github,
  FolderKanban,
  Award,
  MessageSquare,
  Star,
  GitFork,
  GitPullRequest,
  Clock,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;
