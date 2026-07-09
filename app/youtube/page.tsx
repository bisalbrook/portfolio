import {
  Star,
  TrendingUp,
  Sparkles,
  Activity,
} from "lucide-react";
import Image from "next/image";
import { WindowFrame } from "@/components/window-frame";
import { StatCard } from "@/components/stat-card";
import type { IconName } from "@/components/icon-registry";
import {
  TechnologyUsageChart,
  LanguagesUsedChart,
} from "@/components/analytics-charts";
import projects from "@/data/projects.json";
import certificates from "@/data/certificates.json";
import timeline from "@/data/timeline.json";
import type { Project, TimelineEntry } from "@/types";
import { formatMonthYear } from "@/lib/utils";

export const metadata = { title: "Analytics" };

function buildTechnologyUsage(projectData: Project[]) {
  const counts = new Map<string, number>();
  for (const project of projectData) {
    for (const tech of project.technologies) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }
  return Array.from(counts, ([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function buildLanguageUsage(projectData: Project[]) {
  const primaryLanguageByCategory: Record<string, string> = {
    AI: "Python",
    Web: "TypeScript",
    Android: "Kotlin / Dart",
    Cloud: "Go",
    Cybersecurity: "Go",
    Tools: "TypeScript",
  };
  const counts = new Map<string, number>();
  for (const project of projectData) {
    const lang = primaryLanguageByCategory[project.category] ?? project.technologies[0];
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
  }
  return Array.from(counts, ([name, value]) => ({ name, value }));
}

export default function YoutubePage() {
  const projectData = projects as Project[];
  const timelineData = timeline as TimelineEntry[];
  const totalStars = projectData.reduce((sum, p) => sum + p.stars, 0);
  const mostPopular = [...projectData].sort((a, b) => b.stars - a.stars)[0];
  const latest = [...projectData].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )[0];
  const recentActivity = [...timelineData].reverse().slice(0, 4);

  const stats: {
    label: string;
    value: string;
    icon: IconName;
    accent: string;
  }[] = [
    {
      label: "Projects Published",
      value: String(projectData.length),
      icon: "FolderKanban",
      accent: "#5EEAD4",
    },
    {
      label: "GitHub Stars",
      value: totalStars.toLocaleString(),
      icon: "Star",
      accent: "#FBBF24",
    },
    {
      label: "Visitors (30d)",
      value: "4,812",
      icon: "Users",
      accent: "#818CF8",
    },
    {
      label: "Certificates",
      value: String((certificates as unknown[]).length),
      icon: "Award",
      accent: "#FB7185",
    },
    {
      label: "Coding Hours",
      value: "2,340+",
      icon: "Clock",
      accent: "#5EEAD4",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <div className="mb-6 flex items-center gap-2">
        <Activity className="h-5 w-5 text-signal-rose" />
        <h1 className="font-display text-2xl text-ink">Creator Analytics</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WindowFrame label="most popular project">
          <a href={`/netflix/${mostPopular.slug}`} className="group block">
            <div className="relative h-40 w-full overflow-hidden rounded-xl">
              <Image
                src={mostPopular.image}
                alt={mostPopular.title}
                fill
                sizes="500px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-panel via-transparent" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-display text-base text-ink">
                {mostPopular.title}
              </h3>
              <span className="flex items-center gap-1 font-mono text-xs text-signal-amber">
                <Star className="h-3.5 w-3.5" /> {mostPopular.stars}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{mostPopular.description}</p>
          </a>
        </WindowFrame>

        <WindowFrame label="latest project">
          <a href={`/netflix/${latest.slug}`} className="group block">
            <div className="relative h-40 w-full overflow-hidden rounded-xl">
              <Image
                src={latest.image}
                alt={latest.title}
                fill
                sizes="500px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-panel via-transparent" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-display text-base text-ink">{latest.title}</h3>
              <span className="mono-tag flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> {formatMonthYear(latest.publishedAt.slice(0, 7))}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{latest.description}</p>
          </a>
        </WindowFrame>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WindowFrame label="technology usage across projects">
          <TechnologyUsageChart data={buildTechnologyUsage(projectData)} />
        </WindowFrame>
        <WindowFrame label="primary languages">
          <LanguagesUsedChart data={buildLanguageUsage(projectData)} />
        </WindowFrame>
      </div>

      <div className="mt-6">
        <WindowFrame label="recent activity">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-signal-teal" />
          </div>
          <ul className="divide-y divide-border">
            {recentActivity.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between py-3 text-sm">
                <span className="text-ink">{entry.title}</span>
                <span className="mono-tag">
                  {formatMonthYear(entry.date)}
                </span>
              </li>
            ))}
          </ul>
        </WindowFrame>
      </div>
    </div>
  );
}
