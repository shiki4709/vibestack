"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendCard } from "@/components/trend-card";
import type { TrendEntry } from "@/data/discoveries";

const levels = [
  { value: 0, label: "All Levels" },
  { value: 1, label: "Prompter" },
  { value: 2, label: "Tweaker" },
  { value: 3, label: "Builder" },
] as const;

const CATEGORIES = [
  "UI",
  "Backend",
  "AI",
  "Auth",
  "Deploy",
  "Dev Tools",
  "Database",
  "Payments",
] as const;

export function TrendFeed({
  tools,
  date,
}: {
  readonly tools: readonly TrendEntry[];
  readonly date: string;
}) {
  const [activeLevel, setActiveLevel] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = tools.filter((t) => {
    const matchesLevel = activeLevel === 0 || t.level === activeLevel;
    const matchesCategory =
      activeCategory === "All" || t.tool.category === activeCategory;
    return matchesLevel && matchesCategory;
  });

  const activeCategoryCount = new Map<string, number>();
  for (const t of tools) {
    const cat = t.tool.category;
    activeCategoryCount.set(cat, (activeCategoryCount.get(cat) ?? 0) + 1);
  }

  return (
    <div>
      {/* Date badge */}
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted">
          Week of {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="text-xs text-muted">
          {tools.length} tools discovered
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {levels.map((lvl) => (
          <button
            type="button"
            key={lvl.value}
            onClick={() => setActiveLevel(lvl.value)}
            aria-pressed={activeLevel === lvl.value}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeLevel === lvl.value
                ? "bg-ink text-white"
                : "border border-border text-muted hover:text-ink"
            }`}
          >
            {lvl.label}
          </button>
        ))}
        <span className="mx-1 self-center text-border">|</span>
        {CATEGORIES.map((cat) => {
          const count = activeCategoryCount.get(cat) ?? 0;
          if (count === 0) return null;
          return (
            <button
              type="button"
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? "All" : cat)
              }
              aria-pressed={activeCategory === cat}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-ink text-white"
                  : "border border-border text-muted hover:text-ink"
              }`}
            >
              {cat}
              <span className="ml-1 opacity-50">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="mt-4 text-xs text-muted">
        Showing {filtered.length} of {tools.length} tools
      </p>

      {/* Feed */}
      <div className="mt-4 flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((entry) => (
            <motion.div
              key={entry.tool.slug}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <TrendCard entry={entry} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">
          No tools match this filter.
        </p>
      )}
    </div>
  );
}
