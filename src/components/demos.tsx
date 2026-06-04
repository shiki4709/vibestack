"use client";

import { useState } from "react";
import { demos, categories } from "@/data/demos";
import { DemoCard } from "@/components/demo-card";

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
    <section id="demos" className="border-t border-border py-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium text-accent">Discover</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">
          See tools in action
        </h2>
        <p className="mt-2 text-sm text-muted">
          {demos.length} tools tagged by level. Start with what matches you.
        </p>

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

        {/* Demo grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {filtered.map((demo) => (
            <DemoCard key={demo.slug} demo={demo} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted">
            No tools at this level in this category yet. Try a different filter.
          </p>
        )}
      </div>
    </section>
  );
}
