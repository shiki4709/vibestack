export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <a href="/" className="text-lg font-semibold tracking-tight">
          vibestack
        </a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#start" className="text-muted transition-colors hover:text-foreground">
            Start Here
          </a>
          <a href="#demos" className="text-muted transition-colors hover:text-foreground">
            Demos
          </a>
          <a
            href="#notify"
            className="rounded-lg bg-foreground px-4 py-1.5 font-medium text-background transition-opacity hover:opacity-80"
          >
            Get Notified
          </a>
        </nav>
      </div>
    </header>
  );
}
