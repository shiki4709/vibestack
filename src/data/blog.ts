import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly excerpt: string;
  readonly tags: readonly string[];
  readonly body: string;
}

interface Frontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
}

function parseFrontmatter(content: string): {
  data: Frontmatter;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return {
      data: { title: "", slug: "", date: "", excerpt: "", tags: [] },
      body: content,
    };
  }

  const frontmatter = match[1];
  const body = match[2].trim();

  const data: Record<string, unknown> = {};
  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim());
    }

    if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data: data as unknown as Frontmatter, body };
}

export function loadBlogPosts(): readonly BlogPost[] {
  const dir = resolve(process.cwd(), "content/blog");

  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".md")).sort().reverse();
  } catch {
    return [];
  }

  return files.map((file) => {
    const raw = readFileSync(resolve(dir, file), "utf-8");
    const { data, body } = parseFrontmatter(raw);

    return {
      slug: data.slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags || [],
      body,
    };
  });
}
