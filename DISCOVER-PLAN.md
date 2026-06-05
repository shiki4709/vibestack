# VibeStack Auto-Discovery Pipeline
## Overviw
Automated pipeline to discover new vibe coding tools from GitHub trending, score them for relevance, and generate full tool profiles — ready for review before merging into the live site.

Adapted from GTM Lab's `npm run discover` pattern but broadened beyond GTM to cover **all vibe coding categories**: UI, Backend, AI, Auth, Deploy, Dev Tools, Database, Payments.
## Pipeline: `npm run discover`
```
GitHub Trending (multi-language)
        ↓
   Cheerio scraper (scraper.ts)
        ↓
   Deduplicate against existing tools.ts
        ↓
   AI Scoring — "Is this a vibe coding tool?" (scorer.ts)
   Claude Haiku scores 1-10 on vibe-coding relevance
        ↓
   Filter: score >= 6 passes
        ↓
   AI Profile Generator (profiler.ts)
   For each qualifying tool, generate:
     - Tool entry (name, description, category, tags)
     - ToolProfile (analogy, realWorldExample, whenToUse, etc.)
        ↓
   Output: data/discoveries/{date}.json (staging file)
```
## Files to Create
| File | Purpose |
| --- | --- |
| `scripts/discover.ts` | CLI entry point, orchestrates the pipeline |
| `scripts/discover/scraper.ts` | Scrapes GitHub trending (cheerio), multi-language |
| `scripts/discover/scorer.ts` | AI scores repos for vibe-coding relevance (1-10) |
| `scripts/discover/profiler.ts` | AI generates Tool + ToolProfile for qualifying repos |
| `scripts/discover/types.ts` | Shared types for the pipeline |
| `scripts/discover/dedup.ts` | Checks against existing tools.ts to skip known tools |
## Scoring Criteria (broad, NOT GTM-specific)
The AI scorer evaluates each repo on:

1. **Accessibility** — Can a non-technical person use this? (chatbot-level → terminal-level)
  
2. **Build enablement** — Does this help someone ship a real product?
  
3. **Category fit** — Does it fit UI / Backend / AI / Auth / Deploy / Dev Tools / Database / Payments?
  
4. **Community** — Stars, activity, documentation quality
  
5. **Vibe level** (1-5) — How "vibe-codeable" is it? (1 = needs deep expertise, 5 = paste and go)
  

Score >= 6 → passes to profiler.
## Profile Generation
For each qualifying tool, the profiler generates VibeStack's signature plain-English content:

- **analogy** — "Like [everyday thing] for your [dev context]"
  
- **realWorldExample** — "Say you're building [concrete app]. Instead of [hard way], you [easy way with this tool]"
  
- **whenToUse** — Plain English, no jargon
  
- **devStage** — Which stage of the dev process (idea → scale)
  
- **category** — UI / Backend / AI / Auth / Deploy / Dev Tools / Database / Payments
  
- **vibeRating** — 1-5 based on accessibility
  
- **alternatives** — Similar tools already in VibeStack or well-known
  
- **goodFor / notFor** — Practical guidance
  
## Output Format
`data/discoveries/{YYYY-MM-DD}.json`:

```json
{
  "discoveredAt": "2026-06-04",
  "source": "github-trending",
  "tools": [
    {
      "tool": { "slug": "...", "name": "...", ... },
      "profile": { "analogy": "...", ... },
      "score": 8,
      "reasoning": "Why this scored high"
    }
  ],
  "skipped": [
    { "name": "...", "score": 3, "reason": "Too low-level / not a build tool" }
  ]
}
```
## Review Workflow
1. Run `npm run discover`
  
2. Review `data/discoveries/{date}.json`
  
3. Run `npm run promote` (future) to merge approved tools into `tools.ts` + `tool-profiles.ts`
  
## AI Provider
Using **DeepSeek** via the OpenAI SDK (same as im-down) for cost efficiency. Falls back to Claude Haiku if needed.
## Dependencies to Add
- `cheerio` — HTML parsing for GitHub trending page
  
- `openai` — DeepSeek API calls (already pattern from im-down)
  
## GitHub Trending Sources
Scrape multiple language tabs to catch tools across ecosystems:

- TypeScript, JavaScript, Python, Rust, Go, Swift, Kotlin
  
- `since=weekly` to catch tools gaining momentum
  
## Dedup Logic
Before scoring, filter out:

- Tools already in `tools.ts` (match by GitHub URL)
  
- Repos that are clearly not tools (tutorials, awesome-lists, course materials)
  
- Repos with < 500 stars (noise filter)
