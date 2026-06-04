import Link from "next/link";
import type { Demo } from "@/data/demos";

const levelLabel = { 1: "Prompter", 2: "Tweaker", 3: "Builder" } as const;

export function DemoCard({ demo }: { readonly demo: Demo }) {
  return (
    <Link
      href={`/tools/${demo.slug}`}
      className="group block overflow-hidden rounded-xl border border-border transition-colors hover:border-primary/30"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-surface">
        {demo.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={demo.image}
            alt={`${demo.name} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-lg font-bold text-muted/40">{demo.name}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold text-ink">{demo.name}</h3>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
            style={{ background: `var(--level-${demo.level})` }}
          >
            {levelLabel[demo.level]}
          </span>
          {demo.pricing === "free" && (
            <span className="rounded-full bg-free/10 px-2 py-0.5 text-[10px] font-semibold text-free">
              Free
            </span>
          )}
          {demo.pricing === "free-tier" && (
            <span className="rounded-full bg-free-tier/10 px-2 py-0.5 text-[10px] font-semibold text-free-tier">
              Free tier
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {demo.description}
        </p>
      </div>
    </Link>
  );
}
