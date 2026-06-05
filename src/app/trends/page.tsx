import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TrendFeed } from "@/components/trend-feed";
import { loadLatestDiscovery } from "@/data/discoveries";

export const metadata: Metadata = {
  title: "Trending Tools — VibeStack",
  description:
    "This week's trending open-source tools for vibe coders. Scored, profiled, and explained in plain English.",
};

export default function TrendsPage() {
  const report = loadLatestDiscovery();

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            {/* Hero */}
            <h1 className="font-display text-3xl font-bold text-ink">
              Trending This Week
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Every week we scan GitHub for tools gaining momentum and score
              them for vibe coding relevance. Each tool gets a plain-English
              profile so you know exactly what it does and whether it&apos;s for
              you.
            </p>

            {/* Feed */}
            <div className="mt-10">
              {report ? (
                <TrendFeed tools={report.tools} date={report.date} />
              ) : (
                <p className="text-sm text-muted">
                  No discoveries yet. Run{" "}
                  <code className="rounded bg-surface px-1.5 py-0.5 text-xs font-mono">
                    npm run discover
                  </code>{" "}
                  to scan GitHub trending.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
