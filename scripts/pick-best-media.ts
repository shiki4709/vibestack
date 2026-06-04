/**
 * Picks the best demo image for each tool from scraped data.
 * Prioritizes: GIFs > README screenshots > OG images
 * Filters out badges, avatars, and tiny images.
 *
 * Usage: npx tsx scripts/pick-best-media.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface ScrapedDemo {
  slug: string;
  name: string;
  github: string;
  ogImage: string | null;
  readmeMedia: string[];
  demoUrl: string | null;
}

interface PickedMedia {
  slug: string;
  name: string;
  image: string;
  imageType: "gif" | "readme" | "og" | "none";
  demoUrl: string | null;
}

function isJunk(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.includes("badge") ||
    lower.includes("shield") ||
    lower.includes("codecov") ||
    lower.includes("avatar") ||
    lower.includes("repobeats") ||
    lower.includes("deepwiki") ||
    lower.includes("?s=100") ||
    lower.includes("?s=150") ||
    lower.includes("license") ||
    lower.includes(".svg") ||
    lower.includes("sponsors") ||
    lower.includes("contributor")
  );
}

function pickBest(scraped: ScrapedDemo): PickedMedia {
  const validMedia = scraped.readmeMedia
    .map((url) => url.split(" ")[0]) // strip markdown alt text
    .filter((url) => !isJunk(url));

  // Priority 1: GIFs (likely demos)
  const gif = validMedia.find((url) => url.toLowerCase().includes(".gif"));
  if (gif) {
    return {
      slug: scraped.slug,
      name: scraped.name,
      image: gif,
      imageType: "gif",
      demoUrl: scraped.demoUrl,
    };
  }

  // Priority 2: Non-badge README images (screenshots, hero images)
  const screenshot = validMedia.find(
    (url) =>
      url.toLowerCase().includes(".png") ||
      url.toLowerCase().includes(".jpg") ||
      url.toLowerCase().includes(".jpeg") ||
      url.toLowerCase().includes(".webp")
  );
  if (screenshot) {
    return {
      slug: scraped.slug,
      name: scraped.name,
      image: screenshot,
      imageType: "readme",
      demoUrl: scraped.demoUrl,
    };
  }

  // Priority 3: OG image
  if (scraped.ogImage) {
    return {
      slug: scraped.slug,
      name: scraped.name,
      image: scraped.ogImage,
      imageType: "og",
      demoUrl: scraped.demoUrl,
    };
  }

  return {
    slug: scraped.slug,
    name: scraped.name,
    image: "",
    imageType: "none",
    demoUrl: scraped.demoUrl,
  };
}

const scraped: ScrapedDemo[] = JSON.parse(
  readFileSync(join(process.cwd(), "src/data/scraped-demos.json"), "utf-8")
);

const picked = scraped.map(pickBest);

console.log("\nBest media picks:\n");
for (const p of picked) {
  const status = p.imageType === "none" ? "NO IMAGE" : p.imageType.toUpperCase();
  console.log(`  ${status.padEnd(8)} ${p.name}`);
  if (p.image) console.log(`           ${p.image.slice(0, 80)}...`);
}

writeFileSync(
  join(process.cwd(), "src/data/picked-media.json"),
  JSON.stringify(picked, null, 2)
);

console.log(`\nWrote ${picked.length} picks to src/data/picked-media.json`);
