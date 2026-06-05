---
title: "VibeStack — This Site"
slug: vibestack
level: 2
tools: [cursor, claude-code, nextjs, vercel]
github: shiki4709/vibestack
image: /projects/vibestack.png
excerpt: "Built the site you're looking at right now — a tool directory for vibe coders, shipped in a weekend."
---

## What I Built

VibeStack itself — an open-source directory of vibe coding tools with a quiz that matches you to the right tools for your skill level. It auto-discovers trending tools from GitHub weekly.

## Tools Used

- **Cursor** — AI code editor for building the UI
- **Claude Code** — Terminal agent for the auto-discovery pipeline
- **Next.js** — React framework
- **Vercel** — Hosting and deployment
- **Motion** — Animations

## How I Prompted

### Step 1: Scaffold the site
```
Create a Next.js app with Tailwind CSS. I want a clean,
minimal landing page for "VibeStack" — a directory of
AI coding tools. Include a hero section, a quiz that
recommends tools based on skill level, and a grid of
tool cards.
```

Got the full structure in one shot — routing, components, layout.

### Step 2: Add the tool data
```
Here are the tools I want to feature: [list of 30+ tools
with name, description, category, level, pricing, GitHub URL].
Create a data file and wire it into the card grid with
filtering by level and category.
```

Pasted in a structured list and the AI built the entire data layer.

### Step 3: Auto-discovery pipeline
```
Build a Node.js script that scrapes GitHub trending repos,
filters for vibe-coding-relevant tools, scores them, and
generates AI profiles using DeepSeek API. Save results as
JSON that the Next.js app reads.
```

This became the `/trends` pipeline — fully automated discovery.

## What I Learned

- **Scaffolding is the AI's superpower.** Getting from zero to a working app in minutes changes how you think about projects.
- **Data-driven sites are perfect for vibe coding.** Define the shape, feed in data, let the AI build the display layer.
- **Ship fast, iterate live.** Deployed to Vercel on day one, then kept iterating on the live site.

## Try It Yourself

1. Open Cursor and describe the kind of directory/guide site you want
2. Start with the data model — what are you listing?
3. Build the display layer around the data
4. Add interactivity (filters, search, quiz) as refinement prompts
