import projects from "@/data/projects.json";
import certificates from "@/data/certificates.json";
import skills from "@/data/skills.json";
import type { Project, Certificate, SkillGroup } from "@/types";

export interface SearchResult {
  kind: "project" | "certificate" | "skill";
  title: string;
  subtitle: string;
  href: string;
}

const projectData = projects as Project[];
const certificateData = certificates as Certificate[];
const skillData = skills as SkillGroup[];

/**
 * Local, dependency-free search across projects, certificates, and skills.
 * No backend — everything runs against the JSON already shipped with the app.
 */
export function searchPortfolio(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const project of projectData) {
    const haystack = [
      project.title,
      project.description,
      project.category,
      ...project.technologies,
    ]
      .join(" ")
      .toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        kind: "project",
        title: project.title,
        subtitle: project.description,
        href: `/netflix/${project.slug}`,
      });
    }
  }

  for (const cert of certificateData) {
    const haystack = `${cert.title} ${cert.provider}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        kind: "certificate",
        title: cert.title,
        subtitle: cert.provider,
        href: "/certificates",
      });
    }
  }

  for (const group of skillData) {
    for (const skill of group.skills) {
      if (skill.name.toLowerCase().includes(q)) {
        results.push({
          kind: "skill",
          title: skill.name,
          subtitle: `${group.category} · ${skill.level}% proficiency`,
          href: "/facebook",
        });
      }
    }
  }

  return results;
}
