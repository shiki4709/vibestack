import { tools } from "../../src/data/tools.js";
import type { TrendingRepo } from "./types.js";

const MIN_STARS = 500;

const EXCLUDED_PATTERNS = [
  /^awesome-/i,
  /^learn-/i,
  /^free-.*-books/i,
  /tutorial/i,
  /course/i,
  /interview/i,
  /cheatsheet/i,
  /roadmap/i,
] as const;

export function dedup(
  repos: readonly TrendingRepo[]
): readonly TrendingRepo[] {
  const existingGithubUrls = new Set(
    tools.map((t) => t.github.toLowerCase())
  );

  return repos.filter((repo) => {
    // Skip repos already in tools.ts
    if (existingGithubUrls.has(repo.url.toLowerCase())) {
      return false;
    }

    // Skip low-star repos
    if (repo.stars < MIN_STARS) {
      return false;
    }

    // Skip non-tool repos (tutorials, awesome-lists, courses)
    if (EXCLUDED_PATTERNS.some((p) => p.test(repo.name))) {
      return false;
    }

    return true;
  });
}
