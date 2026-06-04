import pickedMedia from "./picked-media.json";
import websiteOg from "./website-og.json";

export interface Demo {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly isGif: boolean;
  readonly github: string;
  readonly website?: string;
  readonly tags: readonly string[];
  readonly vibeRating: number;
  readonly pricing: "free" | "free-tier" | "paid";
  readonly level: 1 | 2 | 3;
}

interface PickedMediaEntry {
  readonly slug: string;
  readonly name: string;
  readonly image: string;
  readonly imageType: string;
  readonly demoUrl: string | null;
}

interface WebsiteOgEntry {
  readonly slug: string;
  readonly ogImage: string | null;
}

// Map of slug -> GitHub README media (prefer GIFs from here)
const githubMediaMap = new Map<string, PickedMediaEntry>(
  (pickedMedia as readonly PickedMediaEntry[]).map((m) => [m.slug, m])
);

// Map of slug -> website OG image (prefer these for static images)
const websiteOgMap = new Map<string, WebsiteOgEntry>(
  (websiteOg as readonly WebsiteOgEntry[]).map((m) => [m.slug, m])
);

// Tool definitions with scraped images
const toolDefs = [
  {
    slug: "shadcn-ui",
    name: "shadcn/ui",
    description: "Copy-paste components built on Radix + Tailwind. The default UI choice for vibe coders.",
    category: "UI",
    github: "https://github.com/shadcn-ui/ui",
    website: "https://ui.shadcn.com",
    tags: ["react", "tailwind", "components"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 2 as const,
  },
  {
    slug: "magic-ui",
    name: "Magic UI",
    description: "Animated components for landing pages. Spotlight effects, bento grids, scroll reveals.",
    category: "UI",
    github: "https://github.com/magicuidesign/magicui",
    website: "https://magicui.design",
    tags: ["react", "animation", "landing page"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 2 as const,
  },
  {
    slug: "sonner",
    name: "Sonner",
    description: "Beautiful toast notifications. One import, done.",
    category: "UI",
    github: "https://github.com/emilkowalski/sonner",
    website: "https://sonner.emilkowal.ski",
    tags: ["react", "toast"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 2 as const,
  },
  {
    slug: "hono",
    name: "Hono",
    description: "Ultralight web framework that runs everywhere. Cloudflare, Vercel, Bun, Deno.",
    category: "Backend",
    github: "https://github.com/honojs/hono",
    website: "https://hono.dev",
    tags: ["api", "edge", "serverless"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 3 as const,
  },
  {
    slug: "trpc",
    name: "tRPC",
    description: "End-to-end typesafe APIs. Full autocomplete from backend to frontend, no codegen.",
    category: "Backend",
    github: "https://github.com/trpc/trpc",
    website: "https://trpc.io",
    tags: ["typescript", "api", "full-stack"],
    vibeRating: 4,
    pricing: "free" as const,
    level: 3 as const,
  },
  {
    slug: "elysia",
    name: "Elysia",
    description: "Bun-native web framework with end-to-end type safety. Built for speed.",
    category: "Backend",
    github: "https://github.com/elysiajs/elysia",
    website: "https://elysiajs.com",
    tags: ["bun", "typescript", "api"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 3 as const,
  },
  {
    slug: "supabase",
    name: "Supabase",
    description: "Postgres + Auth + Storage + Realtime. The go-to backend for vibe coders.",
    category: "Database",
    github: "https://github.com/supabase/supabase",
    website: "https://supabase.com",
    tags: ["postgres", "auth", "realtime"],
    vibeRating: 5,
    pricing: "free-tier" as const,
    level: 1 as const,
  },
  {
    slug: "drizzle-orm",
    name: "Drizzle ORM",
    description: "TypeScript ORM that feels like SQL. Lightweight, fast migrations, great with AI.",
    category: "Database",
    github: "https://github.com/drizzle-team/drizzle-orm",
    website: "https://orm.drizzle.team",
    tags: ["typescript", "orm", "sql"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 3 as const,
  },
  {
    slug: "convex",
    name: "Convex",
    description: "Reactive backend with built-in database and real-time sync. Zero config.",
    category: "Database",
    github: "https://github.com/get-convex/convex-backend",
    website: "https://convex.dev",
    tags: ["realtime", "serverless"],
    vibeRating: 5,
    pricing: "free-tier" as const,
    level: 2 as const,
  },
  {
    slug: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    description: "Stream AI responses in React. useChat, useCompletion — works with any LLM provider.",
    category: "AI",
    github: "https://github.com/vercel/ai",
    website: "https://sdk.vercel.ai",
    tags: ["llm", "streaming", "react"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 2 as const,
  },
  {
    slug: "openrouter",
    name: "OpenRouter",
    description: "One API for all LLMs. Switch between GPT, Claude, Gemini without changing code.",
    category: "AI",
    github: "https://github.com/OpenRouterTeam/openrouter-runner",
    website: "https://openrouter.ai",
    tags: ["llm", "api", "multi-model"],
    vibeRating: 5,
    pricing: "free-tier" as const,
    level: 2 as const,
  },
  {
    slug: "better-auth",
    name: "Better Auth",
    description: "TypeScript-first auth. Email, OAuth, magic links, 2FA. No vendor lock-in.",
    category: "Auth",
    github: "https://github.com/better-auth/better-auth",
    website: "https://better-auth.com",
    tags: ["typescript", "auth", "self-hosted"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 3 as const,
  },
  {
    slug: "clerk",
    name: "Clerk",
    description: "Drop-in auth with user management UI. Fastest way to add login.",
    category: "Auth",
    github: "https://github.com/clerk/javascript",
    website: "https://clerk.com",
    tags: ["auth", "hosted", "react"],
    vibeRating: 5,
    pricing: "free-tier" as const,
    level: 1 as const,
  },
  {
    slug: "coolify",
    name: "Coolify",
    description: "Self-hosted Vercel alternative. Deploy anything to your own server with a nice UI.",
    category: "Deploy",
    github: "https://github.com/coollabsio/coolify",
    website: "https://coolify.io",
    tags: ["self-hosted", "docker", "deploy"],
    vibeRating: 4,
    pricing: "free" as const,
    level: 3 as const,
  },
  {
    slug: "sst",
    name: "SST",
    description: "Deploy Next.js, Remix, or anything to AWS with zero config. IaC that doesn't suck.",
    category: "Deploy",
    github: "https://github.com/sst/sst",
    website: "https://sst.dev",
    tags: ["aws", "serverless"],
    vibeRating: 4,
    pricing: "free" as const,
    level: 3 as const,
  },
  {
    slug: "biome",
    name: "Biome",
    description: "Replaces ESLint + Prettier in one tool. Instant formatting, zero config.",
    category: "Dev Tools",
    github: "https://github.com/biomejs/biome",
    website: "https://biomejs.dev",
    tags: ["linting", "formatting"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 3 as const,
  },
  {
    slug: "cursor-rules",
    name: "cursor.directory",
    description: "Community rules for Cursor AI. Copy a rule, get better AI suggestions for your stack.",
    category: "Dev Tools",
    github: "https://github.com/pontusab/cursor.directory",
    website: "https://cursor.directory",
    tags: ["cursor", "ai", "rules"],
    vibeRating: 5,
    pricing: "free" as const,
    level: 2 as const,
  },
  // AI Coding Tools — the core vibe coding instruments
  {
    slug: "bolt",
    name: "Bolt",
    description: "Build full-stack apps in your browser by describing what you want. No install, no setup.",
    category: "AI Coding",
    github: "https://github.com/stackblitz/bolt.new",
    website: "https://bolt.new",
    tags: ["browser", "no-code", "full-stack"],
    vibeRating: 5,
    pricing: "free-tier" as const,
    level: 1 as const,
  },
  {
    slug: "lovable",
    name: "Lovable",
    description: "Visual AI builder. Describe your app, watch it appear. Great for designers and non-technical founders.",
    category: "AI Coding",
    github: "https://github.com/lovable-dev",
    website: "https://lovable.dev",
    tags: ["browser", "visual", "no-code"],
    vibeRating: 5,
    pricing: "free-tier" as const,
    level: 1 as const,
  },
  {
    slug: "v0-dev",
    name: "v0 by Vercel",
    description: "Describe a UI in words, get production-ready React components. Perfect for landing pages and UI prototypes.",
    category: "AI Coding",
    github: "https://github.com/vercel/v0",
    website: "https://v0.dev",
    tags: ["ui", "react", "components"],
    vibeRating: 5,
    pricing: "free-tier" as const,
    level: 1 as const,
  },
  {
    slug: "replit-agent",
    name: "Replit Agent",
    description: "Full dev environment in the browser. Build complete apps from a prompt, deploy instantly.",
    category: "AI Coding",
    github: "https://github.com/replit",
    website: "https://replit.com",
    tags: ["browser", "full-stack", "deploy"],
    vibeRating: 5,
    pricing: "free-tier" as const,
    level: 1 as const,
  },
  {
    slug: "cursor",
    name: "Cursor",
    description: "VS Code-based code editor with AI built in. Cmd+K to describe changes, Tab to accept. Free tier available.",
    category: "AI Coding",
    github: "https://github.com/getcursor/cursor",
    website: "https://cursor.com",
    tags: ["editor", "ai", "vscode"],
    vibeRating: 5,
    pricing: "free-tier" as const,
    level: 2 as const,
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    description: "AI code editor with its own agent. Similar to Cursor with a different workflow and agent approach.",
    category: "AI Coding",
    github: "https://github.com/codeium-ai",
    website: "https://windsurf.com",
    tags: ["editor", "ai", "agent"],
    vibeRating: 4,
    pricing: "free-tier" as const,
    level: 2 as const,
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    description: "AI pair programmer from GitHub. Works inside VS Code, JetBrains, and Neovim. Autocompletes code as you type.",
    category: "AI Coding",
    github: "https://github.com/features/copilot",
    website: "https://github.com/features/copilot",
    tags: ["editor", "autocomplete", "ai"],
    vibeRating: 4,
    pricing: "free-tier" as const,
    level: 2 as const,
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    description: "Anthropic's AI coding agent for the terminal. Reads your codebase, edits across files, runs commands.",
    category: "AI Coding",
    github: "https://github.com/anthropics/claude-code",
    website: "https://claude.ai/code",
    tags: ["terminal", "agent", "cli"],
    vibeRating: 5,
    pricing: "paid" as const,
    level: 3 as const,
  },
  {
    slug: "codex-cli",
    name: "Codex",
    description: "OpenAI's AI coding agent for the terminal. Understands your repo, writes and runs code autonomously.",
    category: "AI Coding",
    github: "https://github.com/openai/codex",
    website: "https://openai.com/index/introducing-codex",
    tags: ["terminal", "agent", "cli"],
    vibeRating: 4,
    pricing: "paid" as const,
    level: 3 as const,
  },
  {
    slug: "gemini-cli",
    name: "Gemini CLI",
    description: "Google's AI coding agent for the terminal. Open source, works with Gemini models.",
    category: "AI Coding",
    github: "https://github.com/google-gemini/gemini-cli",
    website: "https://github.com/google-gemini/gemini-cli",
    tags: ["terminal", "agent", "cli", "open-source"],
    vibeRating: 4,
    pricing: "free" as const,
    level: 3 as const,
  },
  {
    slug: "aider",
    name: "aider",
    description: "Open-source terminal AI pair programmer. Works with any LLM provider. Bring your own API key.",
    category: "AI Coding",
    github: "https://github.com/paul-gauthier/aider",
    website: "https://aider.chat",
    tags: ["terminal", "open-source", "multi-model"],
    vibeRating: 4,
    pricing: "free" as const,
    level: 3 as const,
  },
] as const;

export const demos: readonly Demo[] = toolDefs.map((tool) => {
  const github = githubMediaMap.get(tool.slug);
  const website = websiteOgMap.get(tool.slug);

  // Priority: GIFs from GitHub > OG image from product website > GitHub README image
  const isGif = github?.imageType === "gif";
  let image = "";

  if (isGif && github?.image) {
    // GIFs are great demo content — use them
    image = github.image;
  } else if (website?.ogImage) {
    // Product website OG images look much better than GitHub repo cards
    image = website.ogImage;
  } else if (github?.image) {
    image = github.image;
  }

  return { ...tool, image, isGif };
});

export const categories = [...new Set(toolDefs.map((t) => t.category))];
