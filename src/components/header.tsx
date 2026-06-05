"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Magnetic } from "@/components/animate-in";

export function Header() {
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.85)"]
  );
  const headerBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 80], [1, 0.5]);

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-border"
      style={{
        backgroundColor: headerBg,
        backdropFilter: headerBlur,
        WebkitBackdropFilter: headerBlur,
        borderColor: useTransform(borderOpacity, (v) => `rgba(229,227,223,${v})`),
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      role="banner"
    >
      <nav
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        <Magnetic strength={0.2}>
          <a href="/" className="font-display text-lg font-bold tracking-tight text-ink">
            vibestack
          </a>
        </Magnetic>
        <div className="flex items-center gap-6 text-sm">
          <a
            href="/start"
            className="nav-link px-2 py-2 text-muted transition-colors hover:text-ink"
          >
            Start
          </a>
          <a
            href="/dictionary"
            className="nav-link px-2 py-2 text-muted transition-colors hover:text-ink"
          >
            Dictionary
          </a>
          <a
            href="/blog"
            className="nav-link px-2 py-2 text-muted transition-colors hover:text-ink"
          >
            Blog
          </a>
          <Magnetic strength={0.15}>
            <a
              href="/#notify"
              className="btn-gradient rounded-lg px-4 py-2 font-medium"
            >
              Get Notified
            </a>
          </Magnetic>
        </div>
      </nav>
    </motion.header>
  );
}
