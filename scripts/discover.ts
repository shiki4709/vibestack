import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import { scrapeTrending } from "./discover/scraper.js";
import { dedup } from "./discover/dedup.js";
import { scoreRepos } from "./discover/scorer.js";
import { generateProfiles } from "./discover/profiler.js";
import { fetchMediaBatch } from "./discover/media.js";
import type { DiscoveryOutput } from "./discover/types.js";

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  console.log(`\n🔍 VibeStack Discovery — ${today}\n`);

  // Step 1: Scrape GitHub trending
  console.log("Step 1: Scraping GitHub trending...");
  const trending = await scrapeTrending("weekly");

  // Step 2: Dedup against existing tools
  console.log("\nStep 2: Deduplicating...");
  const fresh = dedup(trending);
  console.log(`  ${trending.length} → ${fresh.length} after dedup`);

  if (fresh.length === 0) {
    console.log("\nNo new repos to evaluate. Done!");
    return;
  }

  // Step 3: AI scoring
  console.log("\nStep 3: Scoring for vibe coding relevance...");
  const { passed, skipped } = await scoreRepos(fresh);

  if (passed.length === 0) {
    console.log("\nNo repos scored high enough. Skipped repos saved to output.");
  }

  // Step 4: Generate profiles for passing repos
  let tools: DiscoveryOutput["tools"] = [];
  if (passed.length > 0) {
    console.log(`\nStep 4: Generating profiles for ${passed.length} tools...`);
    tools = await generateProfiles(passed);
  }

  // Step 5: Fetch demo images/videos
  if (tools.length > 0) {
    console.log(`\nStep 5: Fetching demo media for ${tools.length} tools...`);
    const githubUrls = tools.map((t) => t.tool.github);
    const mediaMap = await fetchMediaBatch(githubUrls);

    tools = tools.map((t) => {
      const media = mediaMap.get(t.tool.github);
      return {
        ...t,
        image: media?.image ?? "",
        imageType: media?.imageType ?? "none",
      };
    });
    const withMedia = tools.filter((t) => t.image).length;
    console.log(`  ${withMedia}/${tools.length} tools have media`);
  }

  // Step 6: Save results
  const output: DiscoveryOutput = {
    discoveredAt: today,
    source: "github-trending",
    tools,
    skipped,
  };

  const outDir = resolve(process.cwd(), "data/discoveries");
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, `${today}.json`);
  writeFileSync(outPath, JSON.stringify(output, null, 2));

  console.log(`\n✅ Done! Results saved to ${outPath}`);
  console.log(`   ${tools.length} tools profiled, ${skipped.length} skipped`);

  if (tools.length > 0) {
    console.log("\nTop discoveries:");
    for (const t of tools.slice(0, 5)) {
      console.log(`  ${t.score}/10 — ${t.tool.name}: ${t.tool.description}`);
    }
  }
}

main().catch((error) => {
  console.error("Discovery failed:", error);
  process.exit(1);
});
