/**
 * Scrapes OG images from product websites (not GitHub).
 * Product websites have much better preview images than GitHub repo cards.
 *
 * Usage: npx tsx scripts/scrape-website-og.ts
 */

import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

interface ToolEntry {
  slug: string;
  name: string;
  website?: string;
  github: string;
}

interface OgResult {
  slug: string;
  name: string;
  url: string;
  ogImage: string | null;
  ogTitle: string | null;
}

async function fetchOgImage(url: string): Promise<{ image: string | null; title: string | null }> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return { image: null, title: null };

    const html = await res.text();

    // Extract og:image
    const ogImageMatch = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    ) ?? html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
    );

    // Extract og:title
    const ogTitleMatch = html.match(
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i
    ) ?? html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i
    );

    let image = ogImageMatch?.[1] ?? null;

    // Resolve relative URLs
    if (image && !image.startsWith("http")) {
      const base = new URL(url);
      image = new URL(image, base).toString();
    }

    return {
      image,
      title: ogTitleMatch?.[1] ?? null,
    };
  } catch {
    return { image: null, title: null };
  }
}

async function main() {
  const toolsPath = join(process.cwd(), "src/data/demos.ts");
  const toolsSource = readFileSync(toolsPath, "utf-8");

  // Parse tool entries
  const toolRegex =
    /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?github:\s*"([^"]+)"(?:[\s\S]*?website:\s*"([^"]+)")?/g;
  const entries: ToolEntry[] = [];

  let match;
  while ((match = toolRegex.exec(toolsSource)) !== null) {
    entries.push({
      slug: match[1],
      name: match[2],
      github: match[3],
      website: match[4] || undefined,
    });
  }

  console.log(`Fetching OG images from ${entries.length} product websites\n`);

  const results: OgResult[] = [];

  for (const entry of entries) {
    const url = entry.website ?? entry.github;
    console.log(`  ${entry.name} → ${url}`);

    const { image, title } = await fetchOgImage(url);
    console.log(`    OG image: ${image ? "YES" : "NO"}`);

    results.push({
      slug: entry.slug,
      name: entry.name,
      url,
      ogImage: image,
      ogTitle: title,
    });

    await new Promise((r) => setTimeout(r, 300));
  }

  const outPath = join(process.cwd(), "src/data/website-og.json");
  writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nWrote ${results.length} results to ${outPath}`);
}

main().catch(console.error);
