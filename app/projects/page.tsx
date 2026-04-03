import type { Metadata } from "next";
import { ProjectCard } from "../components/project-card";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getAllProjects } from "@/lib/content";


export const metadata: Metadata = {
  title: "Projects | Chairman.Official",
  description: "Flagship initiatives and public-facing work from Chairman.Official.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-10">
        <SiteHeader />
      </div>
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Projects</p>
        <h1 className="section-title">A portfolio of execution, not just ideas.</h1>
        <p className="section-copy">Project pages let visitors see what you are building, why it matters, and how each initiative connects to broader public impact.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

