"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AnimateStagger, AnimateStaggerItem } from "@/components/animate-in";
import type { BlogPost } from "@/data/blog";

interface BlogListProps {
  readonly posts: readonly BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <p className="mt-8 text-sm text-muted">
        No posts yet. Add markdown files to{" "}
        <code className="rounded bg-surface px-1.5 py-0.5 text-xs font-mono">
          content/blog/
        </code>
      </p>
    );
  }

  return (
    <AnimateStagger className="mt-8 space-y-4">
      {posts.map((post) => (
        <AnimateStaggerItem key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="card-hover group block rounded-xl border border-border p-6"
          >
            <div className="flex items-center gap-3">
              <time className="text-xs text-muted" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="mt-2 font-display text-lg font-bold text-ink">
              {post.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {post.excerpt}
            </p>
            <motion.span
              className="mt-3 inline-block text-sm font-medium text-primary"
              whileHover={{ x: 4 }}
            >
              Read more &rarr;
            </motion.span>
          </Link>
        </AnimateStaggerItem>
      ))}
    </AnimateStagger>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
