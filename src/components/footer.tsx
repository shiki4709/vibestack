export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
        <span className="text-sm text-muted">vibestack</span>
        <div className="flex gap-5 text-sm text-muted">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            YouTube
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            X
          </a>
        </div>
      </div>
    </footer>
  );
}
