---
title: "VibeCheck — iMessage Analyzer"
slug: vibecheck
level: 3
tools: [claude-code, python]
github: shiki4709/vibecheck
image: /projects/vibecheck.png
excerpt: "Built a CLI that analyzes iMessage conversations using AI — in one session with Claude Code."
---

## What I Built

A command-line tool that reads your iMessage database, analyzes conversation patterns, and gives you insights about your texting relationships — who you text most, sentiment analysis, conversation dynamics.

## Tools Used

- **Claude Code** — AI coding agent in the terminal
- **Python** — Core language
- **Rich** — Beautiful terminal output
- **SQLite** — Reading the iMessage database directly

## How I Prompted

### Step 1: Start with the core idea
```
Build a Python CLI that reads my Mac's iMessage database
(~/Library/Messages/chat.db) and analyzes my conversations.
Show me who I text most, message frequency, and basic sentiment.
Use Rich for pretty terminal output.
```

Claude Code scaffolded the entire project — database reader, analysis engine, and Rich-formatted output.

### Step 2: Add AI analysis
```
Now add a feature that uses Claude API to analyze the vibe
of a conversation. Pick the last 50 messages with a contact
and give me a "vibe check" — are we close? drifting? formal?
```

This added the AI layer — it reads recent messages and generates a relationship summary.

### Step 3: Polish the output
```
Make the output more visual. Add emoji indicators for vibe,
a bar chart for message frequency by day of week, and color
code the sentiment scores.
```

Final polish made it feel like a real product.

## What I Learned

- **Start broad, refine narrow.** The first prompt got 80% of the functionality. The next two refined it.
- **Let the AI read real data.** Pointing Claude Code at the actual iMessage database meant it could figure out the schema itself.
- **Rich makes CLIs beautiful.** Zero web skills needed — terminal output can look amazing.

## Try It Yourself

1. Install Claude Code: `npm install -g @anthropic-ai/claude-code`
2. Start with: "Build a Python CLI that reads [some data source] and shows [some insight]"
3. Let it scaffold, then iterate with refinement prompts
