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
