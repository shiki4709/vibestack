import { AnimateIn, AnimateStagger, AnimateStaggerItem } from "@/components/animate-in";

const levels = [
  {
    level: "1",
    name: "Prompter",
    who: "No code experience. You describe what you want and AI builds it.",
    unlock: "Launch a portfolio, stand out in interviews, prototype overnight",
    tools: "Bolt, Lovable, v0",
  },
  {
    level: "2",
    name: "Tweaker",
    who: "You can read code and make small edits.",
    unlock: "Freelance on the side, become the 'AI person' on your team",
    tools: "Cursor, Replit, Windsurf",
  },
  {
    level: "3",
    name: "Builder",
    who: "You understand how apps work. You can debug and use a terminal.",
    unlock: "Launch products solo, qualify for AI-native roles",
    tools: "Claude Code, Cursor, aider",
  },
];

const outcomes = [
  { who: "Ops manager, stuck in a dead-end role", did: "Built an AI workflow tool, landed a job at an AI startup" },
  { who: "Marketing manager", did: "Built a lead tracker instead of waiting on engineering" },
  { who: "Freelance designer", did: "Started offering 'design + build' at 2x his old rate" },
  { who: "PM feeling replaceable", did: "Started building prototypes, got promoted to product lead" },
];

export function WhatIsVibeCoding() {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Two-column intro */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <AnimateIn>
            <div>
              <p className="text-sm font-medium text-primary">Why this matters now</p>
              <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink">
                ChatGPT was level one.
                <br />
                This is level two.
              </h2>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div className="space-y-4 text-[0.95rem] leading-relaxed text-muted">
              <p>
                Most people are stuck asking AI questions. Writing emails,
                summarizing docs, brainstorming ideas. Useful, but table
                stakes now.
              </p>
              <p>
                The people getting ahead are using AI to actually build things.
                That&apos;s the gap. Vibe coding closes it.
              </p>
            </div>
          </AnimateIn>
        </div>

        {/* The shift — asymmetric callout */}
        <AnimateIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-surface p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Most people</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                &ldquo;I use ChatGPT to write emails and brainstorm.&rdquo;
              </p>
            </div>
            <div className="rounded-xl border-2 border-primary/20 bg-surface p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">You, soon</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
                &ldquo;I built this tool that automates half my team&apos;s workflow.&rdquo;
              </p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn>
          <p className="mt-4 text-sm text-muted">
            One makes you efficient. The other makes you irreplaceable.
          </p>
        </AnimateIn>

        {/* Outcomes — simple list, no cards */}
        <div className="mt-16">
          <AnimateIn>
            <h3 className="font-display text-xl font-bold text-ink">
              What people do with this
            </h3>
          </AnimateIn>
          <AnimateStagger className="mt-6 space-y-4">
            {outcomes.map((o) => (
              <AnimateStaggerItem key={o.who} className="flex flex-col gap-1 border-b border-border pb-4 last:border-0 sm:flex-row sm:gap-3">
                <span className="shrink-0 text-sm font-medium text-ink">
                  {o.who}
                </span>
                <span className="text-sm text-muted">— {o.did}</span>
              </AnimateStaggerItem>
            ))}
          </AnimateStagger>
        </div>

        {/* This is for you — no card, just a list */}
        <div className="mt-14">
          <AnimateIn>
            <h3 className="font-display text-xl font-bold text-ink">
              This is for you if...
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              <li>You use ChatGPT daily but haven&apos;t built anything with AI yet</li>
              <li>You feel stuck in your role and want to move into AI or tech</li>
              <li>You see &ldquo;AI experience&rdquo; on job listings and don&apos;t know how to get it</li>
              <li>You want &ldquo;I built this&rdquo; on your resume, not just &ldquo;familiar with AI tools&rdquo;</li>
            </ul>
          </AnimateIn>
        </div>

        {/* Levels — horizontal layout, not stacked cards */}
        <div className="mt-16">
          <AnimateIn>
            <h3 className="font-display text-xl font-bold text-ink">
              Three levels of vibe coder
            </h3>
            <p className="mt-2 text-sm text-muted">
              Everyone starts somewhere. Each level unlocks new career possibilities.
            </p>
          </AnimateIn>

          <AnimateStagger className="mt-8 grid gap-6 sm:grid-cols-3">
            {levels.map((l) => (
              <AnimateStaggerItem key={l.level}>
                <div className="h-full border-t-2 border-primary/30 pt-5">
                  <span className="font-display text-2xl font-bold text-primary">
                    {l.level}
                  </span>
                  <h4 className="mt-1 font-display text-lg font-bold text-ink">
                    {l.name}
                  </h4>
                  <p className="mt-2 text-sm text-muted">{l.who}</p>
                  <p className="mt-3 text-xs text-muted">
                    <span className="font-medium text-accent">Unlocks:</span>{" "}
                    {l.unlock}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    <span className="font-medium text-ink">Tools:</span>{" "}
                    {l.tools}
                  </p>
                </div>
              </AnimateStaggerItem>
            ))}
          </AnimateStagger>
        </div>
      </div>
    </section>
  );
}
