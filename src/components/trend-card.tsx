import type { TrendEntry } from "@/data/discoveries";

const levelLabel = { 1: "Prompter", 2: "Tweaker", 3: "Builder" } as const;

const scoreColor = (score: number): string => {
  if (score >= 8) return "text-free";
  if (score >= 6) return "text-primary";
  return "text-muted";
};

export function TrendCard({ entry }: { readonly entry: TrendEntry }) {
  const { tool, profile, score } = entry;

  return (
    <article className="overflow-hidden rounded-xl border border-border transition-colors hover:border-primary/30">
      {/* Demo image/video */}
      {entry.image && entry.imageType !== "none" && (
        <div className="relative aspect-video overflow-hidden bg-surface">
          {entry.imageType === "video" ? (
            <video
              src={entry.image}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.image}
              alt={`${tool.name} demo`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      <div className="p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-ink">
              {tool.name}
            </h3>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
              style={{ background: `var(--level-${entry.level})` }}
            >
              {levelLabel[entry.level]}
            </span>
            <span className="text-xs text-muted">{tool.stars} stars</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {tool.description}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <span className={`font-display text-2xl font-bold ${scoreColor(score)}`}>
            {score}
          </span>
          <span className="text-[10px] text-muted">/10</span>
        </div>
      </div>

      {/* Analogy */}
      <div className="mt-4 rounded-lg bg-surface p-3">
        <p className="text-sm italic text-ink/80">
          &ldquo;{profile.analogy}&rdquo;
        </p>
      </div>

      {/* Real world example */}
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {profile.realWorldExample}
      </p>

      {/* Outcomes */}
      {profile.outcomes && profile.outcomes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.outcomes.map((outcome) => (
            <span
              key={outcome}
              className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M2 6.5L4.5 9L10 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {outcome}
            </span>
          ))}
        </div>
      )}

      {/* Tags & Links */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted">
            {tool.category}
          </span>
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={tool.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-primary transition-opacity hover:opacity-70"
        >
          GitHub &rarr;
        </a>
      </div>
      </div>
    </article>
  );
}
