import { StudioNewsEditorForm } from "@/app/components/studio-news-editor-form";
import { StudioShell } from "@/app/components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";

export default async function StudioNewNewsPage() {
  await requireStudioAuth("/studio/news/new");

  return (
    <StudioShell
      title="Create news"
      intro="Create official announcements, release notes, scheduled drops, and statements as a clear news card with a caption."
      wide
    >
      <StudioNewsEditorForm />
    </StudioShell>
  );
}
