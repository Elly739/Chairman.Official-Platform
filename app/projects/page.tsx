import type { Metadata } from "next";
import { ProjectCard } from "../components/project-card";
import { SiteFooter } from "../components/site-footer";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects | Chairman.Official",
  description: "Real repositories, civic tools, experiments, and public-facing builds from Chairman.Official.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Projects</p>
        <h1 className="section-title">Work that shows execution across web, civic tech, learning, and experiments.</h1>
        <p className="section-copy">This section now tracks real repositories and active builds, so visitors can understand the direction of the work and move straight into the underlying projects.</p>
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

