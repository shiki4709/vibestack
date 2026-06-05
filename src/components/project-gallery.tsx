"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AnimateStagger, AnimateStaggerItem } from "@/components/animate-in";
import type { Project } from "@/data/projects";

const levelLabel = { 1: "Prompter", 2: "Tweaker", 3: "Builder" } as const;

interface ProjectGalleryProps {
  readonly projects: readonly Project[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  if (projects.length === 0) {
    return (
      <p className="mt-6 text-sm text-muted">
        No project breakdowns yet. Add markdown files to{" "}
        <code className="rounded bg-surface px-1.5 py-0.5 text-xs font-mono">
          content/projects/
        </code>
      </p>
    );
  }

  return (
    <AnimateStagger className="mt-6 grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <AnimateStaggerItem key={project.slug}>
          <Link
            href={`/start/${project.slug}`}
            className="card-hover group block rounded-xl border border-border p-6"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-ink">
                {project.title}
              </h3>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                style={{ background: `var(--level-${project.level})` }}
              >
                {levelLabel[project.level]}
              </span>
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.excerpt}
            </p>
            <motion.span
              className="mt-4 inline-block text-sm font-medium text-primary"
              whileHover={{ x: 4 }}
            >
              View breakdown &rarr;
            </motion.span>
          </Link>
        </AnimateStaggerItem>
      ))}
    </AnimateStagger>
  );
}
