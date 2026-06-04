"use client";

import { useState } from "react";
import { tools, categories, type Category } from "@/data/tools";
import { ToolCard } from "@/components/tool-card";

export function Directory() {
  const [active, setActive] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = tools.filter((tool) => {
    const matchesCategory = active === "All" || tool.category === active;
    const matchesSearch =
      search === "" ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="directory" className="border-t border-border py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl font-bold tracking-tight">Browse tools</h2>
        <p className="mt-2 text-sm text-muted">
          {tools.length} tools curated for vibe coders.
        </p>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tools..."
          className="mt-6 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
        />

        {/* Category filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive("All")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              active === "All"
                ? "bg-foreground text-background"
                : "border border-border text-muted hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active === cat
                  ? "bg-foreground text-background"
                  : "border border-border text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted">
            No tools found. Try a different search or category.
          </p>
        )}
      </div>
    </section>
  );
}
