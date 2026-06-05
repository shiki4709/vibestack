"use client";

import { AnimateIn } from "@/components/animate-in";

interface ProjectContentProps {
  readonly body: string;
}

/**
 * Renders markdown body as styled HTML.
 * Simple parser for headings, code blocks, lists, and paragraphs.
 */
export function ProjectContent({ body }: ProjectContentProps) {
  const sections = parseMarkdown(body);

  return (
    <div className="mt-10 space-y-6">
      {sections.map((section, i) => (
        <AnimateIn key={i} delay={Math.min(i * 0.05, 0.4)}>
          {section}
        </AnimateIn>
      ))}
    </div>
  );
}

function parseMarkdown(md: string): React.ReactNode[] {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={elements.length}
          className="overflow-x-auto rounded-lg bg-[#1a1a1a] p-4 text-sm leading-relaxed text-[#e0e0e0]"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Image: ![alt](src)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      elements.push(
        <div key={elements.length} className="overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgMatch[2]}
            alt={imgMatch[1]}
            loading="lazy"
            className="w-full object-cover"
          />
          {imgMatch[1] && (
            <p className="border-t border-border bg-surface px-4 py-2 text-xs text-muted">
              {imgMatch[1]}
            </p>
          )}
        </div>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={elements.length}
          className="border-t border-border pt-8 font-display text-xl font-bold text-ink"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={elements.length}
          className="font-display text-base font-bold text-ink"
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(lines[i].replace(/^[-*] /, ""));
        i++;
      }
      elements.push(
        <ul key={elements.length} className="space-y-1.5 pl-1">
          {items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed text-muted">
              <span className="mr-2 text-primary">-</span>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={elements.length} className="space-y-1.5 pl-1">
          {items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed text-muted">
              <span className="mr-2 font-medium text-primary">{j + 1}.</span>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={elements.length} className="text-sm leading-relaxed text-muted">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  // Handle **bold**, `code`, and plain text
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-medium text-ink">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("[") && match[2] && match[3]) {
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-ink"
        >
          {match[2]}
        </a>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="rounded bg-surface px-1.5 py-0.5 text-xs font-mono text-ink"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}
