import Link from "next/link";
import { StudioShell } from "../../components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";
import { getAllProjects, getStudioProjectHref } from "@/lib/content";

const statusClasses = {
  ready: "bg-emerald-100 text-emerald-700",
  active: "bg-sky-100 text-sky-700",
  backlog: "bg-slate-100 text-slate-700",
};

export default async function StudioProjectsPage() {
  await requireStudioAuth();
  const projects = getAllProjects();

  return (
    <StudioShell
      title="Project updates"
      intro="Track which project pages are publication-ready, which ones still need fresh copy, and where the next public-facing update should land."
    >
      <div className="grid gap-4">
        {projects.map((project) => (
          <Link key={project.slug} href={getStudioProjectHref(project.slug)} className="rounded-[1.6rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">{project.owner}</p>
                <h2 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-ink)]">{project.name}</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusClasses[project.editorialStatus]}`}>
                {project.editorialStatus}
              </span>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
              <span>{project.status}</span>
              <span>{project.nextUpdate}</span>
              <span>{project.timeline}</span>
            </div>
          </Link>
        ))}
      </div>
    </StudioShell>
  );
}
