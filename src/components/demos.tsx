"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { demos, categories } from "@/data/demos";
import { DemoCard } from "@/components/demo-card";
import { AnimateIn } from "@/components/animate-in";

const levels = [
  { value: 0 as const, label: "All Levels" },
  { value: 1 as const, label: "Lv.1 Prompter" },
  { value: 2 as const, label: "Lv.2 Tweaker" },
  { value: 3 as const, label: "Lv.3 Builder" },
];

export function Demos() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState(0);

  const filtered = demos.filter((d) => {
    const matchesCategory =
      activeCategory === "All" || d.category === activeCategory;
    const matchesLevel = activeLevel === 0 || d.level <= activeLevel;
    return matchesCategory && matchesLevel;
  });

  return (
    <section id="demos" className="border-t border-border py-16">
      <div className="mx-auto max-w-3xl px-6">
        <AnimateIn>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Discover
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            See tools in action
          </h2>
          <p className="mt-2 text-sm text-muted">
            {demos.length} tools tagged by level. Start with what matches you.
          </p>
        </AnimateIn>

        {/* Level filter */}
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium text-muted">Your level</p>
          <div className="flex flex-wrap gap-2">
            {levels.map((lvl) => (
              <button
                type="button"
                key={lvl.value}
                onClick={() => setActiveLevel(lvl.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeLevel === lvl.value
                    ? "bg-foreground text-background"
                    : "border border-border text-muted hover:text-foreground"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-muted">Category</p>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "border border-border text-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Demo grid with animation */}
        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((demo) => (
              <motion.div
                key={demo.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <DemoCard demo={demo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted">
            No tools at this level in this category yet. Try a different filter.
          </p>
        )}
      </div>
    </section>
  );
}
