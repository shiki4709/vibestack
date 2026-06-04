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
    <section id="notify" className="border-t border-border py-16">
      <div className="mx-auto max-w-xl px-6 text-center">
        {submitted ? (
          <div>
            <p className="font-display text-xl font-bold text-ink">You&apos;re in.</p>
            <p className="mt-1 text-sm text-muted">
              First email drops this week.
            </p>
          </div>
        ) : (
          <>
            <p className="font-display text-lg font-bold text-ink">
              Weekly drop of the best new tools. Free.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="btn-gradient shrink-0 rounded-lg px-5 py-2.5 text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
