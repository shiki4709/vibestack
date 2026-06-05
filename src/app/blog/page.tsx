import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogList } from "@/components/blog-list";
import { loadBlogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — VibeStack",
  description:
    "What's trending in vibe coding — tools, techniques, and what's worth your time.",
};

export default function BlogPage() {
  const posts = loadBlogPosts();

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-3xl font-bold text-ink">Blog</h1>
            <p className="mt-2 text-base text-muted">
              What&apos;s trending, what&apos;s worth your time, and what
              we&apos;re building with it.
            </p>

            <BlogList posts={JSON.parse(JSON.stringify(posts))} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
