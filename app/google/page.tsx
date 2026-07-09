"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, FolderKanban, Award, Sparkles } from "lucide-react";
import { searchPortfolio } from "@/lib/search";
import profile from "@/data/profile.json";

const suggestions = ["Flutter", "AWS", "Docker", "Android", "Kubernetes", "React"];

const kindIcon = {
  project: FolderKanban,
  certificate: Award,
  skill: Sparkles,
};

export default function GooglePage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchPortfolio(query), [query]);

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-2xl flex-col items-center px-4 pt-16 sm:pt-24">
      <div className="mb-8 flex items-center gap-2 font-display text-2xl text-ink">
        <span className="text-signal-teal">{`{`}</span>
        Search my work
        <span className="text-signal-teal">{`}`}</span>
      </div>

      <div className="glass flex w-full items-center gap-3 rounded-full px-5 py-3 shadow-lg shadow-black/20 transition-colors focus-within:border-signal-teal/40">
        <SearchIcon className="h-5 w-5 shrink-0 text-ink-muted" />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Try "Flutter", "AWS", or "Docker"...`}
          aria-label="Search projects, certificates, and skills"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
        />
      </div>

      {!query && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {suggestions.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="rounded-full border border-border bg-base-raised px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-signal-teal/40 hover:text-signal-teal"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 w-full">
        {query && results.length === 0 && (
          <p className="text-center text-sm text-ink-muted">
            No matches for &quot;{query}&quot; — try {profile.name.split(" ")[0]}
            &apos;s other work like Flutter, AWS, or Docker.
          </p>
        )}

        <ul className="space-y-3">
          {results.map((result) => {
            const Icon = kindIcon[result.kind];
            return (
              <li key={`${result.kind}-${result.title}`}>
                <Link
                  href={result.href}
                  className="glass flex items-start gap-3 rounded-xl p-4 transition-colors hover:border-signal-teal/40"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-signal-teal" />
                  <div>
                    <p className="mono-tag">{result.kind}</p>
                    <h3 className="text-sm text-ink">{result.title}</h3>
                    <p className="mt-0.5 text-xs text-ink-muted line-clamp-1">
                      {result.subtitle}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
