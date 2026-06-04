import type { Tool } from "@/data/tools";

function VibeRating({ rating }: { readonly rating: number }) {
  return (
    <div className="flex gap-0.5" title={`Vibe Rating: ${rating}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-xs ${i < rating ? "text-accent" : "text-border"}`}
        >
          ~
        </span>
      ))}
    </div>
  );
}

export function ToolCard({ tool }: { readonly tool: Tool }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-card-hover">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{tool.name}</h3>
          <span className="text-xs text-muted">{tool.category}</span>
        </div>
        <VibeRating rating={tool.vibeRating} />
      </div>

      <p className="text-sm leading-relaxed text-muted">{tool.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-background px-2 py-0.5 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-2 text-xs">
        <a
          href={tool.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-foreground"
        >
          GitHub ({tool.stars})
        </a>
        {tool.website && (
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            Website
          </a>
        )}
      </div>
    </div>
  );
}
