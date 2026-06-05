import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DictionaryGrid } from "@/components/dictionary-grid";
import { allTools, allCategories } from "@/data/all-tools";

export const metadata: Metadata = {
  title: "Tool Dictionary — VibeStack",
  description:
    "Every tool in the vibe coding stack — searchable, filterable, explained in plain English.",
};

export default function DictionaryPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h1 className="font-display text-3xl font-bold text-ink">
              Tool Dictionary
            </h1>
            <p className="mt-2 text-base text-muted">
              {allTools.length} tools — searchable, filterable, explained in plain English.
            </p>

            <DictionaryGrid
              tools={JSON.parse(JSON.stringify(allTools))}
              categories={allCategories}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
