import Image from "next/image";
import {
  MapPin,
  Mail,
  Download,
  Github,
  Linkedin,
  MessageSquare,
} from "lucide-react";
import { WindowFrame } from "@/components/window-frame";
import { AppCard } from "@/components/app-card";
import { accentColorFor } from "@/lib/utils";
import type { IconName } from "@/components/icon-registry";
import profile from "@/data/profile.json";

const apps: {
  key: string;
  href: string;
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    key: "facebook",
    href: "/facebook",
    title: "Profile",
    description: "About me, experience, education, and a timeline of milestones.",
    icon: "Users",
  },
  {
    key: "youtube",
    href: "/youtube",
    title: "Analytics",
    description: "A creator-style dashboard of stats, charts, and recent activity.",
    icon: "PlaySquare",
  },
  {
    key: "netflix",
    href: "/netflix",
    title: "Showcase",
    description: "Every project presented like a streaming catalogue, browse by category.",
    icon: "Clapperboard",
  },
  {
    key: "google",
    href: "/google",
    title: "Search",
    description: 'Type "Flutter", "AWS", or "Docker" — instant local search, no backend.',
    icon: "Search",
  },
  {
    key: "github",
    href: "/github",
    title: "Code",
    description: "Contribution activity, pinned repos, and a language breakdown.",
    icon: "Github",
  },
  {
    key: "projects",
    href: "/projects",
    title: "Projects",
    description: "A filterable grid of everything I've shipped, with tech and status.",
    icon: "FolderKanban",
  },
  {
    key: "certificates",
    href: "/certificates",
    title: "Certificates",
    description: "Verified credentials with provider, date, and quick-preview.",
    icon: "Award",
  },
  {
    key: "contact",
    href: "/contact",
    title: "Contact",
    description: "A real form with validation — send a message directly.",
    icon: "MessageSquare",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:pt-16">
      <WindowFrame label="~/dashboard — status: online">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-border-strong sm:h-32 sm:w-32">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="128px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1">
            <div className="mono-tag mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-teal animate-pulse-ring" />
              available for work
            </div>
            <h1 className="font-display text-3xl text-ink sm:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-signal-teal">{profile.title}</p>
            <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-ink-muted sm:text-base">
              {profile.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 transition-colors hover:text-signal-teal"
              >
                <Mail className="h-4 w-4" /> {profile.email}
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={profile.resumeUrl}
                download
                className="flex items-center gap-2 rounded-xl bg-signal-teal px-4 py-2 text-sm font-medium text-base transition-transform hover:scale-[1.03]"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-base-raised px-4 py-2 text-sm text-ink transition-colors hover:border-signal-teal/40 hover:text-signal-teal"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-base-raised px-4 py-2 text-sm text-ink transition-colors hover:border-signal-teal/40 hover:text-signal-teal"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="/contact"
                className="flex items-center gap-2 rounded-xl border border-signal-teal/30 bg-signal-teal/10 px-4 py-2 text-sm text-signal-teal transition-colors hover:bg-signal-teal/20"
              >
                <MessageSquare className="h-4 w-4" /> Contact me
              </a>
            </div>
          </div>
        </div>
      </WindowFrame>

      <div className="mt-6 mb-4 flex items-center gap-2">
        <span className="mono-tag">apps</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {apps.map((app, index) => (
          <AppCard
            key={app.key}
            href={app.href}
            title={app.title}
            description={app.description}
            icon={app.icon}
            accent={accentColorFor(app.key)}
            index={index}
          />
        ))}
      </div>

      <p className="mt-10 text-center font-mono text-xs text-ink-faint">
        press <kbd className="rounded border border-border px-1.5 py-0.5">Ctrl</kbd>{" "}
        + <kbd className="rounded border border-border px-1.5 py-0.5">K</kbd> to
        open the command palette
      </p>
    </div>
  );
}
