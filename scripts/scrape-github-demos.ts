/**
 * Scrapes demo media (GIFs, videos, images) from GitHub READMEs
 * for each tool in our directory.
 *
 * Usage: npx tsx scripts/scrape-github-demos.ts
 */

import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

interface ScrapedDemo {
  readonly slug: string;
  readonly name: string;
  readonly github: string;
  readonly ogImage: string | null;
  readonly readmeMedia: readonly string[];
  readonly demoUrl: string | null;
  readonly websiteScreenshot: string | null;
}

// Extract owner/repo from GitHub URL
function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

// Fetch GitHub README content
async function fetchReadme(
  owner: string,
  repo: string
): Promise<string | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3.raw",
    "User-Agent": "vibestack-scraper",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  return res.text();
}

// Fetch repo's social preview / OG image
async function fetchOgImage(
  owner: string,
  repo: string
): Promise<string | null> {
  // GitHub's social preview URL pattern
  const ogUrl = `https://opengraph.githubassets.com/1/${owner}/${repo}`;

  // Verify it exists
  const res = await fetch(ogUrl, { method: "HEAD" });
  if (res.ok) return ogUrl;
  return null;
}

// Extract media URLs from README markdown
function extractMedia(readme: string, owner: string, repo: string): string[] {
  const media: string[] = [];

  // Match markdown images: ![alt](url)
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = imgRegex.exec(readme)) !== null) {
    media.push(resolveUrl(match[2], owner, repo));
  }

  // Match HTML img tags: <img src="url" />
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = htmlImgRegex.exec(readme)) !== null) {
    media.push(resolveUrl(match[1], owner, repo));
  }

  // Match HTML video/source tags
  const videoRegex =
    /<(?:video|source)[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = videoRegex.exec(readme)) !== null) {
    media.push(resolveUrl(match[1], owner, repo));
  }

  // Filter to likely demo content (GIFs, videos, screenshots)
  return media.filter((url) => {
    const lower = url.toLowerCase();
    return (
      lower.includes(".gif") ||
      lower.includes(".mp4") ||
      lower.includes(".webm") ||
      lower.includes(".webp") ||
      lower.includes(".png") ||
      lower.includes(".jpg") ||
      lower.includes(".jpeg") ||
      lower.includes(".svg") ||
      lower.includes("user-images") ||
      lower.includes("githubusercontent")
    );
  });
}

// Resolve relative URLs to absolute GitHub raw URLs
function resolveUrl(url: string, owner: string, repo: string): string {
  if (url.startsWith("http")) return url;
  // Remove leading ./
  const clean = url.replace(/^\.\//, "");
  return `https://raw.githubusercontent.com/${owner}/${repo}/main/${clean}`;
}

// Extract demo/website URL from README
function extractDemoUrl(readme: string): string | null {
  // Look for common demo link patterns
  const patterns = [
    /\[(?:live demo|demo|try it|playground)\]\(([^)]+)\)/i,
    /(?:demo|live|playground):\s*(https?:\/\/[^\s)]+)/i,
  ];

  for (const pattern of patterns) {
    const match = readme.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Main scraper
async function scrapeAll() {
  // Read tools from data file
  const toolsPath = join(process.cwd(), "src/data/tools.ts");
  const toolsSource = readFileSync(toolsPath, "utf-8");

  // Parse tool entries (extract slug, name, github URL)
  const toolRegex =
    /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?github:\s*"([^"]+)"/g;
  const toolEntries: Array<{ slug: string; name: string; github: string }> = [];

  let toolMatch;
  while ((toolMatch = toolRegex.exec(toolsSource)) !== null) {
    toolEntries.push({
      slug: toolMatch[1],
      name: toolMatch[2],
      github: toolMatch[3],
    });
  }

  console.log(`Found ${toolEntries.length} tools to scrape\n`);

  const results: ScrapedDemo[] = [];

  for (const tool of toolEntries) {
    const parsed = parseGithubUrl(tool.github);
    if (!parsed) {
      console.log(`  SKIP ${tool.name} — can't parse GitHub URL`);
      continue;
    }

    console.log(`  Scraping ${tool.name} (${parsed.owner}/${parsed.repo})...`);

    const [readme, ogImage] = await Promise.all([
      fetchReadme(parsed.owner, parsed.repo),
      fetchOgImage(parsed.owner, parsed.repo),
    ]);

    const readmeMedia = readme
      ? extractMedia(readme, parsed.owner, parsed.repo)
      : [];

    const demoUrl = readme ? extractDemoUrl(readme) : null;

    results.push({
      slug: tool.slug,
      name: tool.name,
      github: tool.github,
      ogImage,
      readmeMedia,
      demoUrl,
      websiteScreenshot: null,
    });

    const mediaCount = readmeMedia.length;
    console.log(
      `    ${mediaCount} media found | OG: ${ogImage ? "yes" : "no"} | Demo: ${demoUrl ?? "none"}`
    );

    // Rate limit — be nice to GitHub
    await new Promise((r) => setTimeout(r, 500));
  }

  // Write results
  const outPath = join(process.cwd(), "src/data/scraped-demos.json");
  writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nWrote ${results.length} results to ${outPath}`);
}

scrapeAll().catch(console.error);
