"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimateIn, AnimateStagger, AnimateStaggerItem, ScalePress } from "@/components/animate-in";

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
        <AnimateIn>
          <h2 className="font-display text-2xl font-bold text-ink">
            Which vibe coder are you?
          </h2>
          <p className="mt-1 text-sm text-muted">
            3 quick questions. We&apos;ll recommend the right tools.
          </p>
        </AnimateIn>

        {/* Questions */}
        <AnimateStagger className="mt-8 space-y-6">
          {questions.map((q, qi) => (
            <AnimateStaggerItem key={q.id}>
              <p className="text-sm font-medium text-ink">
                <span className="text-accent">{qi + 1}.</span> {q.question}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {q.options.map((opt) => (
                  <ScalePress key={opt.label}>
                    <motion.button
                      type="button"
                      onClick={() => selectAnswer(q.id, opt.value)}
                      aria-pressed={answers[q.id] === opt.value}
                      className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                        answers[q.id] === opt.value
                          ? "border-primary bg-primary text-white"
                          : "border-border hover:border-primary/30"
                      }`}
                      animate={
                        answers[q.id] === opt.value
                          ? { scale: [1, 1.03, 1] }
                          : {}
                      }
                      transition={{ duration: 0.2 }}
                    >
                      {opt.label}
                    </motion.button>
                  </ScalePress>
                ))}
              </div>
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>

        {/* Result button */}
        <AnimatePresence>
          {allAnswered && !showResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ScalePress>
                <button
                  type="button"
                  onClick={() => setShowResult(true)}
                  className="btn-gradient mt-6 rounded-lg px-6 py-3 text-sm font-medium"
                >
                  See my result
                </button>
              </ScalePress>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              className="mt-6 rounded-xl bg-surface p-6"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <motion.p
                    className="font-display text-xl font-bold text-ink"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                  >
                    Level {recommendation.levelNumber}: {recommendation.levelName}
                  </motion.p>
                  <motion.p
                    className="mt-1 text-sm text-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                  >
                    {recommendation.description}
                  </motion.p>
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
                  <motion.a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-white"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.08,
                      duration: 0.35,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    whileHover={{ x: 4 }}
                  >
                    <div>
                      <span className="text-sm font-medium text-ink">{tool.name}</span>
                      {i === 0 && (
                        <motion.span
                          className="ml-2 text-xs text-accent"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Best match
                        </motion.span>
                      )}
                      <p className="text-xs text-muted">{tool.why}</p>
                    </div>
                    <motion.span
                      className="text-xs text-muted"
                      whileHover={{ x: 3 }}
                    >
                      &rarr;
                    </motion.span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
