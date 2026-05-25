import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { absoluteUrl } from "@/lib/site";
import { getAllProjects, getProject } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Projects | Chairman.Official" };
  }

  const url = `/projects/${project.slug}`;

  return {
    title: `${project.name} | Chairman.Official`,
    description: project.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: project.name,
      description: project.summary,
      type: "article",
      url: absoluteUrl(url),
      siteName: "Chairman.Official",
      images: [
        {
          url: absoluteUrl(project.coverImage ?? "/media/project-cover.svg"),
          alt: project.coverAlt ?? project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.summary,
      images: [absoluteUrl(project.coverImage ?? "/media/project-cover.svg")],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <article className="mx-auto w-full max-w-5xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Project Detail</p>
        <h1 className="section-title">{project.name}</h1>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          <span>{project.status}</span>
          <span>{project.timeline}</span>
          <span>{project.owner}</span>
        </div>
        <p className="section-copy">{project.summary}</p>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-soft)] shadow-[0_14px_40px_rgba(10,61,98,0.12)]">
          <Image
            src={project.coverImage ?? "/media/project-cover.svg"}
            alt={project.coverAlt ?? project.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 960px"
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-[var(--color-brand)] p-8 text-white shadow-[0_14px_40px_rgba(10,61,98,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Impact Story</p>
            <p className="mt-4 text-base leading-8 text-white/82">{project.impact}</p>
          </div>
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand)]">Highlights</p>
            <div className="mt-4 grid gap-4 text-sm leading-7 text-[var(--color-muted)]">
              {project.highlights.map((highlight) => (
                <p key={highlight}>{highlight}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-[var(--color-line)] bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand)]">Project Notes</p>
          <div className="mt-4 grid gap-4 text-base leading-8 text-[var(--color-muted)]">
            <p>This page gives each build its own space for context, credibility, and future updates instead of reducing it to a single homepage tile.</p>
            <p>Use the repository link when you want to review the actual codebase, direction, or technical structure behind the project.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/projects" className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">Back to Projects</Link>
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white">
              Open Repository
            </a>
          ) : null}
          <Link href="/news" className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">Visit News</Link>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
