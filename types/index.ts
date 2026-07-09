export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl: string;
  github: string;
  linkedin: string;
  avatar: string;
}

export type ProjectCategory =
  | "AI"
  | "Web"
  | "Android"
  | "Cloud"
  | "Cybersecurity"
  | "Tools";

export type ProjectDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type ProjectStatus = "Live" | "In Progress" | "Archived";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  technologies: string[];
  github: string;
  demo?: string;
  duration: string;
  difficulty: ProjectDifficulty;
  category: ProjectCategory;
  status: ProjectStatus;
  featured?: boolean;
  trending?: boolean;
  stars: number;
  architecture: string;
  lessonsLearned: string[];
  publishedAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  provider: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  image: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  kind: "milestone" | "certification" | "project" | "opensource";
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
}

export interface Repository {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}
