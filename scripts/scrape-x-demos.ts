/**
 * Searches X/Twitter for demo videos of vibe coding tools.
 * Uses web search to find tweets with video demos.
 *
 * Usage: npx tsx scripts/scrape-x-demos.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface XDemo {
  readonly tool: string;
  readonly query: string;
  readonly results: readonly XResult[];
}

interface XResult {
  readonly title: string;
  readonly url: string;
  readonly snippet: string;
}

const searchQueries = [
  { tool: "shadcn/ui", queries: ["shadcn demo built", "shadcn ui tutorial short"] },
  { tool: "Magic UI", queries: ["magic ui demo", "magicui landing page"] },
  { tool: "Supabase", queries: ["supabase vibe coding demo", "built with supabase"] },
  { tool: "Cursor", queries: ["cursor ai demo build", "cursor vibe coding"] },
  { tool: "Claude Code", queries: ["claude code demo build", "claude code vibe coding"] },
  { tool: "Bolt", queries: ["bolt.new demo", "bolt new build app"] },
  { tool: "Lovable", queries: ["lovable dev demo", "lovable ai build"] },
  { tool: "v0", queries: ["v0 dev demo", "v0 vercel build"] },
  { tool: "Hono", queries: ["hono js demo", "hono framework build"] },
  { tool: "Drizzle", queries: ["drizzle orm demo", "drizzle typescript"] },
  { tool: "Better Auth", queries: ["better auth demo", "better auth setup"] },
  { tool: "Coolify", queries: ["coolify demo deploy", "coolify self host"] },
  { tool: "Vercel AI SDK", queries: ["vercel ai sdk demo", "vercel ai chatbot"] },
];

// Note: This creates the structure for X demo tracking.
// Actual X scraping requires either:
// 1. GooseWorks MCP tools (if available)
// 2. X API (paid)
// 3. Manual curation from search results
//
// For now, this generates the search queries and a template
// that can be filled in manually or via MCP tools.

async function main() {
  const results: XDemo[] = searchQueries.map((sq) => ({
    tool: sq.tool,
    query: `site:x.com ${sq.queries[0]}`,
    results: [],
  }));

  const outPath = join(process.cwd(), "src/data/x-demos.json");
  writeFileSync(outPath, JSON.stringify(results, null, 2));

  console.log("X Demo Tracker — Search Queries Generated\n");
  console.log("To populate, search these on X or use GooseWorks:\n");
  for (const sq of searchQueries) {
    for (const q of sq.queries) {
      console.log(`  ${sq.tool}: https://x.com/search?q=${encodeURIComponent(q)}&f=media`);
    }
  }
  console.log(`\nTemplate written to ${outPath}`);
  console.log("Edit the file to add tweet URLs and snippets as you find them.\n");
}

main().catch(console.error);
