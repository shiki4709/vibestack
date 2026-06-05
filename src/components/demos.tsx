"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { demos, categories } from "@/data/demos";
import { DemoCard } from "@/components/demo-card";
import { AnimateIn, ScalePress } from "@/components/animate-in";

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
        <AnimateIn>
          <h2 className="font-display text-2xl font-bold text-ink">
            Tools
          </h2>
        </AnimateIn>

        {/* Filters */}
        <AnimateIn delay={0.1}>
          <div className="mt-4 flex flex-wrap gap-2">
            {levels.map((lvl) => (
              <ScalePress key={lvl.value}>
                <button
                  type="button"
                  onClick={() => { setActiveLevel(lvl.value); setShowAll(false); }}
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
            {categories.map((cat) => (
              <ScalePress key={cat}>
                <button
                  type="button"
                  onClick={() => { setActiveCategory(activeCategory === cat ? "All" : cat); setShowAll(false); }}
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

        {/* Grid */}
        <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((demo, i) => (
              <motion.div
                key={demo.slug}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.04,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <DemoCard demo={demo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-sm font-medium text-primary transition-opacity hover:opacity-70"
            >
              Show all {filtered.length} tools
            </button>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <motion.p
            className="mt-6 text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No tools match this filter.
          </motion.p>
        )}
      </div>
    </section>
  );
}
