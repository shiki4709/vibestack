import type { Category } from "../../src/data/tools.js";
import type { DevStage } from "../../src/data/tool-profiles.js";

export interface TrendingRepo {
  readonly fullName: string;
  readonly name: string;
  readonly description: string;
  readonly language: string;
  readonly stars: number;
  readonly starsToday: number;
  readonly url: string;
}

export interface ScoredRepo {
  readonly repo: TrendingRepo;
  readonly vibeScore: number;
  readonly vibeRating: 1 | 2 | 3 | 4 | 5;
  readonly category: Category;
  readonly reasoning: string;
  readonly tags: readonly string[];
}

export interface GeneratedTool {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly category: Category;
  readonly github: string;
  readonly website?: string;
  readonly stars: string;
  readonly vibeRating: 1 | 2 | 3 | 4 | 5;
  readonly tags: readonly string[];
}

export interface GeneratedProfile {
  readonly slug: string;
  readonly analogy: string;
  readonly realWorldExample: string;
  readonly whenToUse: string;
  readonly devStage: DevStage;
  readonly devStageDescription: string;
  readonly situation: string;
  readonly alternatives: readonly string[];
  readonly goodFor: readonly string[];
  readonly notFor: readonly string[];
  readonly gettingStarted: string;
  readonly outcomes: readonly string[];
}

export interface DiscoveryResult {
  readonly tool: GeneratedTool;
  readonly profile: GeneratedProfile;
  readonly score: number;
  readonly reasoning: string;
  readonly image: string;
  readonly imageType: "gif" | "video" | "readme" | "og" | "none";
}

export interface DiscoveryOutput {
  readonly discoveredAt: string;
  readonly source: string;
  readonly tools: readonly DiscoveryResult[];
  readonly skipped: readonly {
    readonly name: string;
    readonly score: number;
    readonly reason: string;
  }[];
}
