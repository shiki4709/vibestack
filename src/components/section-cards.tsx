"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AnimateStagger, AnimateStaggerItem, Magnetic } from "@/components/animate-in";

const sections = [
  {
    title: "Start Vibe Coding",
    description:
      "Learn by example. Real projects, real prompts, step-by-step breakdowns showing how things actually get built.",
    href: "/start",
    icon: "rocket",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    title: "Tool Dictionary",
    description:
      "Every tool in the vibe coding stack — searchable, filterable, explained in plain English.",
    href: "/dictionary",
    icon: "book",
    gradient: "from-level-2/10 to-level-2/5",
  },
  {
    title: "Blog",
    description:
      "What's trending, what's worth your time, and what we're building with it.",
    href: "/blog",
    icon: "pen",
    gradient: "from-accent/10 to-accent/5",
  },
] as const;

const icons: Record<string, React.ReactNode> = {
  rocket: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  ),
  book: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  pen: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  ),
};

export function SectionCards() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-4xl px-6">
        <AnimateStagger className="grid gap-4 sm:grid-cols-3">
          {sections.map((section) => (
            <AnimateStaggerItem key={section.href}>
              <Magnetic strength={0.08}>
                <Link
                  href={section.href}
                  className="card-hover group block rounded-xl border border-border p-6"
                >
                  <div className={`inline-flex rounded-lg bg-gradient-to-br ${section.gradient} p-2.5 text-ink`}>
                    {icons[section.icon]}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {section.description}
                  </p>
                  <motion.span
                    className="mt-4 inline-block text-sm font-medium text-primary"
                    whileHover={{ x: 4 }}
                  >
                    Explore &rarr;
                  </motion.span>
                </Link>
              </Magnetic>
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>
      </div>
    </section>
  );
}
