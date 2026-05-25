import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article
      className="group overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(10,61,98,0.15)]"
      role="article"
      aria-labelledby={`project-title-${project.slug}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-soft)]">
        <Image
          src={project.coverImage ?? "/media/project-cover.svg"}
          alt={project.coverAlt ?? project.name}
          fill
          className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white" aria-label={`Status: ${project.status}`}>
            {project.status}
          </span>
          <span className="text-xl font-bold text-[var(--color-brand)] tabular-nums" aria-label={`Timeline: ${typeof index === "number" ? (index + 1).toString().padStart(2, "0") : project.timeline}`}>
            {typeof index === "number" ? (index + 1).toString().padStart(2, "0") : project.timeline}
          </span>
        </div>
        <h3 id={`project-title-${project.slug}`} className="mt-8 font-heading text-2xl font-semibold text-[var(--color-ink)]">
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/projects/${project.slug}`} className="btn-brand-subtle" aria-label={`View project: ${project.name}`}>
            View Project
          </Link>
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
              View Repo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
