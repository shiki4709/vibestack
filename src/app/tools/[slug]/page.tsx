import { notFound } from "next/navigation";
import { demos } from "@/data/demos";
import { toolProfiles, devStageLabel, devStageOrder } from "@/data/tool-profiles";
import { SaveButton } from "@/components/save-button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const levelLabel = { 1: "Prompter", 2: "Tweaker", 3: "Builder" } as const;
const levelStyle = {
  1: "bg-emerald-50 text-emerald-700",
  2: "bg-blue-50 text-blue-700",
  3: "bg-violet-50 text-violet-700",
} as const;
const pricingLabel = { free: "Free", "free-tier": "Free tier", paid: "Paid" } as const;
const pricingStyle = {
  free: "bg-emerald-50 text-emerald-700",
  "free-tier": "bg-amber-50 text-amber-700",
  paid: "bg-stone-100 text-stone-500",
} as const;

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

interface ToolPageProps {
  readonly params: Promise<{ slug: string }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = demos.find((d) => d.slug === slug);
  if (!tool) notFound();

  const profile = toolProfiles[slug];
  const currentStageIndex = profile
    ? devStageOrder.indexOf(profile.devStage)
    : -1;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-12">
          {/* Back link */}
          <a
            href="/#demos"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            &larr; Back to tools
          </a>

          {/* Hero image */}
          {tool.image && (
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.image}
                alt={`${tool.name} preview`}
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="mt-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
              <p className="mt-2 text-muted">{tool.description}</p>
            </div>
            <SaveButton slug={tool.slug} name={tool.name} />
          </div>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyle[tool.level]}`}>
              Lv.{tool.level} {levelLabel[tool.level]}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pricingStyle[tool.pricing]}`}>
              {pricingLabel[tool.pricing]}
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {tool.category}
            </span>
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-6 flex gap-4">
            <a
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              GitHub
            </a>
            {tool.website && (
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card-hover"
              >
                Website
              </a>
            )}
          </div>

          {profile && (
            <>
              {/* Plain English explanation */}
              <div className="mt-12 rounded-xl border border-accent/20 bg-accent/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  In plain English
                </p>
                <p className="mt-3 text-base leading-relaxed">
                  {profile.analogy}
                </p>
              </div>

              {/* Real world example */}
              <div className="mt-6 rounded-xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Real-world example
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {profile.realWorldExample}
                </p>
              </div>

              {/* Where in the dev process */}
              <div className="mt-10">
                <h2 className="text-lg font-bold">Where this fits in your project</h2>
                <p className="mt-2 text-sm text-muted">{profile.devStageDescription}</p>

                <div className="mt-4 flex gap-1 overflow-x-auto pb-2">
                  {devStageOrder.map((stage, i) => (
                    <div
                      key={stage}
                      className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-medium transition-colors ${
                        i === currentStageIndex
                          ? "bg-foreground text-background"
                          : "bg-stone-100 text-muted"
                      }`}
                    >
                      {devStageLabel[stage]}
                    </div>
                  ))}
                </div>
              </div>

              {/* When to use */}
              <div className="mt-10">
                <h2 className="text-lg font-bold">When to use this</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {profile.whenToUse}
                </p>
              </div>

              {/* Situation */}
              <div className="mt-8">
                <h2 className="text-lg font-bold">The situation</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {profile.situation}
                </p>
              </div>

              {/* Good for / Not for */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold text-emerald-700">Good for</p>
                  <ul className="mt-3 space-y-2">
                    {profile.goodFor.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted">
                        <span className="text-emerald-500">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold text-red-600">Not ideal for</p>
                  <ul className="mt-3 space-y-2">
                    {profile.notFor.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted">
                        <span className="text-red-400">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Getting started */}
              <div className="mt-8 rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold">Getting started</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {profile.gettingStarted}
                </p>
              </div>

              {/* Alternatives */}
              <div className="mt-8">
                <h2 className="text-lg font-bold">Alternatives</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.alternatives.map((alt) => (
                    <span
                      key={alt}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-muted"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
