"use client";

import { useState } from "react";

interface Question {
  readonly id: string;
  readonly question: string;
  readonly options: readonly {
    readonly label: string;
    readonly value: number;
  }[];
}

interface Recommendation {
  readonly levelNumber: number;
  readonly levelName: string;
  readonly tagline: string;
  readonly description: string;
  readonly literacyBar: readonly boolean[];
  readonly tools: readonly {
    readonly name: string;
    readonly why: string;
    readonly url: string;
    readonly free: boolean;
  }[];
  readonly nextSteps: readonly string[];
}

const questions: readonly Question[] = [
  {
    id: "code",
    question: "Have you ever written code before?",
    options: [
      { label: "Never", value: 0 },
      { label: "A little (HTML, CSS, or a tutorial)", value: 1 },
      { label: "Yes, I can build basic things", value: 2 },
      { label: "Yes, I code regularly", value: 3 },
    ],
  },
  {
    id: "terminal",
    question: "Are you comfortable using a terminal / command line?",
    options: [
      { label: "What's a terminal?", value: 0 },
      { label: "I've seen one but it scares me", value: 1 },
      { label: "I can run basic commands", value: 2 },
      { label: "I live in the terminal", value: 3 },
    ],
  },
  {
    id: "debug",
    question: "When something breaks, what do you do?",
    options: [
      { label: "I have no idea what to do", value: 0 },
      { label: "I Google the error message", value: 1 },
      { label: "I can usually figure it out", value: 2 },
      { label: "I read the error, check the code, and fix it", value: 3 },
    ],
  },
  {
    id: "goal",
    question: "What do you want to build?",
    options: [
      { label: "A simple website or landing page", value: 0 },
      { label: "A web app with user accounts", value: 1 },
      { label: "Something with AI or a database", value: 2 },
      { label: "A full product I want to launch", value: 3 },
    ],
  },
];

function getRecommendation(score: number): Recommendation {
  if (score <= 3) {
    return {
      levelNumber: 1,
      levelName: "Prompter",
      tagline: "You describe it, AI builds it",
      description:
        "You're starting from zero — and that's totally fine. The tools below run in your browser. No install, no terminal, no code editor. Just describe what you want.",
      literacyBar: [true, false, false],
      tools: [
        {
          name: "Bolt",
          why: "Type a description, get a working app. No setup needed.",
          url: "https://bolt.new",
          free: true,
        },
        {
          name: "Lovable",
          why: "Visual builder that feels like designing, not coding.",
          url: "https://lovable.dev",
          free: true,
        },
        {
          name: "v0 by Vercel",
          why: "Describe a UI in words, get polished components back.",
          url: "https://v0.dev",
          free: true,
        },
      ],
      nextSteps: [
        "Pick Bolt or Lovable — both are free and work in your browser",
        "Start simple: \"a personal portfolio with my name, bio, and 3 project links\"",
        "Iterate: ask it to change colors, layout, text until you like it",
        "Deploy for free on Vercel or Netlify when it looks good",
      ],
    };
  }

  if (score <= 7) {
    return {
      levelNumber: 2,
      levelName: "Tweaker",
      tagline: "You can read code and nudge it in the right direction",
      description:
        "You have some technical instinct — you can read code, spot what's wrong, and make small edits. An AI code editor will give you more control than browser-only tools.",
      literacyBar: [true, true, false],
      tools: [
        {
          name: "Cursor",
          why: "VS Code with AI built in. Cmd+K to describe changes, Tab to accept. Free tier available.",
          url: "https://cursor.com",
          free: true,
        },
        {
          name: "Replit Agent",
          why: "Full dev environment in the browser. Builds complete apps from a prompt.",
          url: "https://replit.com",
          free: true,
        },
        {
          name: "Windsurf",
          why: "AI code editor with its own agent. Good alternative to Cursor.",
          url: "https://windsurf.com",
          free: true,
        },
      ],
      nextSteps: [
        "Install Cursor (free) — it looks and works like VS Code",
        "Open a project, press Cmd+K, describe what you want to add or change",
        "When AI generates code, read it before accepting — you'll learn fast",
        "Use Bolt for quick throwaway prototypes, Cursor for real projects",
      ],
    };
  }

  return {
    levelNumber: 3,
    levelName: "Builder",
    tagline: "You understand how apps work and use AI as a multiplier",
    description:
      "You can debug, read docs, and navigate a codebase. AI doesn't replace you — it makes you 10x faster. These tools give you full control.",
    literacyBar: [true, true, true],
    tools: [
      {
        name: "Claude Code",
        why: "AI agent in your terminal. Reads your whole codebase, edits across files, runs commands. Most powerful option for builders.",
        url: "https://claude.ai/code",
        free: false,
      },
      {
        name: "Cursor",
        why: "Best AI code editor for when you want to see and steer the code as it's written.",
        url: "https://cursor.com",
        free: true,
      },
      {
        name: "aider",
        why: "Open-source terminal AI pair programmer. Works with any LLM. Free if you bring your own API key.",
        url: "https://aider.chat",
        free: true,
      },
    ],
    nextSteps: [
      "Try Claude Code in a project — describe a feature and watch it work across files",
      "Use Cursor for UI work where you want visual feedback as AI edits",
      "Combine both: Claude Code for architecture/backend, Cursor for frontend",
      "Check the tools below — they'll speed up every part of your stack",
    ],
  };
}

export function GettingStarted() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const allAnswered = Object.keys(answers).length === questions.length;
  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const recommendation = getRecommendation(score);

  function selectAnswer(questionId: string, value: number) {
    setAnswers({ ...answers, [questionId]: value });
    setShowResult(false);
  }

  function reset() {
    setAnswers({});
    setShowResult(false);
  }

  return (
    <section id="start" className="border-t border-border py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium text-accent">Find your level</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">
          Which vibe coder are you?
        </h2>
        <p className="mt-2 text-sm text-muted">
          4 quick questions. We&apos;ll tell you your level and the best tools
          to start with.
        </p>

        {/* Questions */}
        <div className="mt-10 space-y-8">
          {questions.map((q, qi) => (
            <div key={q.id}>
              <p className="text-sm font-medium">
                <span className="text-accent">{qi + 1}.</span> {q.question}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt) => (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => selectAnswer(q.id, opt.value)}
                    className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      answers[q.id] === opt.value
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card hover:bg-card-hover"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Show result button */}
        {allAnswered && !showResult && (
          <button
            type="button"
            onClick={() => setShowResult(true)}
            className="mt-8 rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            See my result
          </button>
        )}

        {/* Result */}
        {showResult && (
          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            {/* Level header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-accent">
                  You&apos;re a
                </p>
                <h3 className="mt-1 text-2xl font-bold">
                  Level {recommendation.levelNumber}: {recommendation.levelName}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {recommendation.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="text-xs text-muted transition-colors hover:text-foreground"
              >
                Retake
              </button>
            </div>

            {/* Literacy bar */}
            <div className="mt-5">
              <p className="text-xs text-muted">Technical literacy</p>
              <div className="mt-2 flex gap-1.5">
                {["Prompter", "Tweaker", "Builder"].map((label, i) => (
                  <div key={label} className="flex-1">
                    <div
                      className={`h-2 rounded-full ${
                        recommendation.literacyBar[i]
                          ? "bg-accent"
                          : "bg-border"
                      }`}
                    />
                    <p
                      className={`mt-1 text-[10px] ${
                        recommendation.literacyBar[i]
                          ? "font-medium text-foreground"
                          : "text-muted"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted">
              {recommendation.description}
            </p>

            {/* Tool recommendations */}
            <div className="mt-6 space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Recommended tools
              </p>
              {recommendation.tools.map((tool, i) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-border p-4 transition-colors hover:bg-card-hover"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{tool.name}</span>
                    {i === 0 && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                        Best match
                      </span>
                    )}
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        tool.free
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {tool.free ? "Free" : "Paid"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{tool.why}</p>
                </a>
              ))}
            </div>

            {/* Next steps */}
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Your next steps
              </p>
              <ol className="mt-3 space-y-2">
                {recommendation.nextSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="shrink-0 font-medium text-accent">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
