const categories = [
  "UI Components",
  "Backend & Database",
  "AI & LLM",
  "Auth",
  "Deploy & Hosting",
  "Dev Tools",
];

export function Categories() {
  return (
    <section id="categories" className="border-t border-border py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <p className="mt-2 text-sm text-muted">
          Tools rated on how well they work with AI coding tools.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-card-hover"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
