"use client";

import { useState, useEffect } from "react";

interface SaveButtonProps {
  readonly slug: string;
  readonly name: string;
}

function getSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("vibestack-saved") ?? "[]");
  } catch {
    return [];
  }
}

function setSaved(slugs: string[]) {
  localStorage.setItem("vibestack-saved", JSON.stringify(slugs));
}

export function SaveButton({ slug, name }: SaveButtonProps) {
  const [saved, setSavedState] = useState(false);

  useEffect(() => {
    setSavedState(getSaved().includes(slug));
  }, [slug]);

  function toggle() {
    const current = getSaved();
    const next = saved
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    setSaved(next);
    setSavedState(!saved);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
        saved
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted hover:text-ink"
      }`}
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}
