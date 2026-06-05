"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimateIn, Magnetic } from "@/components/animate-in";

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
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.p
                className="font-display text-xl font-bold text-ink"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                You&apos;re in.
              </motion.p>
              <motion.p
                className="mt-1 text-sm text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                First email drops this week.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <AnimateIn>
                <p className="font-display text-lg font-bold text-ink">
                  Weekly drop of the best new tools. Free.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                  <label htmlFor="email-input" className="sr-only">Email address</label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="focus-glow min-w-0 flex-1 rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-all duration-200"
                  />
                  <Magnetic strength={0.15}>
                    <button
                      type="submit"
                      className="btn-gradient shrink-0 rounded-lg px-5 py-2.5 text-sm font-medium"
                    >
                      Subscribe
                    </button>
                  </Magnetic>
                </form>
              </AnimateIn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
