import repositoriesFallback from "@/data/repositories.json";
import type { Repository } from "@/types";

export interface GithubProfileData {
  username: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  repositories: Repository[];
  isLive: boolean;
}

const SAMPLE_DATA: GithubProfileData = {
  username: null,
  followers: 128,
  following: 64,
  publicRepos: (repositoriesFallback as Repository[]).length,
  repositories: repositoriesFallback as Repository[],
  isLive: false,
};

/**
 * Fetches live GitHub profile + repo data when GITHUB_USERNAME is set.
 * Falls back to the bundled sample data otherwise, or if the request fails
 * (rate limits, no network, invalid username) — this must never throw.
 */
export async function getGithubProfileData(): Promise<GithubProfileData> {
  const username = process.env.GITHUB_USERNAME;
  if (!username) return SAMPLE_DATA;

  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=6`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return SAMPLE_DATA;

    const user = await userRes.json();
    const repos = await reposRes.json();

    return {
      username,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      publicRepos: user.public_repos ?? 0,
      repositories: Array.isArray(repos)
        ? repos.map(
            (repo: {
              name: string;
              description: string | null;
              language: string | null;
              stargazers_count: number;
              forks_count: number;
              html_url: string;
            }) => ({
              name: repo.name,
              description: repo.description ?? "",
              language: repo.language ?? "—",
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              url: repo.html_url,
            })
          )
        : SAMPLE_DATA.repositories,
      isLive: true,
    };
  } catch {
    return SAMPLE_DATA;
  }
}
