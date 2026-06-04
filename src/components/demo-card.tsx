import Link from "next/link";
import type { Demo } from "@/data/demos";

const levelLabel = {
  1: "Prompter",
  2: "Tweaker",
  3: "Builder",
} as const;

const levelStyle = {
  1: "bg-emerald-50 text-emerald-700",
  2: "bg-blue-50 text-blue-700",
  3: "bg-violet-50 text-violet-700",
} as const;

const pricingLabel = {
  free: "Free",
  "free-tier": "Free tier",
  paid: "Paid",
} as const;

const pricingStyle = {
  free: "bg-emerald-50 text-emerald-700",
  "free-tier": "bg-amber-50 text-amber-700",
  paid: "bg-stone-100 text-stone-500",
} as const;

export function DemoCard({ demo }: { readonly demo: Demo }) {
  return (
    <Link
      href={`/tools/${demo.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:bg-card-hover"
    >
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden bg-stone-100">
        {demo.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={demo.image}
            alt={`${demo.name} demo`}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-muted">{demo.name}</span>
          </div>
        )}
        {demo.isGif && (
          <span className="absolute left-2 top-2 rounded bg-foreground/80 px-1.5 py-0.5 text-[10px] font-bold uppercase text-background">
            GIF
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold">{demo.name}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${levelStyle[demo.level]}`}
          >
            Lv.{demo.level} {levelLabel[demo.level]}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${pricingStyle[demo.pricing]}`}
          >
            {pricingLabel[demo.pricing]}
          </span>
          <span className="ml-auto text-xs text-muted">{demo.category}</span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {demo.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {demo.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
