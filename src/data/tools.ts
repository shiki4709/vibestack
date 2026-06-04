export interface Tool {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly category: Category;
  readonly github: string;
  readonly website?: string;
  readonly stars: string;
  readonly vibeRating: 1 | 2 | 3 | 4 | 5;
  readonly videoUrl?: string;
  readonly tags: readonly string[];
}

export type Category =
  | "UI"
  | "Backend"
  | "AI"
  | "Auth"
  | "Deploy"
  | "Dev Tools"
  | "Database"
  | "Payments";

export const categories: readonly Category[] = [
  "UI",
  "Backend",
  "AI",
  "Auth",
  "Deploy",
  "Dev Tools",
  "Database",
  "Payments",
];

export const tools: readonly Tool[] = [
  // UI
  {
    slug: "shadcn-ui",
    name: "shadcn/ui",
    description:
      "Copy-paste component library built on Radix and Tailwind. The default UI choice for most vibe coders.",
    category: "UI",
    github: "https://github.com/shadcn-ui/ui",
    website: "https://ui.shadcn.com",
    stars: "82k",
    vibeRating: 5,
    tags: ["react", "tailwind", "components"],
  },
  {
    slug: "magic-ui",
    name: "Magic UI",
    description:
      "Animated components you can copy-paste. Landing page sections, hero effects, and micro-interactions.",
    category: "UI",
    github: "https://github.com/magicuidesign/magicui",
    website: "https://magicui.design",
    stars: "15k",
    vibeRating: 5,
    tags: ["react", "animation", "landing page"],
  },
  {
    slug: "aceternity-ui",
    name: "Aceternity UI",
    description:
      "Trendy animated components with that modern SaaS look. Spotlight effects, 3D cards, floating elements.",
    category: "UI",
    github: "https://github.com/aceternity/aceternity-ui",
    website: "https://ui.aceternity.com",
    stars: "8k",
    vibeRating: 4,
    tags: ["react", "animation", "effects"],
  },
  {
    slug: "next-themes",
    name: "next-themes",
    description:
      "Dark mode in one line. Drop it in, get system/light/dark toggle with zero flash.",
    category: "UI",
    github: "https://github.com/pacocoursey/next-themes",
    stars: "6k",
    vibeRating: 5,
    tags: ["next.js", "dark mode", "theming"],
  },
  {
    slug: "sonner",
    name: "Sonner",
    description:
      "The toast library everyone uses now. Beautiful by default, one import, done.",
    category: "UI",
    github: "https://github.com/emilkowalski/sonner",
    website: "https://sonner.emilkowal.ski",
    stars: "10k",
    vibeRating: 5,
    tags: ["react", "toast", "notifications"],
  },

  // Backend
  {
    slug: "hono",
    name: "Hono",
    description:
      "Ultralight web framework that runs everywhere — Cloudflare Workers, Vercel, Bun, Deno. Fast to set up with AI.",
    category: "Backend",
    github: "https://github.com/honojs/hono",
    website: "https://hono.dev",
    stars: "22k",
    vibeRating: 5,
    tags: ["api", "edge", "serverless"],
  },
  {
    slug: "trpc",
    name: "tRPC",
    description:
      "End-to-end typesafe APIs. Define your backend, get full autocomplete on the frontend. No codegen.",
    category: "Backend",
    github: "https://github.com/trpc/trpc",
    website: "https://trpc.io",
    stars: "36k",
    vibeRating: 4,
    tags: ["typescript", "api", "full-stack"],
  },
  {
    slug: "elysia",
    name: "Elysia",
    description:
      "Bun-native web framework with end-to-end type safety. Fast DX, great for vibe coding APIs.",
    category: "Backend",
    github: "https://github.com/elysiajs/elysia",
    website: "https://elysiajs.com",
    stars: "12k",
    vibeRating: 5,
    tags: ["bun", "typescript", "api"],
  },

  // Database
  {
    slug: "supabase",
    name: "Supabase",
    description:
      "Postgres + Auth + Storage + Realtime in one click. The go-to backend for vibe coders who don't want to manage infra.",
    category: "Database",
    github: "https://github.com/supabase/supabase",
    website: "https://supabase.com",
    stars: "78k",
    vibeRating: 5,
    tags: ["postgres", "auth", "realtime", "baas"],
  },
  {
    slug: "drizzle-orm",
    name: "Drizzle ORM",
    description:
      "TypeScript ORM that feels like writing SQL. Lightweight, fast migrations, great with AI code generation.",
    category: "Database",
    github: "https://github.com/drizzle-team/drizzle-orm",
    website: "https://orm.drizzle.team",
    stars: "28k",
    vibeRating: 5,
    tags: ["typescript", "orm", "sql"],
  },
  {
    slug: "convex",
    name: "Convex",
    description:
      "Reactive backend with built-in database, real-time sync, and serverless functions. Zero config.",
    category: "Database",
    github: "https://github.com/get-convex/convex-backend",
    website: "https://convex.dev",
    stars: "4k",
    vibeRating: 5,
    tags: ["realtime", "serverless", "baas"],
  },

  // AI
  {
    slug: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    description:
      "Stream AI responses in React with useChat and useCompletion. Works with OpenAI, Anthropic, and more.",
    category: "AI",
    github: "https://github.com/vercel/ai",
    website: "https://sdk.vercel.ai",
    stars: "12k",
    vibeRating: 5,
    tags: ["llm", "streaming", "react"],
  },
  {
    slug: "langchain-js",
    name: "LangChain.js",
    description:
      "Build LLM-powered apps with chains, agents, and RAG. The Swiss Army knife of AI development.",
    category: "AI",
    github: "https://github.com/langchain-ai/langchainjs",
    website: "https://js.langchain.com",
    stars: "14k",
    vibeRating: 3,
    tags: ["llm", "agents", "rag"],
  },
  {
    slug: "openrouter",
    name: "OpenRouter",
    description:
      "One API for all LLMs — GPT, Claude, Gemini, Llama. Switch models without changing code.",
    category: "AI",
    github: "https://github.com/OpenRouterTeam/openrouter-runner",
    website: "https://openrouter.ai",
    stars: "2k",
    vibeRating: 5,
    tags: ["llm", "api", "multi-model"],
  },

  // Auth
  {
    slug: "better-auth",
    name: "Better Auth",
    description:
      "TypeScript-first auth library. Email, OAuth, magic links, 2FA — all built-in, no vendor lock-in.",
    category: "Auth",
    github: "https://github.com/better-auth/better-auth",
    website: "https://better-auth.com",
    stars: "8k",
    vibeRating: 5,
    tags: ["typescript", "auth", "self-hosted"],
  },
  {
    slug: "lucia-auth",
    name: "Lucia",
    description:
      "Lightweight auth library that doesn't abstract away the database. You own your user table.",
    category: "Auth",
    github: "https://github.com/lucia-auth/lucia",
    website: "https://lucia-auth.com",
    stars: "10k",
    vibeRating: 4,
    tags: ["auth", "sessions", "lightweight"],
  },
  {
    slug: "clerk",
    name: "Clerk",
    description:
      "Drop-in auth UI with user management. Fastest way to add login if you don't want to build it yourself.",
    category: "Auth",
    github: "https://github.com/clerk/javascript",
    website: "https://clerk.com",
    stars: "5k",
    vibeRating: 5,
    tags: ["auth", "hosted", "react"],
  },

  // Deploy
  {
    slug: "coolify",
    name: "Coolify",
    description:
      "Self-hosted Vercel/Netlify alternative. Deploy anything to your own server with a nice UI.",
    category: "Deploy",
    github: "https://github.com/coollabsio/coolify",
    website: "https://coolify.io",
    stars: "38k",
    vibeRating: 4,
    tags: ["self-hosted", "docker", "deploy"],
  },
  {
    slug: "dokku",
    name: "Dokku",
    description:
      "Mini Heroku on your own server. Git push to deploy. Simple, proven, free.",
    category: "Deploy",
    github: "https://github.com/dokku/dokku",
    website: "https://dokku.com",
    stars: "30k",
    vibeRating: 3,
    tags: ["self-hosted", "paas", "docker"],
  },
  {
    slug: "sst",
    name: "SST",
    description:
      "Deploy Next.js, Remix, or any framework to AWS with zero config. Infrastructure as code that doesn't suck.",
    category: "Deploy",
    github: "https://github.com/sst/sst",
    website: "https://sst.dev",
    stars: "22k",
    vibeRating: 4,
    tags: ["aws", "serverless", "iac"],
  },

  // Dev Tools
  {
    slug: "biome",
    name: "Biome",
    description:
      "Replaces ESLint + Prettier in one tool. Instant formatting, fast linting, zero config to start.",
    category: "Dev Tools",
    github: "https://github.com/biomejs/biome",
    website: "https://biomejs.dev",
    stars: "18k",
    vibeRating: 5,
    tags: ["linting", "formatting", "tooling"],
  },
  {
    slug: "turborepo",
    name: "Turborepo",
    description:
      "Monorepo build system. Cache everything, run tasks in parallel. Essential for multi-package projects.",
    category: "Dev Tools",
    github: "https://github.com/vercel/turborepo",
    website: "https://turbo.build",
    stars: "27k",
    vibeRating: 4,
    tags: ["monorepo", "build", "caching"],
  },
  {
    slug: "cursor-rules",
    name: "cursor.directory",
    description:
      "Community-curated rules for Cursor AI. Copy a rule file, get better AI suggestions for your stack.",
    category: "Dev Tools",
    github: "https://github.com/pontusab/cursor.directory",
    website: "https://cursor.directory",
    stars: "12k",
    vibeRating: 5,
    tags: ["cursor", "ai", "rules"],
  },
];
