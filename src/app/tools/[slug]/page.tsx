import { notFound } from "next/navigation";
import { demos } from "@/data/demos";
import { toolProfiles, devStageLabel, devStageOrder } from "@/data/tool-profiles";
import { SaveButton } from "@/components/save-button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const levelLabel = { 1: "Prompter", 2: "Tweaker", 3: "Builder" } as const;

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
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-12">
          <a
            href="/#demos"
            className="text-sm text-muted transition-colors hover:text-ink"
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
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="mt-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                {tool.name}
              </h1>
              <p className="mt-2 text-muted">{tool.description}</p>
            </div>
            <SaveButton slug={tool.slug} name={tool.name} />
          </div>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: `var(--level-${tool.level})` }}
            >
              Lv.{tool.level} {levelLabel[tool.level]}
            </span>
            {tool.pricing === "free" && (
              <span className="rounded-full bg-free/10 px-3 py-1 text-xs font-semibold text-free">
                Free
              </span>
            )}
            {tool.pricing === "free-tier" && (
              <span className="rounded-full bg-free-tier/10 px-3 py-1 text-xs font-semibold text-free-tier">
                Free tier
              </span>
            )}
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {tool.category}
            </span>
          </div>

          {/* Links */}
          <div className="mt-6 flex gap-4">
            <a
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
            >
              GitHub
            </a>
            {tool.website && (
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                Website
              </a>
            )}
          </div>

          {profile && (
            <>
              {/* Plain English */}
              <div className="mt-12 border-l-2 border-primary/30 pl-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  In plain English
                </p>
                <p className="mt-3 font-display text-lg leading-relaxed text-ink">
                  {profile.analogy}
                </p>
              </div>

              {/* Real world example */}
              <div className="mt-8 rounded-xl bg-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Real-world example
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {profile.realWorldExample}
                </p>
              </div>

              {/* Dev process */}
              <div className="mt-12">
                <h2 className="font-display text-lg font-bold text-ink">
                  Where this fits in your project
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {profile.devStageDescription}
                </p>
                <div className="mt-4 flex gap-1 overflow-x-auto pb-2">
                  {devStageOrder.map((stage, i) => (
                    <div
                      key={stage}
                      className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-medium ${
                        i === currentStageIndex
                          ? "bg-primary text-white"
                          : "bg-surface text-muted"
                      }`}
                    >
                      {devStageLabel[stage]}
                    </div>
                  ))}
                </div>
              </div>

              {/* When to use */}
              <div className="mt-10">
                <h2 className="font-display text-lg font-bold text-ink">
                  When to use this
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {profile.whenToUse}
                </p>
              </div>

              {/* Situation */}
              <div className="mt-8">
                <h2 className="font-display text-lg font-bold text-ink">
                  The situation
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {profile.situation}
                </p>
              </div>

              {/* Good for / Not for */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-free">Good for</p>
                  <ul className="mt-3 space-y-2">
                    {profile.goodFor.map((item) => (
                      <li key={item} className="text-sm text-muted">
                        + {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-accent">Not ideal for</p>
                  <ul className="mt-3 space-y-2">
                    {profile.notFor.map((item) => (
                      <li key={item} className="text-sm text-muted">
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Getting started */}
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-display text-sm font-semibold text-ink">
                  Getting started
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {profile.gettingStarted}
                </p>
              </div>

              {/* Alternatives */}
              <div className="mt-8">
                <h2 className="font-display text-lg font-bold text-ink">
                  Alternatives
                </h2>
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
