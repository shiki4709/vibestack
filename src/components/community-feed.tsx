import xDemos from "@/data/x-demos.json";

interface XPost {
  readonly author: string;
  readonly handle: string;
  readonly text: string;
  readonly url: string;
  readonly tool: string;
  readonly type: string;
}

const typeLabel: Record<string, string> = {
  demo: "Demo",
  launch: "Launch",
  workflow: "Workflow",
  learning: "Learning",
  insight: "Insight",
};

export function CommunityFeed() {
  const posts = xDemos as readonly XPost[];

  return (
    <section id="community" className="border-t border-border py-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium text-accent">From the community</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">
          What builders are saying on X
        </h2>
        <p className="mt-2 text-sm text-muted">
          Real people sharing how they vibe code. Follow the conversation.
        </p>

        <div className="mt-8 space-y-4">
          {posts.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-border bg-card p-5 transition-colors hover:bg-card-hover"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{post.author}</span>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted">
                  {post.tool}
                </span>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-muted">
                  {typeLabel[post.type] ?? post.type}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {post.text}
              </p>
              <p className="mt-2 text-xs text-accent">View on X</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
