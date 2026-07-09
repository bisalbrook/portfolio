import { GitFork, Star, GitCommitHorizontal } from "lucide-react";
import { WindowFrame } from "@/components/window-frame";
import { StatCard } from "@/components/stat-card";
import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { getGithubProfileData } from "@/lib/github";
import skills from "@/data/skills.json";
import type { SkillGroup } from "@/types";

export const metadata = { title: "Code" };

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00ADD8",
  Python: "#3572A5",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Java: "#b07219",
};

export default async function GithubPage() {
  const data = await getGithubProfileData();
  const totalStars = data.repositories.reduce((sum, r) => sum + r.stars, 0);
  const skillData = skills as SkillGroup[];
  const infraSkills =
    skillData.find((g) => g.category === "Infrastructure")?.skills ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Code</h1>
        <span className="mono-tag">
          {data.isLive ? `live — @${data.username}` : "sample data — set GITHUB_USERNAME"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          label="Followers"
          value={String(data.followers)}
          icon="Users"
          accent="#5EEAD4"
          index={0}
        />
        <StatCard
          label="Following"
          value={String(data.following)}
          icon="GitFork"
          accent="#818CF8"
          index={1}
        />
        <StatCard
          label="Public Repos"
          value={String(data.publicRepos)}
          icon="GitPullRequest"
          accent="#FBBF24"
          index={2}
        />
        <StatCard
          label="Total Stars"
          value={String(totalStars)}
          icon="Star"
          accent="#FB7185"
          index={3}
        />
      </div>

      <div className="mt-6">
        <WindowFrame label="contribution activity">
          <div className="flex items-center gap-2 mb-4">
            <GitCommitHorizontal className="h-4 w-4 text-signal-teal" />
            <span className="text-sm text-ink-muted">
              A rolling year of local activity
            </span>
          </div>
          <ContributionHeatmap />
        </WindowFrame>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WindowFrame label="pinned repositories">
            <div className="grid gap-3 sm:grid-cols-2">
              {data.repositories.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border p-4 transition-colors hover:border-signal-teal/40"
                >
                  <h3 className="font-display text-sm text-ink">{repo.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-muted">
                    {repo.description}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-ink-muted">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background: LANGUAGE_COLORS[repo.language] ?? "#8B93A7",
                        }}
                      />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" /> {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </WindowFrame>
        </div>

        <div className="space-y-6">
          <WindowFrame label="tech stack">
            <div className="space-y-2">
              {infraSkills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between text-sm">
                  <span className="text-ink">{skill.name}</span>
                  <span className="font-mono text-xs text-ink-muted">
                    {skill.level}%
                  </span>
                </div>
              ))}
            </div>
          </WindowFrame>

          <WindowFrame label="open source">
            <p className="text-sm leading-relaxed text-ink-muted">
              Regular contributor to libraries used in production — mostly
              fixes, docs, and the occasional new feature when something is
              missing that I need myself.
            </p>
          </WindowFrame>
        </div>
      </div>
    </div>
  );
}
