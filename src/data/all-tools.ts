import { demos, categories as demoCategories } from "./demos";
import { loadLatestDiscovery, type TrendEntry } from "./discoveries";
import { toolProfiles } from "./tool-profiles";

export interface UnifiedTool {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly github: string;
  readonly website?: string;
  readonly tags: readonly string[];
  readonly level: 1 | 2 | 3;
  readonly pricing: "free" | "free-tier" | "paid";
  readonly source: "curated" | "discovered";
  readonly profile?: {
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
  };
}

function buildAllTools(): readonly UnifiedTool[] {
  const seen = new Set<string>();
  const result: UnifiedTool[] = [];

  // 1. Curated tools first (higher quality data)
  for (const demo of demos) {
    seen.add(demo.slug);
    const profile = toolProfiles[demo.slug];
    result.push({
      slug: demo.slug,
      name: demo.name,
      description: demo.description,
      category: demo.category,
      image: demo.image,
      github: demo.github,
      website: demo.website,
      tags: demo.tags,
      level: demo.level,
      pricing: demo.pricing,
      source: "curated",
      profile: profile
        ? {
            analogy: profile.analogy,
            realWorldExample: profile.realWorldExample,
            whenToUse: profile.whenToUse,
            devStage: profile.devStage,
            devStageDescription: profile.devStageDescription,
            situation: profile.situation,
            alternatives: profile.alternatives,
            goodFor: profile.goodFor,
            notFor: profile.notFor,
            gettingStarted: profile.gettingStarted,
          }
        : undefined,
    });
  }

  // 2. Discovered tools (skip duplicates)
  const latest = loadLatestDiscovery();
  if (latest) {
    for (const entry of latest.tools) {
      if (seen.has(entry.tool.slug)) continue;
      seen.add(entry.tool.slug);
      result.push({
        slug: entry.tool.slug,
        name: entry.tool.name,
        description: entry.tool.description,
        category: entry.tool.category,
        image: entry.image,
        github: entry.tool.github,
        website: entry.tool.website,
        tags: entry.tool.tags,
        level: entry.level,
        pricing: "free",
        source: "discovered",
        profile: entry.profile
          ? {
              analogy: entry.profile.analogy,
              realWorldExample: entry.profile.realWorldExample,
              whenToUse: entry.profile.whenToUse,
              devStage: entry.profile.devStage,
              devStageDescription: entry.profile.devStageDescription,
              situation: entry.profile.situation,
              alternatives: entry.profile.alternatives,
              goodFor: entry.profile.goodFor,
              notFor: entry.profile.notFor,
              gettingStarted: entry.profile.gettingStarted,
              outcomes: entry.profile.outcomes,
            }
          : undefined,
      });
    }
  }

  return result;
}

export const allTools = buildAllTools();

export const allCategories = [
  ...new Set([
    ...demoCategories,
    ...allTools.map((t) => t.category),
  ]),
];
