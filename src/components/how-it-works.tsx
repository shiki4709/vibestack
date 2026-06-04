const steps = [
  {
    number: "1",
    title: "We scout",
    description:
      "We find the best open-source tools from GitHub, Hacker News, and the builder community.",
  },
  {
    number: "2",
    title: "We demo",
    description:
      "Every tool gets a 60-second video. We build something real with it — no fluff.",
  },
  {
    number: "3",
    title: "You ship",
    description:
      "Browse by category, watch the demo, add it to your stack. That simple.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="text-sm font-medium text-accent">
                {step.number}
              </span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
