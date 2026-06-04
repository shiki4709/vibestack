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
  readonly description: string;
  readonly tools: readonly {
    readonly name: string;
    readonly why: string;
    readonly url: string;
  }[];
}

const questions: readonly Question[] = [
  {
    id: "code",
    question: "Have you ever written code?",
    options: [
      { label: "Never", value: 0 },
      { label: "A little", value: 1 },
      { label: "I can build basic things", value: 2 },
      { label: "I code regularly", value: 3 },
    ],
  },
  {
    id: "terminal",
    question: "Comfortable with a terminal?",
    options: [
      { label: "What's a terminal?", value: 0 },
      { label: "It scares me", value: 1 },
      { label: "I can run commands", value: 2 },
      { label: "I live in it", value: 3 },
    ],
  },
  {
    id: "goal",
    question: "What do you want to build?",
    options: [
      { label: "A website", value: 0 },
      { label: "A web app", value: 1 },
      { label: "Something with AI", value: 2 },
      { label: "A full product", value: 3 },
    ],
  },
];

function getRecommendation(score: number): Recommendation {
  if (score <= 2) {
    return {
      levelNumber: 1,
      levelName: "Prompter",
      description: "Start in the browser. No install needed. Just describe what you want.",
      tools: [
        { name: "Bolt", why: "Type a description, get a working app.", url: "https://bolt.new" },
        { name: "Lovable", why: "Visual builder, feels like designing.", url: "https://lovable.dev" },
        { name: "Replit Agent", why: "Full apps from a prompt, in browser.", url: "https://replit.com" },
        { name: "v0", why: "Describe a UI, get components back.", url: "https://v0.dev" },
      ],
    };
  }
  if (score <= 5) {
    return {
      levelNumber: 2,
      levelName: "Tweaker",
      description: "You have some instinct. A code editor with AI will give you more control.",
      tools: [
        { name: "Cursor", why: "VS Code-based editor with AI built in.", url: "https://cursor.com" },
        { name: "GitHub Copilot", why: "AI pair programmer inside VS Code or JetBrains.", url: "https://github.com/features/copilot" },
        { name: "Windsurf", why: "AI code editor with its own agent.", url: "https://windsurf.com" },
        { name: "Bolt", why: "Great for quick prototypes before moving to an editor.", url: "https://bolt.new" },
      ],
    };
  }
  return {
    levelNumber: 3,
    levelName: "Builder",
    description: "You know how apps work. These tools make you 10x faster.",
    tools: [
      { name: "Claude Code", why: "Anthropic's AI agent for the terminal.", url: "https://claude.ai/code" },
      { name: "Codex", why: "OpenAI's AI agent for the terminal.", url: "https://openai.com/index/introducing-codex" },
      { name: "Gemini CLI", why: "Google's AI agent for the terminal.", url: "https://github.com/google-gemini/gemini-cli" },
      { name: "Cursor", why: "AI code editor for visual work.", url: "https://cursor.com" },
      { name: "aider", why: "Open-source terminal pair programmer.", url: "https://aider.chat" },
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
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="font-display text-2xl font-bold text-ink">
          Which vibe coder are you?
        </h2>
        <p className="mt-1 text-sm text-muted">
          3 quick questions. We&apos;ll recommend the right tools.
        </p>

        {/* Questions */}
        <div className="mt-8 space-y-6">
          {questions.map((q, qi) => (
            <div key={q.id}>
              <p className="text-sm font-medium text-ink">
                <span className="text-accent">{qi + 1}.</span> {q.question}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {q.options.map((opt) => (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => selectAnswer(q.id, opt.value)}
                    aria-pressed={answers[q.id] === opt.value}
                    className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                      answers[q.id] === opt.value
                        ? "border-primary bg-primary text-white"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Result button */}
        {allAnswered && !showResult && (
          <button
            type="button"
            onClick={() => setShowResult(true)}
            className="btn-gradient mt-6 rounded-lg px-6 py-3 text-sm font-medium"
          >
            See my result
          </button>
        )}

        {/* Result — compact */}
        {showResult && (
          <div className="mt-6 rounded-xl bg-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-xl font-bold text-ink">
                  Level {recommendation.levelNumber}: {recommendation.levelName}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {recommendation.description}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="text-xs text-muted hover:text-ink"
              >
                Retake
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {recommendation.tools.map((tool, i) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-white"
                >
                  <div>
                    <span className="text-sm font-medium text-ink">{tool.name}</span>
                    {i === 0 && (
                      <span className="ml-2 text-xs text-accent">Best match</span>
                    )}
                    <p className="text-xs text-muted">{tool.why}</p>
                  </div>
                  <span className="text-xs text-muted">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
