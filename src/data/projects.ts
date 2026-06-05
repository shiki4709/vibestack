import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly level: 1 | 2 | 3;
  readonly tools: readonly string[];
  readonly github: string;
  readonly image: string;
  readonly excerpt: string;
  readonly body: string;
}

interface Frontmatter {
  title: string;
  slug: string;
  level: number;
  tools: string[];
  github: string;
  image: string;
  excerpt: string;
}

function parseFrontmatter(content: string): {
  data: Frontmatter;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return {
      data: { title: "", slug: "", level: 1, tools: [], github: "", image: "", excerpt: "" },
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

    // Handle YAML arrays like [a, b, c]
    if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim());
    }

    // Handle quoted strings
    if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // Handle numbers
    if (typeof value === "string" && /^\d+$/.test(value)) {
      value = parseInt(value, 10);
    }

    data[key] = value;
  }

  return { data: data as unknown as Frontmatter, body };
}

export function loadProjects(): readonly Project[] {
  const dir = resolve(process.cwd(), "content/projects");

  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".md")).sort();
  } catch {
    return [];
  }

  return files.map((file) => {
    const raw = readFileSync(resolve(dir, file), "utf-8");
    const { data, body } = parseFrontmatter(raw);

    return {
      slug: data.slug,
      title: data.title,
      level: (data.level as 1 | 2 | 3) || 2,
      tools: data.tools || [],
      github: data.github,
      image: data.image,
      excerpt: data.excerpt,
      body,
    };
  });
}
