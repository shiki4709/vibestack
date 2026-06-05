import OpenAI from "openai";
import type { ScoredRepo, GeneratedTool, GeneratedProfile, DiscoveryResult } from "./types.js";

function formatStars(stars: number): string {
  if (stars >= 1000) {
    return `${Math.round(stars / 100) / 10}k`;
  }
  return String(stars);
}

const SYSTEM_PROMPT = `You are a content writer for VibeStack, a curated directory of tools for vibe coders. Vibe coders are people who build software using AI assistance — from beginners using ChatGPT to advanced users running terminal agents.

Your writing style:
- Plain English, no jargon
- Warm, encouraging, practical
- Use everyday analogies (IKEA, Netflix, Google Docs — things everyone knows)
- Real-world examples that reference concrete apps people might build
- Honest about what the tool is NOT good for

You write for people who may never have coded before. They need to understand what a tool does in terms of outcomes, not technology.`;

const USER_PROMPT = (repo: ScoredRepo) => `Generate a VibeStack tool profile for this GitHub repo:

Name: ${repo.repo.fullName}
Description: ${repo.repo.description || "No description"}
Language: ${repo.repo.language}
Stars: ${repo.repo.stars}
Category: ${repo.category}
Tags: ${repo.tags.join(", ")}
Vibe Rating: ${repo.vibeRating}/5

Return a single JSON object with these exact fields:

{
  "displayName": "Human-friendly tool name",
  "slug": "kebab-case-slug",
  "description": "One sentence. What it does and why a vibe coder would care.",
  "website": "https://... or null if no website",
  "analogy": "Like [everyday thing] for your [dev context]. Make it click instantly.",
  "realWorldExample": "Say you're building [concrete app]. Instead of [hard way], you [easy way with this tool] — and it works in [timeframe].",
  "whenToUse": "Plain English. When would someone reach for this?",
  "devStage": "idea|prototype|frontend|backend|database|auth|deploy|polish|scale",
  "devStageDescription": "One sentence: where this fits in the build process.",
  "situation": "Describe the pain point this solves. Make the reader nod.",
  "alternatives": ["Alt 1 (brief note)", "Alt 2 (brief note)"],
  "goodFor": ["Use case 1", "Use case 2", "Use case 3"],
  "notFor": ["Anti-use case 1", "Anti-use case 2"],
  "gettingStarted": "One-liner: what to type or click to get started.",
  "outcomes": ["Concrete measurable outcome 1", "Concrete measurable outcome 2", "Concrete measurable outcome 3"]
}

IMPORTANT for "outcomes": Each outcome must be a specific, measurable benefit with numbers when possible. Examples:
- "Cuts token usage by 60-95%"
- "Ships landing pages 3x faster than from scratch"
- "Reduces API response time by ~40%"
- "Saves 2-4 hours per project on auth setup"
- "Drops bundle size by 30% vs full component libraries"
If exact numbers aren't available, use relative comparisons like "10x faster than manual setup" or time savings like "from 3 days to 20 minutes".

Return ONLY the JSON object, no other text.`;

export async function generateProfiles(
  scored: readonly ScoredRepo[]
): Promise<readonly DiscoveryResult[]> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY environment variable required.");
  }

  const client = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey,
  });

  const results: DiscoveryResult[] = [];

  for (const scored_repo of scored) {
    console.log(`  Profiling: ${scored_repo.repo.fullName}`);

    try {
      const response = await client.chat.completions.create({
        model: "deepseek-chat",
        max_tokens: 1500,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: USER_PROMPT(scored_repo) },
        ],
      });

      const text = response.choices[0]?.message?.content ?? "";

      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.warn(`    Failed to parse profile for ${scored_repo.repo.fullName}`);
        continue;
      }

      const parsed = JSON.parse(jsonMatch[0]) as {
        displayName: string;
        slug: string;
        description: string;
        website: string | null;
        analogy: string;
        realWorldExample: string;
        whenToUse: string;
        devStage: string;
        devStageDescription: string;
        situation: string;
        alternatives: string[];
        goodFor: string[];
        notFor: string[];
        gettingStarted: string;
        outcomes: string[];
      };

      const tool: GeneratedTool = {
        slug: parsed.slug,
        name: parsed.displayName,
        description: parsed.description,
        category: scored_repo.category,
        github: scored_repo.repo.url,
        ...(parsed.website ? { website: parsed.website } : {}),
        stars: formatStars(scored_repo.repo.stars),
        vibeRating: scored_repo.vibeRating,
        tags: [...scored_repo.tags],
      };

      const profile: GeneratedProfile = {
        slug: parsed.slug,
        analogy: parsed.analogy,
        realWorldExample: parsed.realWorldExample,
        whenToUse: parsed.whenToUse,
        devStage: parsed.devStage as GeneratedProfile["devStage"],
        devStageDescription: parsed.devStageDescription,
        situation: parsed.situation,
        alternatives: parsed.alternatives,
        goodFor: parsed.goodFor,
        notFor: parsed.notFor,
        gettingStarted: parsed.gettingStarted,
        outcomes: parsed.outcomes ?? [],
      };

      results.push({
        tool,
        profile,
        score: scored_repo.vibeScore,
        reasoning: scored_repo.reasoning,
      });
    } catch (error) {
      console.warn(
        `    Error profiling ${scored_repo.repo.fullName}: ${error instanceof Error ? error.message : error}`
      );
    }
  }

  console.log(`  Generated ${results.length} profiles`);
  return results;
}
