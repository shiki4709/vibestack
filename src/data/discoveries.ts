import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

export interface DiscoveredTool {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly github: string;
  readonly website?: string;
  readonly stars: string;
  readonly vibeRating: 1 | 2 | 3 | 4 | 5;
  readonly tags: readonly string[];
}

export interface DiscoveredProfile {
  readonly slug: string;
  readonly analogy: string;
  readonly realWorldExample: string;
  readonly whenToUse: string;
  readonly devStage: string;
  readonly devStageDescription: string;
  readonly situation: string;
  readonly alternatives: readonly string[];
  readonly goodFor: readonly string[];
  readonly notFor: readonly string[];
  readonly gettingStarted: string;
  readonly outcomes?: readonly string[];
}

export interface TrendEntry {
  readonly tool: DiscoveredTool;
  readonly profile: DiscoveredProfile;
  readonly score: number;
  readonly reasoning: string;
  readonly level: 1 | 2 | 3;
  readonly image: string;
  readonly imageType: "gif" | "video" | "readme" | "og" | "none";
}

export interface TrendReport {
  readonly date: string;
  readonly tools: readonly TrendEntry[];
}

function vibeRatingToLevel(vibeRating: number): 1 | 2 | 3 {
  if (vibeRating >= 4) return 1; // Prompter — easy, paste and go
  if (vibeRating >= 3) return 2; // Tweaker — moderate
  return 3; // Builder — needs expertise
}

export function loadDiscoveries(): readonly TrendReport[] {
  const dir = resolve(process.cwd(), "data/discoveries");

  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort().reverse();
  } catch {
    return [];
  }

  return files.map((file) => {
    const raw = JSON.parse(readFileSync(resolve(dir, file), "utf-8")) as {
      discoveredAt: string;
      tools: readonly {
        tool: DiscoveredTool;
        profile: DiscoveredProfile;
        score: number;
        reasoning: string;
      }[];
    };

    const tools: TrendEntry[] = raw.tools.map((t) => ({
      ...t,
      level: vibeRatingToLevel(t.tool.vibeRating),
      image: (t as Record<string, unknown>).image as string ?? "",
      imageType: ((t as Record<string, unknown>).imageType as TrendEntry["imageType"]) ?? "none",
    }));

    // Sort by score descending
    tools.sort((a, b) => b.score - a.score);

    return {
      date: raw.discoveredAt,
      tools,
    };
  });
}

export function loadLatestDiscovery(): TrendReport | null {
  const all = loadDiscoveries();
  return all[0] ?? null;
}
