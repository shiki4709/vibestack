"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DemoCard } from "@/components/demo-card";
import { ScalePress, AnimateIn } from "@/components/animate-in";
import type { UnifiedTool } from "@/data/all-tools";

const levels = [
  { value: 0, label: "All Levels" },
  { value: 1, label: "Prompter" },
  { value: 2, label: "Tweaker" },
  { value: 3, label: "Builder" },
];

interface DictionaryGridProps {
  readonly tools: readonly UnifiedTool[];
  readonly categories: readonly string[];
}

export function DictionaryGrid({ tools, categories }: DictionaryGridProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState(0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return tools.filter((t) => {
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesCategory =
        activeCategory === "All" || t.category === activeCategory;
      const matchesLevel = activeLevel === 0 || t.level <= activeLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [tools, search, activeCategory, activeLevel]);

  return (
    <>
      {/* Search */}
      <AnimateIn delay={0.1}>
        <div className="mt-6">
          <label htmlFor="dict-search" className="sr-only">
            Search tools
          </label>
          <input
            id="dict-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="focus-glow w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-all duration-200"
          />
        </div>
      </AnimateIn>

      {/* Filters */}
      <AnimateIn delay={0.15}>
        <div className="mt-4 flex flex-wrap gap-2">
          {levels.map((lvl) => (
            <ScalePress key={lvl.value}>
              <button
                type="button"
                onClick={() => setActiveLevel(lvl.value)}
                aria-pressed={activeLevel === lvl.value}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  activeLevel === lvl.value
                    ? "bg-ink text-white shadow-sm"
                    : "border border-border text-muted hover:text-ink hover:border-ink/20"
                }`}
              >
                {lvl.label}
              </button>
            </ScalePress>
          ))}
          <span className="mx-1 self-center text-border">|</span>
          <ScalePress>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              aria-pressed={activeCategory === "All"}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeCategory === "All"
                  ? "bg-ink text-white shadow-sm"
                  : "border border-border text-muted hover:text-ink hover:border-ink/20"
              }`}
            >
              All
            </button>
          </ScalePress>
          {categories.map((cat) => (
            <ScalePress key={cat}>
              <button
                type="button"
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? "All" : cat)
                }
                aria-pressed={activeCategory === cat}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-ink text-white shadow-sm"
                    : "border border-border text-muted hover:text-ink hover:border-ink/20"
                }`}
              >
                {cat}
              </button>
            </ScalePress>
          ))}
        </div>
      </AnimateIn>

      {/* Count */}
      <p className="mt-4 text-xs text-muted">
        {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <motion.div layout className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((tool, i) => (
            <motion.div
              key={tool.slug}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                delay: Math.min(i * 0.03, 0.3),
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <DemoCard
                demo={{
                  slug: tool.slug,
                  name: tool.name,
                  description: tool.description,
                  category: tool.category,
                  image: tool.image,
                  isGif: false,
                  github: tool.github,
                  website: tool.website,
                  tags: tool.tags,
                  vibeRating: 5,
                  pricing: tool.pricing,
                  level: tool.level,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          className="mt-8 text-center text-sm text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No tools match your search.
        </motion.p>
      )}
    </>
  );
}
