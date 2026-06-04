"use client";

import { useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="notify" className="border-t border-border py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Start building this week
        </h2>
        <p className="mt-2 text-sm text-muted">
          Every week we send one email: a new tool, a 60-second demo, and one
          idea for how it can help your career or business. Free forever.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <p className="font-medium">You&apos;re in.</p>
            <p className="mt-1 text-sm text-muted">
              First email drops this week. In the meantime, take the quiz above
              and start building.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
            />
            <button
              type="submit"
              className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-muted/60">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
