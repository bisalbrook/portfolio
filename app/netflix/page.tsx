import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Info } from "lucide-react";
import { ProjectRow } from "@/components/project-row";
import projects from "@/data/projects.json";
import type { Project } from "@/types";

export const metadata = { title: "Showcase" };

export default function NetflixPage() {
  const projectData = projects as Project[];
  const hero = projectData.find((p) => p.featured) ?? projectData[0];
  const inProgress = projectData.filter((p) => p.status === "In Progress");
  const featured = projectData.filter((p) => p.featured);
  const trending = projectData.filter((p) => p.trending);
  const byCategory = (category: Project["category"]) =>
    projectData.filter((p) => p.category === category);

  return (
    <div className="pb-6">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/80 via-base/20 to-transparent" />
        <div className="absolute bottom-10 left-4 max-w-xl sm:left-8">
          <span className="mono-tag text-signal-teal">featured build</span>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            {hero.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            {hero.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/netflix/${hero.slug}`}
              className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-base transition-transform hover:scale-[1.03]"
            >
              <PlayCircle className="h-4 w-4" /> View project
            </Link>
            <Link
              href={`/netflix/${hero.slug}`}
              className="flex items-center gap-2 rounded-xl border border-border bg-base-raised/80 px-5 py-2.5 text-sm text-ink backdrop-blur transition-colors hover:border-signal-teal/40"
            >
              <Info className="h-4 w-4" /> More info
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-6 max-w-6xl px-4">
        {inProgress.length > 0 && (
          <ProjectRow title="Continue Building" projects={inProgress} />
        )}
        <ProjectRow title="Featured Projects" projects={featured} />
        <ProjectRow title="Trending Now" projects={trending} />
        <ProjectRow
          title="Latest Projects"
          projects={[...projectData]
            .sort(
              (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            )
            .slice(0, 6)}
        />
        <ProjectRow title="AI Projects" projects={byCategory("AI")} />
        <ProjectRow title="Android Apps" projects={byCategory("Android")} />
        <ProjectRow title="Web Apps" projects={byCategory("Web")} />
        <ProjectRow title="Cloud Projects" projects={byCategory("Cloud")} />
      </div>
    </div>
  );
}
