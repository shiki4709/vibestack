import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectContent } from "@/components/project-content";
import { loadBlogPosts } from "@/data/blog";

export function generateStaticParams() {
  return loadBlogPosts().map((p) => ({ slug: p.slug }));
}

interface BlogPostPageProps {
  readonly params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const posts = loadBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-12">
          <a
            href="/blog"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            &larr; Back to blog
          </a>

          <div className="mt-8">
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
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
              {post.title}
            </h1>
          </div>

          {/* Reuse the same markdown renderer from projects */}
          <ProjectContent body={post.body} />
        </div>
      </main>
      <Footer />
    </>
  );
}
