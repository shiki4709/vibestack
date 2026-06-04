"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { demos, categories } from "@/data/demos";
import { DemoCard } from "@/components/demo-card";

const levels = [
  { value: 0, label: "All" },
  { value: 1, label: "Prompter" },
  { value: 2, label: "Tweaker" },
  { value: 3, label: "Builder" },
];

const INITIAL_COUNT = 6;

export function Demos() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const filtered = demos.filter((d) => {
    const matchesCategory = activeCategory === "All" || d.category === activeCategory;
    const matchesLevel = activeLevel === 0 || d.level <= activeLevel;
    return matchesCategory && matchesLevel;
  });

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT && !showAll;

  return (
    <section id="demos" className="border-t border-border py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-2xl font-bold text-ink">
          Tools
        </h2>

        {/* Filters — single row */}
        <div className="mt-4 flex flex-wrap gap-2">
          {levels.map((lvl) => (
            <button
              type="button"
              key={lvl.value}
              onClick={() => { setActiveLevel(lvl.value); setShowAll(false); }}
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
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => { setActiveCategory(activeCategory === cat ? "All" : cat); setShowAll(false); }}
              aria-pressed={activeCategory === cat}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-ink text-white"
                  : "border border-border text-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((demo) => (
              <motion.div
                key={demo.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <DemoCard demo={demo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-sm font-medium text-primary transition-opacity hover:opacity-70"
            >
              Show all {filtered.length} tools
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="mt-6 text-sm text-muted">
            No tools match this filter.
          </p>
        )}
      </div>
    </section>
  );
}
