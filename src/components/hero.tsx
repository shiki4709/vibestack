"use client";

import { motion } from "motion/react";
import { TextReveal, Magnetic } from "@/components/animate-in";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-3xl overflow-hidden px-6 pb-16 pt-24 text-center">
      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute left-1/4 top-12 h-64 w-64 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
          animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 top-24 h-48 w-48 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Headline */}
      <motion.h1
        className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <TextReveal text="Stop chatting with AI." />
        <br />
        <span className="text-gradient">
          <TextReveal text="Start building with it." delay={0.35} />
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Most people use ChatGPT to write emails. The ones getting ahead
        use AI to build real things. Take the quiz, find your level,
        discover the right tools.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="mt-8 flex justify-center gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Magnetic strength={0.15}>
          <a
            href="/start"
            className="btn-gradient rounded-lg px-6 py-3 text-sm font-medium"
          >
            Start Vibe Coding
          </a>
        </Magnetic>
        <Magnetic strength={0.15}>
          <a
            href="/dictionary"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-primary/40 hover:text-ink"
          >
            Browse Tools
          </a>
        </Magnetic>
      </motion.div>
    </section>
  );
}
