import * as cheerio from "cheerio";
import type { TrendingRepo } from "./types.js";

const GITHUB_TRENDING_URL = "https://github.com/trending";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

async function fetchWithRetry(
  url: string,
  retries = MAX_RETRIES
): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          Accept: "text/html",
        },
      });
      if (response.ok) return response;
      console.warn(
        `  Attempt ${attempt}/${retries} failed: ${response.status}`
      );
    } catch (error) {
      console.warn(
        `  Attempt ${attempt}/${retries} error: ${error instanceof Error ? error.message : error}`
      );
    }
    if (attempt < retries) {
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
}

function parseTrendingPage(html: string): readonly TrendingRepo[] {
  const $ = cheerio.load(html);
  const repos: TrendingRepo[] = [];

  $("article.Box-row").each((_, el) => {
    const $el = $(el);
    const fullName =
      $el.find("h2 a").attr("href")?.replace(/^\//, "").trim() ?? "";
    const name = fullName.split("/")[1] ?? fullName;
    const description = $el.find("p.col-9").text().trim();
    const language =
      $el.find('[itemprop="programmingLanguage"]').text().trim() || "Unknown";

    const starsText =
      $el
        .find('a[href$="/stargazers"]')
        .first()
        .text()
        .trim()
        .replace(/,/g, "") || "0";
    const stars = parseInt(starsText, 10) || 0;

    const todayText = $el.find(".float-sm-right, .d-inline-block.float-sm-right").text().trim();
    const todayMatch = todayText.match(/([\d,]+)\s+stars?\s+(today|this week|this month)/i);
    const starsToday = todayMatch
      ? parseInt(todayMatch[1].replace(/,/g, ""), 10)
      : 0;

    if (fullName) {
      repos.push({
        fullName,
        name,
        description,
        language,
        stars,
        starsToday,
        url: `https://github.com/${fullName}`,
      });
    }
  });

  return repos;
}

const LANGUAGES = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "go",
  "swift",
  "kotlin",
] as const;

export async function scrapeTrending(
  since: "daily" | "weekly" | "monthly" = "weekly"
): Promise<readonly TrendingRepo[]> {
  const seen = new Set<string>();
  const allRepos: TrendingRepo[] = [];

  // Overall trending (all languages)
  console.log("  Scraping: all languages");
  const overallHtml = await fetchWithRetry(
    `${GITHUB_TRENDING_URL}?since=${since}`
  );
  const overallRepos = parseTrendingPage(await overallHtml.text());
  for (const repo of overallRepos) {
    if (!seen.has(repo.fullName)) {
      seen.add(repo.fullName);
      allRepos.push(repo);
    }
  }

  // Per-language trending
  for (const lang of LANGUAGES) {
    console.log(`  Scraping: ${lang}`);
    try {
      const response = await fetchWithRetry(
        `${GITHUB_TRENDING_URL}/${lang}?since=${since}`
      );
      const repos = parseTrendingPage(await response.text());
      for (const repo of repos) {
        if (!seen.has(repo.fullName)) {
          seen.add(repo.fullName);
          allRepos.push(repo);
        }
      }
    } catch (error) {
      console.warn(
        `  Failed to scrape ${lang}: ${error instanceof Error ? error.message : error}`
      );
    }
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`  Total unique repos scraped: ${allRepos.length}`);
  return allRepos;
}
