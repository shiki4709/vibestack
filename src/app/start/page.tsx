import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GettingStarted } from "@/components/getting-started";
import { ProjectGallery } from "@/components/project-gallery";
import { loadProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Start Vibe Coding — VibeStack",
  description:
    "Learn to vibe code by watching how real projects get built. Real prompts, real tools, step-by-step breakdowns.",
};

export default function StartPage() {
  const projects = loadProjects();

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-3xl font-bold text-ink">
              Start Vibe Coding
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Learn by example. Each project below shows exactly what was built,
              which tools were used, and the actual prompts that made it happen.
              Pick your level and start building.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <GettingStarted />

        {/* Project gallery */}
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-display text-2xl font-bold text-ink">
              Project Breakdowns
            </h2>
            <p className="mt-1 text-sm text-muted">
              Real projects, real prompts. See how things actually get built.
            </p>
            <ProjectGallery projects={JSON.parse(JSON.stringify(projects))} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
