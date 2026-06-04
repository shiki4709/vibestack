export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-24">
      <p className="text-sm font-medium text-accent">Go beyond ChatGPT</p>

      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        Stop chatting with AI.
        <br />
        Start building with it.
      </h1>

      <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
        You already use ChatGPT every day. But asking questions is level one.
        The next level is making AI build real things for you — apps, tools,
        dashboards, websites. That&apos;s what gets you unstuck, promoted,
        or hired.
      </p>

      <div className="mt-8 flex gap-3">
        <a
          href="#start"
          className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Find Your Level
        </a>
        <a
          href="#demos"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          See What People Build
        </a>
      </div>
    </section>
  );
}
