export function Header() {
  return (
    <header className="border-b border-border" role="banner">
      <nav
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        <a href="/" className="font-display text-lg font-bold tracking-tight text-ink">
          vibestack
        </a>
        <div className="flex items-center gap-6 text-sm">
          <a
            href="#start"
            className="px-2 py-2 text-muted transition-colors hover:text-ink"
          >
            Start Here
          </a>
          <a
            href="#demos"
            className="px-2 py-2 text-muted transition-colors hover:text-ink"
          >
            Tools
          </a>
          <a
            href="/trends"
            className="px-2 py-2 text-muted transition-colors hover:text-ink"
          >
            Trending
          </a>
          <a
            href="#notify"
            className="btn-gradient rounded-lg px-4 py-2 font-medium"
          >
            Get Notified
          </a>
        </div>
      </nav>
    </header>
  );
}
