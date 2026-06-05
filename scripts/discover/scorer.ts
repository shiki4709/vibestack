import OpenAI from "openai";
import type { TrendingRepo, ScoredRepo } from "./types.js";
import type { Category } from "../../src/data/tools.js";

const BATCH_SIZE = 25;

const SYSTEM_PROMPT = `You are a vibe coding tool curator. Your job is to evaluate GitHub repos and determine if they are useful tools for "vibe coders" — people who build software using AI assistance, often without deep programming expertise.

Vibe coders range from:
- Prompters: use ChatGPT/Claude to generate code they paste into projects
- Tweakers: use AI code editors like Cursor to modify existing code
- Builders: use terminal AI agents like Claude Code to build full apps

A good vibe coding tool is one that:
1. Helps someone BUILD a real product (not just learn or read)
2. Is accessible — has good docs, works out of the box, or has a simple API
3. Fits into a modern web/mobile/AI stack
4. Saves significant time vs doing it manually

Categories: UI, Backend, AI, Auth, Deploy, Dev Tools, Database, Payments

NOT vibe coding tools:
- Tutorials, courses, awesome-lists, cheatsheets
- Low-level infrastructure (kernel modules, drivers, compilers)
- Enterprise-only tools requiring complex setup
- Research papers or academic projects
- Frameworks that require deep expertise to use (e.g., Kubernetes operators)`;

const USER_PROMPT = (repos: readonly TrendingRepo[]) => `Score these GitHub repos for vibe coding relevance. For each repo, return one JSON object per line.

Repos:
${repos.map((r) => `- ${r.fullName}: ${r.description || "No description"} (${r.language}, ${r.stars} stars)`).join("\n")}

For each repo, return a JSON object on its own line with:
{
  "name": "owner/repo",
  "vibeScore": 1-10,
  "vibeRating": 1-5,
  "category": "UI|Backend|AI|Auth|Deploy|Dev Tools|Database|Payments",
  "reasoning": "One sentence why",
  "tags": ["tag1", "tag2", "tag3"]
}

vibeScore: 1-10 overall relevance to vibe coders
vibeRating: 1-5 accessibility (1=needs deep expertise, 5=paste and go)
Only return JSON lines, no other text.`;

function parseScoreResponse(
  text: string,
  repos: readonly TrendingRepo[]
): readonly ScoredRepo[] {
  const results: ScoredRepo[] = [];

  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;

    try {
      const parsed = JSON.parse(trimmed) as {
        name: string;
        vibeScore: number;
        vibeRating: number;
        category: string;
        reasoning: string;
        tags: string[];
      };

      const repo = repos.find(
        (r) =>
          r.fullName === parsed.name ||
          r.fullName.endsWith(`/${parsed.name}`) ||
          r.name === parsed.name
      );

      if (!repo) continue;

      results.push({
        repo,
        vibeScore: Math.min(10, Math.max(1, parsed.vibeScore)),
        vibeRating: Math.min(5, Math.max(1, Math.round(parsed.vibeRating))) as
          | 1
          | 2
          | 3
          | 4
          | 5,
        category: parsed.category as Category,
        reasoning: parsed.reasoning,
        tags: parsed.tags ?? [],
      });
    } catch {
      // Skip unparseable lines
    }
  }

  return results;
}

export async function scoreRepos(
  repos: readonly TrendingRepo[]
): Promise<{
  readonly passed: readonly ScoredRepo[];
  readonly skipped: readonly { name: string; score: number; reason: string }[];
}> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error(
      "DEEPSEEK_API_KEY environment variable required. Set it in .env.local or export it."
    );
  }

  const client = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey,
  });

  const allScored: ScoredRepo[] = [];

  // Process in batches
  for (let i = 0; i < repos.length; i += BATCH_SIZE) {
    const batch = repos.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(repos.length / BATCH_SIZE);
    console.log(`  Scoring batch ${batchNum}/${totalBatches} (${batch.length} repos)`);

    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 4096,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_PROMPT(batch) },
      ],
    });

    const text = response.choices[0]?.message?.content ?? "";
    const scored = parseScoreResponse(text, batch);
    allScored.push(...scored);
  }

  const passed = allScored.filter((s) => s.vibeScore >= 6);
  const skipped = allScored
    .filter((s) => s.vibeScore < 6)
    .map((s) => ({
      name: s.repo.fullName,
      score: s.vibeScore,
      reason: s.reasoning,
    }));

  console.log(
    `  Scored ${allScored.length} repos: ${passed.length} passed, ${skipped.length} skipped`
  );

  return { passed, skipped };
}
