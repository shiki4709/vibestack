import { AnimateIn } from "@/components/animate-in";
import xDemos from "@/data/x-demos.json";

interface XPost {
  readonly author: string;
  readonly text: string;
  readonly url: string;
  readonly tool: string;
}

export function CommunityFeed() {
  const posts = xDemos as readonly XPost[];

  return (
    <section id="community" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn>
          <p className="text-sm font-medium text-primary">From the community</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink">
            What builders are saying
          </h2>
        </AnimateIn>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-l-2 border-primary/20 py-3 pl-4 transition-colors hover:border-primary/50"
            >
              <p className="text-sm leading-relaxed text-muted">{post.text}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-ink">{post.author}</span>
                <span className="text-xs text-muted">on {post.tool}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
