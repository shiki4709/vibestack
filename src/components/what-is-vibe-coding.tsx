import { AnimateIn, AnimateStagger, AnimateStaggerItem } from "@/components/animate-in";

const levels = [
  {
    level: "1",
    name: "Prompter",
    who: "No code experience. You describe what you want in plain English and AI builds it.",
    unlock: "Launch a portfolio, stand out in interviews, prototype a business idea overnight",
    tools: "Bolt, Lovable, v0",
  },
  {
    level: "2",
    name: "Tweaker",
    who: "You can read code and make small edits. You understand what HTML, CSS, and JavaScript are.",
    unlock: "Build internal tools at work, freelance on the side, become the \"AI person\" on your team",
    tools: "Cursor, Replit, Windsurf",
  },
  {
    level: "3",
    name: "Builder",
    who: "You understand how apps work. You can debug, read docs, and use a terminal.",
    unlock: "Launch products solo, qualify for AI-native roles, become the most dangerous person in the room",
    tools: "Claude Code, Cursor, aider",
  },
];

const outcomes = [
  {
    who: "Ops manager stuck in a dead-end role",
    did: "Built an AI workflow tool as a side project, used it to land a role at an AI startup",
  },
  {
    who: "Marketing manager",
    did: "Built a lead tracking dashboard for her team instead of waiting 3 months for engineering",
  },
  {
    who: "Freelance designer",
    did: "Started offering \"design + build\" packages at 2x his old rate",
  },
  {
    who: "MBA student",
    did: "Shipped an MVP for her startup pitch and got into an accelerator",
  },
  {
    who: "PM feeling replaceable",
    did: "Started building prototypes instead of just writing specs — got promoted to product lead",
  },
  {
    who: "BizOps analyst",
    did: "Automated a weekly report that took 4 hours, then built 3 more tools for her team",
  },
];

export function WhatIsVibeCoding() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-3xl px-6">
        <AnimateIn>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Why this matters now
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            ChatGPT was level one. This is level two.
          </h2>
        </AnimateIn>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Most people are stuck asking AI questions — writing emails, summarizing
          docs, brainstorming ideas. That&apos;s useful, but it&apos;s table
          stakes now. The people getting ahead are the ones using AI to
          actually build things. That&apos;s the gap. Vibe coding closes it.
        </p>

        {/* The shift */}
        <div className="mt-8 rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-medium">Where most people are vs. where you could be</p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded bg-stone-100 px-2 py-0.5 text-xs font-medium text-muted">Most people</span>
              <span className="text-muted">&quot;I use ChatGPT to write emails and brainstorm&quot;</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">You, soon</span>
              <span className="text-muted">&quot;I built this tool that automates half my team&apos;s workflow&quot;</span>
            </div>
            <div className="mt-2 border-t border-border pt-3">
              <p className="text-muted">
                That&apos;s the difference between using AI and building with
                AI. One makes you efficient. The other makes you irreplaceable.
              </p>
            </div>
          </div>
        </div>

        {/* Outcomes */}
        <div className="mt-6 rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-medium">What people do with this</p>
          <div className="mt-4 space-y-4">
            {outcomes.map((o) => (
              <div key={o.who} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-3">
                <span className="shrink-0 font-medium text-foreground">
                  {o.who}
                </span>
                <span className="text-muted">— {o.did}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Who is this for */}
        <div className="mt-6 rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-medium">This is for you if...</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li className="flex gap-2">
              <span className="text-accent">-</span>
              You use ChatGPT daily but haven&apos;t built anything with AI yet
            </li>
            <li className="flex gap-2">
              <span className="text-accent">-</span>
              You feel stuck in your role and want to move into AI or tech
            </li>
            <li className="flex gap-2">
              <span className="text-accent">-</span>
              You see &quot;AI experience&quot; on job listings and don&apos;t know how to get it
            </li>
            <li className="flex gap-2">
              <span className="text-accent">-</span>
              You&apos;re tired of depending on engineers for every small tool or change
            </li>
            <li className="flex gap-2">
              <span className="text-accent">-</span>
              You want &quot;I built this&quot; on your resume, not just &quot;familiar with AI tools&quot;
            </li>
          </ul>
        </div>

        {/* Levels */}
        <div className="mt-10">
          <p className="text-sm font-medium">Three levels of vibe coder</p>
          <p className="mt-1 text-sm text-muted">
            Everyone starts somewhere. Each level unlocks new career possibilities.
          </p>

          <AnimateStagger className="mt-6 space-y-4">
            {levels.map((l) => (
              <AnimateStaggerItem
                key={l.level}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {l.level}
                  </span>
                  <h3 className="font-semibold">{l.name}</h3>
                </div>
                <p className="mt-2 text-sm text-muted">{l.who}</p>
                <div className="mt-3 flex flex-col gap-1 text-xs">
                  <div className="flex gap-2">
                    <span className="font-medium text-accent">Unlocks:</span>
                    <span className="text-muted">{l.unlock}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-foreground">Tools:</span>
                    <span className="text-muted">{l.tools}</span>
                  </div>
                </div>
              </AnimateStaggerItem>
            ))}
          </AnimateStagger>
        </div>
      </div>
    </section>
  );
}
