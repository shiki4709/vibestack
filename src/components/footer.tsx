export function Footer() {
  return (
    <footer className="border-t border-border py-10" role="contentinfo">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <span className="font-display text-sm font-bold text-ink">vibestack</span>
          <p className="mt-1 text-xs text-muted">
            Open-source tools for vibe coders.
          </p>
        </div>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} VibeStack
        </p>
      </div>
    </footer>
  );
}
