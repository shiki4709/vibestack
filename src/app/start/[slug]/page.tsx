import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectContent } from "@/components/project-content";
import { loadProjects } from "@/data/projects";

const levelLabel = { 1: "Prompter", 2: "Tweaker", 3: "Builder" } as const;

export function generateStaticParams() {
  return loadProjects().map((p) => ({ slug: p.slug }));
}

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = loadProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-12">
          <a
            href="/start"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            &larr; Back to projects
          </a>

          {/* Header */}
          <div className="mt-8">
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
              {project.title}
            </h1>
            <p className="mt-2 text-muted">{project.excerpt}</p>
          </div>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: `var(--level-${project.level})` }}
            >
              {levelLabel[project.level]}
            </span>
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* GitHub link */}
          <div className="mt-6">
            <a
              href={`https://github.com/${project.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
            >
              View on GitHub
            </a>
          </div>

          {/* Markdown body */}
          <ProjectContent body={project.body} />
        </div>
      </main>
      <Footer />
    </>
  );
}
