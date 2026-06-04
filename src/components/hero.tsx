import { AnimateIn } from "@/components/animate-in";

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-16 pt-24 text-center">
      <AnimateIn>
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-ink">
          Stop chatting with AI.
          <br />
          <span className="text-gradient">Start building with it.</span>
        </h1>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Most people use ChatGPT to write emails. The ones getting ahead
          use AI to build real things. Take the quiz, find your level,
          discover the right tools.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.2}>
        <div className="mt-8 flex justify-center gap-3">
          <a
            href="#start"
            className="btn-gradient rounded-lg px-6 py-3 text-sm font-medium"
          >
            Find Your Level
          </a>
          <a
            href="#demos"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            Browse Tools
          </a>
        </div>
      </AnimateIn>
    </section>
  );
}
