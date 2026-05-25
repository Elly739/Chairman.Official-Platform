import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioProjectEditorForm } from "@/app/components/studio-project-editor-form";
import { StudioShell } from "@/app/components/studio-shell";
import { getAllMediaItems, getAllProjects, getProject } from "@/lib/content";
import { requireStudioAuth } from "@/lib/studio-auth";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function StudioProjectDetailPage({ params }: PageProps) {
  await requireStudioAuth();
  const { slug } = await params;
  const project = getProject(slug);
  const mediaItems = getAllMediaItems();

  if (!project) {
    notFound();
  }

  return (
    <StudioShell
      title={project.name}
      intro="Use this project editor view to keep narrative, public updates, visual assets, and next milestones aligned before you refresh the public-facing project page."
    >
      <div className="mb-6 flex justify-end">
        <Link href={`/projects/${project.slug}`} className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
          Open Public Page
        </Link>
      </div>
      <StudioProjectEditorForm project={project} mediaItems={mediaItems} />
    </StudioShell>
  );
}
