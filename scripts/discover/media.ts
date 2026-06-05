const GITHUB_HEADERS: Record<string, string> = {
  Accept: "application/vnd.github.v3.raw",
  "User-Agent": "vibestack-discover",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
    : {}),
};

function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

async function fetchReadme(
  owner: string,
  repo: string
): Promise<string | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
  const res = await fetch(url, { headers: GITHUB_HEADERS });
  if (!res.ok) return null;
  return res.text();
}

function resolveUrl(url: string, owner: string, repo: string): string {
  if (url.startsWith("http")) return url;
  const clean = url.replace(/^\.\//, "");
  return `https://raw.githubusercontent.com/${owner}/${repo}/main/${clean}`;
}

function extractMedia(
  readme: string,
  owner: string,
  repo: string
): string[] {
  const media: string[] = [];

  // Markdown images: ![alt](url)
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = imgRegex.exec(readme)) !== null) {
    media.push(resolveUrl(match[2].split(" ")[0], owner, repo));
  }

  // HTML img tags
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = htmlImgRegex.exec(readme)) !== null) {
    media.push(resolveUrl(match[1], owner, repo));
  }

  // HTML video/source tags
  const videoRegex = /<(?:video|source)[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = videoRegex.exec(readme)) !== null) {
    media.push(resolveUrl(match[1], owner, repo));
  }

  return media.filter((url) => {
    const lower = url.toLowerCase();
    return (
      lower.includes(".gif") ||
      lower.includes(".mp4") ||
      lower.includes(".webm") ||
      lower.includes(".webp") ||
      lower.includes(".png") ||
      lower.includes(".jpg") ||
      lower.includes(".jpeg") ||
      lower.includes("user-images") ||
      lower.includes("githubusercontent")
    );
  });
}

function isJunk(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.includes("badge") ||
    lower.includes("shield") ||
    lower.includes("codecov") ||
    lower.includes("avatar") ||
    lower.includes("repobeats") ||
    lower.includes("deepwiki") ||
    lower.includes("?s=100") ||
    lower.includes("?s=150") ||
    lower.includes("license") ||
    lower.includes(".svg") ||
    lower.includes("sponsors") ||
    lower.includes("contributor")
  );
}

export interface MediaResult {
  readonly image: string;
  readonly imageType: "gif" | "video" | "readme" | "og" | "none";
}

function pickBest(media: string[], owner: string, repo: string): MediaResult {
  const valid = media.filter((url) => !isJunk(url));

  // Priority 1: GIFs (likely demos)
  const gif = valid.find((url) => url.toLowerCase().includes(".gif"));
  if (gif) return { image: gif, imageType: "gif" };

  // Priority 2: Videos
  const video = valid.find(
    (url) =>
      url.toLowerCase().includes(".mp4") ||
      url.toLowerCase().includes(".webm")
  );
  if (video) return { image: video, imageType: "video" };

  // Priority 3: Screenshots
  const screenshot = valid.find(
    (url) =>
      url.toLowerCase().includes(".png") ||
      url.toLowerCase().includes(".jpg") ||
      url.toLowerCase().includes(".jpeg") ||
      url.toLowerCase().includes(".webp")
  );
  if (screenshot) return { image: screenshot, imageType: "readme" };

  // Priority 4: GitHub OG image (always exists)
  return {
    image: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
    imageType: "og",
  };
}

export async function fetchMedia(githubUrl: string): Promise<MediaResult> {
  const parsed = parseGithubUrl(githubUrl);
  if (!parsed) return { image: "", imageType: "none" };

  const { owner, repo } = parsed;

  try {
    const readme = await fetchReadme(owner, repo);
    if (readme) {
      const media = extractMedia(readme, owner, repo);
      return pickBest(media, owner, repo);
    }
  } catch {
    // Fall through to OG image
  }

  return {
    image: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
    imageType: "og",
  };
}

export async function fetchMediaBatch(
  githubUrls: readonly string[]
): Promise<Map<string, MediaResult>> {
  const results = new Map<string, MediaResult>();
  const CONCURRENCY = 5;

  for (let i = 0; i < githubUrls.length; i += CONCURRENCY) {
    const batch = githubUrls.slice(i, i + CONCURRENCY);
    const settled = await Promise.allSettled(
      batch.map(async (url) => {
        const media = await fetchMedia(url);
        return { url, media };
      })
    );

    for (const result of settled) {
      if (result.status === "fulfilled") {
        results.set(result.value.url, result.value.media);
      }
    }

    // Small delay between batches to avoid rate limiting
    if (i + CONCURRENCY < githubUrls.length) {
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  return results;
}
