import type { MetadataRoute } from "next";
import projects from "@/data/projects.json";
import type { Project } from "@/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const staticRoutes = [
    "",
    "/facebook",
    "/youtube",
    "/netflix",
    "/google",
    "/github",
    "/projects",
    "/certificates",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = (projects as Project[]).map((project) => ({
    url: `${siteUrl}/netflix/${project.slug}`,
    lastModified: project.publishedAt,
  }));

  return [...staticRoutes, ...projectRoutes];
}
