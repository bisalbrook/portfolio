import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Clock,
  Gauge,
  Star,
  Lightbulb,
} from "lucide-react";
import { WindowFrame } from "@/components/window-frame";
import projects from "@/data/projects.json";
import type { Project } from "@/types";

const projectData = projects as Project[];

export function generateStaticParams() {
  return projectData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectData.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectData.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="pb-10">
      <div className="relative h-[42vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
        <Link
          href="/netflix"
          className="absolute left-4 top-6 flex items-center gap-2 rounded-xl bg-base-raised/80 px-3 py-1.5 text-sm text-ink backdrop-blur transition-colors hover:text-signal-teal sm:left-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to showcase
        </Link>
        <div className="absolute bottom-8 left-4 right-4 sm:left-8">
          <span className="mono-tag text-signal-teal">{project.category}</span>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-6 px-4 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <WindowFrame label="description">
            <p className="text-sm leading-relaxed text-ink-muted">
              {project.longDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-base-raised px-4 py-2 text-sm text-ink transition-colors hover:border-signal-teal/40 hover:text-signal-teal"
              >
                <Github className="h-4 w-4" /> Source
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-signal-teal px-4 py-2 text-sm font-medium text-base transition-transform hover:scale-[1.03]"
                >
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              )}
            </div>
          </WindowFrame>

          <WindowFrame label="architecture">
            <p className="text-sm leading-relaxed text-ink-muted">
              {project.architecture}
            </p>
          </WindowFrame>

          <WindowFrame label="lessons learned">
            <ul className="space-y-2">
              {project.lessonsLearned.map((lesson) => (
                <li key={lesson} className="flex gap-2 text-sm text-ink-muted">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-signal-amber" />
                  {lesson}
                </li>
              ))}
            </ul>
          </WindowFrame>

          {project.gallery.length > 0 && (
            <WindowFrame label="gallery">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.gallery.map((src, index) => (
                  <div
                    key={src + index}
                    className="relative h-28 overflow-hidden rounded-xl border border-border"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </WindowFrame>
          )}
        </div>

        <div className="space-y-6">
          <WindowFrame label="details">
            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-ink-muted">
                  <Clock className="h-4 w-4" /> Duration
                </dt>
                <dd className="text-ink">{project.duration}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-ink-muted">
                  <Gauge className="h-4 w-4" /> Difficulty
                </dt>
                <dd className="text-ink">{project.difficulty}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-ink-muted">
                  <Star className="h-4 w-4" /> Stars
                </dt>
                <dd className="text-ink">{project.stars}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-muted">Status</dt>
                <dd className="text-ink">{project.status}</dd>
              </div>
            </dl>
          </WindowFrame>

          <WindowFrame label="technologies">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-base-raised px-2.5 py-1 font-mono text-xs text-ink-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </WindowFrame>
        </div>
      </div>
    </div>
  );
}
