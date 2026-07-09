import Image from "next/image";
import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { WindowFrame } from "@/components/window-frame";
import { SkillBar } from "@/components/skill-bar";
import { TimelineCard } from "@/components/timeline-card";
import profile from "@/data/profile.json";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import achievements from "@/data/achievements.json";
import skills from "@/data/skills.json";
import timeline from "@/data/timeline.json";
import projects from "@/data/projects.json";
import type { SkillGroup, TimelineEntry, Project } from "@/types";

export const metadata = { title: "Profile" };

export default function FacebookPage() {
  const skillData = skills as SkillGroup[];
  const timelineData = (timeline as TimelineEntry[]).slice().reverse();
  const featuredProjects = (projects as Project[])
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6">
      {/* Cover + profile header */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="relative h-40 w-full bg-gradient-to-br from-signal-indigo/30 via-base-panel to-signal-teal/20 sm:h-56">
          <div className="absolute inset-0 bg-grid-faint bg-grid opacity-40" />
        </div>
        <div className="relative px-6 pb-6">
          <div className="-mt-14 h-28 w-28 overflow-hidden rounded-2xl border-4 border-base shadow-xl sm:h-32 sm:w-32">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="mt-4 font-display text-2xl text-ink">{profile.name}</h1>
          <p className="text-signal-teal">{profile.title}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {profile.tagline}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Experience */}
          <WindowFrame label="experience.log">
            <div className="space-y-5">
              {(experience as {
                role: string;
                company: string;
                period: string;
                description: string;
              }[]).map((job) => (
                <div key={job.role} className="flex gap-3">
                  <Briefcase className="mt-1 h-4 w-4 shrink-0 text-signal-indigo" />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-display text-sm text-ink">
                        {job.role}
                      </h3>
                      <span className="text-sm text-ink-muted">
                        · {job.company}
                      </span>
                    </div>
                    <p className="mono-tag mt-0.5">{job.period}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </WindowFrame>

          {/* Timeline */}
          <WindowFrame label="activity — timeline.json">
            <div>
              {timelineData.map((entry, index) => (
                <TimelineCard key={entry.id} entry={entry} index={index} />
              ))}
            </div>
          </WindowFrame>

          {/* Featured projects */}
          <WindowFrame label="pinned projects">
            <div className="grid gap-4 sm:grid-cols-3">
              {featuredProjects.map((project) => (
                <a
                  key={project.slug}
                  href={`/netflix/${project.slug}`}
                  className="group rounded-xl border border-border p-3 transition-colors hover:border-signal-teal/40"
                >
                  <div className="relative h-20 w-full overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="mt-2 text-sm text-ink">{project.title}</h4>
                </a>
              ))}
            </div>
          </WindowFrame>
        </div>

        <div className="space-y-6">
          {/* Education */}
          <WindowFrame label="education">
            {(education as { school: string; degree: string; period: string }[]).map(
              (edu) => (
                <div key={edu.school} className="flex gap-3">
                  <GraduationCap className="mt-1 h-4 w-4 shrink-0 text-signal-amber" />
                  <div>
                    <h3 className="font-display text-sm text-ink">
                      {edu.school}
                    </h3>
                    <p className="text-sm text-ink-muted">{edu.degree}</p>
                    <p className="mono-tag mt-0.5">{edu.period}</p>
                  </div>
                </div>
              )
            )}
          </WindowFrame>

          {/* Achievements */}
          <WindowFrame label="achievements">
            <ul className="space-y-3">
              {(achievements as string[]).map((item) => (
                <li key={item} className="flex gap-2 text-sm text-ink-muted">
                  <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-signal-rose" />
                  {item}
                </li>
              ))}
            </ul>
          </WindowFrame>

          {/* Skills */}
          <WindowFrame label="skills.json">
            <div className="space-y-5">
              {skillData.map((group) => (
                <div key={group.category}>
                  <h3 className="mono-tag mb-3">{group.category}</h3>
                  <div className="space-y-3">
                    {group.skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </WindowFrame>
        </div>
      </div>
    </div>
  );
}
